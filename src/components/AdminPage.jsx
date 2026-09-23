import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  LogOut, 
  ArrowLeft, 
  Phone, 
  MessageCircle, 
  Search, 
  RefreshCw, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Filter, 
  Database, 
  Key, 
  Check, 
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Users,
  Activity,
  Layers
} from 'lucide-react';
import { 
  fetchMemberApplications, 
  updateApplicationStatus 
} from '../lib/supabase';
import GymLogo from './GymLogo';
import LoadingSplashScreen from './LoadingSplashScreen';

export default function AdminPage({ onBackToSite }) {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('ironpeak_admin_auth') === 'true';
  });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Dashboard Data State
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [toastMessage, setToastMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim() === 'admin@ironpeak.com' && password === 'admin@123') {
      sessionStorage.setItem('ironpeak_admin_auth', 'true');
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid credentials. Use admin@ironpeak.com and admin@123');
    }
  };

  const fillDemoCreds = () => {
    setUsername('admin@ironpeak.com');
    setPassword('admin@123');
    setAuthError('');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('ironpeak_admin_auth');
    setIsAuthenticated(false);
  };

  const loadData = async () => {
    setLoading(true);
    const start = Date.now();
    try {
      const res = await fetchMemberApplications();
      const elapsed = Date.now() - start;
      if (elapsed < 500) {
        await new Promise(r => setTimeout(r, 500 - elapsed));
      }
      setApplications(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const handleStatusChange = async (id, newStatus, applicantName) => {
    // Optimistic UI update
    setApplications(prev => prev.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    ));

    try {
      await updateApplicationStatus(id, newStatus);
      showToast(`Updated ${applicantName} to "${newStatus}"`);
    } catch (err) {
      console.error(err);
      showToast(`Failed to update status`);
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Filtered Applications
  const filteredApps = applications.filter(app => {
    const matchesSearch = 
      (app.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (app.phone || '').includes(searchQuery) ||
      (app.plan_name || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Metric counts
  const totalCount = applications.length;
  const interestedCount = applications.filter(a => a.status === 'Interested').length;
  const callLaterCount = applications.filter(a => a.status === 'Call Later').length;
  const notInterestedCount = applications.filter(a => a.status === 'Not Interested').length;

  const formatDate = (isoString) => {
    if (!isoString) return '22 Sep 2026';
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch {
      return '22 Sep 2026';
    }
  };

  // Helper for initial avatar
  const getInitials = (name) => {
    if (!name) return 'IP';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  // 1. LOGIN SCREEN (SLIGHT DARK LUXURY THEME)
  if (!isAuthenticated) {
    return (
      <div className="admin-login-wrapper">
        <div className="admin-login-ambient-flare"></div>
        <div className="admin-login-ambient-flare-2"></div>
        
        <div className="admin-login-card">
          <div className="login-badge-header">
            <div className="login-logo-wrap">
              <GymLogo size={68} glow={true} />
            </div>
            <div className="login-sub-badge">
              <ShieldCheck size={13} />
              <span>SECURE DESK ACCESS</span>
            </div>
            <h2>IronPeak Admin Portal</h2>
            <p>Access member registrations, plan selections, and desk management console.</p>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            {authError && (
              <div className="auth-error-banner">
                <AlertCircle size={16} />
                <span>{authError}</span>
              </div>
            )}

            <div className="field-group">
              <label htmlFor="login-username">Admin Email</label>
              <input
                id="login-username"
                type="email"
                required
                placeholder="admin@ironpeak.com"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="field-group">
              <label htmlFor="login-password">Desk Key / Password</label>
              <input
                id="login-password"
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="demo-helper-row">
              <button 
                type="button" 
                onClick={fillDemoCreds} 
                className="demo-autofill-btn"
                title="Click to auto-fill demo credentials"
              >
                <Sparkles size={13} className="sparkle-icon" />
                <span>Autofill Demo: admin@ironpeak.com / admin@123</span>
              </button>
            </div>

            <button type="submit" className="login-submit-btn">
              <span>Sign In to Dashboard</span>
            </button>
          </form>

          <div className="login-footer-actions">
            <button onClick={onBackToSite} className="back-site-link">
              <ArrowLeft size={15} />
              <span>Return to Public Website</span>
            </button>
          </div>
        </div>

        <style>{`
          .admin-login-wrapper {
            min-height: 100vh;
            background-color: var(--bg-main);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 24px;
            position: relative;
            overflow: hidden;
          }

          .admin-login-ambient-flare {
            position: absolute;
            top: 20%;
            left: 50%;
            transform: translateX(-50%);
            width: 500px;
            height: 500px;
            background: radial-gradient(circle, rgba(255, 42, 95, 0.12) 0%, transparent 70%);
            filter: blur(60px);
            pointer-events: none;
          }

          .admin-login-ambient-flare-2 {
            position: absolute;
            bottom: 10%;
            right: 15%;
            width: 380px;
            height: 380px;
            background: radial-gradient(circle, rgba(217, 27, 75, 0.08) 0%, transparent 70%);
            filter: blur(50px);
            pointer-events: none;
          }

          .admin-login-card {
            background: rgba(19, 22, 28, 0.88);
            backdrop-filter: blur(24px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: var(--radius-xl);
            width: 100%;
            max-width: 450px;
            padding: 42px 36px;
            box-shadow: 0 24px 60px rgba(0, 0, 0, 0.7), 0 0 40px rgba(255, 42, 95, 0.08);
            position: relative;
            z-index: 2;
          }

          .login-badge-header {
            text-align: center;
            margin-bottom: 28px;
          }

          .login-logo-wrap {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 14px;
          }

          .login-sub-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: rgba(255, 42, 95, 0.12);
            border: 1px solid rgba(255, 42, 95, 0.28);
            color: #ff577d;
            font-size: 0.7rem;
            font-weight: 800;
            padding: 4px 10px;
            border-radius: var(--radius-full);
            letter-spacing: 0.08em;
            margin-bottom: 12px;
          }

          .login-badge-header h2 {
            font-size: 1.65rem;
            color: var(--text-main);
            font-weight: 800;
            letter-spacing: -0.02em;
            margin-bottom: 8px;
          }

          .login-badge-header p {
            font-size: 0.85rem;
            color: var(--text-muted);
            line-height: 1.5;
          }

          .login-form {
            display: flex;
            flex-direction: column;
            gap: 18px;
          }

          .auth-error-banner {
            background: rgba(225, 29, 72, 0.15);
            color: #fda4af;
            border: 1px solid rgba(225, 29, 72, 0.35);
            padding: 10px 14px;
            border-radius: var(--radius-md);
            font-size: 0.82rem;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .field-group {
            display: flex;
            flex-direction: column;
            gap: 6px;
          }

          .field-group label {
            font-size: 0.82rem;
            font-weight: 700;
            color: #e2e8f0;
            letter-spacing: 0.02em;
          }

          .field-group input {
            padding: 12px 16px;
            border-radius: var(--radius-md);
            border: 1px solid rgba(255, 255, 255, 0.12);
            background: rgba(12, 14, 18, 0.6);
            color: #ffffff;
            font-family: var(--font-body);
            font-size: 0.92rem;
            outline: none;
            transition: all 0.2s ease;
          }

          .field-group input:focus {
            border-color: var(--accent-red);
            background: rgba(12, 14, 18, 0.9);
            box-shadow: 0 0 0 3px rgba(255, 42, 95, 0.18);
          }

          .field-group input::placeholder {
            color: #64748b;
          }

          .demo-helper-row {
            display: flex;
            justify-content: center;
          }

          .demo-autofill-btn {
            display: inline-flex;
            align-items: center;
            gap: 7px;
            background: rgba(255, 42, 95, 0.1);
            color: #ff577d;
            font-size: 0.76rem;
            font-weight: 700;
            padding: 8px 14px;
            border-radius: var(--radius-full);
            border: 1px solid rgba(255, 42, 95, 0.28);
            transition: all 0.2s ease;
          }

          .demo-autofill-btn:hover {
            background: rgba(255, 42, 95, 0.18);
            border-color: rgba(255, 42, 95, 0.45);
            transform: translateY(-1px);
          }

          .sparkle-icon {
            color: #ff2a5f;
            animation: pulseSparkle 2s infinite ease-in-out;
          }

          @keyframes pulseSparkle {
            0%, 100% { opacity: 0.8; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.15); }
          }

          .login-submit-btn {
            width: 100%;
            padding: 13px;
            font-size: 0.95rem;
            font-weight: 700;
            color: #ffffff;
            background: linear-gradient(135deg, #ff2a5f 0%, #d91b4b 100%);
            border-radius: var(--radius-md);
            margin-top: 6px;
            box-shadow: 0 6px 20px rgba(255, 42, 95, 0.35);
            transition: all 0.2s ease;
          }

          .login-submit-btn:hover {
            opacity: 0.95;
            box-shadow: 0 8px 26px rgba(255, 42, 95, 0.5);
            transform: translateY(-1px);
          }

          .login-footer-actions {
            margin-top: 24px;
            text-align: center;
            border-top: 1px solid rgba(255, 255, 255, 0.08);
            padding-top: 18px;
          }

          .back-site-link {
            display: inline-flex;
            align-items: center;
            gap: 7px;
            font-size: 0.85rem;
            font-weight: 600;
            color: var(--text-muted);
            transition: all 0.2s ease;
          }

          .back-site-link:hover {
            color: #ffffff;
            transform: translateX(-2px);
          }
        `}</style>
      </div>
    );
  }

  // 2. AUTHENTICATED ADMIN DASHBOARD (SLIGHT DARK LUXURY THEME)
  return (
    <div className="admin-portal-page">
      {/* Top Admin Navbar */}
      <header className="admin-top-nav">
        <div className="admin-nav-container">
          <div className="admin-brand-side">
            <button onClick={onBackToSite} className="admin-back-btn" title="Return to Public Site">
              <ArrowLeft size={15} />
              <span>Public Website</span>
            </button>
            <GymLogo size={36} glow={true} />
            <div className="admin-title-wrap">
              <span className="admin-pill-tag">ADMIN DESK</span>
              <h1 className="admin-page-title">Member Applications</h1>
            </div>
          </div>

          <div className="admin-actions-side">
            <div className="admin-user-pill">
              <div className="user-online-dot"></div>
              <span className="admin-user-tag">admin@ironpeak.com</span>
            </div>

            <button onClick={handleLogout} className="admin-logout-btn" title="Sign out">
              <LogOut size={15} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content */}
      <main className="admin-main container">
        {/* Metric Summary Cards */}
        <div className="admin-metrics-row">
          <div className="admin-metric-card card-total">
            <div className="m-header">
              <span className="m-label">Total Applications</span>
              <Users size={16} className="m-icon icon-total" />
            </div>
            <span className="m-val">{totalCount}</span>
            <span className="m-sub">All time registrations recorded</span>
          </div>

          <div className="admin-metric-card card-interested">
            <div className="m-header">
              <span className="m-label">Interested</span>
              <CheckCircle2 size={16} className="m-icon green-icon" />
            </div>
            <span className="m-val green-val">{interestedCount}</span>
            <span className="m-sub">Ready for facility tour & joining</span>
          </div>

          <div className="admin-metric-card card-call-later">
            <div className="m-header">
              <span className="m-label">Call Later</span>
              <Clock size={16} className="m-icon orange-icon" />
            </div>
            <span className="m-val orange-val">{callLaterCount}</span>
            <span className="m-sub">Scheduled follow-up phone calls</span>
          </div>

          <div className="admin-metric-card card-not-interested">
            <div className="m-header">
              <span className="m-label">Not Interested</span>
              <XCircle size={16} className="m-icon gray-icon" />
            </div>
            <span className="m-val gray-val">{notInterestedCount}</span>
            <span className="m-sub">Declined / unreachable applicants</span>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="admin-controls-bar">
          <div className="search-input-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search by applicant name, phone, or plan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="clear-search-btn">
                Clear
              </button>
            )}
          </div>

          <div className="filter-pill-group">
            {['All', 'Interested', 'Call Later', 'Not Interested'].map(st => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`filter-tab-pill ${statusFilter === st ? 'active' : ''}`}
              >
                <span>{st}</span>
                {st === 'All' && <span className="tab-count">{totalCount}</span>}
                {st === 'Interested' && <span className="tab-count count-green">{interestedCount}</span>}
                {st === 'Call Later' && <span className="tab-count count-orange">{callLaterCount}</span>}
                {st === 'Not Interested' && <span className="tab-count count-gray">{notInterestedCount}</span>}
              </button>
            ))}

            <button onClick={loadData} className="refresh-data-btn" title="Refresh Applications">
              <RefreshCw size={15} className={loading ? 'spinning' : ''} />
            </button>
          </div>
        </div>

        {/* Applications Table */}
        <div className="applications-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Applicant</th>
                <th>Phone Number</th>
                <th>Age</th>
                <th>Selected Plan</th>
                <th>Applied Date</th>
                <th>Status (Direct Sync)</th>
                <th>Quick Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApps.length > 0 ? (
                filteredApps.map((app) => (
                  <tr key={app.id} className="table-row">
                    {/* Name & Note */}
                    <td>
                      <div className="applicant-cell">
                        <div className="applicant-id-wrap">
                          <div className="applicant-avatar">
                            {getInitials(app.name)}
                          </div>
                          <div className="applicant-meta">
                            <strong className="applicant-name">{app.name}</strong>
                            {app.message && (
                              <span className="applicant-note" title={app.message}>
                                "{app.message}"
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Phone */}
                    <td>
                      <div className="phone-cell">
                        <span className="phone-text">{app.phone}</span>
                      </div>
                    </td>

                    {/* Age */}
                    <td>
                      <span className="age-badge">{app.age || '—'}</span>
                    </td>

                    {/* Plan */}
                    <td>
                      <span className={`plan-chip plan-${(app.plan_name || 'Standard').toLowerCase()}`}>
                        {app.plan_name || 'Standard'}
                      </span>
                    </td>

                    {/* Applied Date */}
                    <td>
                      <span className="date-cell">{formatDate(app.created_at)}</span>
                    </td>

                    {/* Status Dropdown (Saved directly in Supabase) */}
                    <td>
                      <div className="status-dropdown-wrap">
                        <select
                          value={app.status || 'Call Later'}
                          onChange={(e) => handleStatusChange(app.id, e.target.value, app.name)}
                          className={`status-select status-${(app.status || 'Call Later').toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          <option value="Interested">Interested</option>
                          <option value="Call Later">Call Later</option>
                          <option value="Not Interested">Not Interested</option>
                        </select>
                      </div>
                    </td>

                    {/* Quick Actions (Call & WhatsApp) */}
                    <td>
                      <div className="quick-actions-row">
                        <a 
                          href={`tel:${app.phone}`} 
                          className="action-icon-btn call-btn" 
                          title={`Call ${app.name}`}
                        >
                          <Phone size={14} />
                        </a>
                        <a 
                          href={`https://wa.me/91${(app.phone || '').replace(/\D/g, '')}?text=Hi%20${encodeURIComponent(app.name)},%20this%20is%20IronPeak%20Fitness%20RS%20Puram%20regarding%20your%20${encodeURIComponent(app.plan_name || 'gym')}%20membership%20application.`}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="action-icon-btn whatsapp-btn" 
                          title="Message on WhatsApp"
                        >
                          <MessageCircle size={14} />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="empty-table-cell">
                    <div className="empty-state">
                      <div className="empty-icon-wrap">
                        <Search size={28} className="empty-icon" />
                      </div>
                      <h4>No applications matched your criteria</h4>
                      <p>Try clearing your search query or switching your status filter.</p>
                      {searchQuery && (
                        <button onClick={() => setSearchQuery('')} className="reset-filter-btn">
                          Clear Search Filter
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Live Toast Notification */}
      {toastMessage && (
        <div className="admin-toast">
          <CheckCircle2 size={16} className="toast-icon" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Loading Flash Screen when data fetch takes time */}
      <LoadingSplashScreen 
        show={loading} 
        title="IRONPEAK DESK" 
        subtitle="SYNCING LIVE MEMBER DATA FROM DATABASE..." 
      />

      <style>{`
        .admin-portal-page {
          min-height: 100vh;
          background-color: var(--bg-main);
          color: var(--text-main);
          padding-bottom: 80px;
        }

        /* Top Admin Navbar */
        .admin-top-nav {
          background: rgba(12, 14, 18, 0.88);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding: 14px 0;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .admin-nav-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .admin-brand-side {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .admin-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-muted);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 6px 14px;
          border-radius: var(--radius-full);
          transition: all 0.2s ease;
        }

        .admin-back-btn:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.18);
        }

        .admin-title-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .admin-pill-tag {
          font-size: 0.65rem;
          font-weight: 800;
          background: rgba(255, 42, 95, 0.15);
          border: 1px solid rgba(255, 42, 95, 0.35);
          color: #ff577d;
          padding: 3px 9px;
          border-radius: var(--radius-full);
          letter-spacing: 0.08em;
        }

        .admin-page-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.01em;
        }

        .admin-actions-side {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .admin-user-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 6px 14px;
          border-radius: var(--radius-full);
        }

        .user-online-dot {
          width: 7px;
          height: 7px;
          background: #10b981;
          border-radius: 50%;
          box-shadow: 0 0 8px #10b981;
        }

        .admin-user-tag {
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .admin-logout-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.82rem;
          font-weight: 600;
          color: #fb7185;
          background: rgba(244, 63, 94, 0.1);
          border: 1px solid rgba(244, 63, 94, 0.25);
          padding: 6px 14px;
          border-radius: var(--radius-full);
          transition: all 0.2s ease;
        }

        .admin-logout-btn:hover {
          background: rgba(244, 63, 94, 0.2);
          border-color: rgba(244, 63, 94, 0.4);
          color: #ffffff;
        }

        /* Main Container */
        .admin-main {
          max-width: 1280px;
          margin: 32px auto 0 auto;
          padding: 0 24px;
        }

        /* Metrics */
        .admin-metrics-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
          margin-bottom: 28px;
        }

        .admin-metric-card {
          background: rgba(19, 22, 28, 0.85);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-lg);
          padding: 20px 24px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .admin-metric-card:hover {
          transform: translateY(-3px);
          border-color: rgba(255, 255, 255, 0.15);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
        }

        .card-total {
          border-left: 3px solid #ff2a5f;
        }

        .card-interested {
          border-left: 3px solid #10b981;
        }

        .card-call-later {
          border-left: 3px solid #f59e0b;
        }

        .card-not-interested {
          border-left: 3px solid #64748b;
        }

        .m-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .m-label {
          font-size: 0.74rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-light);
          font-weight: 700;
        }

        .icon-total { color: #ff577d; }
        .green-icon { color: #10b981; }
        .orange-icon { color: #f59e0b; }
        .gray-icon { color: #94a3b8; }

        .m-val {
          font-family: var(--font-heading);
          font-size: 2.3rem;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }

        .green-val { color: #34d399; }
        .orange-val { color: #fbbf24; }
        .gray-val { color: #94a3b8; }

        .m-sub {
          font-size: 0.78rem;
          color: var(--text-muted);
          margin-top: 6px;
        }

        /* Controls */
        .admin-controls-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 22px;
          flex-wrap: wrap;
        }

        .search-input-box {
          position: relative;
          display: flex;
          align-items: center;
          flex: 1;
          max-width: 440px;
        }

        .search-icon {
          position: absolute;
          left: 14px;
          color: #64748b;
          pointer-events: none;
        }

        .search-input-box input {
          width: 100%;
          padding: 10px 42px 10px 40px;
          border-radius: var(--radius-full);
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(19, 22, 28, 0.9);
          color: #ffffff;
          font-family: var(--font-body);
          font-size: 0.88rem;
          outline: none;
          transition: all 0.2s ease;
        }

        .search-input-box input:focus {
          border-color: var(--accent-red);
          box-shadow: 0 0 0 3px rgba(255, 42, 95, 0.18);
        }

        .search-input-box input::placeholder {
          color: #64748b;
        }

        .clear-search-btn {
          position: absolute;
          right: 12px;
          font-size: 0.74rem;
          color: #94a3b8;
          font-weight: 600;
          background: rgba(255, 255, 255, 0.08);
          padding: 2px 8px;
          border-radius: var(--radius-full);
          transition: all 0.15s ease;
        }

        .clear-search-btn:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.16);
        }

        .filter-pill-group {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .filter-tab-pill {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 7px 14px;
          border-radius: var(--radius-full);
          font-size: 0.82rem;
          font-weight: 600;
          background: rgba(19, 22, 28, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .filter-tab-pill:hover {
          background: rgba(25, 29, 38, 0.9);
          color: #ffffff;
          border-color: rgba(255, 255, 255, 0.15);
        }

        .filter-tab-pill.active {
          background: linear-gradient(135deg, #ff2a5f 0%, #e11d48 100%);
          border-color: #ff2a5f;
          color: #ffffff;
          box-shadow: 0 4px 14px rgba(255, 42, 95, 0.35);
        }

        .tab-count {
          background: rgba(255, 255, 255, 0.1);
          font-size: 0.72rem;
          padding: 1px 7px;
          border-radius: var(--radius-full);
          color: var(--text-main);
        }

        .count-green {
          color: #34d399;
          background: rgba(16, 185, 129, 0.15);
        }

        .count-orange {
          color: #fbbf24;
          background: rgba(245, 158, 11, 0.15);
        }

        .count-gray {
          color: #cbd5e1;
          background: rgba(148, 163, 184, 0.15);
        }

        .filter-tab-pill.active .tab-count {
          background: rgba(255, 255, 255, 0.25);
          color: #ffffff;
        }

        .refresh-data-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(19, 22, 28, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-main);
          transition: all 0.2s ease;
        }

        .refresh-data-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
          color: #ff577d;
        }

        .spinning {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Applications Table */
        .applications-table-wrapper {
          background: rgba(19, 22, 28, 0.9);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-xl);
          overflow: hidden;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45);
          margin-bottom: 30px;
        }

        .admin-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .admin-table th {
          background: rgba(12, 14, 18, 0.9);
          padding: 15px 22px;
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-light);
          font-weight: 700;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .admin-table td {
          padding: 16px 22px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
          font-size: 0.88rem;
          vertical-align: middle;
        }

        .table-row {
          transition: background-color 0.15s ease;
        }

        .table-row:hover {
          background-color: rgba(255, 255, 255, 0.03);
        }

        .applicant-cell {
          display: flex;
          align-items: center;
        }

        .applicant-id-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .applicant-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(255, 42, 95, 0.2) 0%, rgba(217, 27, 75, 0.1) 100%);
          border: 1px solid rgba(255, 42, 95, 0.3);
          color: #ff577d;
          font-size: 0.78rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .applicant-meta {
          display: flex;
          flex-direction: column;
        }

        .applicant-name {
          color: #ffffff;
          font-size: 0.94rem;
          font-weight: 700;
        }

        .applicant-note {
          font-size: 0.74rem;
          color: var(--text-muted);
          font-style: italic;
          margin-top: 2px;
          max-width: 240px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .phone-cell {
          font-family: monospace;
          font-size: 0.88rem;
          font-weight: 600;
          color: #e2e8f0;
          letter-spacing: 0.02em;
        }

        .age-badge {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 3px 9px;
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 0.8rem;
          color: #e2e8f0;
        }

        .plan-chip {
          display: inline-block;
          font-size: 0.78rem;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: var(--radius-full);
          letter-spacing: 0.02em;
        }

        .plan-basic { 
          background: rgba(148, 163, 184, 0.12); 
          border: 1px solid rgba(148, 163, 184, 0.25);
          color: #cbd5e1; 
        }

        .plan-standard { 
          background: rgba(255, 42, 95, 0.15); 
          border: 1px solid rgba(255, 42, 95, 0.35);
          color: #ff577d; 
        }

        .plan-premium { 
          background: rgba(245, 158, 11, 0.15); 
          border: 1px solid rgba(245, 158, 11, 0.35);
          color: #fbbf24; 
        }

        .plan-annual { 
          background: rgba(168, 85, 247, 0.15); 
          border: 1px solid rgba(168, 85, 247, 0.35);
          color: #c084fc; 
        }

        .date-cell {
          font-size: 0.82rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        /* Status Dropdown */
        .status-dropdown-wrap {
          position: relative;
        }

        .status-select {
          padding: 6px 14px;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          font-weight: 700;
          font-family: var(--font-body);
          outline: none;
          cursor: pointer;
          border: 1px solid;
          transition: all 0.2s ease;
        }

        .status-select option {
          background-color: #13161c;
          color: #f8fafc;
          padding: 8px;
        }

        .status-interested {
          background-color: rgba(16, 185, 129, 0.15);
          color: #34d399;
          border-color: rgba(16, 185, 129, 0.35);
        }

        .status-call-later {
          background-color: rgba(245, 158, 11, 0.15);
          color: #fbbf24;
          border-color: rgba(245, 158, 11, 0.35);
        }

        .status-not-interested {
          background-color: rgba(148, 163, 184, 0.12);
          color: #94a3b8;
          border-color: rgba(148, 163, 184, 0.25);
        }

        .quick-actions-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .action-icon-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .call-btn:hover {
          background: #ff2a5f;
          border-color: #ff2a5f;
          color: #ffffff;
          box-shadow: 0 0 12px rgba(255, 42, 95, 0.4);
        }

        .whatsapp-btn:hover {
          background: #25d366;
          border-color: #25d366;
          color: #ffffff;
          box-shadow: 0 0 12px rgba(37, 211, 102, 0.4);
        }

        /* Empty State */
        .empty-table-cell {
          text-align: center;
          padding: 60px 20px !important;
        }

        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .empty-icon-wrap {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 14px;
        }

        .empty-icon {
          color: #64748b;
        }

        .empty-state h4 {
          font-size: 1.15rem;
          color: #ffffff;
          margin-bottom: 6px;
        }

        .empty-state p {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 16px;
        }

        .reset-filter-btn {
          font-size: 0.8rem;
          font-weight: 700;
          color: #ff577d;
          background: rgba(255, 42, 95, 0.1);
          border: 1px solid rgba(255, 42, 95, 0.3);
          padding: 6px 14px;
          border-radius: var(--radius-full);
          transition: all 0.2s ease;
        }

        .reset-filter-btn:hover {
          background: rgba(255, 42, 95, 0.2);
        }

        /* Toast */
        .admin-toast {
          position: fixed;
          bottom: 28px;
          right: 28px;
          background: rgba(19, 22, 28, 0.95);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 42, 95, 0.35);
          color: #ffffff;
          padding: 12px 22px;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.88rem;
          font-weight: 600;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(255, 42, 95, 0.2);
          z-index: 1000;
          animation: toastIn 0.25s ease-out;
        }

        .toast-icon {
          color: #ff2a5f;
        }

        @keyframes toastIn {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @media (max-width: 900px) {
          .admin-metrics-row {
            grid-template-columns: repeat(2, 1fr);
          }
          .admin-controls-bar {
            flex-direction: column;
            align-items: stretch;
          }
          .search-input-box {
            max-width: 100%;
          }
          .applications-table-wrapper {
            overflow-x: auto;
          }
          .admin-table {
            min-width: 760px;
          }
        }

        @media (max-width: 500px) {
          .admin-metrics-row {
            grid-template-columns: 1fr;
          }
          .admin-nav-container {
            flex-direction: column;
            gap: 12px;
            align-items: flex-start;
          }
          .admin-actions-side {
            width: 100%;
            justify-content: space-between;
          }
        }
      `}</style>
    </div>
  );
}
