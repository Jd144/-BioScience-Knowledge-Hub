/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext.tsx';
import { AuthProvider } from './context/AuthContext.tsx';
import { Navbar } from './components/common/Navbar.tsx';
import { Footer } from './components/common/Footer.tsx';

// Route-level code splitting via dynamic imports (Issue 12)
const HomePage = lazy(() => import('./pages/public/HomePage.tsx').then(m => ({ default: m.HomePage })));
const SubjectsPage = lazy(() => import('./pages/public/SubjectsPage.tsx').then(m => ({ default: m.SubjectsPage })));
const SubjectDetailPage = lazy(() => import('./pages/public/SubjectDetailPage.tsx').then(m => ({ default: m.SubjectDetailPage })));
const TopicDetailPage = lazy(() => import('./pages/public/TopicDetailPage.tsx').then(m => ({ default: m.TopicDetailPage })));
const ExamsPage = lazy(() => import('./pages/public/ExamsPage.tsx').then(m => ({ default: m.ExamsPage })));
const ExamDetailPage = lazy(() => import('./pages/public/ExamDetailPage.tsx').then(m => ({ default: m.ExamDetailPage })));
const LabZonePage = lazy(() => import('./pages/public/LabZonePage.tsx').then(m => ({ default: m.LabZonePage })));
const AboutPage = lazy(() => import('./pages/public/AboutPage.tsx').then(m => ({ default: m.AboutPage })));
const ResourcesPage = lazy(() => import('./pages/public/ResourcesPage.tsx').then(m => ({ default: m.ResourcesPage })));
const PrivacyPolicyPage = lazy(() => import('./pages/public/LegalPages.tsx').then(m => ({ default: m.PrivacyPolicyPage })));
const TermsPage = lazy(() => import('./pages/public/LegalPages.tsx').then(m => ({ default: m.TermsPage })));
const ContactPage = lazy(() => import('./pages/public/LegalPages.tsx').then(m => ({ default: m.ContactPage })));

const JobsPage = lazy(() => import('./pages/public/JobsPage.tsx').then(m => ({ default: m.JobsPage })));
const JobDetailPage = lazy(() => import('./pages/public/JobDetailPage.tsx').then(m => ({ default: m.JobDetailPage })));
const InternshipsPage = lazy(() => import('./pages/public/InternshipsPage.tsx').then(m => ({ default: m.InternshipsPage })));
const InternshipDetailPage = lazy(() => import('./pages/public/InternshipDetailPage.tsx').then(m => ({ default: m.InternshipDetailPage })));
const ScholarshipsAdmissionsPage = lazy(() => import('./pages/public/ScholarshipsAdmissionsPage.tsx').then(m => ({ default: m.ScholarshipsAdmissionsPage })));
const BiotechNewsPage = lazy(() => import('./pages/public/BiotechNewsPage.tsx').then(m => ({ default: m.BiotechNewsPage })));
const ResearchProposalsPage = lazy(() => import('./pages/public/ResearchProposalsPage.tsx').then(m => ({ default: m.ResearchProposalsPage })));
const EventsWorkshopsPage = lazy(() => import('./pages/public/EventsWorkshopsPage.tsx').then(m => ({ default: m.EventsWorkshopsPage })));
const CareerGuidancePage = lazy(() => import('./pages/public/CareerGuidancePage.tsx').then(m => ({ default: m.CareerGuidancePage })));
const ResearchClubsPage = lazy(() => import('./pages/public/ResearchClubsPage.tsx').then(m => ({ default: m.ResearchClubsPage })));
const NewsletterPage = lazy(() => import('./pages/public/NewsletterPage.tsx').then(m => ({ default: m.NewsletterPage })));
const NotFoundPage = lazy(() => import('./pages/public/NotFoundPage.tsx').then(m => ({ default: m.NotFoundPage })));

// Member Portal & Auth Pages
const LoginPage = lazy(() => import('./pages/auth/LoginPage.tsx').then(m => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import('./pages/auth/LoginPage.tsx').then(m => ({ default: m.RegisterPage })));
const OnboardingPage = lazy(() => import('./pages/onboarding/OnboardingPage.tsx').then(m => ({ default: m.OnboardingPage })));
const DashboardPage = lazy(() => import('./pages/dashboard/DashboardPage.tsx').then(m => ({ default: m.DashboardPage })));

function PageLoadingFallback() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8" aria-label="Loading page content">
      <div className="w-10 h-10 border-3 border-cyan-500/30 border-t-cyan-600 rounded-full animate-spin mb-4" />
      <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">Loading Knowledge Hub...</span>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased">
            <Navbar />
            <main className="flex-1">
              <Suspense fallback={<PageLoadingFallback />}>
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

                  {/* Member Portal & Student Account Authentication */}
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/auth/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/auth/register" element={<RegisterPage />} />
                  <Route path="/onboarding" element={<OnboardingPage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />

                  {/* Catch-all 404 Page */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </LanguageProvider>
  );
}
