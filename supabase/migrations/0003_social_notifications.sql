-- Migration 0003: Social notifications, assignments, parent links, leaderboard, error logs
-- Owner-only RLS enforced for all tables

-- Notifications
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN (
    'streak_reminder','badge_unlock','guild_activity','ai_review_ready',
    'assignment_due','weekly_digest','parent_request_approved'
  )),
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Assignments
CREATE TABLE IF NOT EXISTS public.assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  classroom_id UUID NOT NULL REFERENCES classrooms(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('quiz','flashcard_deck')),
  ref_id UUID, -- References quiz_attempts.id or flashcard_decks.id
  due_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Assignment targets (students assigned to an assignment)
CREATE TABLE IF NOT EXISTS public.assignment_targets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id UUID NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  UNIQUE(assignment_id, student_id)
);

-- Parent-student links
CREATE TABLE IF NOT EXISTS public.parent_student_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','revoked')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(parent_id, student_id)
);

-- Leaderboard opt-ins
CREATE TABLE IF NOT EXISTS public.leaderboard_opt_ins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  display_alias TEXT NOT NULL,
  opted_in BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Error logs (rate-limited insert from client)
CREATE TABLE IF NOT EXISTS public.error_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  message TEXT NOT NULL,
  stack TEXT,
  route TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Rate limit counters for edge functions
CREATE TABLE IF NOT EXISTS public.rate_limit_counters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  endpoint TEXT NOT NULL,
  request_count INTEGER DEFAULT 0,
  window_start TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, endpoint)
);

-- Updated at trigger for parent_student_links
CREATE TRIGGER set_parent_student_links_updated_at
  BEFORE UPDATE ON public.parent_student_links
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Enable RLS
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignment_targets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parent_student_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leaderboard_opt_ins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.error_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rate_limit_counters ENABLE ROW LEVEL SECURITY;

-- RLS policies

-- Notifications
CREATE POLICY "Owner can do everything on notifications"
  ON public.notifications
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Assignments
CREATE POLICY "Teacher can read own assignments"
  ON public.assignments
  FOR SELECT
  TO authenticated
  USING (teacher_id = auth.uid());

CREATE POLICY "Teacher can manage own assignments"
  ON public.assignments
  FOR ALL
  TO authenticated
  USING (teacher_id = auth.uid())
  WITH CHECK (teacher_id = auth.uid());

CREATE POLICY "Student can read assignments via classroom"
  ON public.assignments
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.classroom_members
    WHERE classroom_members.classroom_id = assignments.classroom_id
    AND classroom_members.student_id = auth.uid()
  ));

-- Assignment targets
CREATE POLICY "Student can read own assignment targets"
  ON public.assignment_targets
  FOR SELECT
  TO authenticated
  USING (student_id = auth.uid());

CREATE POLICY "Student can update own assignment targets"
  ON public.assignment_targets
  FOR UPDATE
  TO authenticated
  USING (student_id = auth.uid())
  WITH CHECK (student_id = auth.uid());

CREATE POLICY "Teacher can read assignment targets for their assignments"
  ON public.assignment_targets
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.assignments
    WHERE assignment_targets.assignment_id = assignments.id
    AND assignments.teacher_id = auth.uid()
  ));

-- Parent-student links
CREATE POLICY "Parent can read own links"
  ON public.parent_student_links
  FOR SELECT
  TO authenticated
  USING (parent_id = auth.uid());

CREATE POLICY "Student can read own links"
  ON public.parent_student_links
  FOR SELECT
  TO authenticated
  USING (student_id = auth.uid());

CREATE POLICY "Parent can manage own links"
  ON public.parent_student_links
  FOR ALL
  TO authenticated
  USING (parent_id = auth.uid())
  WITH CHECK (parent_id = auth.uid());

CREATE POLICY "Student can approve own links"
  ON public.parent_student_links
  FOR UPDATE
  TO authenticated
  USING (student_id = auth.uid())
  WITH CHECK (student_id = auth.uid() AND status = 'pending');

-- Leaderboard opt-ins
CREATE POLICY "Owner can do everything on leaderboard_opt_ins"
  ON public.leaderboard_opt_ins
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Error logs
CREATE POLICY "User can insert own error logs"
  ON public.error_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid() OR user_id IS NULL);

CREATE POLICY "Admin can read all error logs"
  ON public.error_logs
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  ));

-- Rate limit counters
CREATE POLICY "Owner can do everything on rate_limit_counters"
  ON public.rate_limit_counters
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Public leaderboard view (anonymized, opt-in only)
CREATE OR REPLACE VIEW public.leaderboard_public_view AS
SELECT
  lo.id,
  lo.display_alias,
  p.xp_total,
  p.level,
  p.streak_count,
  ROW_NUMBER() OVER (ORDER BY p.xp_total DESC) as rank
