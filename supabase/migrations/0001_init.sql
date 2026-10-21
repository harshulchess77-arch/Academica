-- Migration 0001: Core schema for Academica
-- Owner-only RLS enforced for all tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable pg_cron for scheduled functions
CREATE EXTENSION IF NOT EXISTS "pg_cron";

-- Profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  display_name TEXT NOT NULL,
  avatar_url TEXT,
  grade TEXT CHECK (grade IN ('K','1','2','3','4','5','6','7','8','9','10','11','12','college')),
  bio TEXT,
  role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student','teacher','parent','admin')),
  xp_total INTEGER DEFAULT 0 CHECK (xp_total >= 0),
  level INTEGER DEFAULT 1 CHECK (level >= 1),
  streak_count INTEGER DEFAULT 0 CHECK (streak_count >= 0),
  last_active_at TIMESTAMPTZ,
  onboarding_complete BOOLEAN DEFAULT false,
  dob DATE,
  is_minor BOOLEAN,
  parent_email TEXT,
  country TEXT,
  vpn_check_passed BOOLEAN DEFAULT false,
  selected_tier TEXT CHECK (selected_tier IN ('free','pro','premium')),
  subscription_id UUID REFERENCES subscriptions(id) ON DELETE SET NULL,
  dyslexic_font_enabled BOOLEAN DEFAULT false,
  high_contrast_enabled BOOLEAN DEFAULT false,
  reduce_motion_enabled BOOLEAN DEFAULT false,
  tts_speed INTEGER DEFAULT 1 CHECK (tts_speed BETWEEN 0.5 AND 2),
  larger_click_targets BOOLEAN DEFAULT false,
  always_show_focus BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Test scores
CREATE TABLE IF NOT EXISTS public.test_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  score INTEGER NOT NULL,
  max_score INTEGER NOT NULL,
  test_date DATE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Skill tree nodes
CREATE TABLE IF NOT EXISTS public.skill_nodes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject TEXT NOT NULL,
  branch TEXT NOT NULL,
  level INTEGER NOT NULL CHECK (level >= 1),
  title TEXT NOT NULL,
  description TEXT,
  required_xp INTEGER NOT NULL DEFAULT 0,
  parent_node_id UUID REFERENCES skill_nodes(id) ON DELETE SET NULL,
  position_x INTEGER NOT NULL,
  position_y INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- User skill progress
CREATE TABLE IF NOT EXISTS public.user_skill_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  node_id UUID NOT NULL REFERENCES skill_nodes(id) ON DELETE CASCADE,
  unlocked BOOLEAN DEFAULT false,
  mastery_level INTEGER DEFAULT 0 CHECK (mastery_level BETWEEN 0 AND 100),
  unlocked_at TIMESTAMPTZ,
  UNIQUE(user_id, node_id)
);

-- Quiz attempts
CREATE TABLE IF NOT EXISTS public.quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Knowledge gaps
CREATE TABLE IF NOT EXISTS public.knowledge_gaps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  topic TEXT NOT NULL,
  gap_severity TEXT CHECK (gap_severity IN ('minor','moderate','severe')),
  detected_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  resolved_at TIMESTAMPTZ
);

-- Journal entries
CREATE TABLE IF NOT EXISTS public.journal_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  mood TEXT CHECK (mood IN ('excited','calm','confused','frustrated','proud')),
  tags TEXT[],
  is_private BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Portfolio items
CREATE TABLE IF NOT EXISTS public.portfolio_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  item_type TEXT CHECK (item_type IN ('certificate','project','reflection','achievement')),
  item_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Pomodoro sessions
CREATE TABLE IF NOT EXISTS public.pomodoro_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  duration_seconds INTEGER NOT NULL,
  completed BOOLEAN DEFAULT false,
  task TEXT,
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- Guilds
CREATE TABLE IF NOT EXISTS public.guilds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  focus_subject TEXT,
  member_count INTEGER DEFAULT 0,
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Guild members
CREATE TABLE IF NOT EXISTS public.guild_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guild_id UUID NOT NULL REFERENCES guilds(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member' CHECK (role IN ('member','moderator','admin')),
  joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(guild_id, user_id)
);

