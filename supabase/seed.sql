-- Skill nodes (30 across 4 subjects)
INSERT INTO skill_nodes (subject, title, description, parent_id, order_index, xp_reward) VALUES
-- Mathematics
('Mathematics', 'Numbers & Operations', 'Understanding basic number concepts', NULL, 1, 10),
('Mathematics', 'Addition & Subtraction', 'Master addition and subtraction', NULL, 2, 15),
('Mathematics', 'Multiplication', 'Learn multiplication tables', NULL, 3, 20),
('Mathematics', 'Division', 'Understand division basics', NULL, 4, 20),
('Mathematics', 'Fractions', 'Introduction to fractions', NULL, 5, 25),
('Mathematics', 'Decimals', 'Working with decimal numbers', NULL, 6, 25),
('Mathematics', 'Percentages', 'Understanding percentages', NULL, 7, 30),
('Mathematics', 'Algebra Basics', 'Introduction to variables', NULL, 8, 35),
-- Science
('Science', 'Scientific Method', 'How science works', NULL, 1, 10),
('Science', 'Matter & Atoms', 'Understanding matter', NULL, 2, 15),
('Science', 'Forces & Motion', 'Physics fundamentals', NULL, 3, 20),
('Science', 'Energy Types', 'Different forms of energy', NULL, 4, 20),
('Science', 'Ecosystems', 'How nature works together', NULL, 5, 25),
('Science', 'Cells & Life', 'Biology basics', NULL, 6, 25),
('Science', 'Genetics', 'Introduction to heredity', NULL, 7, 30),
('Science', 'Chemical Reactions', 'Basics of chemistry', NULL, 8, 35),
-- English
('English', 'Grammar Basics', 'Parts of speech', NULL, 1, 10),
('English', 'Sentence Structure', 'Building sentences', NULL, 2, 15),
('English', 'Vocabulary Building', 'Expanding word knowledge', NULL, 3, 20),
('English', 'Reading Comprehension', 'Understanding texts', NULL, 4, 20),
('English', 'Writing Essays', 'Essay structure', NULL, 5, 25),
('English', 'Creative Writing', 'Storytelling techniques', NULL, 6, 25),
('English', 'Poetry Analysis', 'Understanding poems', NULL, 7, 30),
('English', 'Public Speaking', 'Presentation skills', NULL, 8, 35),
-- History
('History', 'Ancient Civilizations', 'Early human societies', NULL, 1, 10),
('History', 'World Wars', 'Global conflicts', NULL, 2, 15),
('History', 'Democracy', 'Government systems', NULL, 3, 20),
('History', 'Economics', 'How economies work', NULL, 4, 20),
('History', 'Geography', 'World geography', NULL, 5, 25),
('History', 'Cultural Studies', 'Understanding cultures', NULL, 6, 25);

-- Guilds
INSERT INTO guilds (name, description, subject, member_count) VALUES
('Math Masters', 'A community for math enthusiasts', 'Mathematics', 0),
('Science Explorers', 'Discover the wonders of science', 'Science', 0),
('Book Club', 'Love reading? Join us!', 'English', 0),
('History Buffs', 'Explore the past together', 'History', 0),
('General Study Group', 'All subjects welcome', NULL, 0);

-- Badges
INSERT INTO badges (name, description, icon, requirement, xp_reward) VALUES
('First Steps', 'Complete your first skill node', '🎯', 'Complete 1 skill node', 50),
('Streak Starter', 'Maintain a 3-day streak', '🔥', '3-day streak', 100),
('Math Wizard', 'Complete all Math skill nodes', '🧮', 'Complete Math tree', 500),
('Science Star', 'Complete all Science skill nodes', '🔬', 'Complete Science tree', 500),
('Grammar Guru', 'Complete all English skill nodes', '�', 'Complete English tree', 500),
('Time Traveler', 'Complete all History skill nodes', '🏛️', 'Complete History tree', 500),
('Quiz Champion', 'Score 100% on 5 quizzes', '🏆', '5 perfect quizzes', 200),
('Journal Keeper', 'Write 10 journal entries', '📝', '10 journal entries', 150),
('Guild Leader', 'Create a guild', '👑', 'Create guild', 300),
('Focus Master', 'Complete 10 pomodoro sessions', '⏱️', '10 pomodoro sessions', 150);

