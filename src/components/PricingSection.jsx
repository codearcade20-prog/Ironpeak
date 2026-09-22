import React, { useState } from 'react';
import { Check, Zap, Sparkles, Star, ShieldCheck, ArrowRight } from 'lucide-react';

export default function PricingSection({ onOpenModal }) {
  const [selectedPlanId, setSelectedPlanId] = useState('standard');

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      duration: '1 Month',
      price: '999',
      numericPrice: 999,
      effective: '₹999 / mo',
      badge: null,
      features: [
        'Full gym & free weights access',
        'Lockers & shower usage',
        'Trainer floor support'
      ],
      popular: false
    },
    {
      id: 'standard',
      name: 'Standard',
      duration: '3 Months',
      price: '2,499',
      numericPrice: 2499,
      effective: '₹833 / mo',
      badge: 'Most Popular',
      features: [
        'Everything in Basic',
        'Custom workout plan',
        'Body composition scan',
        'Starter diet guidance'
      ],
      popular: true
    },
    {
      id: 'premium',
      name: 'Premium',
      duration: '6 Months',
      price: '4,499',
      numericPrice: 4499,
      effective: '₹750 / mo',
      badge: 'Best Results',
      features: [
        'Everything in Standard',
        'Bi-weekly coach audits',
        'Nutrition consultation',
        '2 Free guest passes'
      ],
      popular: false
    },
    {
      id: 'annual',
      name: 'Annual',
      duration: '12 Months',
      price: '7,999',
      numericPrice: 7999,
      effective: '₹666 / mo',
      badge: 'Best Value',
      features: [
        'Unlimited 365-day access',
        'Dedicated locker option',
        '4 Free guest passes',
        '1-Month travel freeze'
      ],
      popular: false
    }
  ];

  return (
    <section id="plans" className="pricing-section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <span className="pill-badge">
              <span className="dot"></span>
              <span>Membership Plans</span>
            </span>
          </div>
          <h2>Transparent Pricing</h2>
          <p>
            No hidden charges or admission fees. Select your plan below.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="pricing-grid">
          {plans.map((p) => {
            const isSelected = selectedPlanId === p.id;
            return (
              <div 
                key={p.id}
                onClick={() => setSelectedPlanId(p.id)}
                className={`pricing-card ${p.popular ? 'popular' : ''} ${isSelected ? 'selected' : ''}`}
              >
                {/* Badge if available */}
                {p.badge && (
                  <div className={`plan-badge-pill ${p.popular ? 'popular-pill' : 'value-pill'}`}>
                    {p.popular ? <Zap size={13} fill="currentColor" /> : <Sparkles size={13} />}
                    <span>{p.badge}</span>
                  </div>
                )}

                <div className="plan-top-info">
                  <div className="plan-name-wrap">
                    <h3 className="plan-title">{p.name}</h3>
                    <span className="plan-duration-badge">{p.duration}</span>
                  </div>
                </div>

                <div className="plan-price-block">
                  <div className="main-price">
                    <span className="currency">₹</span>
                    <span className="amount">{p.price}</span>
                  </div>
                  <div className="effective-rate">{p.effective}</div>
                </div>

                <div className="plan-features-list">
                  {p.features.map((feat, idx) => (
                    <div key={idx} className="feature-item">
                      <div className="feature-check">
                        <Check size={13} strokeWidth={3} />
                      </div>
                      <span className="feature-text">{feat}</span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenModal(p.name);
                  }}
                  className={`plan-cta-btn ${p.popular ? 'btn-popular' : 'btn-normal'}`}
                >
                  <span>Select Plan</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Clean 3-Item Assurance Bar */}
        <div className="pricing-reassurance-card">
          <div className="reassurance-item">
            <ShieldCheck size={18} className="reassurance-icon" />
            <div>
              <strong>No Hidden Charges</strong>
              <p>Maintenance & admission included</p>
            </div>
          </div>
          <div className="reassurance-item">
            <Star size={18} className="reassurance-icon" />
            <div>
              <strong>Free 1-Day Pass</strong>
              <p>Try the floor before joining</p>
            </div>
          </div>
          <div className="reassurance-item">
            <Zap size={18} className="reassurance-icon" />
            <div>
              <strong>Instant Entry</strong>
              <p>RFID access upon sign up</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .pricing-section {
          background-color: var(--bg-main);
          position: relative;
        }

        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 48px;
        }

        .pricing-card {
          background: var(--bg-card);
          border-radius: var(--radius-xl);
          border: 1px solid var(--border-card);
          padding: 30px 24px;
          display: flex;
          flex-direction: column;
          position: relative;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .pricing-card:hover {
          transform: translateY(-6px);
          border-color: rgba(255, 42, 95, 0.5);
          box-shadow: 0 16px 36px rgba(255, 42, 95, 0.18);
        }

        .pricing-card.popular {
          border-color: var(--accent-red);
          box-shadow: 0 0 25px rgba(255, 42, 95, 0.15);
        }

        .pricing-card.selected {
          border-color: var(--accent-red);
          outline: 2px solid var(--accent-red);
        }

        .plan-badge-pill {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 14px;
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.03em;
          white-space: nowrap;
        }

        .popular-pill {
          background: linear-gradient(135deg, #ff2a5f, #be123c);
          color: #ffffff;
          box-shadow: 0 4px 14px rgba(255, 42, 95, 0.4);
        }

        .value-pill {
          background-color: rgba(255, 255, 255, 0.12);
          color: #ffffff;
        }

        .plan-top-info {
          margin-bottom: 20px;
        }

        .plan-name-wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .plan-title {
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--text-main);
        }

        .plan-duration-badge {
          font-size: 0.75rem;
          font-weight: 700;
          background: rgba(255, 255, 255, 0.08);
          color: var(--text-muted);
          padding: 3px 10px;
          border-radius: var(--radius-full);
        }

        .plan-desc {
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.5;
          min-height: 50px;
        }

        .plan-price-block {
          padding: 16px 0;
          border-top: 1px solid var(--border-light);
          border-bottom: 1px solid var(--border-light);
          margin-bottom: 24px;
        }

        .main-price {
          display: flex;
          align-items: baseline;
          color: var(--text-main);
        }

        .currency {
          font-size: 1.25rem;
          font-weight: 700;
          margin-right: 2px;
        }

        .amount {
          font-family: var(--font-heading);
          font-size: 2.25rem;
          font-weight: 800;
          letter-spacing: -0.03em;
        }

        .effective-rate {
          font-size: 0.78rem;
          color: var(--accent-green);
          font-weight: 700;
          margin-top: 4px;
        }

        .plan-features-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 30px;
          flex-grow: 1;
        }

        .features-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-light);
          font-weight: 700;
          margin-bottom: 4px;
        }

        .feature-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }

        .feature-check {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background-color: var(--accent-green-bg);
          color: var(--accent-green);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 2px;
          flex-shrink: 0;
        }

        .feature-text {
          font-size: 0.84rem;
          color: var(--text-main);
          line-height: 1.45;
        }

        .plan-cta-btn {
          width: 100%;
          padding: 13px;
          border-radius: var(--radius-full);
          font-size: 0.9rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.25s ease;
        }

        .btn-popular {
          background: linear-gradient(135deg, #ff2a5f, #e11d48);
          color: #ffffff;
          box-shadow: 0 4px 18px rgba(255, 42, 95, 0.4);
        }

        .btn-popular:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 8px 24px rgba(255, 42, 95, 0.6);
        }

        .btn-normal {
          background-color: rgba(255, 255, 255, 0.06);
          color: var(--text-main);
          border: 1px solid var(--border-light);
        }

        .btn-normal:hover {
          background-color: rgba(255, 255, 255, 0.14);
          color: #ffffff;
          border-color: rgba(255, 255, 255, 0.25);
          transform: translateY(-2px);
        }

        /* Reassurance Card */
        .pricing-reassurance-card {
          background: var(--bg-card);
          border: 1px solid var(--border-card);
          border-radius: var(--radius-lg);
          padding: 24px 36px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          box-shadow: var(--shadow-sm);
        }

        .reassurance-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }

        .reassurance-icon {
          color: var(--accent-green);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .reassurance-item strong {
          display: block;
          font-size: 0.95rem;
          color: var(--text-main);
          margin-bottom: 2px;
        }

        .reassurance-item p {
          font-size: 0.825rem;
          color: var(--text-muted);
          line-height: 1.4;
        }

        @media (max-width: 1100px) {
          .pricing-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }
        }

        @media (max-width: 650px) {
          .pricing-grid {
            grid-template-columns: 1fr;
          }
          .pricing-reassurance-card {
            grid-template-columns: 1fr;
            gap: 20px;
            padding: 20px;
          }
        }
      `}</style>
    </section>
  );
}