-- Guild messages
CREATE TABLE IF NOT EXISTS public.guild_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guild_id UUID NOT NULL REFERENCES guilds(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Badges
CREATE TABLE IF NOT EXISTS public.badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  tier TEXT CHECK (tier IN ('bronze','silver','gold','platinum')),
  required_xp INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- User badges
CREATE TABLE IF NOT EXISTS public.user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  badge_id UUID NOT NULL REFERENCES badges(id) ON DELETE CASCADE,
  earned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
);

-- Subscriptions
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  tier TEXT NOT NULL CHECK (tier IN ('free','pro','premium')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active','cancelled','expired')),
  stripe_subscription_id TEXT,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Contact messages
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Flashcard decks
CREATE TABLE IF NOT EXISTS public.flashcard_decks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  subject TEXT,
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Flashcard items
CREATE TABLE IF NOT EXISTS public.flashcard_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deck_id UUID NOT NULL REFERENCES flashcard_decks(id) ON DELETE CASCADE,
  front TEXT NOT NULL,
  back TEXT NOT NULL,
  position INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Code snippets
CREATE TABLE IF NOT EXISTS public.code_snippets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  language TEXT NOT NULL,
  code TEXT NOT NULL,
  description TEXT,
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Vault items
CREATE TABLE IF NOT EXISTS public.vault_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  item_type TEXT CHECK (item_type IN ('cosmetic','avatar_frame','background','effect')),
  cost_xp INTEGER NOT NULL CHECK (cost_xp >= 0),
  rarity TEXT CHECK (rarity IN ('common','rare','epic','legendary')),
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- User inventory
CREATE TABLE IF NOT EXISTS public.user_inventory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  item_id UUID NOT NULL REFERENCES vault_items(id) ON DELETE CASCADE,
  equipped BOOLEAN DEFAULT false,
  purchased_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, item_id)
);

-- Updated at trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_journal_entries_updated_at
  BEFORE UPDATE ON public.journal_entries
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_flashcard_decks_updated_at
  BEFORE UPDATE ON public.flashcard_decks
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_code_snippets_updated_at
  BEFORE UPDATE ON public.code_snippets
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_skill_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.knowledge_gaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pomodoro_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guilds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guild_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guild_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flashcard_decks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flashcard_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.code_snippets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vault_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_inventory ENABLE ROW LEVEL SECURITY;

-- Owner-only RLS policies
CREATE POLICY "Owner can do everything on profiles"
  ON public.profiles
  FOR ALL
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

CREATE POLICY "Owner can do everything on test_scores"
  ON public.test_scores
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Everyone can read skill_nodes"
  ON public.skill_nodes
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Owner can do everything on user_skill_progress"
  ON public.user_skill_progress
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Owner can do everything on quiz_attempts"
  ON public.quiz_attempts
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Owner can do everything on knowledge_gaps"
  ON public.knowledge_gaps
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Owner can do everything on journal_entries"
  ON public.journal_entries
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Owner can do everything on portfolio_items"
  ON public.portfolio_items
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Owner can do everything on pomodoro_sessions"
  ON public.pomodoro_sessions
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Everyone can read guilds"
  ON public.guilds
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Owner can do everything on guilds"
  ON public.guilds
  FOR ALL
  TO authenticated
  USING (created_by = auth.uid())
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "Owner can do everything on guild_members"
  ON public.guild_members
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Guild members can read guild_messages"
  ON public.guild_messages
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.guild_members
    WHERE guild_messages.guild_id = guild_members.guild_id
    AND guild_members.user_id = auth.uid()
  ));

CREATE POLICY "Guild members can insert guild_messages"
  ON public.guild_messages
  FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.guild_members
    WHERE NEW.guild_id = guild_members.guild_id
    AND guild_members.user_id = auth.uid()
  ));