-- Vault items
INSERT INTO vault_items (name, description, item_type, cost, icon, is_available) VALUES
('Golden Avatar Frame', 'Shiny gold frame for your avatar', 'avatar', 500, '🌟', true),
('Amethyst Theme', 'Beautiful purple theme', 'theme', 300, '💜', true),
('Pro Title', 'Show off your expertise', 'title', 200, '🎓', true),
('Diamond Badge Frame', 'Sparkling diamond frame', 'badge_frame', 400, '💎', true),
('Teal Avatar Frame', 'Cool teal frame for your avatar', 'avatar', 300, '🌊', true),
('Scholar Title', 'Academic excellence title', 'title', 150, '📖', true),
('Night Theme', 'Dark elegant theme', 'theme', 250, '🌙', true),
('Ruby Badge Frame', 'Rich red frame', 'badge_frame', 350, '❤️', true),
('Explorer Avatar', 'Adventure-themed avatar', 'avatar', 450, '🗺️', true),
('Innovator Title', 'Creative problem solver', 'title', 250, '💡', true),
('Sunset Theme', 'Warm sunset colors', 'theme', 200, '🌅', true),
('Emerald Badge Frame', 'Green elegant frame', 'badge_frame', 300, '💚', true);

-- Organizations
INSERT INTO organizations (name, domain, tier, max_students) VALUES
('Springfield High School', 'springfield.edu', 'school', 1000),
('Lincoln Academy', 'lincoln.edu', 'school', 500);

-- Classrooms
INSERT INTO classrooms (organization_id, teacher_id, name, subject, grade) VALUES
((SELECT id FROM organizations WHERE name = 'Springfield High School'), NULL, 'Algebra 101', 'Mathematics', '9'),
((SELECT id FROM organizations WHERE name = 'Springfield High School'), NULL, 'Biology Basics', 'Science', '10'),
((SELECT id FROM organizations WHERE name = 'Lincoln Academy'), NULL, 'English Literature', 'English', '11'),
((SELECT id FROM organizations WHERE name = 'Lincoln Academy'), NULL, 'World History', 'History', '12'),
((SELECT id FROM organizations WHERE name = 'Springfield High School'), NULL, 'Physics Fundamentals', 'Science', '11');

-- Assignments (sample)
INSERT INTO assignments (teacher_id, classroom_id, title, type, due_date) VALUES
(NULL, (SELECT id FROM classrooms WHERE name = 'Algebra 101'), 'Linear Equations Quiz', 'quiz', NOW() + INTERVAL '7 days'),
(NULL, (SELECT id FROM classrooms WHERE name = 'Biology Basics'), 'Cell Structure Flashcards', 'flashcard_deck', NOW() + INTERVAL '5 days'),
(NULL, (SELECT id FROM classrooms WHERE name = 'English Literature'), 'Essay Writing Practice', 'quiz', NOW() + INTERVAL '10 days'),
(NULL, (SELECT id FROM classrooms WHERE name = 'World History'), 'Ancient Rome Flashcards', 'flashcard_deck', NOW() + INTERVAL '6 days'),
(NULL, (SELECT id FROM classrooms WHERE name = 'Physics Fundamentals'), 'Forces Quiz', 'quiz', NOW() + INTERVAL '8 days');

-- Leaderboard opt-ins (sample)
INSERT INTO leaderboard_opt_ins (user_id, display_alias, opted_in) VALUES
('00000000-0000-0000-0000-000000000001', 'MathMaster99', true),
('00000000-0000-0000-0000-000000000002', 'ScienceExplorer', true),
('00000000-0000-0000-0000-000000000003', 'BookWorm42', true);
