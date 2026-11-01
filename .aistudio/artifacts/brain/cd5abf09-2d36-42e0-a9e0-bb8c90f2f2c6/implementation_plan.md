# BioScience Knowledge Hub — Comprehensive Platform Expansion Blueprint

A comprehensive, production-oriented expansion plan for **BioScience Knowledge Hub** transforming it into an all-encompassing Biotechnology and Life Sciences ecosystem inspired by the information architecture of BioTecNika, while maintaining an original brand identity, strict scientific verification, and zero fabricated content.

> [!IMPORTANT]
> **Governing Design & Ethical Constraints**
> - **100% Public Access**: The platform remains completely accessible to all visitors without any login, signup, or gated dashboards.
> - **Strict Project Independence & Originality**: All code, taxonomies, layout components, and copy are entirely original. No copyrighted articles, images, or branding from BioTecNika or any third party are reproduced.
> - **Zero Fabricated Content**: Every job vacancy, internship, scholarship, admission call, and news update must cite an authentic official organization, verified source link, and explicit deadline/active status. Unverified or expired listings are explicitly badged.
> - **Preservation of Core Assets**: All 11 existing core subjects, the 6 national competitive examinations, and the Lab Zone (18 instruments, protocols, and 9 verified scientific calculators) are preserved and enhanced.

---

## 1. Existing Features & Codebase Audit

### Current Assets & Status
- **Core Curriculum (`src/data/subjectsData.ts`)**:
  - 11 Supported Subjects: Cell Biology, Biochemistry, Genetics, Molecular Biology, Microbiology, Immunology, Genetic Engineering & rDNA, Bioprocess Engineering, Bioinformatics, Plant & Animal Biotechnology, IPR & Biosafety.
  - Deep verified topic: *DNA Replication in Prokaryotes* (detailed mechanisms, definitions, exam points, and references).
- **Competitive Examinations (`src/data/examsData.ts`)**:
  - Exactly 6 National Portals: GAT-B, DBT-JRF/BET, GATE Biotechnology, IIT JAM Biotechnology, CUET-PG Life Sciences, and CSIR-NET Life Sciences.
  - Official conducting bodies, computer-based test (CBT) patterns, marking schemes, section weightages, and strategic preparation blueprints.
- **Laboratory Knowledge Hub (`src/data/labInstrumentsData.ts`, `labProtocolsData.ts`, `calculatorsConfig.ts`)**:
  - 18 Analytical Instruments (Spectroscopy, Centrifugation, Molecular, Imaging, Bioprocess).
  - 2 Verified SOP Protocols (Alkaline Lysis Plasmid Prep & Laemmli SDS-PAGE).
  - 9 Interactive Scientific Calculators with input validation and step-by-step dimensional analysis (Molarity, Normality, Dilution $C_1 V_1 = C_2 V_2$, Percentage $\% w/v$, RPM to RCF, DNA Purity $A_{260}/A_{280}$, Protein Beer-Lambert, Primer MW/$T_m$, and Buffer pH).
- **Navigation & Global Search (`src/components/common/`)**:
  - Top Bar Contract compliant Navbar, Footer with comprehensive academic links, and `SearchModal` (`Cmd+K`).
- **Bilingual Engine (`src/context/LanguageContext.tsx`)**:
  - Dynamic switching between Standard Academic English and Roman-script Hinglish with persistent local preference.

---

## 2. Proposed Final Sitemap (19 Key Sections)

