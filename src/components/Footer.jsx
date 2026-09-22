import React from 'react';
import { Phone, Mail, MapPin, Clock, ArrowUp } from 'lucide-react';
import GymLogo from './GymLogo';

export default function Footer({ onNavigateAdmin }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top-grid">
          {/* Brand Info */}
          <div className="footer-brand-col">
            <div className="footer-logo">
              <GymLogo size={36} glow={true} />
              <div>
                <span className="footer-brand-name">IronPeak</span>
                <span className="footer-brand-sub">FITNESS</span>
              </div>
            </div>
            <p className="footer-tagline">Build Strength. Build Confidence.</p>
            <p className="footer-about">
              Strength training and fitness in RS Puram, Coimbatore.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Navigation</h4>
            <ul className="footer-links">
              <li><a href="#home">Overview</a></li>
              <li><a href="#plans">Memberships & Pricing</a></li>
              <li><a href="#apply">Apply for Membership</a></li>
              <li><a href="#schedule">Operating Timings</a></li>
              <li><a href="#calculator">BMI Calculator</a></li>
              <li>
                <button 
                  onClick={onNavigateAdmin} 
                  style={{ background: 'none', border: 'none', color: '#e11d48', cursor: 'pointer', padding: 0, fontSize: '0.85rem', fontWeight: 600 }}
                >
                  🔐 Desk Admin (/admin)
                </button>
              </li>
            </ul>
          </div>

          {/* Plans Summary */}
          <div className="footer-col">
            <h4 className="footer-heading">Membership Tiers</h4>
            <ul className="footer-links">
              <li><span>Basic (1 Month) — ₹999</span></li>
              <li><span>Standard (3 Months) — ₹2,499</span></li>
              <li><span>Premium (6 Months) — ₹4,499</span></li>
              <li><span>Annual (12 Months) — ₹7,999</span></li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="footer-col">
            <h4 className="footer-heading">RS Puram Facility</h4>
            <div className="footer-contact-items">
              <p className="contact-line">
                <MapPin size={16} className="f-icon" />
                <span>24, Lake View Road, RS Puram, Coimbatore, TN – 641002</span>
              </p>
              <p className="contact-line">
                <Phone size={16} className="f-icon" />
                <a href="tel:+919876543210">+91 98765 43210</a>
              </p>
              <p className="contact-line">
                <Mail size={16} className="f-icon" />
                <a href="mailto:hello@ironpeakfitness.in">hello@ironpeakfitness.in</a>
              </p>
              <p className="contact-line">
                <Clock size={16} className="f-icon" />
                <span>Mon–Sat: 5:30 AM–10 PM | Sun: 6 AM–1 PM</span>
              </p>
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <p>© {new Date().getFullYear()} IronPeak Fitness. All rights reserved. Built with pride in Coimbatore.</p>
          <button onClick={scrollToTop} className="back-to-top-btn" aria-label="Scroll to top">
            <span>Back to top</span>
            <ArrowUp size={15} />
          </button>
        </div>
      </div>

      <style>{`
        .site-footer {
          background-color: var(--bg-dark);
          color: #d1ded8;
          padding: 80px 0 30px 0;
          border-top: 1px solid var(--border-dark);
        }

        .footer-top-grid {
          display: grid;
          grid-template-columns: 1.4fr 0.8fr 1fr 1.2fr;
          gap: 40px;
          margin-bottom: 60px;
        }

        .footer-brand-col {
          display: flex;
          flex-direction: column;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }

        .footer-icon-box {
          width: 38px;
          height: 38px;
          background: rgba(255,255,255,0.1);
          color: #ffffff;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .footer-brand-name {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 800;
          color: #ffffff;
          display: block;
          line-height: 1;
        }

        .footer-brand-sub {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: var(--accent-green);
        }

        .footer-tagline {
          font-size: 0.95rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 8px;
        }

        .footer-about {
          font-size: 0.85rem;
          color: #9cb0a6;
          line-height: 1.6;
          max-width: 320px;
        }

        .footer-heading {
          font-size: 0.95rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 18px;
          letter-spacing: -0.01em;
        }

        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .footer-links a,
        .footer-links span {
          font-size: 0.85rem;
          color: #9cb0a6;
          transition: color 0.2s ease;
        }

        .footer-links a:hover {
          color: #ffffff;
        }

        .footer-contact-items {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .contact-line {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.85rem;
          color: #9cb0a6;
          line-height: 1.45;
        }

        .contact-line a {
          color: #d1ded8;
        }

        .contact-line a:hover {
          color: #ffffff;
        }

        .f-icon {
          color: var(--accent-green);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .footer-bottom-bar {
          padding-top: 24px;
          border-top: 1px solid var(--border-dark);
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.8rem;
          color: #7d9188;
        }

        .back-to-top-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #9cb0a6;
          font-size: 0.8rem;
          font-weight: 600;
          background: rgba(255, 255, 255, 0.05);
          padding: 6px 14px;
          border-radius: var(--radius-full);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .back-to-top-btn:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.1);
        }

        @media (max-width: 992px) {
          .footer-top-grid {
            grid-template-columns: 1fr 1fr;
            gap: 30px;
          }
        }

        @media (max-width: 600px) {
          .footer-top-grid {
            grid-template-columns: 1fr;
          }
          .footer-bottom-bar {
            flex-direction: column;
            gap: 14px;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
