import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminContacts from './pages/admin/AdminContacts';
import AdminProjects from './pages/admin/AdminProjects';

// Detect if this is an admin subdomain (e.g. admin.prodivity.tech or admin-prodivity.vercel.app)
const isAdminDomain = () => {
  const host = window.location.hostname;
  return host.startsWith('admin.') || host.startsWith('admin-');
};

// Main public website
const HomePage = () => (
  <>
    <Navbar />
    <Hero />
    <Services />
    <About />
    <Portfolio />
    <Testimonials />
    <Contact />
    <Footer />
  </>
);

function App() {
  const adminDomain = isAdminDomain();

  return (
    <BrowserRouter>
      <Routes>
        {adminDomain ? (
          // ── Admin subdomain only (admin.yourdomain.com) ──
          <>
            <Route path="/" element={<AdminLogin />} />
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/contacts" element={<AdminContacts />} />
            <Route path="/projects" element={<AdminProjects />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : (
          // ── Public website only — no admin routes ──
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;