```
/ (Home — Central Multi-Disciplinary Portal)
├── /learn (or /subjects) — Core Academic Encyclopedia
│   ├── /subjects/:slug (Subject Overview, Unit Hierarchy, Learning Objectives, Formulas)
│   └── /subjects/:slug/:topic (Mechanistic Deep Dive, Bilingual Notes, Pathways, References)
├── /jobs — Biotechnology & Life Sciences Employment Hub
│   ├── ?category=govt (Government / PSU / ICMR / DBT / CSIR Labs)
│   ├── ?category=industry (Biopharma, CRO, Diagnostics, Agri-Biotech)
│   ├── ?category=research (JRF, SRF, Project Associates, Postdoc)
│   ├── ?category=freshers (Entry-level openings & trainee roles)
│   └── ?category=bioinformatics (Computational biology, NGS, data science)
├── /internships — Student Research & Industrial Training
│   ├── ?type=iit-iisc-iiser (Premier institute summer/winter research fellowships)
│   ├── ?type=government (CSIR-SRTP, IASc-INSA-NASI, DBT-BIRAC, TIFR VSRP)
│   └── ?type=industry (Biopharmaceutical R&D & QC/QA traineeships)
├── /exams — Competitive Examination Hub (Strictly 6 Portals)
│   ├── /exams/gat-b (Graduate Aptitude Test - Biotechnology)
│   ├── /exams/dbt-jrf (DBT - Junior Research Fellowship / BET)
│   ├── /exams/gate-bt (GATE Biotechnology)
│   ├── /exams/iit-jam (IIT JAM Biotechnology)
│   ├── /exams/cuet-pg (CUET-PG Life Sciences & Biotechnology)
│   └── /exams/csir-net (CSIR-UGC NET Life Sciences)
├── /scholarships — National & International Funding Opportunities
├── /admissions — Ph.D., Integrated M.Sc.-Ph.D. & Postgraduate Admissions
├── /research-opportunities — Research Grants, PI Vacancies & Collaborative Projects
├── /news — Biotechnology News, Regulatory Approvals & Scientific Breakthroughs
├── /research-proposals — Grant Writing Frameworks, DST/DBT/ICMR Scheme Guides
├── /events — Biotechnology Conferences, Symposia & Seminars
├── /workshops — Hands-on Wet-Lab Training, NGS Workshops & Scientific Awards
├── /career-guidance — Career Roadmaps, Industry Transition Guides, Resume & Interview Prep
├── /lab-zone — Laboratory Instruments, Protocols & Calculators
│   ├── /lab-zone/instruments (18 Analytical Instruments Directory)
│   ├── /lab-zone/protocols (Standard Operating Procedures & Troubleshooting)
│   └── /lab-zone/calculators (9 Validated Biophysical Calculators)
├── /resources (or /downloads) — High-Yield Formula Sheets, Syllabus Maps, Quick Reference Guides
├── /research-clubs — Student Journal Clubs, Scientific Discussion Circles & Mentorship
├── /newsletter — Weekly Biotechnology Digest & Alerts
├── /about — Editorial Rigor Standards, Verification Principles & Methodology
├── /contact — Editorial Board, Opportunity Submission & Correction Requests
└── /privacy-policy & /terms — Academic Fair-Use & Privacy Compliance
```

---

## 3. Homepage Wireframe & Section Rhythm

To accommodate this expanded ecosystem without clutter or generic "AI slop," the homepage uses an editorial multi-column rhythm with clear visual anchors:

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│ ZONE 1: BRAND TOP BAR                                                          │
│ [BioScience Knowledge Hub]      [Learn | Jobs | Exams | Lab | More ▾]   [Search ⌘K | EN/HI-EN] │
├─────────────────────────────────────────────────────────────────────────────────┤
│ ZONE 2: CATEGORY QUICK-NAV RIBBON (Single-line horizontal scroller)            │
│ [⚡ Live Alerts] Jobs · Internships · GAT-B · CSIR-NET · Scholarships · Lab Zone · News│
├─────────────────────────────────────────────────────────────────────────────────┤
│ ZONE 3: HERO SECTION WITH DUAL PORTAL SEARCH                                   │
│ "India's Premier Open Biotechnology Knowledge & Opportunity Network"           │
│ Unified search bar: [ Search 11 Subjects, Jobs, 6 Exams, Instruments...       ] │
│ Quick Filter Chips: [ Govt Jobs ] [ CSIR-NET Notes ] [ IIT Internships ] [ Lab Tools ] │
├─────────────────────────────────────────────────────────────────────────────────┤
│ ZONE 4: TRENDING OPPORTUNITY TICKER & HIGH-PRIORITY ALERTS                     │
│ Real-time marquee/strip: Verified application deadlines ending within 14 days   │
├─────────────────────────────────────────────────────────────────────────────────┤
│ ZONE 5: 4-QUADRANT OPPORTUNITY MATRIX (Bento Grid)                             │
│ ┌──────────────────────────────┬──────────────────────────────┐                │
│ │ 🔬 Latest Biotech Jobs       │ 🎓 Research Internships      │                │
│ │ - JRF at NII New Delhi       │ - IIT Bombay Summer Research │                │
│ │ - QA Analyst at Biocon       │ - CSIR-CCMB Traineeship      │                │
│ │ [View All 42 Jobs →]         │ [View All 18 Internships →]  │                │
│ ├──────────────────────────────┼──────────────────────────────┤                │
│ │ 📚 Competitive Exam Alerts   │ 🏛️ Ph.D. & Admissions        │                │
│ │ - GAT-B 2026 Notification    │ - IISc Bangalore Ph.D. Call  │                │
│ │ - CSIR-NET Pattern & Prep    │ - JNU M.Sc. Biotechnology    │                │
│ │ [Open 6 Exam Portals →]      │ [Explore Admissions →]       │                │
│ └──────────────────────────────┴──────────────────────────────┘                │
├─────────────────────────────────────────────────────────────────────────────────┤
│ ZONE 6: CORE KNOWLEDGE BASE (11 Subjects Directory Preview)                    │
│ Cell Biology · Biochemistry · Genetics · Molecular Biology · Bioprocess · etc.│
├─────────────────────────────────────────────────────────────────────────────────┤
│ ZONE 7: VIRTUAL LAB ZONE SPOTLIGHT                                             │
│ 18 Analytical Instruments · Standard Protocols · 9 Interactive Calculators     │
├─────────────────────────────────────────────────────────────────────────────────┤
│ ZONE 8: BIOTECHNOLOGY NEWS & SCIENTIFIC BREAKTHROUGHS                          │
│ Curated updates on biosimilar approvals, recombinant vaccines, CRISPR trials   │
├─────────────────────────────────────────────────────────────────────────────────┤
│ ZONE 9: RESEARCH HUBS & CAREER DEVELOPMENT                                     │
│ Research Proposals & Grants · Student Research Clubs · Career Roadmaps         │
├─────────────────────────────────────────────────────────────────────────────────┤
│ ZONE 10: FREE DOWNLOADS & HIGH-YIELD FORMULA SHEETS                            │
│ Printable PDF-style revision guides, restriction enzyme tables, buffer recipes │
├─────────────────────────────────────────────────────────────────────────────────┤
│ ZONE 11: WEEKLY BIOTECHNOLOGY DIGEST & NEWSLETTER SIGNUP                       │
│ Clean email capture with topic preference checkboxes                           │
├─────────────────────────────────────────────────────────────────────────────────┤
│ ZONE 12: ACADEMIC FOOTER (Comprehensive 4-column directory & disclaimers)      │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Required Database Tables & Schema Extensions

