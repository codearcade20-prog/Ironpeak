import React, { useState } from 'react';
import { Send, CheckCircle2, User, Phone, Calendar, Dumbbell, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';
import { submitMembershipApplication } from '../lib/supabase';

export default function ApplySection({ preselectedPlan = 'Standard' }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    age: '',
    plan_name: preselectedPlan,
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [lastSubmission, setLastSubmission] = useState(null);

  // Keep plan updated if passed as prop
  React.useEffect(() => {
    if (preselectedPlan) {
      setFormData(prev => ({ ...prev, plan_name: preselectedPlan }));
    }
  }, [preselectedPlan]);

  const plansList = [
    { name: 'Basic', duration: '1 Month', price: '₹999' },
    { name: 'Standard', duration: '3 Months', price: '₹2,499', popular: true },
    { name: 'Premium', duration: '6 Months', price: '₹4,499' },
    { name: 'Annual', duration: '12 Months', price: '₹7,999' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setLoading(true);
    try {
      const res = await submitMembershipApplication({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        age: formData.age ? parseInt(formData.age, 10) : null,
        plan_name: formData.plan_name,
        message: formData.message.trim()
      });

      setLastSubmission(res.data);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
      age: '',
      plan_name: 'Standard',
      message: ''
    });
    setSubmitted(false);
  };

  return (
    <section id="apply" className="apply-section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <span className="pill-badge">
              <span className="dot"></span>
              <span>Register</span>
            </span>
          </div>
          <h2>Apply for Membership</h2>
          <p>
            Fill out the form below to secure your admission.
          </p>
        </div>

        <div className="apply-card-container">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="apply-form-card">
              {/* Step 1: Choose Plan */}
              <div className="form-field-group">
                <label className="field-group-label">
                  <span>Select Plan *</span>
                </label>
                <div className="plan-selection-cards">
                  {plansList.map((p) => (
                    <div
                      key={p.name}
                      onClick={() => setFormData({ ...formData, plan_name: p.name })}
                      className={`plan-select-tile ${formData.plan_name === p.name ? 'active' : ''}`}
                    >
                      <div className="tile-top">
                        <strong className="tile-name">{p.name}</strong>
                        {p.popular && <span className="tile-popular-badge">Popular</span>}
                      </div>
                      <span className="tile-price">{p.price}</span>
                      <span className="tile-duration">{p.duration}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 2: Personal Details */}
              <div className="form-grid-two">
                <div className="form-input-block">
                  <label htmlFor="applicant-name">Full Name *</label>
                  <div className="input-with-icon">
                    <User size={16} className="input-icon" />
                    <input
                      id="applicant-name"
                      type="text"
                      required
                      placeholder="e.g. Arun Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-input-block">
                  <label htmlFor="applicant-phone">Phone Number (10 Digits) *</label>
                  <div className="input-with-icon">
                    <Phone size={16} className="input-icon" />
                    <input
                      id="applicant-phone"
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="form-grid-two">
                <div className="form-input-block">
                  <label htmlFor="applicant-age">Age (Optional)</label>
                  <div className="input-with-icon">
                    <Calendar size={16} className="input-icon" />
                    <input
                      id="applicant-age"
                      type="number"
                      min="14"
                      max="90"
                      placeholder="e.g. 24"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-input-block">
                  <label htmlFor="applicant-message">Note (Optional)</label>
                  <div className="input-with-icon">
                    <MessageSquare size={16} className="input-icon" />
                    <input
                      id="applicant-message"
                      type="text"
                      placeholder="Any specific goals or questions"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary submit-app-btn"
              >
                <span>{loading ? 'Submitting...' : 'Submit Application'}</span>
                <ArrowRight size={18} />
              </button>
            </form>
          ) : (
            <div className="apply-success-card">
              <div className="success-badge-circle">
                <CheckCircle2 size={54} />
              </div>
              <h3 className="success-headline">Your membership application has been submitted successfully.</h3>
              <p className="success-detail-text">
                Welcome to IronPeak Fitness! We have registered your application for the <strong>{lastSubmission?.plan_name || formData.plan_name} Plan</strong>.
              </p>

              <div className="success-applicant-receipt">
                <div className="receipt-row">
                  <span className="receipt-label">Applicant Name</span>
                  <strong className="receipt-val">{lastSubmission?.name || formData.name}</strong>
                </div>
                <div className="receipt-row">
                  <span className="receipt-label">Phone</span>
                  <strong className="receipt-val">{lastSubmission?.phone || formData.phone}</strong>
                </div>
                {formData.age && (
                  <div className="receipt-row">
                    <span className="receipt-label">Age</span>
                    <strong className="receipt-val">{formData.age} years</strong>
                  </div>
                )}
                <div className="receipt-row">
                  <span className="receipt-label">Selected Tier</span>
                  <strong className="receipt-val red-text">{lastSubmission?.plan_name || formData.plan_name} Plan</strong>
                </div>
                <div className="receipt-row">
                  <span className="receipt-label">Desk Status</span>
                  <span className="status-pill-receipt">Call Later (Pending Contact)</span>
                </div>
              </div>

              <p className="visit-prompt">
                📍 <strong>Next Step:</strong> Visit us at <strong>24, Lake View Road, RS Puram, Coimbatore</strong> anytime between 5:30 AM – 10:00 PM with your phone number to collect your member pass.
              </p>

              <div className="success-actions">
                <button onClick={handleReset} className="btn-secondary">
                  Submit Another Application
                </button>
                <a href="#schedule" className="btn-primary">
                  View Opening Hours
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .apply-section {
          background-color: var(--bg-main);
          border-top: 1px solid var(--border-light);
          padding: 80px 0;
        }

        .apply-card-container {
          max-width: 740px;
          margin: 0 auto;
        }

        .apply-form-card {
          background: var(--bg-card);
          border: 1px solid var(--border-card);
          border-radius: var(--radius-xl);
          padding: 40px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.35);
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .form-header-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border-light);
        }

        .form-step-pill {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--accent-red);
          background-color: var(--accent-red-bg);
          padding: 5px 14px;
          border-radius: var(--radius-full);
        }

        .form-guarantee-pill {
          font-size: 0.78rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .field-group-label {
          display: flex;
          flex-direction: column;
          margin-bottom: 12px;
          font-size: 0.95rem;
          font-weight: 800;
          color: var(--text-main);
        }

        .sub-label {
          font-size: 0.78rem;
          font-weight: 500;
          color: var(--text-muted);
          margin-top: 2px;
        }

        .plan-selection-cards {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
        }

        .plan-select-tile {
          border: 1px solid var(--border-card);
          border-radius: var(--radius-md);
          padding: 14px 10px;
          background-color: rgba(255,255,255,0.04);
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
        }

        .plan-select-tile:hover {
          border-color: var(--border-light);
          background-color: rgba(255,255,255,0.07);
          transform: translateY(-2px);
        }

        .plan-select-tile.active {
          border-color: var(--accent-red);
          background-color: rgba(255, 42, 95, 0.1);
          box-shadow: 0 4px 14px rgba(255, 42, 95, 0.2);
        }

        .tile-top {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-bottom: 4px;
        }

        .tile-name {
          font-size: 0.85rem;
          color: var(--text-main);
        }

        .tile-popular-badge {
          font-size: 0.6rem;
          font-weight: 700;
          background: var(--accent-red);
          color: #ffffff;
          padding: 1px 6px;
          border-radius: var(--radius-full);
        }

        .tile-price {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--text-main);
          margin-bottom: 2px;
        }

        .plan-select-tile.active .tile-price {
          color: var(--accent-red);
        }

        .tile-duration {
          font-size: 0.72rem;
          color: var(--text-muted);
        }

        .form-grid-two {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .form-input-block {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-input-block label {
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--text-main);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .optional-tag {
          font-weight: 500;
          font-size: 0.72rem;
          color: var(--text-light);
        }

        .input-with-icon {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 14px;
          color: var(--text-light);
          pointer-events: none;
        }

        .input-with-icon input,
        .timing-select {
          width: 100%;
          padding: 12px 14px 12px 40px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-card);
          background-color: rgba(255,255,255,0.05);
          font-family: var(--font-body);
          font-size: 0.9rem;
          color: var(--text-main);
          outline: none;
          transition: all 0.2s ease;
        }

        .timing-select {
          padding-left: 14px;
        }

        .input-with-icon input:focus,
        .timing-select:focus,
        .textarea-wrap textarea:focus {
          border-color: var(--accent-red);
          background-color: rgba(255,255,255,0.07);
          box-shadow: 0 0 0 3px rgba(255, 42, 95, 0.12);
        }

        .textarea-wrap {
          align-items: flex-start;
        }

        .textarea-icon {
          top: 14px;
        }

        .textarea-wrap textarea {
          width: 100%;
          padding: 12px 14px 12px 40px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-card);
          background-color: rgba(255,255,255,0.05);
          font-family: var(--font-body);
          font-size: 0.9rem;
          color: var(--text-main);
          outline: none;
          resize: vertical;
        }

        .submit-app-btn {
          width: 100%;
          padding: 15px;
          font-size: 1rem;
          margin-top: 8px;
        }

        .form-trust-note {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .trust-icon {
          color: var(--accent-red);
        }

        /* Success Card */
        .apply-success-card {
          background: var(--bg-card);
          border: 1px solid var(--border-card);
          border-radius: var(--radius-xl);
          padding: 50px 40px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          box-shadow: 0 8px 32px rgba(0,0,0,0.35);
        }

        .success-badge-circle {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background-color: var(--accent-red-bg);
          color: var(--accent-red);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 22px;
        }

        .success-headline {
          font-size: 1.85rem;
          color: var(--text-main);
          font-weight: 800;
          margin-bottom: 12px;
          max-width: 580px;
          line-height: 1.2;
        }

        .success-detail-text {
          font-size: 1.05rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 28px;
          max-width: 540px;
        }

        .success-applicant-receipt {
          width: 100%;
          max-width: 480px;
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--border-card);
          border-radius: var(--radius-lg);
          padding: 20px 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 24px;
        }

        .receipt-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.88rem;
        }

        .receipt-label {
          color: var(--text-muted);
        }

        .receipt-val {
          color: var(--text-main);
        }

        .receipt-val.red-text {
          color: var(--accent-red);
        }

        .status-pill-receipt {
          background-color: rgba(255, 42, 95, 0.12);
          color: var(--accent-red);
          padding: 3px 10px;
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          font-weight: 700;
        }

        .visit-prompt {
          font-size: 0.9rem;
          color: var(--text-muted);
          max-width: 520px;
          line-height: 1.5;
          margin-bottom: 30px;
        }

        .success-actions {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        @media (max-width: 700px) {
          .apply-form-card {
            padding: 24px;
          }
          .plan-selection-cards {
            grid-template-columns: repeat(2, 1fr);
          }
          .form-grid-two {
            grid-template-columns: 1fr;
          }
          .apply-success-card {
            padding: 30px 20px;
          }
          .success-headline {
            font-size: 1.5rem;
          }
          .success-actions {
            flex-direction: column;
            width: 100%;
          }
          .success-actions button,
          .success-actions a {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
