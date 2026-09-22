import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import PricingSection from './components/PricingSection';
import ApplySection from './components/ApplySection';
import ScheduleSection from './components/ScheduleSection';
import BmiCalculator from './components/BmiCalculator';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import TrialModal from './components/TrialModal';
import AdminPage from './components/AdminPage';
import GymChatbot from './components/GymChatbot';
import LoadingSplashScreen from './components/LoadingSplashScreen';

export default function App() {
  const [isAdminRoute, setIsAdminRoute] = useState(() => {
    return window.location.pathname.startsWith('/admin') || window.location.hash.startsWith('#/admin');
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('Standard');
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Handle URL changes & back/forward buttons
  useEffect(() => {
    const handleLocationChange = () => {
      const isPathAdmin = window.location.pathname.startsWith('/admin');
      const isHashAdmin = window.location.hash.startsWith('#/admin');
      setIsAdminRoute(isPathAdmin || isHashAdmin);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateToAdmin = () => {
    window.history.pushState({}, '', '/admin');
    setIsAdminRoute(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToSite = () => {
    window.history.pushState({}, '', '/');
    setIsAdminRoute(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenModal = (plan = 'Standard') => {
    setSelectedPlan(plan);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // If on /admin route, render Admin Dashboard
  if (isAdminRoute) {
    return <AdminPage onBackToSite={navigateToSite} />;
  }

  // Public User-Facing Gym Website
  return (
    <div className="ironpeak-app">
      <Navbar 
        onOpenModal={handleOpenModal} 
        onNavigateAdmin={navigateToAdmin} 
      />
      <main>
        {/* 1. Home / Intro */}
        <HeroSection onOpenModal={handleOpenModal} />
        
        {/* About */}
        <AboutSection />
        
        {/* 2. Membership Plans */}
        <PricingSection onOpenModal={handleOpenModal} />
        
        {/* 3 & 4. Apply for Membership (with Success State) */}
        <ApplySection preselectedPlan={selectedPlan} />
        
        {/* Opening Hours & Schedule */}
        <ScheduleSection />
        
        {/* BMI Calculator */}
        <BmiCalculator onOpenModal={handleOpenModal} />
        
        {/* Contact & Map */}
        <ContactSection />
      </main>
      
      <Footer onNavigateAdmin={navigateToAdmin} />

      {/* Quick Application Modal */}
      <TrialModal 
        isOpen={modalOpen} 
        onClose={handleCloseModal} 
        defaultPlan={selectedPlan} 
      />

      {/* Floating Friendly Chatbot */}
      <GymChatbot />

      {/* Loading Flash Screen for Site Launch & Transitions */}
      <LoadingSplashScreen 
        show={initialLoading} 
        title="IRONPEAK" 
        subtitle="INITIALIZING ATHLETIC CLUB..." 
      />
    </div>
  );
}