FROM public.leaderboard_opt_ins lo
JOIN public.profiles p ON lo.user_id = p.id
WHERE lo.opted_in = true;

-- SECURITY DEFINER RPC: check_rate_limit
CREATE OR REPLACE FUNCTION public.check_rate_limit(p_endpoint TEXT, p_limit INTEGER, p_window_minutes INTEGER DEFAULT 60)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_window_start TIMESTAMPTZ;
  v_count INTEGER;
  v_allowed BOOLEAN;
BEGIN
  v_window_start := NOW() - (p_window_minutes || 60) * INTERVAL '1 minute';
  
  -- Reset counter if window expired
  UPDATE public.rate_limit_counters
  SET request_count = 0, window_start = NOW()
  WHERE user_id = auth.uid()
    AND endpoint = p_endpoint
    AND window_start < v_window_start;
  
  -- Get current count
  SELECT COALESCE(request_count, 0) INTO v_count
  FROM public.rate_limit_counters
  WHERE user_id = auth.uid()
    AND endpoint = p_endpoint;
  
  v_allowed := v_count < p_limit;
  
  IF v_allowed THEN
    -- Increment counter
    INSERT INTO public.rate_limit_counters (user_id, endpoint, request_count, window_start)
    VALUES (auth.uid(), p_endpoint, 1, NOW())
    ON CONFLICT (user_id, endpoint) DO UPDATE
    SET request_count = rate_limit_counters.request_count + 1;
  END IF;
  
  RETURN jsonb_build_object(
    'allowed', v_allowed,
    'remaining', p_limit - v_count - 1,
    'reset_at', (SELECT window_start + (p_window_minutes || 60) * INTERVAL '1 minute' FROM public.rate_limit_counters WHERE user_id = auth.uid() AND endpoint = p_endpoint)
  );
END;
$$;

-- SECURITY DEFINER RPC: refresh_leaderboard
CREATE OR REPLACE FUNCTION public.refresh_leaderboard()
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  -- The view definition already handles the calculation
  -- This function exists for scheduled invocation
  NULL;
END;
$$;

-- SECURITY DEFINER RPC: mark_notifications_read
CREATE OR REPLACE FUNCTION public.mark_notifications_read()
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  UPDATE public.notifications
  SET read = true
  WHERE user_id = auth.uid()
    AND read = false;
END;
$$;

-- SECURITY DEFINER RPC: create_parent_link_request
CREATE OR REPLACE FUNCTION public.create_parent_link_request(p_student_email TEXT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_student_id UUID;
  v_parent_id UUID;
  v_link_id UUID;
BEGIN
  -- Find student by email
  SELECT id INTO v_student_id
  FROM public.profiles
  WHERE email = p_student_email;
  
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'Student not found');
  END IF;
  
  v_parent_id := auth.uid();
  
  -- Check if link already exists
  SELECT id INTO v_link_id
  FROM public.parent_student_links
  WHERE parent_id = v_parent_id
    AND student_id = v_student_id;
  
  IF FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'Link already exists');
  END IF;
  
  -- Create pending link
  INSERT INTO public.parent_student_links (parent_id, student_id, status)
  VALUES (v_parent_id, v_student_id, 'pending')
  RETURNING id INTO v_link_id;
  
  -- Log compliance event
  PERFORM public.log_compliance_event('parent_link_request', 
    jsonb_build_object('student_id', v_student_id, 'link_id', v_link_id),
    v_parent_id
  );
  
  RETURN jsonb_build_object('success', true, 'link_id', v_link_id);
END;
$$;

-- SECURITY DEFINER RPC: approve_parent_link
CREATE OR REPLACE FUNCTION public.approve_parent_link(p_link_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_link RECORD;
BEGIN
  SELECT * INTO v_link
  FROM public.parent_student_links
  WHERE id = p_link_id;
  
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'Link not found');
  END IF;
  
  -- Only student can approve
  IF v_link.student_id != auth.uid() THEN
    RETURN jsonb_build_object('success', false, 'error', 'Only the student can approve this link');
  END IF;
  
  -- Approve link
  UPDATE public.parent_student_links
  SET status = 'approved', updated_at = NOW()
  WHERE id = p_link_id;
  
  -- Log compliance event
  PERFORM public.log_compliance_event('parent_link_approved',
    jsonb_build_object('parent_id', v_link.parent_id, 'link_id', p_link_id),
    v_link.student_id
  );
  
  RETURN jsonb_build_object('success', true);
END;
$$;

-- Schedule leaderboard refresh every 15 minutes
SELECT cron.schedule('refresh-leaderboard', '*/15 * * * *', $$
  SELECT public.refresh_leaderboard();
$$);
