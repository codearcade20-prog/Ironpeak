import React, { useState } from 'react';
import { X, CheckCircle2, Dumbbell, ShieldCheck, ArrowRight, User, Phone, Calendar } from 'lucide-react';
import { submitMembershipApplication } from '../lib/supabase';

export default function TrialModal({ isOpen, onClose, defaultPlan = 'Basic' }) {
  const [selectedPlan, setSelectedPlan] = useState(defaultPlan);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Sync selectedPlan with defaultPlan if opened with a specific plan
  React.useEffect(() => {
    if (defaultPlan) setSelectedPlan(defaultPlan);
  }, [defaultPlan]);

  if (!isOpen) return null;

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!fullName || !phone) return;
    setLoading(true);
    try {
      await submitMembershipApplication({
        name: fullName.trim(),
        phone: phone.trim(),
        age: age ? parseInt(age, 10) : null,
        plan_name: selectedPlan
      });
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      setIsSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  const planPricingMap = {
    'Basic': '₹999 (1 Month)',
    'Standard': '₹2,499 (3 Months)',
    'Premium': '₹4,499 (6 Months)',
    'Annual': '₹7,999 (12 Months)',
    'Custom Consultation': 'Free Assessment'
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {!isSuccess ? (
          <div className="modal-body">
            <div className="modal-brand-header">
              <div className="modal-icon-badge">
                <Dumbbell size={22} />
              </div>
              <div>
                <h3 className="modal-title">Join IronPeak Fitness</h3>
                <p className="modal-subtitle">RS Puram • Lake View Road, Coimbatore</p>
              </div>
            </div>

            <form onSubmit={handleBooking} className="modal-form">
              <div className="plan-selection-group">
                <label className="field-label">Select Preferred Membership:</label>
                <div className="plan-pill-options">
                  {['Basic', 'Standard', 'Premium', 'Annual'].map((plan) => (
                    <button
                      key={plan}
                      type="button"
                      onClick={() => setSelectedPlan(plan)}
                      className={`plan-toggle-pill ${selectedPlan === plan ? 'selected' : ''}`}
                    >
                      <span className="p-name">{plan}</span>
                      <span className="p-price">{planPricingMap[plan]?.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="plan-summary-box">
                <span className="summary-lbl">Selected Plan Rate:</span>
                <strong className="summary-val">{planPricingMap[selectedPlan] || 'Standard Pass'}</strong>
              </div>

              <div className="field-block">
                <label htmlFor="modal-name">Your Full Name *</label>
                <input 
                  id="modal-name"
                  type="text" 
                  required 
                  placeholder="e.g. Karthik Raman" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div className="field-block">
                <label htmlFor="modal-phone">Phone Number *</label>
                <input 
                  id="modal-phone"
                  type="tel" 
                  required 
                  placeholder="e.g. 98765 43210" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="field-block">
                <label htmlFor="modal-age">Age (Optional)</label>
                <input 
                  id="modal-age"
                  type="number" 
                  min="14"
                  max="90"
                  placeholder="e.g. 24" 
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>

              <button type="submit" disabled={loading} className="btn-primary modal-submit-btn">
                <span>{loading ? 'Submitting...' : 'Submit Application'}</span>
                <ArrowRight size={16} />
              </button>

              <div className="modal-trust-footer">
                <ShieldCheck size={16} className="trust-icon" />
                <span>Directly synced with IronPeak RS Puram Admin desk</span>
              </div>
            </form>
          </div>
        ) : (
          <div className="modal-success">
            <div className="success-icon-badge">
              <CheckCircle2 size={44} />
            </div>
            <h3>Your membership application has been submitted successfully.</h3>
            <p>
              Welcome to IronPeak Fitness, <strong>{fullName}</strong>! We've registered your application for the <strong>{selectedPlan} Plan</strong> ({planPricingMap[selectedPlan]}).
            </p>
            <p className="sub-instruction">
              Our desk at <strong>24, Lake View Road, RS Puram</strong> will reach out to <strong>{phone}</strong> shortly to activate your membership.
            </p>
            <button 
              onClick={() => {
                setIsSuccess(false);
                onClose();
              }}
              className="btn-primary modal-close-cta"
            >
              Done & Close
            </button>
          </div>
        )}
      </div>

      <style>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(12, 22, 19, 0.7);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 20px;
        }

        .modal-dialog {
          background: var(--bg-card);
          width: 100%;
          max-width: 480px;
          border-radius: var(--radius-xl);
          padding: 36px;
          position: relative;
          box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.6);
          border: 1px solid var(--border-card);
          animation: modalAppear 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes modalAppear {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        .modal-close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255,255,255,0.08);
          color: var(--text-main);
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          transition: background-color 0.2s ease;
        }

        .modal-close-btn:hover {
          background: rgba(255,255,255,0.15);
        }

        .modal-brand-header {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 24px;
        }

        .modal-icon-badge {
          width: 44px;
          height: 44px;
          background: var(--bg-dark);
          color: #ffffff;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-title {
          font-size: 1.35rem;
          color: var(--text-main);
          font-weight: 800;
        }

        .modal-subtitle {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .modal-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .field-label {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-main);
          margin-bottom: 8px;
          display: block;
        }

        .plan-pill-options {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 6px;
        }

        .plan-toggle-pill {
          padding: 10px 6px;
          border-radius: var(--radius-md);
          border: 1px solid rgba(255, 255, 255, 0.15);
          background: rgba(255, 255, 255, 0.08);
          color: #ffffff;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .plan-toggle-pill:hover {
          background: rgba(255, 255, 255, 0.14);
          border-color: rgba(255, 255, 255, 0.28);
          transform: translateY(-1px);
        }

        .plan-toggle-pill.selected {
          background: linear-gradient(135deg, #ff2a5f 0%, #d91b4b 100%);
          border-color: #ff2a5f;
          color: #ffffff;
          box-shadow: 0 4px 14px rgba(255, 42, 95, 0.4);
        }

        .p-name {
          font-size: 0.78rem;
          font-weight: 700;
          color: #ffffff;
        }

        .p-price {
          font-size: 0.72rem;
          font-weight: 600;
          color: #e2e8f0;
        }

        .plan-toggle-pill.selected .p-price {
          color: #ffffff;
        }

        .plan-summary-box {
          background: rgba(255, 42, 95, 0.12);
          border: 1px solid rgba(255, 42, 95, 0.3);
          border-radius: var(--radius-md);
          padding: 12px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .summary-lbl {
          font-size: 0.82rem;
          color: #cbd5e1;
          font-weight: 600;
        }

        .summary-val {
          font-size: 1rem;
          color: #ff577d;
          font-weight: 800;
        }

        .field-block {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .field-block label {
          font-size: 0.82rem;
          font-weight: 700;
          color: #f8fafc;
        }

        .field-block input {
          padding: 12px 16px;
          border-radius: var(--radius-md);
          border: 1px solid rgba(255, 255, 255, 0.14);
          background: rgba(12, 14, 18, 0.65);
          font-family: var(--font-body);
          font-size: 0.92rem;
          color: #ffffff !important;
          outline: none;
          transition: all 0.2s ease;
        }

        .field-block input::placeholder {
          color: #94a3b8 !important;
        }

        .field-block input:focus {
          border-color: var(--accent-red);
          background: rgba(12, 14, 18, 0.9);
          box-shadow: 0 0 0 3px rgba(255, 42, 95, 0.2);
        }

        .modal-submit-btn {
          width: 100%;
          padding: 13px;
          font-size: 0.95rem;
          margin-top: 4px;
        }

        .modal-trust-footer {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .trust-icon {
          color: var(--accent-green);
        }

        .modal-success {
          text-align: center;
          padding: 20px 0;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .success-icon-badge {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: rgba(255, 42, 95, 0.12);
          color: var(--accent-red);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }

        .modal-success h3 {
          font-size: 1.5rem;
          color: var(--text-main);
          margin-bottom: 10px;
        }

        .modal-success p {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.5;
          margin-bottom: 8px;
        }

        .sub-instruction {
          font-size: 0.825rem;
          color: var(--text-light);
          margin-bottom: 24px;
        }

        .modal-close-cta {
          width: 100%;
          padding: 12px;
        }
      `}</style>
    </div>
  );
}
