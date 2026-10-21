-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT CHECK (role IN ('student', 'teacher', 'parent', 'admin')) DEFAULT 'student',
  tier TEXT CHECK (tier IN ('free', 'pro', 'school')) DEFAULT 'free',
  grade TEXT,
  country TEXT,
  dob DATE,
  is_minor BOOLEAN,
  parent_email TEXT,
  onboarding_complete BOOLEAN DEFAULT false,
  xp_total INTEGER DEFAULT 0,
  streak_count INTEGER DEFAULT 0,
  last_streak_date DATE,
  vault_balance INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Test scores
CREATE TABLE test_scores (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  test_name TEXT NOT NULL,
  score INTEGER NOT NULL,
  max_score INTEGER NOT NULL,
  test_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Skill nodes
CREATE TABLE skill_nodes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  subject TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  parent_id UUID REFERENCES skill_nodes(id) ON DELETE CASCADE,
  order_index INTEGER NOT NULL,
  xp_reward INTEGER DEFAULT 10,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- User skill progress
CREATE TABLE user_skill_progress (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  skill_node_id UUID REFERENCES skill_nodes(id) ON DELETE CASCADE NOT NULL,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id, skill_node_id)
);

-- Quiz attempts
CREATE TABLE quiz_attempts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  skill_node_id UUID REFERENCES skill_nodes(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Knowledge gaps
CREATE TABLE knowledge_gaps (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  subject TEXT NOT NULL,
  topic TEXT NOT NULL,
  gap_severity TEXT CHECK (gap_severity IN ('minor', 'moderate', 'severe')) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  resolved_at TIMESTAMP WITH TIME ZONE
);

-- Journal entries
CREATE TABLE journal_entries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  mood TEXT CHECK (mood IN ('great', 'good', 'neutral', 'challenged', 'struggling')),
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Portfolio items
CREATE TABLE portfolio_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  item_type TEXT CHECK (item_type IN ('project', 'certificate', 'achievement', 'reflection')) NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Pomodoro sessions
CREATE TABLE pomodoro_sessions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  subject TEXT,
  duration_seconds INTEGER NOT NULL,
  completed BOOLEAN DEFAULT false,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Guilds
CREATE TABLE guilds (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  subject TEXT,
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  member_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Guild members
CREATE TABLE guild_members (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  guild_id UUID REFERENCES guilds(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  role TEXT CHECK (role IN ('member', 'moderator', 'leader')) DEFAULT 'member',
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(guild_id, user_id)
);

-- Guild messages
CREATE TABLE guild_messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  guild_id UUID REFERENCES guilds(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Badges
CREATE TABLE badges (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  requirement TEXT,
  xp_reward INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- User badges
CREATE TABLE user_badges (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  badge_id UUID REFERENCES badges(id) ON DELETE CASCADE NOT NULL,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, badge_id)
);

-- Subscriptions
CREATE TABLE subscriptions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  tier TEXT CHECK (tier IN ('pro', 'school')) NOT NULL,
  status TEXT CHECK (status IN ('active', 'cancelled', 'expired')) DEFAULT 'active',
  start_date DATE NOT NULL,
  end_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Contact messages
CREATE TABLE contact_messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Flashcard decks
CREATE TABLE flashcard_decks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  subject TEXT,
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Flashcard items
CREATE TABLE flashcard_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  deck_id UUID REFERENCES flashcard_decks(id) ON DELETE CASCADE NOT NULL,
  front TEXT NOT NULL,
  back TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Code snippets
CREATE TABLE code_snippets (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  language TEXT NOT NULL,
  code TEXT NOT NULL,
  description TEXT,
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Vault items (cosmetics)
CREATE TABLE vault_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  item_type TEXT CHECK (item_type IN ('avatar', 'theme', 'badge_frame', 'title')) NOT NULL,
  cost INTEGER NOT NULL,
  icon TEXT,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- User inventory
CREATE TABLE user_inventory (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  vault_item_id UUID REFERENCES vault_items(id) ON DELETE CASCADE NOT NULL,
  purchased_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  is_equipped BOOLEAN DEFAULT false,
  UNIQUE(user_id, vault_item_id)
);

-- RLS Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_skill_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_gaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE pomodoro_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE guild_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE guild_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE flashcard_decks ENABLE ROW LEVEL SECURITY;
ALTER TABLE flashcard_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE code_snippets ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_inventory ENABLE ROW LEVEL SECURITY;

-- Profiles: owner can read, service role can write
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Service role can insert profiles" ON profiles FOR INSERT WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Service role can update profiles" ON profiles FOR UPDATE USING (auth.role() = 'service_role');

-- Test scores: owner only
CREATE POLICY "Users can view own test scores" ON test_scores FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own test scores" ON test_scores FOR INSERT WITH CHECK (auth.uid() = user_id);

-- User skill progress: owner only
CREATE POLICY "Users can view own skill progress" ON user_skill_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own skill progress" ON user_skill_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own skill progress" ON user_skill_progress FOR UPDATE USING (auth.uid() = user_id);

-- Quiz attempts: owner only
CREATE POLICY "Users can view own quiz attempts" ON quiz_attempts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own quiz attempts" ON quiz_attempts FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Knowledge gaps: owner only
CREATE POLICY "Users can view own knowledge gaps" ON knowledge_gaps FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own knowledge gaps" ON knowledge_gaps FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own knowledge gaps" ON knowledge_gaps FOR UPDATE USING (auth.uid() = user_id);

-- Journal entries: owner only
CREATE POLICY "Users can view own journal entries" ON journal_entries FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own journal entries" ON journal_entries FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own journal entries" ON journal_entries FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own journal entries" ON journal_entries FOR DELETE USING (auth.uid() = user_id);

-- Portfolio items: owner only
CREATE POLICY "Users can view own portfolio items" ON portfolio_items FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own portfolio items" ON portfolio_items FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own portfolio items" ON portfolio_items FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own portfolio items" ON portfolio_items FOR DELETE USING (auth.uid() = user_id);

-- Pomodoro sessions: owner only
CREATE POLICY "Users can view own pomodoro sessions" ON pomodoro_sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own pomodoro sessions" ON pomodoro_sessions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own pomodoro sessions" ON pomodoro_sessions FOR UPDATE USING (auth.uid() = user_id);

-- Guild members: member can view, service role can insert
CREATE POLICY "Guild members can view membership" ON guild_members FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Service role can insert guild members" ON guild_members FOR INSERT WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "Users can leave guild" ON guild_members FOR DELETE USING (auth.uid() = user_id);

-- Guild messages: guild members can view, members can insert
CREATE POLICY "Guild members can view messages" ON guild_messages FOR SELECT USING (
  EXISTS (SELECT 1 FROM guild_members WHERE guild_messages.guild_id = guild_id AND user_id = auth.uid())
);
CREATE POLICY "Guild members can insert messages" ON guild_messages FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM guild_members WHERE guild_id = guild_id AND user_id = auth.uid())
);

-- User badges: owner only
CREATE POLICY "Users can view own badges" ON user_badges FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Service role can insert user badges" ON user_badges FOR INSERT WITH CHECK (auth.role() = 'service_role');

-- Subscriptions: owner only
CREATE POLICY "Users can view own subscriptions" ON subscriptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Service role can insert subscriptions" ON subscriptions FOR INSERT WITH CHECK (auth.role() = 'service_role');

-- Flashcard decks: owner can view/edit, public decks readable by all
CREATE POLICY "Users can view own flashcard decks" ON flashcard_decks FOR SELECT USING (auth.uid() = user_id OR is_public = true);
CREATE POLICY "Users can insert own flashcard decks" ON flashcard_decks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own flashcard decks" ON flashcard_decks FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own flashcard decks" ON flashcard_decks FOR DELETE USING (auth.uid() = user_id);

-- Flashcard items: owner can view/edit
CREATE POLICY "Users can view flashcard items from own decks" ON flashcard_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM flashcard_decks WHERE flashcard_items.deck_id = id AND user_id = auth.uid())
);
CREATE POLICY "Users can insert flashcard items to own decks" ON flashcard_items FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM flashcard_decks WHERE flashcard_items.deck_id = id AND user_id = auth.uid())
);
CREATE POLICY "Users can update flashcard items in own decks" ON flashcard_items FOR UPDATE USING (
  EXISTS (SELECT 1 FROM flashcard_decks WHERE flashcard_items.deck_id = id AND user_id = auth.uid())
);
CREATE POLICY "Users can delete flashcard items from own decks" ON flashcard_items FOR DELETE USING (
  EXISTS (SELECT 1 FROM flashcard_decks WHERE flashcard_items.deck_id = id AND user_id = auth.uid())
);

