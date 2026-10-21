-- Seed data for Academica
-- This file populates the database with sample data for development and testing

-- Insert skill nodes (30 nodes across 4 subjects)
INSERT INTO public.skill_nodes (subject, branch, level, title, description, required_xp, position_x, position_y) VALUES
-- Math
('math', 'algebra', 1, 'Variables', 'Learn to use letters to represent numbers', 0, 100, 100),
('math', 'algebra', 2, 'Equations', 'Solve for unknown values', 100, 200, 100),
('math', 'algebra', 3, 'Inequalities', 'Compare values with greater than and less than', 200, 300, 100),
('math', 'geometry', 1, 'Shapes', 'Identify basic geometric shapes', 0, 100, 200),
('math', 'geometry', 2, 'Angles', 'Measure and classify angles', 150, 200, 200),
('math', 'geometry', 3, 'Area', 'Calculate area of rectangles and triangles', 300, 300, 200),
('math', 'calculus', 1, 'Limits', 'Introduction to limits', 500, 400, 100),
('math', 'calculus', 2, 'Derivatives', 'Rate of change', 600, 500, 100),
-- Science
('science', 'physics', 1, 'Motion', 'Speed, velocity, and acceleration', 0, 100, 300),
('science', 'physics', 2, 'Forces', 'Newton''s laws of motion', 200, 200, 300),
('science', 'physics', 3, 'Energy', 'Kinetic and potential energy', 400, 300, 300),
('science', 'chemistry', 1, 'Atoms', 'Structure of atoms', 0, 100, 400),
('science', 'chemistry', 2, 'Elements', 'Periodic table basics', 150, 200, 400),
('science', 'chemistry', 3, 'Reactions', 'Chemical bonding', 300, 300, 400),
('science', 'biology', 1, 'Cells', 'Plant and animal cells', 0, 100, 500),
('science', 'biology', 2, 'Genetics', 'DNA and heredity', 200, 200, 500),
('science', 'biology', 3, 'Ecosystems', 'Food chains and webs', 400, 300, 500),
-- English
('english', 'grammar', 1, 'Nouns', 'People, places, and things', 0, 100, 600),
('english', 'grammar', 2, 'Verbs', 'Action words', 100, 200, 600),
('english', 'grammar', 3, 'Adjectives', 'Describing words', 200, 300, 600),
('english', 'writing', 1, 'Sentences', 'Structure and punctuation', 150, 200, 700),
('english', 'writing', 2, 'Paragraphs', 'Topic sentences and supporting details', 300, 300, 700),
('english', 'writing', 3, 'Essays', 'Introduction, body, conclusion', 450, 400, 700),
('english', 'literature', 1, 'Fiction', 'Stories and novels', 100, 200, 800),
('english', 'literature', 2, 'Poetry', 'Rhyme and meter', 250, 300, 800),
('english', 'literature', 3, 'Drama', 'Plays and scripts', 400, 400, 800),
-- Computer Science
('computer-science', 'programming', 1, 'Variables', 'Storing data', 0, 100, 900),
('computer-science', 'programming', 2, 'Loops', 'Repeating actions', 150, 200, 900),
('computer-science', 'programming', 3, 'Functions', 'Reusable code blocks', 300, 300, 900),
('computer-science', 'algorithms', 1, 'Sorting', 'Organizing data', 200, 400, 900),
('computer-science', 'algorithms', 2, 'Searching', 'Finding data', 350, 500, 900),
('computer-science', 'algorithms', 3, 'Recursion', 'Functions calling themselves', 500, 600, 900);

-- Insert badges (10 badges)
INSERT INTO public.badges (name, description, icon, tier, required_xp) VALUES
('First Steps', 'Complete your first skill node', '🎯', 'bronze', 0),
('Week Warrior', 'Maintain a 7-day streak', '🔥', 'bronze', 100),
('Knowledge Seeker', 'Unlock 10 skill nodes', '📚', 'silver', 500),
('Quiz Master', 'Score 100% on 5 quizzes', '🏆', 'silver', 1000),
('Guild Member', 'Join your first guild', '👥', 'bronze', 0),
('Journal Keeper', 'Write 10 journal entries', '📝', 'silver', 500),
('Focus Champion', 'Complete 50 pomodoro sessions', '⏱️', 'gold', 2000),
('AI Explorer', 'Use AI tutor 50 times', '🤖', 'silver', 1000),
('Community Builder', 'Create a guild', '🏰', 'gold', 3000),
('Master Scholar', 'Complete a full skill tree branch', '🎓', 'platinum', 5000);

