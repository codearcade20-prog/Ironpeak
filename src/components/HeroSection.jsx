import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, MapPin, Sparkles, Dumbbell, Star, Flame, Trophy } from 'lucide-react';

export default function HeroSection({ onOpenModal }) {
  return (
    <section id="home" className="hero-section">
      <div className="container hero-container">
        {/* Left Column (High Impact Athletic Typography & CTAs) */}
        <div className="hero-content">
          <div className="pill-badge hero-badge">
            <span className="dot"></span>
            <span>RS Puram • Coimbatore</span>
          </div>

          <h1 className="hero-title">
            Build Strength.<br />
            <span className="hero-title-accent">Build Confidence.</span>
          </h1>

          <p className="hero-description">
            Modern strength training and certified coaching in RS Puram. Designed for every fitness level.
          </p>

          <div className="hero-cta-group">
            <a 
              href="#apply"
              className="btn-primary hero-btn-main"
            >
              <span>Join Now</span>
              <ArrowRight size={18} />
            </a>
            <a href="#plans" className="btn-secondary hero-btn-sub">
              <span>View Plans</span>
            </a>
          </div>

          {/* Bottom Metric Row */}
          <div className="hero-stats-row">
            <div className="stat-item">
              <span className="stat-value">₹999</span>
              <span className="stat-label">From / Month</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">5:30 AM</span>
              <span className="stat-label">Opens Daily</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">4.9 ★</span>
              <span className="stat-label">Member Rating</span>
            </div>
          </div>
        </div>

        {/* Right Column: Clean Cinematic Gym Visual */}
        <div className="hero-showcase">
          <div className="premium-equipment-frame">
            <div className="image-wrapper">
              <img 
                src="/images/ironpeak_hero_gym.jpg" 
                alt="IronPeak Fitness luxury gym floor in RS Puram" 
                className="hero-gym-img"
              />
              <div className="image-vignette-overlay"></div>
            </div>

            {/* Single Elegant Location Chip */}
            <div className="floating-location-tag">
              <MapPin size={13} className="pin-icon" />
              <span>RS Puram, Coimbatore</span>
            </div>
          </div>

          {/* Ambient Glow Aura */}
          <div className="hero-ambient-glow"></div>
        </div>
      </div>


      <style>{`
        .hero-section {
          padding-top: 130px;
          padding-bottom: 50px;
          position: relative;
          overflow: hidden;
        }

        .hero-container {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 50px;
          align-items: center;
          margin-bottom: 50px;
        }

        .hero-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .hero-badge {
          margin-bottom: 22px;
        }

        .hero-title {
          font-size: 3.8rem;
          color: var(--text-main);
          line-height: 1.08;
          font-weight: 800;
          letter-spacing: -0.035em;
          margin-bottom: 22px;
        }

        .hero-title-accent {
          color: var(--accent-red);
          position: relative;
          display: inline-block;
        }

        .hero-title-accent::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 6px;
          width: 100%;
          height: 12px;
          background-color: rgba(255, 42, 95, 0.16);
          z-index: -1;
          border-radius: 4px;
        }

        .hero-description {
          font-size: 1.1rem;
          line-height: 1.65;
          color: var(--text-muted);
          max-width: 530px;
          margin-bottom: 32px;
        }

        .hero-cta-group {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 46px;
        }

        .hero-btn-main {
          padding: 15px 30px;
          font-size: 1rem;
        }

        .hero-btn-sub {
          padding: 15px 28px;
          font-size: 1rem;
        }

        /* Stats Row */
        .hero-stats-row {
          display: flex;
          align-items: flex-start;
          gap: 36px;
          padding-top: 24px;
          border-top: 1px solid var(--border-light);
          width: 100%;
          max-width: 550px;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
        }

        .stat-value {
          font-family: var(--font-heading);
          font-size: 1.75rem;
          font-weight: 800;
          color: var(--text-main);
          letter-spacing: -0.02em;
          line-height: 1.1;
        }

        .stat-label {
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 500;
          margin-top: 4px;
        }

        /* Right Column: Mass Premium Luxury Frame */
        .hero-showcase {
          position: relative;
          display: flex;
          justify-content: center;
        }

        .premium-equipment-frame {
          position: relative;
          width: 100%;
          max-width: 500px;
          border-radius: 28px;
          overflow: hidden;
          border: 1px solid rgba(17, 19, 21, 0.12);
          box-shadow: 0 24px 60px -15px rgba(17, 19, 21, 0.22), 0 10px 25px -5px rgba(225, 29, 72, 0.15);
          background-color: #0f1115;
          z-index: 2;
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }

        .premium-equipment-frame:hover {
          transform: translateY(-4px);
          box-shadow: 0 30px 70px -15px rgba(17, 19, 21, 0.28), 0 14px 30px -5px rgba(225, 29, 72, 0.25);
        }

        .image-wrapper {
          position: relative;
          width: 100%;
          height: 480px;
          overflow: hidden;
        }

        .hero-gym-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .premium-equipment-frame:hover .hero-gym-img {
          transform: scale(1.03);
        }

        .image-vignette-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(15, 17, 21, 0.4) 0%,
            transparent 35%,
            rgba(15, 17, 21, 0.85) 85%,
            rgba(15, 17, 21, 0.98) 100%
          );
        }

        /* Floating Top Badges */
        .floating-equipment-tag {
          position: absolute;
          top: 18px;
          left: 18px;
          background: rgba(17, 19, 21, 0.75);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.18);
          color: #ffffff;
          padding: 7px 14px;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.78rem;
          font-weight: 700;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
          z-index: 4;
        }

        .live-pulse-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: var(--accent-red);
          box-shadow: 0 0 0 3px rgba(225, 29, 72, 0.4);
          animation: pulseRed 2s infinite;
        }

        @keyframes pulseRed {
          0% { box-shadow: 0 0 0 0 rgba(225, 29, 72, 0.6); }
          70% { box-shadow: 0 0 0 6px rgba(225, 29, 72, 0); }
          100% { box-shadow: 0 0 0 0 rgba(225, 29, 72, 0); }
        }

        .tag-icon {
          color: var(--accent-red);
        }

        .floating-location-tag {
          position: absolute;
          top: 18px;
          right: 18px;
          background: rgba(12, 14, 18, 0.82);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.18);
          color: #ffffff;
          padding: 6px 13px;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.76rem;
          font-weight: 700;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.35);
          z-index: 4;
        }

        .pin-icon {
          color: var(--accent-red);
        }

        /* Ambient Glow */
        .hero-ambient-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(225, 29, 72, 0.12) 0%, transparent 65%);
          z-index: 1;
          pointer-events: none;
        }

        @media (max-width: 992px) {
          .hero-container {
            grid-template-columns: 1fr;
            gap: 50px;
          }
          .hero-title {
            font-size: 3rem;
          }
          .premium-equipment-frame {
            max-width: 100%;
          }
          .image-wrapper {
            height: 420px;
          }
        }

        @media (max-width: 600px) {
          .hero-title {
            font-size: 2.35rem;
          }
          .hero-stats-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
          }
          .hero-cta-group {
            flex-direction: column;
            width: 100%;
          }
          .hero-btn-main, .hero-btn-sub {
            width: 100%;
          }
          .image-wrapper {
            height: 380px;
          }
          .floating-glass-action-card {
            flex-direction: column;
            gap: 12px;
            align-items: stretch;
            text-align: center;
          }
          .glass-price-row {
            justify-content: center;
          }
          .glass-specs-hint {
            justify-content: center;
          }
          .glass-action-btn {
            justify-content: center;
          }
          .strip-brands {
            flex-wrap: nowrap;
          }
        }
      `}</style>
    </section>
  );
}
