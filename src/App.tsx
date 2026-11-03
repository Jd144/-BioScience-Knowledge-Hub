/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext.tsx';
import { AuthProvider } from './context/AuthContext.tsx';
import { AdminAuthProvider } from './context/AdminAuthContext.tsx';
import { MaintenanceProvider, useMaintenance } from './context/MaintenanceContext.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';
import { Navbar } from './components/common/Navbar.tsx';
import { Footer } from './components/common/Footer.tsx';
import { PublicSettingsModal } from './components/common/PublicSettingsModal.tsx';
import { WebsitePopupRenderer } from './components/common/WebsitePopupRenderer.tsx';
import { AdminProtectedRoute } from './components/admin/AdminProtectedRoute.tsx';

// Route-level code splitting via dynamic imports
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

// Public Maintenance Page
const MaintenancePage = lazy(() => import('./pages/public/MaintenancePage.tsx').then(m => ({ default: m.MaintenancePage })));

// Member Portal & Auth Pages
const LoginPage = lazy(() => import('./pages/auth/LoginPage.tsx').then(m => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import('./pages/auth/LoginPage.tsx').then(m => ({ default: m.RegisterPage })));
const OnboardingPage = lazy(() => import('./pages/onboarding/OnboardingPage.tsx').then(m => ({ default: m.OnboardingPage })));
const DashboardPage = lazy(() => import('./pages/dashboard/DashboardPage.tsx').then(m => ({ default: m.DashboardPage })));

// Admin Pages
const AdminLoginPage = lazy(() => import('./pages/admin/AdminLoginPage.tsx').then(m => ({ default: m.AdminLoginPage })));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout.tsx').then(m => ({ default: m.AdminLayout })));
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage.tsx').then(m => ({ default: m.AdminDashboardPage })));
const AdminAiControlCenterPage = lazy(() => import('./pages/admin/AdminAiControlCenterPage.tsx').then(m => ({ default: m.AdminAiControlCenterPage })));
const AdminMaintenancePage = lazy(() => import('./pages/admin/AdminMaintenancePage.tsx').then(m => ({ default: m.AdminMaintenancePage })));
const AdminPopupsPage = lazy(() => import('./pages/admin/AdminPopupsPage.tsx').then(m => ({ default: m.AdminPopupsPage })));
const AdminSubjectsTopicsPage = lazy(() => import('./pages/admin/AdminSubjectsTopicsPage.tsx').then(m => ({ default: m.AdminSubjectsTopicsPage })));
const AdminArticlesPage = lazy(() => import('./pages/admin/AdminArticlesPage.tsx').then(m => ({ default: m.AdminArticlesPage })));
const AdminExamsPage = lazy(() => import('./pages/admin/AdminExamsPage.tsx').then(m => ({ default: m.AdminExamsPage })));
const AdminOpportunitiesPage = lazy(() => import('./pages/admin/AdminOpportunitiesPage.tsx').then(m => ({ default: m.AdminOpportunitiesPage })));
const AdminLabZonePage = lazy(() => import('./pages/admin/AdminLabZonePage.tsx').then(m => ({ default: m.AdminLabZonePage })));
const AdminNewsEventsPage = lazy(() => import('./pages/admin/AdminNewsEventsPage.tsx').then(m => ({ default: m.AdminNewsEventsPage })));
const AdminMediaPage = lazy(() => import('./pages/admin/AdminMediaPage.tsx').then(m => ({ default: m.AdminMediaPage })));
const AdminEcosystemPage = lazy(() => import('./pages/admin/AdminEcosystemPage.tsx').then(m => ({ default: m.AdminEcosystemPage })));
const AdminContactNewsletterPage = lazy(() => import('./pages/admin/AdminContactNewsletterPage.tsx').then(m => ({ default: m.AdminContactNewsletterPage })));
const AdminSeoSettingsPage = lazy(() => import('./pages/admin/AdminSeoSettingsPage.tsx').then(m => ({ default: m.AdminSeoSettingsPage })));
const AdminSettingsPage = lazy(() => import('./pages/admin/AdminSettingsPage.tsx').then(m => ({ default: m.AdminSettingsPage })));
const AdminUsersAuditPage = lazy(() => import('./pages/admin/AdminUsersAuditPage.tsx').then(m => ({ default: m.AdminUsersAuditPage })));

function PageLoadingFallback() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 font-serif" aria-label="Loading page content">
      <div className="w-10 h-10 border-3 border-cyan-500/30 border-t-cyan-600 rounded-full animate-spin mb-4" />
      <span className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Loading BioScience Hub...</span>
    </div>
  );
}

function AppContent() {
  const { isMaintenanceActive, loading: maintenanceLoading } = useMaintenance();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  // Gating check for maintenance mode:
  // If maintenance is enabled AND user is NOT on an admin route, show the Public Maintenance Page
  if (!maintenanceLoading && isMaintenanceActive && !isAdmin) {
    return (
      <Suspense fallback={<PageLoadingFallback />}>
        <MaintenancePage />
      </Suspense>
    );
  }

  // Admin Routes (Isolated layout, no public navbar or footer)
  if (isAdmin) {
    return (
      <Suspense fallback={<PageLoadingFallback />}>
        <Routes>
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin"
            element={
              <AdminProtectedRoute>
                <AdminLayout />
              </AdminProtectedRoute>
            }
          >
            <Route index element={<AdminDashboardPage />} />
            <Route path="ai" element={<AdminAiControlCenterPage />} />
            <Route path="maintenance" element={<AdminMaintenancePage />} />
            <Route path="popups" element={<AdminPopupsPage />} />
            <Route path="subjects" element={<AdminSubjectsTopicsPage />} />
            <Route path="articles" element={<AdminArticlesPage />} />
            <Route path="exams" element={<AdminExamsPage />} />
            <Route path="opportunities" element={<AdminOpportunitiesPage />} />
            <Route path="lab-zone" element={<AdminLabZonePage />} />
            <Route path="news-events" element={<AdminNewsEventsPage />} />
            <Route path="media" element={<AdminMediaPage />} />
            <Route path="ecosystem" element={<AdminEcosystemPage />} />
            <Route path="contacts" element={<AdminContactNewsletterPage />} />
            <Route path="seo" element={<AdminSeoSettingsPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
            <Route path="users" element={<AdminUsersAuditPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </Suspense>
    );
  }

  // Standard Public Website Layout
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased font-serif transition-colors overflow-x-hidden max-w-full w-full">
      <WebsitePopupRenderer />
      <PublicSettingsModal />
      <Navbar />
      <main className="flex-1 overflow-x-hidden max-w-full w-full">
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

            {/* Member Portal (Optional) */}
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
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <AdminAuthProvider>
            <MaintenanceProvider>
              <BrowserRouter>
                <AppContent />
              </BrowserRouter>
            </MaintenanceProvider>
          </AdminAuthProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
