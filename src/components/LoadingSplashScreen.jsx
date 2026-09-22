import React, { useEffect, useState } from 'react';
import GymLogo from './GymLogo';

/**
 * Loading Flash Screen
 * Automatically displayed when data fetch or route transition takes time.
 * Features:
 * - 2D Unique Logo (no text) with crimson neon glow & radar pulse rings
 * - Athletic laser loader bar
 * - Minimalist status feedback
 * - Smooth fade-out dismissal
 */
export default function LoadingSplashScreen({ 
  show = false, 
  title = "IRONPEAK",
  subtitle = "SYNCHRONIZING WITH DATABASE...",
  minDisplayTime = 400
}) {
  const [visible, setVisible] = useState(show);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    let timeoutId;
    if (show) {
      setVisible(true);
      setFadingOut(false);
    } else if (visible) {
      // Start fade out
      setFadingOut(true);
      timeoutId = setTimeout(() => {
        setVisible(false);
        setFadingOut(false);
      }, minDisplayTime);
    }
    return () => clearTimeout(timeoutId);
  }, [show, visible, minDisplayTime]);

  if (!visible) return null;

  return (
    <div className={`flash-screen-overlay ${fadingOut ? 'flash-fade-out' : ''}`}>
      <div className="flash-screen-backdrop"></div>
      
      {/* Central Content */}
      <div className="flash-content">
        {/* Glowing Radar Pulse Rings */}
        <div className="logo-pulse-wrapper">
          <div className="pulse-ring pulse-ring-1"></div>
          <div className="pulse-ring pulse-ring-2"></div>
          <div className="logo-badge-container">
            <GymLogo size={76} glow={true} />
          </div>
        </div>

        {/* Brand Bar & Status Text */}
        <div className="flash-text-group">
          <div className="flash-tagline-row">
            <span className="flash-pulse-dot"></span>
            <span className="flash-title">{title}</span>
          </div>
          <span className="flash-subtitle">{subtitle}</span>
        </div>

        {/* Athletic Laser Progress Bar */}
        <div className="flash-progress-track">
          <div className="flash-progress-bar"></div>
        </div>
      </div>

      <style>{`
        .flash-screen-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0d0f11;
          opacity: 1;
          transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: all;
          font-family: var(--font-heading, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
        }

        .flash-screen-overlay.flash-fade-out {
          opacity: 0;
          transform: scale(1.02);
          pointer-events: none;
        }

        .flash-screen-backdrop {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 45%, rgba(225, 29, 72, 0.14) 0%, rgba(13, 15, 17, 0.95) 60%, #0d0f11 100%);
        }

        .flash-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 24px;
        }

        /* Radar Pulse Animation */
        .logo-pulse-wrapper {
          position: relative;
          width: 140px;
          height: 140px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
        }

        .pulse-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(225, 29, 72, 0.4);
          animation: radarPulse 2.4s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        }

        .pulse-ring-1 {
          width: 100%;
          height: 100%;
        }

        .pulse-ring-2 {
          width: 130%;
          height: 130%;
          animation-delay: 0.8s;
          border-color: rgba(225, 29, 72, 0.2);
        }

        @keyframes radarPulse {
          0% {
            transform: scale(0.6);
            opacity: 0.8;
          }
          50% {
            opacity: 0.4;
          }
          100% {
            transform: scale(1.4);
            opacity: 0;
          }
        }

        .logo-badge-container {
          position: relative;
          z-index: 3;
          background: #111315;
          padding: 10px;
          border-radius: 20px;
          border: 1.5px solid rgba(225, 29, 72, 0.5);
          box-shadow: 0 0 35px rgba(225, 29, 72, 0.35), inset 0 0 15px rgba(225, 29, 72, 0.15);
          animation: logoFloat 2.6s ease-in-out infinite;
        }

        @keyframes logoFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        /* Typography */
        .flash-text-group {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          margin-bottom: 24px;
        }

        .flash-tagline-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .flash-pulse-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--accent-red, #e11d48);
          box-shadow: 0 0 10px var(--accent-red, #e11d48);
          animation: blinkDot 1s ease-in-out infinite alternate;
        }

        @keyframes blinkDot {
          from { opacity: 0.4; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1.2); }
        }

        .flash-title {
          font-size: 1.15rem;
          font-weight: 800;
          letter-spacing: 0.22em;
          color: #ffffff;
        }

        .flash-subtitle {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          color: #8c9ba5;
        }

        /* Progress laser */
        .flash-progress-track {
          width: 180px;
          height: 3px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 999px;
          overflow: hidden;
          position: relative;
        }

        .flash-progress-bar {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 40%;
          background: linear-gradient(90deg, transparent, #e11d48, #ffffff, #e11d48, transparent);
          border-radius: 999px;
          animation: laserSweep 1.5s ease-in-out infinite;
        }

        @keyframes laserSweep {
          0% {
            left: -40%;
          }
          100% {
            left: 100%;
          }
        }
      `}</style>
    </div>
  );
}