The Supabase PostgreSQL schema (`supabase/migrations/02_opportunities_and_community.sql`) will expand with the following normalized tables:

```sql
-- 1. Biotech & Life Sciences Jobs
CREATE TABLE public.biotech_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  organization TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Government', 'Industry', 'Research Position', 'JRF/SRF', 'Freshers', 'Bioinformatics', 'QC/QA')),
  experience_level TEXT NOT NULL CHECK (experience_level IN ('Entry Level / Freshers', '1-3 Years', '3-5 Years', 'Senior / 5+ Years')),
  location TEXT NOT NULL,
  eligibility TEXT NOT NULL,
  salary_or_stipend TEXT,
  application_deadline DATE,
  official_link TEXT NOT NULL,
  source_citation TEXT NOT NULL,
  is_verified BOOLEAN DEFAULT TRUE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Internships & Summer/Winter Fellowships
CREATE TABLE public.internships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  institution TEXT NOT NULL,
  internship_type TEXT NOT NULL CHECK (internship_type IN ('IIT/IISc/IISER', 'Government National', 'University Research', 'Biotech Industry')),
  duration TEXT NOT NULL,
  stipend_amount TEXT,
  eligibility TEXT NOT NULL,
  deadline DATE NOT NULL,
  official_link TEXT NOT NULL,
  is_verified BOOLEAN DEFAULT TRUE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Scholarships & University Admissions
CREATE TABLE public.scholarships_admissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('Scholarship', 'Ph.D. Admission', 'Master Admission', 'Postdoc Fellowship')),
  issuing_body TEXT NOT NULL,
  funding_amount TEXT,
  eligibility TEXT NOT NULL,
  deadline DATE,
  official_link TEXT NOT NULL,
  is_verified BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Biotechnology News & Regulatory Breakthroughs
CREATE TABLE public.biotech_news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Industry & Biopharma', 'Research Discoveries', 'Regulatory & DCGI/FDA', 'Agri-Biotech', 'Policy & Grants')),
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  source_outlet TEXT NOT NULL,
  source_url TEXT NOT NULL,
  published_date DATE NOT NULL,
  is_verified BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Conferences, Workshops & Research Events
CREATE TABLE public.scientific_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  organizer TEXT NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('National Conference', 'International Symposium', 'Hands-on Workshop', 'Webinar')),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  mode TEXT NOT NULL CHECK (mode IN ('Offline / In-Person', 'Online / Virtual', 'Hybrid')),
  venue_city TEXT,
  registration_deadline DATE,
  official_link TEXT NOT NULL,
  is_verified BOOLEAN DEFAULT TRUE
);

-- 6. Research Proposals & Grant Writing Frameworks
CREATE TABLE public.research_proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scheme_name TEXT NOT NULL,
  funding_agency TEXT NOT NULL CHECK (funding_agency IN ('DBT', 'DST', 'ICMR', 'CSIR', 'SERB', 'BIRAC', 'Wellcome-DBT')),
  target_audience TEXT NOT NULL,
  grant_budget_range TEXT,
  submission_deadline DATE,
  guidelines_summary TEXT NOT NULL,
  official_call_url TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE
);

-- 7. Career Guidance Guides & Roadmaps
CREATE TABLE public.career_guides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  domain TEXT NOT NULL, -- e.g. 'Clinical Research', 'Regulatory Affairs', 'Computational Biology'
  target_qualifications TEXT[],
  salary_range_insight TEXT,
  roadmap_content JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Research Clubs & Scientific Circles
CREATE TABLE public.research_clubs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  focus_area TEXT NOT NULL,
  meeting_format TEXT NOT NULL,
  description TEXT NOT NULL,
  discussion_topics TEXT[],
  participation_guidelines TEXT NOT NULL
);

-- 9. Newsletter Subscriptions
CREATE TABLE public.newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  subscribed_topics TEXT[] DEFAULT ARRAY['All'],
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS: Public Read-Only Security
ALTER TABLE public.biotech_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.internships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scholarships_admissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.biotech_news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scientific_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_clubs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read jobs" ON public.biotech_jobs FOR SELECT USING (true);
CREATE POLICY "Public read internships" ON public.internships FOR SELECT USING (true);
CREATE POLICY "Public read scholarships" ON public.scholarships_admissions FOR SELECT USING (true);
CREATE POLICY "Public read news" ON public.biotech_news FOR SELECT USING (true);
CREATE POLICY "Public read events" ON public.scientific_events FOR SELECT USING (true);
CREATE POLICY "Public read proposals" ON public.research_proposals FOR SELECT USING (true);
CREATE POLICY "Public read career guides" ON public.career_guides FOR SELECT USING (true);
CREATE POLICY "Public read research clubs" ON public.research_clubs FOR SELECT USING (true);
CREATE POLICY "Public subscribe newsletter" ON public.newsletter_subscribers FOR INSERT WITH CHECK (true);
```

