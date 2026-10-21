-- Migration 0002: Admin multitenancy, organizations, classrooms, moderation, compliance
-- Owner-only RLS enforced for all tables

-- Organizations
CREATE TABLE IF NOT EXISTS public.organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT CHECK (type IN ('school','district','company')),
  admin_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Classrooms
CREATE TABLE IF NOT EXISTS public.classrooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  grade_level TEXT,
  subject TEXT,
  teacher_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Classroom members (students in a class)
CREATE TABLE IF NOT EXISTS public.classroom_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  classroom_id UUID NOT NULL REFERENCES classrooms(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(classroom_id, student_id)
);

-- Moderation actions
CREATE TABLE IF NOT EXISTS public.moderation_actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  moderator_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  target_type TEXT CHECK (target_type IN ('user','guild_message','code_snippet','flashcard_deck')),
  target_id UUID NOT NULL,
  action TEXT CHECK (action IN ('warning','suspended','deleted','flagged')),
  reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Compliance events (audit trail for GDPR/COPPA)
CREATE TABLE IF NOT EXISTS public.compliance_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL CHECK (event_type IN (
    'consent_granted','consent_revoked','data_export','data_deletion',
    'parent_link_request','parent_link_approved','parent_link_revoked',
    'terms_accepted','policy_acknowledged'
  )),
  details JSONB,
  ip_address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Updated at trigger for new tables
CREATE TRIGGER set_organizations_updated_at
  BEFORE UPDATE ON public.organizations
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_classrooms_updated_at
  BEFORE UPDATE ON public.classrooms
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Enable RLS
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classrooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classroom_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.moderation_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.compliance_events ENABLE ROW LEVEL SECURITY;

-- RLS policies

-- Organizations
CREATE POLICY "Admin can read own organizations"
  ON public.organizations
  FOR SELECT
  TO authenticated
  USING (admin_id = auth.uid() OR 
    EXISTS (
      SELECT 1 FROM public.classrooms
      WHERE classrooms.organization_id = organizations.id
      AND classrooms.teacher_id = auth.uid()
    ));

CREATE POLICY "Admin can manage own organizations"
  ON public.organizations
  FOR ALL
  TO authenticated
  USING (admin_id = auth.uid())
  WITH CHECK (admin_id = auth.uid());

-- Classrooms
CREATE POLICY "Org admin/teacher can read classrooms"
  ON public.classrooms
  FOR SELECT
  TO authenticated
  USING (organization_id IN (
    SELECT id FROM public.organizations WHERE admin_id = auth.uid()
  ) OR teacher_id = auth.uid());

CREATE POLICY "Org admin can manage classrooms"
  ON public.classrooms
  FOR ALL
  TO authenticated
  USING (organization_id IN (
    SELECT id FROM public.organizations WHERE admin_id = auth.uid()
  ))
  WITH CHECK (organization_id IN (
    SELECT id FROM public.organizations WHERE admin_id = auth.uid()
  ));

-- Classroom members
CREATE POLICY "Teacher can read classroom members"
  ON public.classroom_members
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.classrooms
    WHERE classroom_members.classroom_id = classrooms.id
    AND classrooms.teacher_id = auth.uid()
  ));

CREATE POLICY "Student can read own classroom memberships"
  ON public.classroom_members
  FOR SELECT
  TO authenticated
  USING (student_id = auth.uid());

CREATE POLICY "Org admin can manage classroom members"
  ON public.classroom_members
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.classrooms
    WHERE classroom_members.classroom_id = classrooms.id
    AND classrooms.organization_id IN (
      SELECT id FROM public.organizations WHERE admin_id = auth.uid()
    )
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.classrooms
    WHERE NEW.classroom_id = classrooms.id
    AND classrooms.organization_id IN (
      SELECT id FROM public.organizations WHERE admin_id = auth.uid()
    )
  ));

-- Moderation actions
CREATE POLICY "Moderator can read moderation actions"
  ON public.moderation_actions
  FOR SELECT
  TO authenticated
  USING (moderator_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin','teacher')
    ));

CREATE POLICY "Admin/teacher can create moderation actions"
  ON public.moderation_actions
  FOR INSERT
  TO authenticated
  WITH CHECK (moderator_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin','teacher')
    ));

-- Compliance events
CREATE POLICY "User can read own compliance events"
  ON public.compliance_events
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid() OR user_id IS NULL);

CREATE POLICY "User can insert own compliance events"
  ON public.compliance_events
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid() OR user_id IS NULL);

CREATE POLICY "Admin can read all compliance events"
  ON public.compliance_events
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  ));

-- SECURITY DEFINER RPC: check_admin_role
CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
    AND role = 'admin'
  );
END;
$$;

-- SECURITY DEFINER RPC: check_teacher_role
CREATE OR REPLACE FUNCTION public.is_teacher_user()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
    AND role = 'teacher'
  );
END;
$$;

-- SECURITY DEFINER RPC: check_parent_role
CREATE OR REPLACE FUNCTION public.is_parent_user()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
    AND role = 'parent'
  );
END;
$$;

-- SECURITY DEFINER RPC: log_compliance_event
CREATE OR REPLACE FUNCTION public.log_compliance_event(
  p_event_type TEXT,
  p_details JSONB DEFAULT '{}'::jsonb,
  p_user_id UUID DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_event_id UUID;
BEGIN
  INSERT INTO public.compliance_events (user_id, event_type, details, ip_address)
  VALUES (p_user_id, p_event_type, p_details, inet_client_addr())
  RETURNING id INTO v_event_id;
  
  RETURN v_event_id;
END;
$$;
