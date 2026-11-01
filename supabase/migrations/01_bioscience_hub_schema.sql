-- ==============================================================================
-- BioScience Knowledge Hub — Database Schema Migration
-- Target: Supabase PostgreSQL with Row Level Security (RLS)
-- Version: 1.0.0
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  preferred_language TEXT DEFAULT 'en' CHECK (preferred_language IN ('en', 'hinglish')),
  state TEXT,
  city TEXT,
  education_level TEXT,
  college TEXT,
  current_year TEXT,
  graduation_year INT,
  onboarding_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. User Roles Table
CREATE TABLE IF NOT EXISTS public.user_roles (
  user_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'content_editor', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Core Subjects Table (11 Supported Subjects)
CREATE TABLE IF NOT EXISTS public.subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name_en TEXT NOT NULL,
  name_hinglish TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_hinglish TEXT NOT NULL,
  order_index INT NOT NULL,
  icon_name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Subject Units
CREATE TABLE IF NOT EXISTS public.subject_units (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  title_en TEXT NOT NULL,
  title_hinglish TEXT NOT NULL,
  order_index INT NOT NULL
);

-- 5. Chapters
CREATE TABLE IF NOT EXISTS public.chapters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  unit_id UUID NOT NULL REFERENCES public.subject_units(id) ON DELETE CASCADE,
  title_en TEXT NOT NULL,
  title_hinglish TEXT NOT NULL,
  order_index INT NOT NULL
);

-- 6. Topics
CREATE TABLE IF NOT EXISTS public.topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_id UUID NOT NULL REFERENCES public.chapters(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  title_en TEXT NOT NULL,
  title_hinglish TEXT NOT NULL,
  difficulty TEXT CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
  estimated_read_time_min INT DEFAULT 10,
  content_en JSONB NOT NULL,
  content_hinglish JSONB,
  references JSONB DEFAULT '[]'::jsonb,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(chapter_id, slug)
);

-- 7. Competitive Examinations Table (6 Supported)
CREATE TABLE IF NOT EXISTS public.examinations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL, -- 'GAT-B', 'DBT-JRF', 'GATE-BT', 'IIT-JAM', 'CUET-PG', 'CSIR-NET'
  name_en TEXT NOT NULL,
  official_website TEXT NOT NULL,
  eligibility_summary TEXT NOT NULL,
  exam_pattern JSONB NOT NULL,
  syllabus_mapping JSONB NOT NULL,
  last_verified_date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Student Exam Preferences
CREATE TABLE IF NOT EXISTS public.student_exam_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  exam_code TEXT NOT NULL REFERENCES public.examinations(code) ON DELETE CASCADE,
  target_year INT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, exam_code)
);

-- 9. Laboratory Instruments (18 instruments)
CREATE TABLE IF NOT EXISTS public.instruments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name_en TEXT NOT NULL,
  name_hinglish TEXT NOT NULL,
  principle_en TEXT NOT NULL,
  principle_hinglish TEXT,
  components JSONB NOT NULL,
  working_mechanism JSONB NOT NULL,
  applications JSONB NOT NULL,
  advantages JSONB NOT NULL,
  limitations JSONB NOT NULL,
  precautions JSONB NOT NULL,
  references JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Laboratory Protocols
CREATE TABLE IF NOT EXISTS public.laboratory_protocols (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title_en TEXT NOT NULL,
  title_hinglish TEXT,
  objective TEXT NOT NULL,
  principle TEXT NOT NULL,
  materials JSONB NOT NULL,
  reagents JSONB NOT NULL,
  procedure JSONB NOT NULL,
  calculations JSONB NOT NULL,
  troubleshooting JSONB NOT NULL,
  safety_precautions JSONB NOT NULL,
  references JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Practice Engine: MCQs & PYQs
CREATE TABLE IF NOT EXISTS public.mcq_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id UUID REFERENCES public.subjects(id) ON DELETE SET NULL,
  topic_id UUID REFERENCES public.topics(id) ON DELETE SET NULL,
  exam_code TEXT REFERENCES public.examinations(code) ON DELETE SET NULL,
  question_en TEXT NOT NULL,
  question_hinglish TEXT,
  options JSONB NOT NULL,
  correct_option_index INT NOT NULL,
  explanation_en TEXT NOT NULL,
  explanation_hinglish TEXT,
  difficulty TEXT CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  source_citation TEXT NOT NULL,
  verified_status BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. Student Progress & Activity Tracking
CREATE TABLE IF NOT EXISTS public.student_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  topic_id UUID REFERENCES public.topics(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT FALSE,
  last_accessed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, topic_id)
);

CREATE TABLE IF NOT EXISTS public.student_bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('topic', 'instrument', 'protocol', 'mcq', 'resource')),
  entity_id TEXT NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, entity_type, entity_id)
);

-- ==============================================================================
-- Row Level Security (RLS) Policies
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_exam_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_bookmarks ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subject_units ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.examinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.instruments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.laboratory_protocols ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mcq_questions ENABLE ROW LEVEL SECURITY;

-- User Specific Policies
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can manage own preferences" ON public.student_exam_preferences FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own progress" ON public.student_progress FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own bookmarks" ON public.student_bookmarks FOR ALL USING (auth.uid() = user_id);

-- Public Educational Content Policies
CREATE POLICY "Public subjects viewable" ON public.subjects FOR SELECT USING (true);
CREATE POLICY "Public subject_units viewable" ON public.subject_units FOR SELECT USING (true);
CREATE POLICY "Public chapters viewable" ON public.chapters FOR SELECT USING (true);
CREATE POLICY "Public topics viewable" ON public.topics FOR SELECT USING (is_published = true);
CREATE POLICY "Public examinations viewable" ON public.examinations FOR SELECT USING (true);
CREATE POLICY "Public instruments viewable" ON public.instruments FOR SELECT USING (true);
CREATE POLICY "Public protocols viewable" ON public.laboratory_protocols FOR SELECT USING (true);
CREATE POLICY "Public mcqs viewable" ON public.mcq_questions FOR SELECT USING (verified_status = true);
