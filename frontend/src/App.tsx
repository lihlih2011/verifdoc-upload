import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";


import { AuthPage } from "./pages/AuthPage";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";

import Clients from "./pages/Dashboard/Clients";
import Invoices from "./pages/Dashboard/Invoices";
import Finance from "./pages/Dashboard/Finance";
import Tickets from "./pages/Dashboard/Tickets";
import SystemLogs from "./pages/Dashboard/SystemLogs";
import HistoryAdmin from "./pages/Dashboard/HistoryAdmin";
import Webhooks from "./pages/Dashboard/Webhooks";
import { HRTeam, LegalDocs, LiveChat, KnowledgeBase, GpuHealth, AdminSettings, CompliancePage, ApiKeysPage } from "./pages/Dashboard/AdminPlaceholders";

import LandingLayout from "./layout/LandingLayout";
import LandingPageV2 from "./pages/LandingPageV2";
import SimpleLegalPage from "./components/common/SimpleLegalPage";
import { TERMS_OF_SERVICE_CONTENT } from "./data/legalContent";
import CookieBanner from "./components/common/CookieBanner";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import CRM from "./pages/Dashboard/CRM";
import Developer from "./pages/Dashboard/Developer";
import SolutionsPage from "./pages/Landing/SolutionsPage";
import ResourcesPage from "./pages/Landing/ResourcesPage";
import CompanyPage from "./pages/Landing/CompanyPage";
import ContactPage from "./pages/Landing/ContactPage";
import ProDashboard from "./pages/Dashboard/ProDashboard";
import CareersPage from "./pages/Landing/CareersPage";
import PrivacyPolicyPage from "./pages/Landing/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/Landing/TermsOfServicePage";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

export default function App() {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <>
      <Router>
        <CookieBanner />
        <ScrollToTop />
        <Routes>
          {/* Standalone New Landing Page V2 */}
          <Route path="/" element={<LandingPageV2 />} />
          <Route path="/join-us" element={<CareersPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsOfServicePage />} />

          {/* Landing Page Layout for other public pages */}
          <Route element={<LandingLayout />}>
            <Route path="/solutions" element={<SolutionsPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/company" element={<CompanyPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>

          {/* Pages Légales Standalone */}
          <Route path="/cgv" element={
            <SimpleLegalPage
              title="Conditions Générales d'Utilisation"
              updateDate="3 Janvier 2026"
              content={TERMS_OF_SERVICE_CONTENT}
            />
          } />

          <Route path="/mentions-legales" element={
            <SimpleLegalPage
              title="Mentions Légales"
              updateDate="31 Décembre 2025"
              content={
                <>
                  <h3>Éditeur</h3>
                  <p>VerifDoc SAS au capital de 10 000 €<br />RCS Paris B 123 456 789<br />Siège social : 12 Avenue de la République, 75011 Paris</p>
                  <h3>Hébergement</h3>
                  <p>Le site est hébergé par OVH Cloud (Roubaix, France) conformément aux normes SecNumCloud.</p>
                  <h3>Contact</h3>
                  <p>Email : contact@verifdoc.fr</p>
                </>
              }
            />
          } />

          <Route path="/confidentialite" element={
            <SimpleLegalPage
              title="Politique de Confidentialité"
              updateDate="31 Décembre 2025"
              content={
                <>
                  <h3>1. Collecte des données</h3>
                  <p>Nous collectons uniquement les données nécessaires au fonctionnement du service (Logs, Email, Documents soumis).</p>
                  <h3>2. Traitement des documents</h3>
                  <p>Les documents soumis ne sont PAS stockés de manière permanente. Ils sont supprimés immédiatement après analyse, sauf option d'archivage souscrite.</p>
                  <h3>3. Vos droits</h3>
                  <p>Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données.</p>
                </>
              }
            />
          } />



          {/* Dashboard Layout - PROTECTED */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<AppLayout />}>
              <Route index element={<Home />} />
              <Route path="admin" element={<AdminDashboard />} />

              {/* CRM & Sales */}
              <Route path="clients" element={<Clients />} />
              <Route path="prospects" element={<CRM />} />
              <Route path="history" element={<HistoryAdmin />} />

              <Route path="invoices" element={<Invoices />} />

              {/* ERP */}
              <Route path="finance" element={<Finance />} />
              <Route path="team" element={<HRTeam />} />
              <Route path="legal-docs" element={<LegalDocs />} />
              <Route path="compliance" element={<CompliancePage />} />

              {/* SAV */}
              <Route path="tickets" element={<Tickets />} />
              <Route path="chat" element={<LiveChat />} />
              <Route path="kb" element={<KnowledgeBase />} />

              {/* Tech */}
              <Route path="gpu-health" element={<GpuHealth />} />
              <Route path="logs" element={<SystemLogs />} />
              <Route path="developer" element={<Developer />} />
              <Route path="api-keys" element={<ApiKeysPage />} />
              <Route path="webhooks" element={<Webhooks />} />

              {/* Settings */}
              <Route path="settings" element={<AdminSettings />} />

              {/* Legacy (Keep for reference) */}
              <Route path="profile" element={<UserProfiles />} />
              <Route path="calendar" element={<Calendar />} />


              {/* Forms */}
              <Route path="form-elements" element={<FormElements />} />

              {/* Tables */}
              <Route path="basic-tables" element={<BasicTables />} />

              {/* Ui Elements */}
              <Route path="alerts" element={<Alerts />} />
              <Route path="avatars" element={<Avatars />} />
              <Route path="badge" element={<Badges />} />
              <Route path="buttons" element={<Buttons />} />
              <Route path="images" element={<Images />} />
              <Route path="videos" element={<Videos />} />

              {/* Charts */}
              <Route path="line-chart" element={<LineChart />} />
              <Route path="bar-chart" element={<BarChart />} />
            </Route>
          </Route>

          {/* Auth Layout */}
          <Route path="/pro" element={<ProDashboard />} />
          <Route path="/signin" element={<AuthPage />} />
          <Route path="/signup" element={<AuthPage />} />
          <Route path="/login" element={<AuthPage />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
