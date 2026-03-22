import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Team from './components/Team';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminContacts from './pages/admin/AdminContacts';
import AdminProjects from './pages/admin/AdminProjects';
import AdminTestimonials from './pages/admin/AdminTestimonials';
import AdminTeam from './pages/admin/AdminTeam';
import AdminSettings from './pages/admin/AdminSettings';

// Detect admin mode
const isAdminDomain = () => {
  const host = window.location.hostname;

  // ENV override (useful for testing)
  if (import.meta.env.VITE_ADMIN_MODE === 'true') return true;

  return host.startsWith('admin.');
};

// Public website layout
const HomePage = () => (
  <>
    <Navbar />
    <Hero />
    <Services />
    <About />
    <Portfolio />
    <Team />
    <Testimonials />
    <Contact />
    <Footer />
  </>
);

function App() {
  const adminMode = isAdminDomain();

  // OPTIONAL: redirect /admin → admin subdomain (for production only)
  // if (!adminMode && window.location.pathname.startsWith('/admin')) {
  //   if (!window.location.hostname.includes('localhost')) {
  //     window.location.href = `https://admin.${window.location.host}`;
  //   }
  // }

  return (
    <BrowserRouter>
      <Routes>

        {adminMode ? (
          // ───────── ADMIN SUBDOMAIN (admin.prodivity.in) ─────────
          <>
            <Route path="/" element={<AdminLogin />} />
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/contacts" element={<AdminContacts />} />
            <Route path="/projects" element={<AdminProjects />} />
            <Route path="/testimonials" element={<AdminTestimonials />} />
            <Route path="/team" element={<AdminTeam />} />
            <Route path="/settings" element={<AdminSettings />} />

            {/* If someone types /admin → redirect to root */}
            <Route path="/admin/*" element={<Navigate to="/" replace />} />

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : (
          // ───────── MAIN WEBSITE (prodivity.in / localhost) ─────────
          <>
            {/* Public Website */}
            <Route path="/" element={<HomePage />} />

            {/* Admin fallback via /admin */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/contacts" element={<AdminContacts />} />
            <Route path="/admin/projects" element={<AdminProjects />} />
            <Route path="/admin/testimonials" element={<AdminTestimonials />} />
            <Route path="/admin/team" element={<AdminTeam />} />
            <Route path="/admin/settings" element={<AdminSettings />} />

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}

      </Routes>
    </BrowserRouter>
  );
}

export default App;