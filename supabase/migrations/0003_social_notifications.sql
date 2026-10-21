-- Notifications
CREATE TABLE notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  type TEXT CHECK (type IN ('streak_reminder', 'badge_unlock', 'guild_activity', 'ai_review_ready', 'assignment_due')) NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Assignments
CREATE TABLE assignments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  teacher_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  classroom_id UUID REFERENCES classrooms(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  type TEXT CHECK (type IN ('quiz', 'flashcard_deck')) NOT NULL,
  ref_id UUID, -- quiz_attempts.id or flashcard_decks.id
  due_date TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Assignment targets
CREATE TABLE assignment_targets (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  assignment_id UUID REFERENCES assignments(id) ON DELETE CASCADE NOT NULL,
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(assignment_id, student_id)
);

-- Parent-student links
CREATE TABLE parent_student_links (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  parent_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  status TEXT CHECK (status IN ('pending', 'approved', 'revoked')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(parent_id, student_id)
);

-- Leaderboard opt-ins
CREATE TABLE leaderboard_opt_ins (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL UNIQUE,
  display_alias TEXT,
  opted_in BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Error logs
CREATE TABLE error_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  message TEXT NOT NULL,
  stack TEXT,
  route TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS Policies
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignment_targets ENABLE ROW LEVEL SECURITY;
ALTER TABLE parent_student_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboard_opt_ins ENABLE ROW LEVEL SECURITY;
ALTER TABLE error_logs ENABLE ROW LEVEL SECURITY;

-- Notifications: owner only
CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Service role can insert notifications" ON notifications FOR INSERT WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own notifications" ON notifications FOR DELETE USING (auth.uid() = user_id);

-- Assignments: teachers can view own, students can view via classroom
CREATE POLICY "Teachers can view own assignments" ON assignments FOR SELECT USING (auth.uid() = teacher_id);
CREATE POLICY "Students can view classroom assignments" ON assignments FOR SELECT USING (EXISTS (
  SELECT 1 FROM classroom_members WHERE classroom_id = assignments.classroom_id AND student_id = auth.uid()
));
CREATE POLICY "Service role can insert assignments" ON assignments FOR INSERT WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "Teachers can update own assignments" ON assignments FOR UPDATE USING (auth.uid() = teacher_id);

-- Assignment targets: students can view own, teachers can view all for their assignment
CREATE POLICY "Students can view own assignment targets" ON assignment_targets FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Teachers can view assignment targets" ON assignment_targets FOR SELECT USING (auth.uid() = (
  SELECT teacher_id FROM assignments WHERE id = assignment_id
));
CREATE POLICY "Service role can insert assignment targets" ON assignment_targets FOR INSERT WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "Students can update own assignment targets" ON assignment_targets FOR UPDATE USING (auth.uid() = student_id);

-- Parent-student links: parent or student can view
CREATE POLICY "Parents can view own links" ON parent_student_links FOR SELECT USING (auth.uid() = parent_id);
CREATE POLICY "Students can view own links" ON parent_student_links FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Service role can insert parent links" ON parent_student_links FOR INSERT WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "Parents can update own links" ON parent_student_links FOR UPDATE USING (auth.uid() = parent_id);

-- Leaderboard opt-ins: owner write, public read via view
CREATE POLICY "Users can view own leaderboard opt-in" ON leaderboard_opt_ins FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own leaderboard opt-in" ON leaderboard_opt_ins FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own leaderboard opt-in" ON leaderboard_opt_ins FOR UPDATE USING (auth.uid() = user_id);

-- Error logs: insert-only from client, admin-only read
CREATE POLICY "Users can insert error logs" ON error_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view error logs" ON error_logs FOR SELECT USING (auth.role() = 'service_role' OR EXISTS (
  SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
));

-- Public leaderboard view (anonymized)
CREATE OR REPLACE VIEW leaderboard_public_view AS
SELECT
  p.id,
  lo.display_alias,
  p.xp_total,
  p.level,
  p.streak_count
FROM profiles p
INNER JOIN leaderboard_opt_ins lo ON p.id = lo.user_id
WHERE lo.opted_in = true
ORDER BY p.xp_total DESC, p.streak_count DESC;

-- Grant public access to leaderboard view
GRANT SELECT ON leaderboard_public_view TO anon, authenticated;

-- Updated at trigger for leaderboard_opt_ins
CREATE TRIGGER update_leaderboard_opt_ins_updated_at BEFORE UPDATE ON leaderboard_opt_ins
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
