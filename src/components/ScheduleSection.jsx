import React, { useState, useEffect } from 'react';
import { Clock, Sun, Moon, Calendar, CheckCircle, Activity, Sparkles } from 'lucide-react';

export default function ScheduleSection() {
  const [isOpenNow, setIsOpenNow] = useState(false);
  const [statusText, setStatusText] = useState('');
  const [currentTimeFormatted, setCurrentTimeFormatted] = useState('');

  useEffect(() => {
    const checkGymStatus = () => {
      const now = new Date();
      const day = now.getDay(); // 0 is Sunday, 1-6 is Mon-Sat
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const timeInDecimal = hours + minutes / 60;

      // Format current time
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setCurrentTimeFormatted(timeStr);

      if (day >= 1 && day <= 6) {
        // Mon-Sat: 5:30 AM (5.5) - 10:00 PM (22.0)
        if (timeInDecimal >= 5.5 && timeInDecimal < 22.0) {
          setIsOpenNow(true);
          setStatusText('Currently OPEN • Closes tonight at 10:00 PM');
        } else {
          setIsOpenNow(false);
          setStatusText(timeInDecimal < 5.5 ? 'Currently CLOSED • Opens today at 5:30 AM' : 'Currently CLOSED • Opens tomorrow at 5:30 AM');
        }
      } else {
        // Sunday: 6:00 AM (6.0) - 1:00 PM (13.0)
        if (timeInDecimal >= 6.0 && timeInDecimal < 13.0) {
          setIsOpenNow(true);
          setStatusText('Currently OPEN • Closes today at 1:00 PM');
        } else {
          setIsOpenNow(false);
          setStatusText('Currently CLOSED • Opens Monday at 5:30 AM');
        }
      }
    };

    checkGymStatus();
    const interval = setInterval(checkGymStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="schedule" className="schedule-section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <span className="pill-badge">
              <span className="dot"></span>
              <span>Timings</span>
            </span>
          </div>
          <h2>Opening Hours</h2>
          <p>
            Open 7 days a week to match your routine.
          </p>

          {/* Live Status Pill */}
          <div className={`live-status-pill ${isOpenNow ? 'status-open' : 'status-closed'}`}>
            <span className="live-indicator-dot"></span>
            <span className="live-status-message">{statusText}</span>
          </div>
        </div>

        {/* Schedule Cards Grid */}
        <div className="schedule-grid">
          {/* Weekday Card */}
          <div className="schedule-card highlight-card">
            <div className="sched-icon-row">
              <Sun size={26} className="sched-icon" />
              <div>
                <h3 className="sched-day-title">Monday – Saturday</h3>
                <p className="sched-day-sub">Full Strength & Cardio Floor</p>
              </div>
            </div>

            <div className="time-highlight-box">
              <span className="time-label">Hours</span>
              <span className="time-value">5:30 AM – 10:00 PM</span>
              <span className="time-note">Trainer on floor throughout</span>
            </div>
          </div>

          {/* Sunday Card */}
          <div className="schedule-card">
            <div className="sched-icon-row">
              <Calendar size={26} className="sched-icon" />
              <div>
                <h3 className="sched-day-title">Sunday</h3>
                <p className="sched-day-sub">Morning Workout Session</p>
              </div>
            </div>

            <div className="time-highlight-box">
              <span className="time-label">Hours</span>
              <span className="time-value">6:00 AM – 1:00 PM</span>
              <span className="time-note">Open gym & mobility</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .schedule-section {
          background-color: transparent;
          border-top: 1px solid var(--border-card);
          border-bottom: 1px solid var(--border-card);
        }

        .live-status-pill {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 20px;
          border-radius: var(--radius-full);
          margin-top: 22px;
          font-size: 0.85rem;
          font-weight: 600;
          box-shadow: var(--shadow-sm);
        }

        .status-open {
          background-color: rgba(255, 42, 95, 0.12);
          color: var(--accent-red);
          border: 1px solid rgba(255, 42, 95, 0.25);
        }

        .status-closed {
          background-color: rgba(255,255,255,0.05);
          color: var(--text-muted);
          border: 1px solid var(--border-card);
        }

        .live-indicator-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          display: inline-block;
        }

        .status-open .live-indicator-dot {
          background-color: #e11d48;
          box-shadow: 0 0 0 3px rgba(225, 29, 72, 0.25);
          animation: pulse 2s infinite;
        }

        .status-closed .live-indicator-dot {
          background-color: #94a3b8;
          box-shadow: 0 0 0 3px rgba(148, 163, 184, 0.25);
        }

        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(225, 29, 72, 0.4); }
          70% { box-shadow: 0 0 0 6px rgba(225, 29, 72, 0); }
          100% { box-shadow: 0 0 0 0 rgba(225, 29, 72, 0); }
        }

        .current-time-tag {
          font-size: 0.75rem;
          background: rgba(0, 0, 0, 0.05);
          padding: 2px 8px;
          border-radius: var(--radius-full);
          margin-left: 6px;
        }

        .schedule-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 28px;
          margin-bottom: 40px;
        }

        .schedule-card {
          background: var(--bg-card);
          border: 1px solid var(--border-card);
          border-radius: var(--radius-xl);
          padding: 34px;
          display: flex;
          flex-direction: column;
          position: relative;
          box-shadow: 0 4px 20px rgba(0,0,0,0.25);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .schedule-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.4);
        }

        .schedule-card.highlight-card {
          border-color: var(--accent-red);
          box-shadow: 0 8px 28px rgba(255, 42, 95, 0.15);
        }

        .card-badge {
          position: absolute;
          top: -12px;
          right: 32px;
          background: var(--bg-dark);
          color: #ffffff;
          padding: 4px 14px;
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.03em;
        }

        .card-badge.subtle-badge {
          background: rgba(255,255,255,0.07);
          color: var(--text-muted);
        }

        .sched-icon-row {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
        }

        .sched-icon {
          color: var(--accent-green);
        }

        .sched-day-title {
          font-size: 1.45rem;
          color: var(--text-main);
          font-weight: 800;
        }

        .sched-day-sub {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .time-highlight-box {
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--border-card);
          border-radius: var(--radius-md);
          padding: 20px 24px;
          display: flex;
          flex-direction: column;
          margin-bottom: 24px;
        }

        .time-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-light);
          font-weight: 700;
          margin-bottom: 6px;
        }

        .time-value {
          font-family: var(--font-heading);
          font-size: 2rem;
          font-weight: 800;
          color: var(--text-main);
          letter-spacing: -0.02em;
          margin-bottom: 4px;
        }

        .time-note {
          font-size: 0.8rem;
          color: var(--accent-green);
          font-weight: 600;
        }

        .schedule-features {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .sched-feature-row {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.88rem;
          color: var(--text-muted);
        }

        .feat-icon {
          color: var(--accent-green);
          flex-shrink: 0;
        }

        /* Crowd density guide */
        .crowd-guide-card {
          background: var(--bg-main);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-lg);
          padding: 26px 32px;
        }

        .guide-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 18px;
        }

        .guide-icon {
          color: var(--accent-green);
        }

        .guide-header h4 {
          font-size: 1.1rem;
          color: var(--text-main);
        }

        .slots-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .slot-col {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .slot-badge {
          display: inline-block;
          align-self: flex-start;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: var(--radius-full);
          margin-bottom: 2px;
        }

        .slot-badge.quiet {
          background-color: rgba(255, 42, 95, 0.12);
          color: var(--accent-red);
        }

        .slot-badge.prime {
          background-color: rgba(99, 102, 241, 0.15);
          color: #a5b4fc;
        }

        .slot-badge.energized {
          background-color: rgba(245, 158, 11, 0.15);
          color: #fcd34d;
        }

        .slot-col strong {
          font-size: 0.95rem;
          color: var(--text-main);
        }

        .slot-col p {
          font-size: 0.82rem;
          color: var(--text-muted);
          line-height: 1.4;
        }

        @media (max-width: 850px) {
          .schedule-grid {
            grid-template-columns: 1fr;
          }
          .slots-row {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }
      `}</style>
    </section>
  );
}
