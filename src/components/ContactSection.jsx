import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare, ArrowRight, ExternalLink } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <span className="pill-badge">
              <span className="dot"></span>
              <span>Contact</span>
            </span>
          </div>
          <h2>Visit Our Facility</h2>
          <p>
            24, Lake View Road, RS Puram, Coimbatore.
          </p>
        </div>

        <div className="contact-layout">
          {/* Left Column: Clean Contact Details */}
          <div className="contact-info-column">
            <div className="info-card">
              <div className="info-item">
                <div className="info-icon-box">
                  <MapPin size={20} />
                </div>
                <div className="info-details">
                  <span className="info-label">Address</span>
                  <h4 className="info-title">IronPeak Fitness</h4>
                  <p className="info-text">
                    24, Lake View Road, RS Puram,<br />
                    Coimbatore – 641002
                  </p>
                </div>
              </div>

              <div className="info-divider"></div>

              <div className="info-item">
                <div className="info-icon-box">
                  <Phone size={20} />
                </div>
                <div className="info-details">
                  <span className="info-label">Phone</span>
                  <a href="tel:+919876543210" className="info-link">+91 98765 43210</a>
                </div>
              </div>

              <div className="info-divider"></div>

              <div className="info-item">
                <div className="info-icon-box">
                  <Clock size={20} />
                </div>
                <div className="info-details">
                  <span className="info-label">Hours</span>
                  <p className="info-text">
                    Mon – Sat: 5:30 AM – 10:00 PM<br />
                    Sunday: 6:00 AM – 1:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp Link */}
            <a 
              href="https://wa.me/919876543210?text=Hi%20IronPeak%20Fitness,%20I%20would%20like%20to%20know%20more." 
              target="_blank" 
              rel="noopener noreferrer"
              className="whatsapp-banner-pill"
            >
              <MessageSquare size={16} />
              <span>Chat on WhatsApp: +91 98765 43210</span>
            </a>
          </div>

          {/* Right Column: Clean Map Embed & Directions */}
          <div className="trial-form-column">
            <div className="map-embed-card">
              <iframe
                title="IronPeak Fitness Location in RS Puram"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15665.688825838048!2d76.9400874!3d11.0076214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859a72132a225%3A0x6a12a52efc3239a5!2sR.S.%20Puram%2C%20Coimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                width="100%"
                height="320"
                style={{ border: 0, borderRadius: '16px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <div className="map-footer-row">
                <a 
                  href="https://maps.google.com/?q=RS+Puram+Coimbatore" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-primary map-directions-btn"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .contact-section {
          background-color: transparent;
          border-top: 1px solid var(--border-card);
        }

        .contact-layout {
          display: grid;
          grid-template-columns: 0.95fr 1.05fr;
          gap: 40px;
        }

        .info-card {
          background: var(--bg-card);
          border: 1px solid var(--border-card);
          border-radius: var(--radius-xl);
          padding: 36px;
          display: flex;
          flex-direction: column;
          gap: 22px;
          margin-bottom: 20px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.25);
        }

        .info-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }

        .info-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(255, 42, 95, 0.12);
          color: var(--accent-red);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .info-details {
          display: flex;
          flex-direction: column;
        }

        .info-label {
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-light);
          font-weight: 700;
          margin-bottom: 3px;
        }

        .info-title {
          font-size: 1.15rem;
          color: var(--text-main);
          font-weight: 800;
          margin-bottom: 4px;
        }

        .info-text {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.5;
        }

        .info-link {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-main);
          margin-bottom: 2px;
        }

        .info-link:hover {
          color: var(--accent-green);
        }

        .info-sub {
          font-size: 0.78rem;
          color: var(--text-light);
        }

        .map-link-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--accent-green);
          margin-top: 8px;
        }

        .map-link-btn:hover {
          text-decoration: underline;
        }

        .info-divider {
          width: 100%;
          height: 1px;
          background-color: var(--border-light);
        }

        .whatsapp-banner-pill {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background-color: #25d366;
          color: #ffffff;
          padding: 14px 24px;
          border-radius: var(--radius-full);
          font-size: 0.9rem;
          font-weight: 700;
          box-shadow: 0 4px 14px rgba(37, 211, 102, 0.25);
          transition: all 0.25s ease;
        }

        .whatsapp-banner-pill:hover {
          background-color: #20ba5a;
          transform: translateY(-2px);
        }

        /* Form Card */
        .form-card {
          background: var(--bg-card);
          border: 1px solid var(--border-card);
          border-radius: var(--radius-xl);
          padding: 40px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.35);
        }

        .form-badge-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 16px;
        }

        .trial-chip {
          background-color: var(--accent-green-bg);
          color: var(--accent-green);
          font-size: 0.75rem;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: var(--radius-full);
        }

        .guarantee-chip {
          background-color: #f1f4f2;
          color: var(--text-muted);
          font-size: 0.75rem;
          font-weight: 600;
          padding: 4px 12px;
          border-radius: var(--radius-full);
        }

        .form-title {
          font-size: 1.75rem;
          color: var(--text-main);
          margin-bottom: 8px;
        }

        .form-subtitle {
          font-size: 0.9rem;
          color: var(--text-muted);
          margin-bottom: 26px;
          line-height: 1.5;
        }

        .actual-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .form-row-dual {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-field label {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-main);
        }

        .form-field input,
        .form-field select {
          padding: 12px 16px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-light);
          background-color: #fcfdfc;
          font-family: var(--font-body);
          font-size: 0.9rem;
          color: var(--text-main);
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .form-field input:focus,
        .form-field select:focus {
          border-color: var(--accent-red);
          box-shadow: 0 0 0 3px rgba(255, 42, 95, 0.12);
          background-color: rgba(255,255,255,0.07);
        }

        .submit-pass-btn {
          width: 100%;
          padding: 14px;
          font-size: 0.95rem;
          margin-top: 6px;
        }

        .privacy-note {
          font-size: 0.75rem;
          color: var(--text-light);
          text-align: center;
          margin-top: 6px;
        }

        /* Success State */
        .success-state {
          text-align: center;
          padding: 30px 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .success-icon-wrap {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background-color: var(--accent-green-bg);
          color: var(--accent-green);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }

        .success-state h3 {
          font-size: 1.6rem;
          color: var(--text-main);
          margin-bottom: 12px;
        }

        .success-state p {
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.6;
          max-width: 440px;
          margin-bottom: 20px;
        }

        .pass-recap-box {
          background-color: #f1f5f3;
          padding: 10px 18px;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-main);
          margin-bottom: 24px;
        }

        .restart-btn {
          font-size: 0.85rem;
          padding: 10px 20px;
        }

        @media (max-width: 900px) {
          .contact-layout {
            grid-template-columns: 1fr;
          }
          .form-card {
            padding: 28px 20px;
          }
          .form-row-dual {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