CREATE POLICY "Everyone can read badges"
  ON public.badges
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Owner can do everything on user_badges"
  ON public.user_badges
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Owner can do everything on subscriptions"
  ON public.subscriptions
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Anyone can insert contact_messages"
  ON public.contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admin can read contact_messages"
  ON public.contact_messages
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Owner can do everything on flashcard_decks"
  ON public.flashcard_decks
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Everyone can read public flashcard_decks"
  ON public.flashcard_decks
  FOR SELECT
  TO authenticated
  USING (is_public = true OR user_id = auth.uid());

CREATE POLICY "Owner can do everything on flashcard_items"
  ON public.flashcard_items
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.flashcard_decks
    WHERE flashcard_items.deck_id = flashcard_decks.id
    AND flashcard_decks.user_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.flashcard_decks
    WHERE NEW.deck_id = flashcard_decks.id
    AND flashcard_decks.user_id = auth.uid()
  ));

CREATE POLICY "Owner can do everything on code_snippets"
  ON public.code_snippets
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Everyone can read public code_snippets"
  ON public.code_snippets
  FOR SELECT
  TO authenticated
  USING (is_public = true OR user_id = auth.uid());

CREATE POLICY "Everyone can read vault_items"
  ON public.vault_items
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Owner can do everything on user_inventory"
  ON public.user_inventory
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- SECURITY DEFINER RPC: purchase_vault_item
CREATE OR REPLACE FUNCTION public.purchase_vault_item(p_item_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_xp_cost INTEGER;
  v_current_xp INTEGER;
  v_result JSONB;
BEGIN
  -- Get item cost
  SELECT cost_xp INTO v_xp_cost
  FROM public.vault_items
  WHERE id = p_item_id;
  
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'Item not found');
  END IF;
  
  -- Get user's current XP
  SELECT xp_total INTO v_current_xp
  FROM public.profiles
  WHERE id = auth.uid();
  
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'User not found');
  END IF;
  
  -- Check if user has enough XP
  IF v_current_xp < v_xp_cost THEN
    RETURN jsonb_build_object('success', false, 'error', 'Insufficient XP');
  END IF;
  
  -- Deduct XP and add to inventory
  UPDATE public.profiles
  SET xp_total = xp_total - v_xp_cost
  WHERE id = auth.uid();
  
  INSERT INTO public.user_inventory (user_id, item_id, purchased_at)
  VALUES (auth.uid(), p_item_id, NOW())
  ON CONFLICT (user_id, item_id) DO NOTHING;
  
  RETURN jsonb_build_object('success', true, 'new_xp', v_current_xp - v_xp_cost);
END;
$$;

-- Helper function: add XP ( SECURITY DEFINER for gamification )
CREATE OR REPLACE FUNCTION public.add_user_xp(p_user_id UUID, p_amount INTEGER)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  UPDATE public.profiles
  SET xp_total = xp_total + p_amount
  WHERE id = p_user_id;
  
  -- Check for level up (simple threshold: every 1000 XP = 1 level)
  UPDATE public.profiles
  SET level = FLOOR(xp_total / 1000) + 1
  WHERE id = p_user_id
  AND xp_total >= (level * 1000);
END;
$$;

-- Helper function: increment streak
CREATE OR REPLACE FUNCTION public.increment_streak(p_user_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_last_active TIMESTAMPTZ;
  v_today DATE := CURRENT_DATE;
BEGIN
  SELECT last_active_at INTO v_last_active
  FROM public.profiles
  WHERE id = p_user_id;
  
  IF v_last_active IS NULL OR v_last_active < v_today - INTERVAL '1 day' THEN
    -- Reset streak (more than 1 day gap)
    UPDATE public.profiles
    SET streak_count = 1, last_active_at = NOW()
    WHERE id = p_user_id;
  ELSIF v_last_active >= v_today THEN
    -- Already active today, no change
    UPDATE public.profiles
    SET last_active_at = NOW()
    WHERE id = p_user_id;
  ELSE
    -- Consecutive day, increment
    UPDATE public.profiles
    SET streak_count = streak_count + 1, last_active_at = NOW()
    WHERE id = p_user_id;
  END IF;
END;
$$;
