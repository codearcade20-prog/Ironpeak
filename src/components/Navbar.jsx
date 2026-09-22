import React, { useState, useEffect } from 'react';
import { Phone, ArrowRight, Menu, X, Clock } from 'lucide-react';
import GymLogo from './GymLogo';

export default function Navbar({ onOpenModal, onNavigateAdmin }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`nav-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        {/* Brand Logo */}
        <a href="#home" className="brand-logo">
          <GymLogo size={36} glow={true} />
          <div className="brand-text-group">
            <span className="brand-name">IronPeak</span>
            <span className="brand-sub">FITNESS</span>
          </div>
        </a>

        {/* Floating Pill Nav Menu (Reference Style) */}
        <nav className="nav-pill-desktop">
          <a href="#plans" className="nav-link">Plans & Pricing</a>
          <a href="#calculator" className="nav-link">BMI Tool</a>
          <a href="#contact" className="nav-link">Contact</a>
        </nav>

        {/* Right CTA Area */}
        <div className="nav-actions-desktop">
          <a href="tel:+919876543210" className="nav-contact-link">
            <Phone size={15} />
            <span>+91 98765 43210</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <nav className="mobile-nav-links">
            <a href="#plans" onClick={() => setMobileMenuOpen(false)}>Plans & Pricing</a>
            <a href="#calculator" onClick={() => setMobileMenuOpen(false)}>BMI Calculator</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact & Location</a>
          </nav>
          <div className="mobile-drawer-footer">
            <a href="tel:+919876543210" className="mobile-phone-cta">
              <Phone size={16} />
              <span>+91 98765 43210</span>
            </a>
          </div>
        </div>
      )}

      <style>{`
        .nav-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 18px 0;
          transition: all 0.3s ease;
          background: rgba(12, 14, 18, 0.75);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .nav-header.scrolled {
          padding: 12px 0;
          background: rgba(12, 14, 18, 0.94);
          box-shadow: 0 4px 25px rgba(0, 0, 0, 0.5);
          border-bottom: 1px solid rgba(255, 255, 255, 0.09);
        }

        .nav-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .brand-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }

        .brand-text-group {
          display: flex;
          flex-direction: column;
        }

        .brand-name {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.15rem;
          color: var(--text-main);
          letter-spacing: -0.02em;
          line-height: 1.1;
        }

        .brand-sub {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: var(--accent-red, #ff2a5f);
        }

        /* Pill Navigation (Exact reference look in dark) */
        .nav-pill-desktop {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.05);
          padding: 6px 10px;
          border-radius: var(--radius-full);
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .nav-link {
          padding: 7px 16px;
          border-radius: var(--radius-full);
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-muted);
          transition: all 0.2s ease;
        }

        .nav-link:hover {
          color: #ffffff;
          background-color: rgba(255, 255, 255, 0.1);
        }

        .nav-actions-desktop {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .nav-link-highlight {
          color: var(--accent-red) !important;
          font-weight: 700;
        }

        .nav-admin-link {
          font-family: monospace;
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--text-muted);
          background: #f1f3f2;
          padding: 5px 10px;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-light);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .nav-admin-link:hover {
          color: var(--text-main);
          border-color: var(--border-light);
          background: rgba(255,255,255,0.08);
        }

        .nav-contact-link {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-main);
          padding: 8px 12px;
          border-radius: var(--radius-full);
          transition: background-color 0.2s ease;
        }

        .nav-contact-link:hover {
          background-color: var(--bg-muted);
        }

        .nav-cta-btn {
          padding: 10px 20px;
          font-size: 0.875rem;
        }

        .mobile-toggle {
          display: none;
          background: none;
          border: none;
          color: var(--text-main);
          padding: 6px;
        }

        .mobile-drawer {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: rgba(12, 14, 18, 0.97);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          padding: 20px 24px;
          border-bottom: 1px solid var(--border-card);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .mobile-nav-links {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .mobile-nav-links a {
          padding: 10px 14px;
          border-radius: 8px;
          font-weight: 600;
          color: var(--text-main);
        }

        .mobile-nav-links a:hover {
          background-color: var(--bg-muted);
        }

        .mobile-drawer-footer {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding-top: 12px;
          border-top: 1px solid var(--border-light);
        }

        .mobile-phone-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-weight: 600;
          font-size: 0.95rem;
          padding: 10px;
        }

        .full-width {
          width: 100%;
        }

        @media (max-width: 992px) {
          .nav-pill-desktop,
          .nav-actions-desktop {
            display: none;
          }
          .mobile-toggle {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      `}</style>
    </header>
  );
}
