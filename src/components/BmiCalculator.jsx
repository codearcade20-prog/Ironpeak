import React, { useState } from 'react';
import { Calculator, ArrowRight, Droplets, Target, Award, Dumbbell } from 'lucide-react';

export default function BmiCalculator({ onOpenModal }) {
  const [height, setHeight] = useState(175);
  const [weight, setWeight] = useState(72);
  const [goal, setGoal] = useState('muscle');

  // BMI = weight(kg) / (height(m)^2)
  const heightInMeters = height / 100;
  const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);

  let category = 'Normal Weight';
  let badgeColor = '#e11d48';
  let recommendation = 'Strength training 4x/week with progressive overload & maintenance calories.';

  if (bmi < 18.5) {
    category = 'Underweight';
    badgeColor = '#3b82f6';
    recommendation = 'Focus on high-calorie density, caloric surplus, and compound barbell training.';
  } else if (bmi >= 18.5 && bmi < 25) {
    category = 'Healthy & Optimal';
    badgeColor = '#e11d48';
    recommendation = 'Ideal foundation for lean hypertrophy, functional power, and peak cardiovascular stamina.';
  } else if (bmi >= 25 && bmi < 30) {
    category = 'Overweight / Muscular';
    badgeColor = '#f59e0b';
    recommendation = 'Body recomposition with strength sessions paired with sprint turf conditioning.';
  } else {
    category = 'High BMI';
    badgeColor = '#ef4444';
    recommendation = 'Structured joint-safe conditioning, guidance on nutrition macros, and guided low-impact lifts.';
  }

  const estWater = (weight * 0.035).toFixed(1); // litres
  const estProtein = Math.round(weight * 1.8); // grams

  return (
    <section id="calculator" className="calc-section">
      <div className="container">
        <div className="calc-wrapper">
          {/* Left Side Inputs */}
          <div className="calc-form-side">
            <div className="section-tag">
              <span className="pill-badge">
                <Calculator size={13} />
                <span>Tool</span>
              </span>
            </div>
            <h2 className="calc-heading">Calculate Your BMI</h2>
            <p className="calc-desc">
              Adjust your height and weight to view your baseline.
            </p>

            <div className="input-group">
              <div className="input-label-row">
                <label>Height</label>
                <span className="input-val-tag">{height} cm</span>
              </div>
              <input 
                type="range" 
                min="130" 
                max="215" 
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="slider-input"
              />
              <div className="slider-range-labels">
                <span>130 cm</span>
                <span>215 cm</span>
              </div>
            </div>

            <div className="input-group">
              <div className="input-label-row">
                <label>Weight</label>
                <span className="input-val-tag">{weight} kg</span>
              </div>
              <input 
                type="range" 
                min="40" 
                max="150" 
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="slider-input"
              />
              <div className="slider-range-labels">
                <span>40 kg</span>
                <span>150 kg</span>
              </div>
            </div>

            <div className="goal-picker-group">
              <label className="goal-picker-label">Primary Goal:</label>
              <div className="goal-pill-buttons">
                <button 
                  type="button"
                  onClick={() => setGoal('muscle')}
                  className={`goal-pill ${goal === 'muscle' ? 'active' : ''}`}
                >
                  Muscle
                </button>
                <button 
                  type="button"
                  onClick={() => setGoal('fatloss')}
                  className={`goal-pill ${goal === 'fatloss' ? 'active' : ''}`}
                >
                  Fat Loss
                </button>
                <button 
                  type="button"
                  onClick={() => setGoal('endurance')}
                  className={`goal-pill ${goal === 'endurance' ? 'active' : ''}`}
                >
                  Endurance
                </button>
              </div>
            </div>
          </div>

          {/* Right Side Result Card */}
          <div className="calc-result-card">
            <div className="result-card-inner">
              <div className="result-top-badge" style={{ borderColor: badgeColor, color: badgeColor }}>
                <span className="result-dot" style={{ backgroundColor: badgeColor }}></span>
                <span>{category}</span>
              </div>

              <div className="bmi-number-display">
                <span className="bmi-value">{bmi}</span>
                <span className="bmi-label">Your BMI Score</span>
              </div>

              <div className="rec-box">
                <p className="rec-text">{recommendation}</p>
              </div>

              <button 
                onClick={() => onOpenModal('Custom Consultation')}
                className="btn-primary calc-cta-btn"
              >
                <span>Get Started</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .calc-section {
          background-color: var(--bg-main);
          position: relative;
        }

        .calc-wrapper {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 50px;
          background: var(--bg-card);
          border: 1px solid var(--border-card);
          border-radius: var(--radius-xl);
          padding: 50px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.35);
        }

        .calc-heading {
          font-size: 2.2rem;
          color: var(--text-main);
          margin: 14px 0 10px 0;
        }

        .calc-desc {
          color: var(--text-muted);
          font-size: 0.95rem;
          margin-bottom: 30px;
        }

        .input-group {
          margin-bottom: 24px;
        }

        .input-label-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        .input-label-row label {
          font-weight: 700;
          font-size: 0.95rem;
          color: var(--text-main);
        }

        .input-val-tag {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.15rem;
          color: var(--text-main);
          background-color: rgba(255,255,255,0.07);
          padding: 2px 10px;
          border-radius: var(--radius-full);
        }

        .slider-input {
          width: 100%;
          height: 8px;
          border-radius: 4px;
          background: rgba(255,255,255,0.1);
          outline: none;
          accent-color: var(--accent-red);
          cursor: pointer;
        }

        .slider-range-labels {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: var(--text-light);
          margin-top: 4px;
        }

        .goal-picker-group {
          margin-top: 10px;
        }

        .goal-picker-label {
          display: block;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-main);
          margin-bottom: 10px;
        }

        .goal-pill-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .goal-pill {
          padding: 8px 16px;
          border-radius: var(--radius-full);
          font-size: 0.825rem;
          font-weight: 600;
          background: rgba(255,255,255,0.06);
          color: var(--text-muted);
          border: 1px solid var(--border-card);
          transition: all 0.2s ease;
        }

        .goal-pill.active {
          background: var(--accent-red);
          color: #ffffff;
          border-color: var(--accent-red);
        }

        /* Result Card */
        .calc-result-card {
          background-color: var(--bg-dark);
          border-radius: var(--radius-lg);
          padding: 36px 32px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          color: #ffffff;
          box-shadow: var(--shadow-dark);
          position: relative;
        }

        .result-top-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 5px 14px;
          border-radius: var(--radius-full);
          border: 1px solid;
          background: rgba(255, 255, 255, 0.05);
          font-size: 0.82rem;
          font-weight: 700;
          align-self: flex-start;
          margin-bottom: 24px;
        }

        .result-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
        }

        .bmi-number-display {
          display: flex;
          flex-direction: column;
          margin-bottom: 24px;
        }

        .bmi-value {
          font-family: var(--font-heading);
          font-size: 3.8rem;
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 1;
          color: #ffffff;
        }

        .bmi-label {
          font-size: 0.85rem;
          color: #9cb0a6;
          margin-top: 6px;
        }

        .metrics-pill-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 22px;
        }

        .mini-metric-box {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-md);
          padding: 12px 14px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .metric-icon {
          color: var(--accent-green);
          flex-shrink: 0;
        }

        .mini-val {
          display: block;
          font-size: 0.95rem;
          font-weight: 700;
          color: #ffffff;
        }

        .mini-lbl {
          font-size: 0.7rem;
          color: #8fa298;
        }

        .rec-box {
          background: rgba(255, 255, 255, 0.04);
          border-left: 3px solid var(--accent-green);
          border-radius: 0 8px 8px 0;
          padding: 14px 16px;
          margin-bottom: 24px;
        }

        .rec-title-row {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--accent-green);
          margin-bottom: 4px;
        }

        .rec-text {
          font-size: 0.84rem;
          color: #d1ded8;
          line-height: 1.45;
        }

        .calc-cta-btn {
          background-color: var(--accent-red);
          color: #ffffff;
          width: 100%;
        }

        .calc-cta-btn:hover {
          background-color: #e0002c;
        }

        @media (max-width: 900px) {
          .calc-wrapper {
            grid-template-columns: 1fr;
            padding: 30px 24px;
          }
        }
      `}</style>
    </section>
  );
}
