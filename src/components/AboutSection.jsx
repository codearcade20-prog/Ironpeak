import React from 'react';
import { Dumbbell, Sparkles, Flame, Shield, ArrowRight } from 'lucide-react';

export default function AboutSection() {
  const pillars = [
    {
      id: 'strength',
      title: 'Heavy Strength Zone',
      desc: 'Olympic platforms, calibrated steel plates, power cages, and dumbbells up to 50kg.',
      icon: Dumbbell,
      tag: 'Strength'
    },
    {
      id: 'beginners',
      title: 'Beginner Guidance',
      desc: 'Complimentary movement screening, posture checks, and friendly trainer support.',
      icon: Sparkles,
      tag: 'All Levels'
    },
    {
      id: 'conditioning',
      title: 'Conditioning Turf',
      desc: 'Sprint turf, magnetic push sleds, air bikes, and high-energy metabolic training.',
      icon: Flame,
      tag: 'Cardio'
    },
    {
      id: 'hygiene',
      title: 'Clean Facility',
      desc: '100% air-conditioned, private changing suites, sanitized lockers, and showers.',
      icon: Shield,
      tag: 'Comfort'
    }
  ];

  return (
    <section id="about" className="about-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <span className="pill-badge">
              <span className="dot"></span>
              <span>About Us</span>
            </span>
          </div>
          <h2>Built for Strength. Open to All.</h2>
          <p>
            RS Puram's dedicated training space combining Olympic-grade gear with personal coaching.
          </p>
        </div>

        {/* 4 Clean Modern Pillar Cards */}
        <div className="pillars-grid">
          {pillars.map((item) => {
            const IconComponent = item.icon;
            return (
              <div key={item.id} className="pillar-card">
                <div className="pillar-top-row">
                  <div className="pillar-icon-box">
                    <IconComponent size={22} />
                  </div>
                  <span className="pillar-badge-tag">{item.tag}</span>
                </div>
                <h3 className="pillar-title">{item.title}</h3>
                <p className="pillar-desc">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Bottom Clean Action Strip */}
        <div className="about-cta-strip">
          <div className="strip-left">
            <h4>Ready to train at IronPeak?</h4>
            <p>Visit our facility on Lake View Road, RS Puram for a free walkthrough.</p>
          </div>
          <a href="#plans" className="btn-primary strip-action-btn">
            <span>View Membership Plans</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </div>

      <style>{`
        .about-section {
          background-color: var(--bg-main, #f8faf9);
          padding: 80px 0;
          border-top: 1px solid var(--border-light, #e5e7eb);
          border-bottom: 1px solid var(--border-light, #e5e7eb);
        }

        .pillars-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 40px;
        }

        .pillar-card {
          background: var(--bg-card);
          border: 1px solid var(--border-card);
          border-radius: 20px;
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          transition: all 0.25s ease;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        }

        .pillar-card:hover {
          transform: translateY(-4px);
          border-color: var(--accent-red);
          box-shadow: 0 12px 32px rgba(255, 42, 95, 0.15);
        }

        .pillar-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .pillar-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: #111315;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pillar-card:hover .pillar-icon-box {
          background: var(--accent-red, #e11d48);
        }

        .pillar-badge-tag {
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--text-muted);
          background: rgba(255,255,255,0.07);
          padding: 4px 10px;
          border-radius: 999px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .pillar-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-main, #111315);
          margin-bottom: 10px;
        }

        .pillar-desc {
          font-size: 0.88rem;
          color: var(--text-muted, #64748b);
          line-height: 1.55;
          margin: 0;
        }

        /* Bottom Action Strip */
        .about-cta-strip {
          background: var(--bg-card);
          border: 1px solid var(--border-card);
          border-radius: 20px;
          padding: 24px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.25);
        }

        .strip-left h4 {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-main, #111315);
          margin-bottom: 4px;
        }

        .strip-left p {
          font-size: 0.85rem;
          color: var(--text-muted, #64748b);
          margin: 0;
        }

        .strip-action-btn {
          padding: 12px 22px;
          font-size: 0.88rem;
          white-space: nowrap;
          flex-shrink: 0;
        }

        @media (max-width: 992px) {
          .pillars-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .about-cta-strip {
            flex-direction: column;
            text-align: center;
          }
        }

        @media (max-width: 600px) {
          .pillars-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