---

## 5. Content Publishing & Verification Workflow

To guarantee zero fake vacancies, invented cutoffs, or hallucinated stipends:

```
[Official Notification Source] 
(e.g., DBT / NII / CSIR / IIT / ICMR Gazette or Verified Corporate Careers Portal)
       │
       ▼
[Mandatory Data Extraction Pipeline]
 - Official Title & Reference Notification Number
 - Exact Issuing Organization & Department
 - Eligibility Criteria (Degrees, Gate/NET mandatory status)
 - Explicit Location & Mode (In-person, Online)
 - Exact Stipend/Salary (as stated officially, or labeled "As per institutional norms")
 - True Application Deadline (or "Rolling / Continuous")
 - Official Direct URL (No affiliate links, no third-party mirrors)
       │
       ▼
[Verification Tiering Classification]
 🟢 VERIFIED ACTIVE: Direct link and notification verified within 7 days.
 🟡 UNDER EDITORIAL REVIEW: Newly detected notification awaiting second verification.
 🔴 EXPIRED / ARCHIVED: Application deadline has passed; retained strictly for historical cutoff reference.
       │
       ▼
[Frontend Publication with Expiry Badge]
```

---

## 6. Global Search & Categorical Filtering Architecture

### A. Universal Omnisearch (`Cmd+K`)
Expanded indexing across 6 independent entity collections:
1. Academic Subjects & Subtopics
2. Jobs & Opportunities
3. Internships & Fellowships
4. Competitive Examination Syllabus
5. Laboratory Instruments & Protocols
6. Scientific Calculators

### B. Segmented Filter Controls
Every category page (`/jobs`, `/internships`, `/admissions`, `/news`) incorporates:
- **Category Selector Tabs**: Fast filter by domain (e.g. Govt vs Industry vs JRF).
- **Experience / Qualification Filter**: Class 12, B.Sc., B.Tech, M.Sc., Ph.D.
- **Location Selector**: All India, Delhi NCR, Bengaluru, Hyderabad, Pune, Kolkata, Remote.
- **Active-Only Toggle**: Instantly hide expired deadlines.
- **Sorting Modes**: Deadline Soonest (Urgent), Latest Posted, Highest Stipend.

---

## 7. Reusable Existing Features

