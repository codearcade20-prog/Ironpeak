import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Sparkles, CheckCircle2, Phone, User, Calendar, RotateCcw, ArrowRight, Dumbbell } from 'lucide-react';
import { submitMembershipApplication } from '../lib/supabase';
import GymLogo from './GymLogo';

export default function GymChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hey there! 💪 Welcome to IronPeak Fitness RS Puram. I'm your IronPeak Assistant. What's your name?",
      time: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [step, setStep] = useState('NAME'); // 'NAME' | 'PHONE' | 'PLAN' | 'DONE'
  const [applicant, setApplicant] = useState({
    name: '',
    phone: '',
    plan: ''
  });
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      scrollToBottom();
    }
  }, [isOpen, messages, isTyping]);

  const addBotMessage = (text, delay = 600, callback) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          sender: 'bot',
          text,
          time: 'Just now'
        }
      ]);
      if (callback) callback();
    }, delay);
  };

  const handleSend = async (e) => {
    e?.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed || isTyping) return;

    // Add user message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: trimmed,
      time: 'Just now'
    };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    // Step 1: Processing Name
    if (step === 'NAME') {
      const nameVal = trimmed;
      setApplicant(prev => ({ ...prev, name: nameVal }));
      setStep('PHONE');
      addBotMessage(`Great to meet you, ${nameVal}! 📞 What is your 10-digit mobile number so our team can send you a free pass and details?`);
      return;
    }

    // Step 2: Processing Phone with 10-digit validation
    if (step === 'PHONE') {
      const cleanDigits = trimmed.replace(/\D/g, '');
      // Validate: must be exactly 10 digits
      if (cleanDigits.length !== 10) {
        addBotMessage("⚠️ Please enter a valid 10-digit mobile number (e.g. 9876543210) so we can reach you.");
        return;
      }

      setApplicant(prev => ({ ...prev, phone: cleanDigits }));
      setStep('PLAN');
      addBotMessage(
        `Got it! Which membership plan would you like to select? You can click one of the options below or type it out:`,
        700
      );
      return;
    }

    // Step 3: Processing Plan typed manually
    if (step === 'PLAN') {
      handleSelectPlan(trimmed);
    }
  };

  const handleSelectPlan = async (planName) => {
    if (isTyping) return;

    // Add user's plan choice message
    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        sender: 'user',
        text: planName,
        time: 'Just now'
      }
    ]);

    const updatedApplicant = { ...applicant, plan: planName };
    setApplicant(updatedApplicant);
    setStep('DONE');

    // Show bot thinking and save to Supabase
    setIsTyping(true);

    try {
      await submitMembershipApplication({
        name: updatedApplicant.name,
        phone: updatedApplicant.phone,
        plan_name: planName.split(' ')[0], // Extracts 'Basic', 'Standard', 'Premium', 'Annual'
        message: 'Application submitted via IronPeak Assistant Chatbot'
      });

      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [
          ...prev,
          {
            id: Date.now(),
            sender: 'bot',
            text: `🎉 You're all set, ${updatedApplicant.name}! Your application for the ${planName} Plan has been successfully saved. Our team will reach out to you soon at ${updatedApplicant.phone}. Welcome to IronPeak Fitness! 💪`,
            time: 'Just now',
            isSuccess: true
          }
        ]);
      }, 900);
    } catch (err) {
      console.error(err);
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          sender: 'bot',
          text: `🎉 Thank you, ${updatedApplicant.name}! Our team will reach out to you soon at ${updatedApplicant.phone} to finalize your membership.`,
          time: 'Just now',
          isSuccess: true
        }
      ]);
    }
  };

  const resetChat = () => {
    setApplicant({ name: '', phone: '', plan: '' });
    setStep('NAME');
    setMessages([
      {
        id: Date.now(),
        sender: 'bot',
        text: "Hey there! 💪 Welcome to IronPeak Fitness RS Puram. What's your name?",
        time: 'Just now'
      }
    ]);
  };

  const planOptions = [
    { name: 'Basic', duration: '1 Month', price: '₹999' },
    { name: 'Standard', duration: '3 Months', price: '₹2,499', popular: true },
    { name: 'Premium', duration: '6 Months', price: '₹4,499' },
    { name: 'Annual', duration: '12 Months', price: '₹7,999' }
  ];

  return (
    <div className="chatbot-root">
      {/* Floating Launcher Button */}
      {!isOpen && (
        <div className="chatbot-launcher-wrapper">
          {hasUnread && (
            <div className="chatbot-preview-bubble" onClick={() => setIsOpen(true)}>
              <span className="bubble-text">👋 Need help? Chat with us!</span>
              <button 
                className="bubble-close-btn" 
                onClick={(e) => {
                  e.stopPropagation();
                  setHasUnread(false);
                }}
              >
                <X size={12} />
              </button>
            </div>
          )}
          <button 
            onClick={() => setIsOpen(true)}
            className="chatbot-fab"
            aria-label="Open IronPeak Assistant Chatbot"
          >
            <div className="fab-pulse-ring"></div>
            <MessageSquare size={24} className="fab-icon" />
            <span className="online-status-dot"></span>
          </button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-info">
              <GymLogo size={36} glow={true} />
              <div className="bot-title-group">
                <div className="bot-name-row">
                  <strong className="bot-name">IronPeak Coach</strong>
                  <span className="bot-online-badge">Online</span>
                </div>
                <span className="bot-sub">RS Puram Desk Assistant</span>
              </div>
            </div>

            <div className="chat-header-actions">
              <button onClick={resetChat} className="chat-header-btn" title="Restart conversation">
                <RotateCcw size={15} />
              </button>
              <button onClick={() => setIsOpen(false)} className="chat-header-btn" title="Close chat">
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="chat-body">
            {messages.map((m) => (
              <div key={m.id} className={`message-row ${m.sender === 'user' ? 'message-user' : 'message-bot'}`}>
                {m.sender === 'bot' && (
                  <div className="msg-bot-avatar">
                    <Dumbbell size={14} />
                  </div>
                )}
                <div className={`message-bubble ${m.isSuccess ? 'success-bubble' : ''}`}>
                  <p>{m.text}</p>
                  <span className="msg-time">{m.time}</span>
                </div>
              </div>
            ))}

            {/* Interactive Plan Selection Pills in Chat */}
            {step === 'PLAN' && !isTyping && (
              <div className="chat-plan-options-container">
                <span className="select-plan-hint">Choose your plan:</span>
                <div className="chat-plans-grid">
                  {planOptions.map((p) => (
                    <button
                      key={p.name}
                      onClick={() => handleSelectPlan(`${p.name} (${p.duration} — ${p.price})`)}
                      className={`chat-plan-pill ${p.popular ? 'popular-pill' : ''}`}
                    >
                      <div className="pill-head">
                        <strong>{p.name}</strong>
                        {p.popular && <span className="pill-rec">Most Popular</span>}
                      </div>
                      <span className="pill-cost">{p.price} / {p.duration}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Bot Typing Indicator */}
            {isTyping && (
              <div className="message-row message-bot">
                <div className="msg-bot-avatar">
                  <Dumbbell size={14} />
                </div>
                <div className="typing-bubble">
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                </div>
              </div>
            )}

            {/* Success Next Steps Action */}
            {step === 'DONE' && (
              <div className="chat-success-actions">
                <div className="desk-address-chip">
                  <span>📍 24, Lake View Road, RS Puram, Coimbatore</span>
                </div>
                <button onClick={resetChat} className="chat-reset-btn">
                  <span>Start New Application</span>
                  <RotateCcw size={13} />
                </button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          {step !== 'DONE' ? (
            <form onSubmit={handleSend} className="chat-footer">
              <input
                type={step === 'PHONE' ? 'tel' : 'text'}
                placeholder={
                  step === 'NAME' 
                    ? "Type your name..." 
                    : step === 'PHONE' 
                    ? "Enter 10-digit number (e.g. 9876543210)..." 
                    : "Select a plan above or type here..."
                }
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                autoFocus
              />
              <button 
                type="submit" 
                disabled={!inputText.trim() || isTyping}
                className="chat-send-btn"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </form>
          ) : (
            <div className="chat-footer-completed">
              <CheckCircle2 size={16} className="done-check-icon" />
              <span>Application saved to RS Puram Desk</span>
            </div>
          )}
        </div>
      )}

      <style>{`
        .chatbot-root {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 9999;
          font-family: var(--font-body);
          pointer-events: auto;
        }

        /* Launcher Wrapper & Fab */
        .chatbot-launcher-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          gap: 12px;
          pointer-events: auto;
        }

        .chatbot-preview-bubble {
          background: var(--bg-card);
          color: var(--text-main);
          border: 1px solid var(--border-card);
          padding: 8px 14px;
          border-radius: var(--radius-full);
          font-size: 0.82rem;
          font-weight: 700;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          animation: floatSlow 3s ease-in-out infinite;
          white-space: nowrap;
        }

        @keyframes floatSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }

        .bubble-close-btn {
          color: var(--text-light);
          padding: 2px;
          display: flex;
          align-items: center;
        }

        .bubble-close-btn:hover {
          color: var(--text-main);
        }

        .chatbot-fab {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: #111315;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 12px 30px rgba(17, 19, 21, 0.35), 0 4px 12px rgba(225, 29, 72, 0.3);
          border: 2px solid var(--accent-red);
          cursor: pointer;
          position: relative;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .chatbot-fab:hover {
          transform: scale(1.08) translateY(-2px);
          box-shadow: 0 16px 36px rgba(17, 19, 21, 0.45), 0 6px 18px rgba(225, 29, 72, 0.5);
        }

        .fab-icon {
          color: #ffffff;
        }

        .online-status-dot {
          position: absolute;
          top: 3px;
          right: 3px;
          width: 13px;
          height: 13px;
          border-radius: 50%;
          background-color: var(--accent-red);
          border: 2px solid #111315;
          pointer-events: none;
        }

        /* Pulse ring - decorative only, must NOT block clicks */
        .fab-pulse-ring {
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          border: 2px solid rgba(255, 42, 95, 0.4);
          animation: fabPulse 2.5s ease-out infinite;
          pointer-events: none;
        }

        @keyframes fabPulse {
          0% { transform: scale(1); opacity: 0.7; }
          70% { transform: scale(1.35); opacity: 0; }
          100% { transform: scale(1.35); opacity: 0; }
        }

        /* Chat Window */
        .chat-window {
          width: 375px;
          height: 540px;
          background: var(--bg-card);
          border-radius: 24px;
          border: 1px solid var(--border-card);
          box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.6);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: chatPop 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes chatPop {
          from { opacity: 0; transform: scale(0.92) translateY(15px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        /* Header */
        .chat-header {
          background: #111315;
          color: #ffffff;
          padding: 16px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #22252a;
        }

        .chat-header-info {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .bot-avatar {
          width: 38px;
          height: 38px;
          border-radius: 12px;
          background: var(--accent-red);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .bot-title-group {
          display: flex;
          flex-direction: column;
        }

        .bot-name-row {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .bot-name {
          font-size: 0.95rem;
          color: #ffffff;
        }

        .bot-online-badge {
          font-size: 0.65rem;
          font-weight: 700;
          background: rgba(225, 29, 72, 0.2);
          color: #ff4d6d;
          padding: 1px 6px;
          border-radius: var(--radius-full);
        }

        .bot-sub {
          font-size: 0.72rem;
          color: #9cb0a6;
        }

        .chat-header-actions {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .chat-header-btn {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s ease;
        }

        .chat-header-btn:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        /* Body */
        .chat-body {
          flex: 1;
          padding: 16px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: rgba(0,0,0,0.2);
        }

        .message-row {
          display: flex;
          align-items: flex-end;
          gap: 8px;
        }

        .message-bot {
          align-self: flex-start;
          max-width: 85%;
        }

        .message-user {
          align-self: flex-end;
          max-width: 85%;
          flex-direction: row-reverse;
        }

        .msg-bot-avatar {
          width: 26px;
          height: 26px;
          border-radius: 8px;
          background: #111315;
          color: var(--accent-red);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-bottom: 4px;
        }

        .message-bubble {
          padding: 12px 16px;
          border-radius: 18px;
          font-size: 0.88rem;
          line-height: 1.45;
          position: relative;
        }

        .message-bot .message-bubble {
          background: rgba(255,255,255,0.08);
          color: var(--text-main);
          border: 1px solid var(--border-card);
          border-bottom-left-radius: 4px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
        }

        .message-user .message-bubble {
          background: #111315;
          color: #ffffff;
          border-bottom-right-radius: 4px;
        }

        .success-bubble {
          background: rgba(255, 42, 95, 0.1) !important;
          border: 1px solid rgba(255, 42, 95, 0.25) !important;
          color: var(--text-main) !important;
        }

        .msg-time {
          display: block;
          font-size: 0.65rem;
          color: #9aa8a1;
          margin-top: 4px;
          text-align: right;
        }

        /* Plan Option Pills */
        .chat-plan-options-container {
          margin-left: 34px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .select-plan-hint {
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--text-light);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .chat-plans-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6px;
        }

        .chat-plan-pill {
          background: rgba(255,255,255,0.06);
          border: 1px solid var(--border-card);
          border-radius: 12px;
          padding: 8px 10px;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          flex-direction: column;
        }

        .chat-plan-pill:hover {
          border-color: var(--accent-red);
          background: rgba(255, 42, 95, 0.1);
          transform: translateY(-1px);
        }

        .chat-plan-pill.popular-pill {
          border-color: var(--accent-red);
          background: rgba(255, 42, 95, 0.06);
        }

        .pill-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.8rem;
          color: var(--text-main);
          margin-bottom: 2px;
        }

        .pill-rec {
          font-size: 0.58rem;
          background: var(--accent-red);
          color: #ffffff;
          padding: 1px 5px;
          border-radius: var(--radius-full);
          font-weight: 700;
        }

        .pill-cost {
          font-size: 0.72rem;
          color: var(--accent-red);
          font-weight: 700;
        }

        /* Typing Bubble */
        .typing-bubble {
          background: rgba(255,255,255,0.08);
          border: 1px solid var(--border-card);
          padding: 12px 16px;
          border-radius: 18px;
          border-bottom-left-radius: 4px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .typing-dot {
          width: 6px;
          height: 6px;
          background-color: var(--accent-red);
          border-radius: 50%;
          animation: dotBounce 1.4s infinite ease-in-out both;
        }

        .typing-dot:nth-child(1) { animation-delay: -0.32s; }
        .typing-dot:nth-child(2) { animation-delay: -0.16s; }

        @keyframes dotBounce {
          0%, 80%, 100% { transform: scale(0); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }

        /* Success Actions */
        .chat-success-actions {
          margin-left: 34px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding-top: 6px;
        }

        .desk-address-chip {
          background: rgba(255,255,255,0.06);
          border: 1px solid var(--border-card);
          padding: 8px 12px;
          border-radius: 10px;
          font-size: 0.72rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .chat-reset-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background: #111315;
          color: #ffffff;
          padding: 9px 16px;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          font-weight: 700;
          transition: background 0.2s ease;
        }

        .chat-reset-btn:hover {
          background: #24282e;
        }

        /* Footer */
        .chat-footer {
          padding: 12px 14px;
          background: var(--bg-card);
          border-top: 1px solid var(--border-card);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .chat-footer input {
          flex: 1;
          padding: 10px 14px;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-card);
          background: rgba(255,255,255,0.06);
          color: var(--text-main);
          font-family: var(--font-body);
          font-size: 0.85rem;
          outline: none;
        }

        .chat-footer input:focus {
          border-color: var(--accent-red);
        }

        .chat-send-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: var(--accent-red);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease;
        }

        .chat-send-btn:hover:not(:disabled) {
          transform: scale(1.05);
          background: var(--accent-red-hover);
        }

        .chat-send-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .chat-footer-completed {
          padding: 14px;
          background: var(--bg-card);
          border-top: 1px solid var(--border-card);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--accent-red);
        }

        .done-check-icon {
          color: var(--accent-red);
        }

        @media (max-width: 480px) {
          .chat-window {
            width: calc(100vw - 32px);
            right: 16px;
            bottom: 16px;
            height: 480px;
          }
          .chatbot-root {
            right: 16px;
            bottom: 16px;
          }
        }
      `}</style>
    </div>
  );
}
