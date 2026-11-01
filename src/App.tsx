/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext.tsx';
import { Navbar } from './components/common/Navbar.tsx';
import { Footer } from './components/common/Footer.tsx';

// Public Pages
import { HomePage } from './pages/public/HomePage.tsx';
import { SubjectsPage } from './pages/public/SubjectsPage.tsx';
import { SubjectDetailPage } from './pages/public/SubjectDetailPage.tsx';
import { TopicDetailPage } from './pages/public/TopicDetailPage.tsx';
import { ExamsPage } from './pages/public/ExamsPage.tsx';
import { ExamDetailPage } from './pages/public/ExamDetailPage.tsx';
import { LabZonePage } from './pages/public/LabZonePage.tsx';
import { AboutPage } from './pages/public/AboutPage.tsx';
import { ResourcesPage } from './pages/public/ResourcesPage.tsx';
import { PrivacyPolicyPage, TermsPage, ContactPage } from './pages/public/LegalPages.tsx';

// Expanded BioScience Hub Opportunity & Community Pages
import { JobsPage } from './pages/public/JobsPage.tsx';
import { JobDetailPage } from './pages/public/JobDetailPage.tsx';
import { InternshipsPage } from './pages/public/InternshipsPage.tsx';
import { InternshipDetailPage } from './pages/public/InternshipDetailPage.tsx';
import { ScholarshipsAdmissionsPage } from './pages/public/ScholarshipsAdmissionsPage.tsx';
import { BiotechNewsPage } from './pages/public/BiotechNewsPage.tsx';
import { ResearchProposalsPage } from './pages/public/ResearchProposalsPage.tsx';
import { EventsWorkshopsPage } from './pages/public/EventsWorkshopsPage.tsx';
import { CareerGuidancePage } from './pages/public/CareerGuidancePage.tsx';
import { ResearchClubsPage } from './pages/public/ResearchClubsPage.tsx';
import { NewsletterPage } from './pages/public/NewsletterPage.tsx';
import { NotFoundPage } from './pages/public/NotFoundPage.tsx';

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased">
          <Navbar />
          <main className="flex-1">
            <Routes>
              {/* 1. Home */}
              <Route path="/" element={<HomePage />} />

              {/* 2. Learn (11 Core Subjects) */}
              <Route path="/subjects" element={<SubjectsPage />} />
              <Route path="/subjects/:slug" element={<SubjectDetailPage />} />
              <Route path="/subjects/:slug/:topic" element={<TopicDetailPage />} />

              {/* 3. Jobs */}
              <Route path="/jobs" element={<JobsPage />} />
              <Route path="/jobs/:slug" element={<JobDetailPage />} />

              {/* 4. Internships */}
              <Route path="/internships" element={<InternshipsPage />} />
              <Route path="/internships/:slug" element={<InternshipDetailPage />} />

              {/* 5. Exam Alerts (6 Competitive Portals) */}
              <Route path="/exams" element={<ExamsPage />} />
              <Route path="/exams/:code" element={<ExamDetailPage />} />

              {/* 6 & 7. Scholarships & Admissions */}
              <Route path="/scholarships" element={<ScholarshipsAdmissionsPage />} />
              <Route path="/admissions" element={<ScholarshipsAdmissionsPage />} />

              {/* 8 & 10. Research Opportunities & Proposals */}
              <Route path="/research-opportunities" element={<ResearchProposalsPage />} />
              <Route path="/research-proposals" element={<ResearchProposalsPage />} />

              {/* 9. Biotechnology News */}
              <Route path="/news" element={<BiotechNewsPage />} />

              {/* 11 & 12. Conferences, Events, Awards & Workshops */}
              <Route path="/events" element={<EventsWorkshopsPage />} />
              <Route path="/workshops" element={<EventsWorkshopsPage />} />

              {/* 13. Career Guidance */}
              <Route path="/career-guidance" element={<CareerGuidancePage />} />

              {/* 14. Lab Zone (Instruments, Protocols, Calculators) */}
              <Route path="/lab-zone" element={<LabZonePage />} />
              <Route path="/lab-zone/instruments" element={<LabZonePage />} />
              <Route path="/lab-zone/protocols" element={<LabZonePage />} />
              <Route path="/lab-zone/calculators" element={<LabZonePage />} />

              {/* 15. Free Downloads */}
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/downloads" element={<ResourcesPage />} />

              {/* 16. Research Clubs */}
              <Route path="/research-clubs" element={<ResearchClubsPage />} />

              {/* 17. Newsletter */}
              <Route path="/newsletter" element={<NewsletterPage />} />

              {/* 18 & 19. About & Contact */}
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms" element={<TermsPage />} />

              {/* Deferred Auth routes safely redirected to public hub */}
              <Route path="/auth/*" element={<Navigate to="/subjects" replace />} />
              <Route path="/onboarding" element={<Navigate to="/subjects" replace />} />
              <Route path="/dashboard" element={<Navigate to="/subjects" replace />} />

              {/* Catch-all 404 Page */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}