-- Insert vault items (12 items)
INSERT INTO public.vault_items (name, description, item_type, cost_xp, rarity) VALUES
('Golden Frame', 'A shiny gold avatar frame', 'avatar_frame', 500, 'rare'),
('Amethyst Frame', 'Purple crystal frame', 'avatar_frame', 750, 'epic'),
('Platinum Frame', 'Ultimate platinum frame', 'avatar_frame', 1000, 'legendary'),
('Starry Night', 'Beautiful starry background', 'background', 300, 'common'),
('Enchanted Forest', 'Magical forest background', 'background', 500, 'rare'),
('Galaxy Nexus', 'Space galaxy background', 'background', 800, 'epic'),
('Ocean Waves', 'Calming ocean background', 'background', 400, 'common'),
('Sparkle Trail', 'Sparkling particle effect', 'effect', 400, 'rare'),
('Rainbow Aura', 'Colorful rainbow effect', 'effect', 600, 'epic'),
('Phoenix Flame', 'Fiery phoenix effect', 'effect', 900, 'legendary'),
('Glow Pulse', 'Pulsing glow effect', 'effect', 300, 'common'),
('Snow Flakes', 'Falling snow effect', 'effect', 350, 'common');

-- Insert guilds (5 guilds)
INSERT INTO public.guilds (name, description, focus_subject, member_count) VALUES
('Math Wizards', 'For those who love numbers and equations', 'math', 150),
('Science Explorers', 'Discover the wonders of the universe', 'science', 200),
('Literary Society', 'Book lovers and writers unite', 'english', 120),
('Code Crusaders', 'Programming enthusiasts', 'computer-science', 180),
('Study Buddies', 'General study group for all subjects', NULL, 300);

-- Insert organizations (2 sample organizations)
INSERT INTO public.organizations (name, type, admin_id, is_active) VALUES
('Lincoln High School', 'school', (SELECT id FROM public.profiles LIMIT 1), true),
('EdTech District', 'district', (SELECT id FROM public.profiles LIMIT 1), true);

-- Insert classrooms (sample classrooms for the organizations)
INSERT INTO public.classrooms (organization_id, name, grade_level, subject, teacher_id) VALUES
((SELECT id FROM public.organizations WHERE name = 'Lincoln High School'), 'Algebra 101', '9', 'math', (SELECT id FROM public.profiles LIMIT 1)),
((SELECT id FROM public.organizations WHERE name = 'Lincoln High School'), 'Physics Lab', '10', 'science', (SELECT id FROM public.profiles LIMIT 1)),
((SELECT id FROM public.organizations WHERE name = 'EdTech District'), 'AP Computer Science', '11', 'computer-science', (SELECT id FROM public.profiles LIMIT 1));

-- Insert sample assignments (5 assignments)
INSERT INTO public.assignments (teacher_id, classroom_id, title, type, due_date) VALUES
((SELECT id FROM public.profiles LIMIT 1), (SELECT id FROM public.classrooms LIMIT 1), 'Algebra Quiz 1', 'quiz', NOW() + INTERVAL '7 days'),
((SELECT id FROM public.profiles LIMIT 1), (SELECT id FROM public.classrooms LIMIT 1), 'Geometry Flashcards', 'flashcard_deck', NOW() + INTERVAL '14 days'),
((SELECT id FROM public.profiles LIMIT 1), (SELECT id FROM public.classrooms LIMIT 1), 'Physics Test', 'quiz', NOW() + INTERVAL '10 days'),
((SELECT id FROM public.profiles LIMIT 1), (SELECT id FROM public.classrooms LIMIT 1), 'Programming Basics', 'flashcard_deck', NOW() + INTERVAL '21 days'),
((SELECT id FROM public.profiles LIMIT 1), (SELECT id FROM public.classrooms LIMIT 1), 'Final Exam', 'quiz', NOW() + INTERVAL '30 days');

-- Insert sample leaderboard opt-ins (3 users)
-- Note: These would be linked to actual user IDs in production
-- For now, this is a template for the structure
-- INSERT INTO public.leaderboard_opt_ins (user_id, display_alias, opted_in) VALUES
-- ('user-id-1', 'MathWizard99', true),
-- ('user-id-2', 'ScienceFan', true),
-- ('user-id-3', 'CodeNinja', true);
