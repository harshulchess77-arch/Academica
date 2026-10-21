-- Organizations
CREATE TABLE organizations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  domain TEXT UNIQUE,
  tier TEXT CHECK (tier IN ('school', 'district', 'enterprise')) NOT NULL,
  max_students INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Classrooms
CREATE TABLE classrooms (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  teacher_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  subject TEXT,
  grade TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Classroom members
CREATE TABLE classroom_members (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  classroom_id UUID REFERENCES classrooms(id) ON DELETE CASCADE NOT NULL,
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(classroom_id, student_id)
);

-- Moderation actions
CREATE TABLE moderation_actions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  moderator_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  target_user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  action_type TEXT CHECK (action_type IN ('warning', 'suspension', 'ban', 'content_removal')) NOT NULL,
  reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Compliance events
CREATE TABLE compliance_events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  event_type TEXT CHECK (event_type IN ('coppa_consent', 'gdpr_export', 'account_deletion', 'parent_link', 'data_request')) NOT NULL,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS Policies
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE classrooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE classroom_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE moderation_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE compliance_events ENABLE ROW LEVEL SECURITY;

-- Organizations: admins and org members can view
CREATE POLICY "Admins can view organizations" ON organizations FOR SELECT USING (auth.role() = 'service_role' OR EXISTS (
  SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
));
CREATE POLICY "Service role can insert organizations" ON organizations FOR INSERT WITH CHECK (auth.role() = 'service_role');

-- Classrooms: teachers can view own, org admins can view all
CREATE POLICY "Teachers can view own classrooms" ON classrooms FOR SELECT USING (auth.uid() = teacher_id);
CREATE POLICY "Service role can insert classrooms" ON classrooms FOR INSERT WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "Teachers can update own classrooms" ON classrooms FOR UPDATE USING (auth.uid() = teacher_id);

-- Classroom members: students can view own membership, teachers can view their classroom
CREATE POLICY "Students can view classroom membership" ON classroom_members FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Teachers can view classroom members" ON classroom_members FOR SELECT USING (auth.uid() = (
  SELECT teacher_id FROM classrooms WHERE id = classroom_id
));
CREATE POLICY "Service role can insert classroom members" ON classroom_members FOR INSERT WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "Students can leave classroom" ON classroom_members FOR DELETE USING (auth.uid() = student_id);

-- Moderation actions: admins can view all
CREATE POLICY "Admins can view moderation actions" ON moderation_actions FOR SELECT USING (auth.role() = 'service_role' OR EXISTS (
  SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'teacher')
));
CREATE POLICY "Service role can insert moderation actions" ON moderation_actions FOR INSERT WITH CHECK (auth.role() = 'service_role');

-- Compliance events: user can view own, admins can view all
CREATE POLICY "Users can view own compliance events" ON compliance_events FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all compliance events" ON compliance_events FOR SELECT USING (auth.role() = 'service_role' OR EXISTS (
  SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
));
CREATE POLICY "Service role can insert compliance events" ON compliance_events FOR INSERT WITH CHECK (auth.role() = 'service_role');