The existing codebase provides robust building blocks that will be directly reused:
1. **11 Core Subjects Data (`src/data/subjectsData.ts`)**: Reused as the core of `/learn` and `/subjects`.
2. **6 Examination Portals (`src/data/examsData.ts`)**: Reused as the core of `/exams` and Exam Alerts.
3. **Lab Zone Architecture (`src/data/labInstrumentsData.ts`, `labProtocolsData.ts`, `calculatorsConfig.ts`)**: Completely preserved and linked directly from the top navigation.
4. **Bilingual Engine (`src/context/LanguageContext.tsx`)**: Reused across all educational topics and opportunity summaries.
5. **Interactive Calculator Engine (`src/components/lab/ScientificCalculator.tsx`)**: Completely preserved.
6. **Design System Tokens (`src/index.css`)**: Navy/Slate/Cyan academic palette, custom dark mode variant, and font pairing.

---

## 8. Missing Features & Phased Implementation Roadmap

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│ PHASE A: ARCHITECTURE, SITEMAP & CORE NAVIGATION OVERHAUL                      │
│ - Introduce Category Ribbon & Mega-Menu / Drawer Navigation                     │
│ - Create TypeScript data schemas for Jobs, Internships, News, Grants, Clubs     │
│ - Update App.tsx routing tree with all 19 public route endpoints                │
├─────────────────────────────────────────────────────────────────────────────────┤
│ PHASE B: OPPORTUNITY PORTALS (Jobs, Internships, Scholarships, Admissions)      │
│ - Build /jobs portal with multi-filter bar, search, and verified job cards      │
│ - Build /internships portal (IIT/IISc, CSIR, Biotech Industry training)         │
│ - Build /scholarships & /admissions portals with deadline countdown badges      │
├─────────────────────────────────────────────────────────────────────────────────┤
│ PHASE C: BIOTECH NEWS, RESEARCH PROPOSALS & CONFERENCES                        │
│ - Build /news with category filter (Biopharma, Discoveries, FDA/DCGI)           │
│ - Build /research-proposals with DBT/DST/ICMR grant schemes & guidelines        │
│ - Build /events & /workshops directory with calendar sorting                    │
├─────────────────────────────────────────────────────────────────────────────────┤
│ PHASE D: CAREER GUIDANCE, RESEARCH CLUBS, DOWNLOADS & COMMUNITY                 │
│ - Build /career-guidance with domain career roadmaps & transition tips          │
│ - Build /research-clubs with student journal circles & discussion frameworks    │
│ - Build /resources (Free Downloads) with printable formula & restriction tables │
│ - Build /newsletter subscription form with topic preference selector            │
├─────────────────────────────────────────────────────────────────────────────────┤
│ PHASE E: HOMEPAGE REDESIGN & PRODUCTION OPTIMIZATION                            │
│ - Implement the full 12-zone homepage wireframe                                 │
│ - Integrate universal search indexing across all 19 sections                     │
│ - Mobile, tablet & desktop responsive stress-testing, compilation & lint audit  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 9. Risks, Dependencies & Complexity Estimation

1. **Risk of Stale / Broken External Links**:
   - *Mitigation*: Every opportunity card stores both the direct application URL and the parent institutional website as a fallback. Expired listings are clearly tagged so users never waste time on closed deadlines.
2. **Navigation Cognitive Load (19 Sections)**:
   - *Mitigation*: Do not cram 19 buttons into the top bar. Adhere to the Top Bar Contract with 5 primary pillars (`Learn`, `Jobs & Internships`, `Exams & Admissions`, `Lab Zone`, `Resources`) and a clean dropdown/drawer for secondary sections (`News`, `Events`, `Research Clubs`, `Career Guidance`).
3. **Information Authenticity**:
   - *Mitigation*: Zero AI-synthesized vacancies. Seed listings will strictly reference real, open national calls (e.g. NII New Delhi JRF, IIT Bombay Summer Fellowship, CSIR NET notifications, BIRAC BIG Grants).
4. **Estimated Development Complexity**:
   - **Phase A**: Moderate (~1 turn, routing, navigation, TypeScript types & data stores).
   - **Phase B**: High (~1-2 turns, comprehensive opportunity components, filtering engine).
   - **Phase C & D**: Moderate (~1-2 turns, news, grant frameworks, career guides, clubs).
   - **Phase E**: High (~1 turn, homepage layout integration, universal search, verification).

---

*This blueprint establishes the exact architectural foundation, sitemap, database schema, and phased execution strategy. No source code has been altered. Awaiting your approval before commencing Phase A.*