-- Code snippets: owner can view/edit, public snippets readable by all
CREATE POLICY "Users can view own code snippets" ON code_snippets FOR SELECT USING (auth.uid() = user_id OR is_public = true);
CREATE POLICY "Users can insert own code snippets" ON code_snippets FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own code snippets" ON code_snippets FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own code snippets" ON code_snippets FOR DELETE USING (auth.uid() = user_id);

-- User inventory: owner only
CREATE POLICY "Users can view own inventory" ON user_inventory FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Service role can insert inventory items" ON user_inventory FOR INSERT WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "Users can update own inventory" ON user_inventory FOR UPDATE USING (auth.uid() = user_id);

-- RPC function to purchase vault item
CREATE OR REPLACE FUNCTION purchase_vault_item(user_uuid UUID, item_uuid UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check user balance
  IF (SELECT vault_balance FROM profiles WHERE id = user_uuid) < (SELECT cost FROM vault_items WHERE id = item_uuid) THEN
    RAISE EXCEPTION 'Insufficient vault balance';
  END IF;

  -- Deduct balance
  UPDATE profiles SET vault_balance = vault_balance - (SELECT cost FROM vault_items WHERE id = item_uuid) WHERE id = user_uuid;

  -- Add to inventory
  INSERT INTO user_inventory (user_id, vault_item_id, purchased_at, is_equipped)
  VALUES (user_uuid, item_uuid, NOW(), false);

  -- Add XP
  UPDATE profiles SET xp_total = xp_total + 5 WHERE id = user_uuid;
END;
$$;

-- Updated at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_journal_entries_updated_at BEFORE UPDATE ON journal_entries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_flashcard_decks_updated_at BEFORE UPDATE ON flashcard_decks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_code_snippets_updated_at BEFORE UPDATE ON code_snippets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
