import React from 'react';

/**
 * Professional 2D IronPeak Logo (Pure Mathematical Vector SVG)
 * - Ultra-sharp at any resolution (16px to 512px)
 * - 100% transparent background (no cheap white box or pixelated jpg)
 * - Premium athletic identity: Soaring Mountain Summit + Power Chevrons
 * - Signature colors: High-voltage Crimson (#ff2a5f -> #e11d48) & Carbon Black (#111315)
 */
export default function GymLogo({ 
  size = 40, 
  className = '', 
  glow = false,
  variant = 'mark', // 'mark' | 'shield' | 'contained'
  showBadge = false
}) {
  const svgContent = (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`ironpeak-vector-logo ${glow ? 'logo-glow-effect' : ''} ${className}`}
      style={{ display: 'block', overflow: 'visible' }}
      aria-label="IronPeak Fitness Official Logo"
    >
      <defs>
        {/* Vibrant Crimson Peak Gradients */}
        <linearGradient id="ipRedPrimary" x1="50" y1="8" x2="20" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ff2a5f" />
          <stop offset="100%" stopColor="#be123c" />
        </linearGradient>

        <linearGradient id="ipRedLight" x1="50" y1="8" x2="80" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ff4d79" />
          <stop offset="60%" stopColor="#e11d48" />
          <stop offset="100%" stopColor="#9f1239" />
        </linearGradient>

        {/* Carbon Obsidian Iron Gradients */}
        <linearGradient id="ipCarbonDark" x1="50" y1="50" x2="50" y2="92" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1f2328" />
          <stop offset="100%" stopColor="#0c0e10" />
        </linearGradient>

        <linearGradient id="ipCarbonLight" x1="20" y1="60" x2="80" y2="85" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#323842" />
          <stop offset="100%" stopColor="#16181b" />
        </linearGradient>

        {/* Ambient Drop Filter */}
        <filter id="ipGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#e11d48" floodOpacity="0.45" />
        </filter>
      </defs>

      {/* 1. Main Soaring Mountain Peak (Faceted 3D Apex) */}
      {/* Left Red Facet */}
      <polygon 
        points="50,8 18,62 50,48" 
        fill="url(#ipRedPrimary)" 
      />

      {/* Right Red Facet (Illuminated) */}
      <polygon 
        points="50,8 82,62 50,48" 
        fill="url(#ipRedLight)" 
      />

      {/* 2. Precision Negative Space Splitter */}
      <line 
        x1="50" y1="8" x2="50" y2="48" 
        stroke="rgba(255,255,255,0.4)" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
      />

      {/* 3. Mid Core Diamond Node (Athletic Power Center) */}
      <polygon 
        points="50,38 60,52 50,64 40,52" 
        fill="#ffffff" 
        opacity="0.95"
      />
      <polygon 
        points="50,43 56,52 50,60 44,52" 
        fill="#e11d48" 
      />

      {/* 4. Heavy Foundation Iron Chevron (Barbell / Strength Base) */}
      {/* Lower Left Wing */}
      <polygon 
        points="14,68 50,88 50,74 24,58" 
        fill="url(#ipCarbonLight)" 
      />

      {/* Lower Right Wing */}
      <polygon 
        points="86,68 50,88 50,74 76,58" 
        fill="url(#ipCarbonDark)" 
      />

      {/* 5. Sub-Foundation Floating Anchor Accent */}
      <polygon 
        points="50,94 40,88 50,83 60,88" 
        fill="#e11d48" 
      />
    </svg>
  );

  if (showBadge) {
    return (
      <div 
        className={`gym-logo-badge-wrapper ${className}`}
        style={{
          width: size + 16,
          height: size + 16,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '16px',
          background: '#111315',
          border: '1.5px solid rgba(225, 29, 72, 0.4)',
          boxShadow: glow ? '0 10px 25px rgba(225, 29, 72, 0.35)' : '0 4px 14px rgba(0,0,0,0.15)',
          padding: '6px'
        }}
      >
        {svgContent}
      </div>
    );
  }

  return (
    <div 
      className={`gym-vector-mark-wrap ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        flexShrink: 0
      }}
    >
      {svgContent}
      <style>{`
        .logo-glow-effect {
          filter: drop-shadow(0 0 14px rgba(225, 29, 72, 0.5));
        }
        .ironpeak-vector-logo {
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .ironpeak-vector-logo:hover {
          transform: scale(1.08) translateY(-1px);
        }
      `}</style>
    </div>
  );
}
