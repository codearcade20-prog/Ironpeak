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
  Sparkles
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
      setApplications(res.data);
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

  // 1. LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="admin-login-wrapper">
        <div className="admin-login-card">
          <div className="login-badge-header">
            <div className="login-logo-wrap">
              <GymLogo size={64} glow={true} />
            </div>
            <h2>IronPeak Admin Portal</h2>
            <p>Enter desk administrator credentials to manage member applications.</p>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            {authError && (
              <div className="auth-error-banner">
                <AlertCircle size={16} />
                <span>{authError}</span>
              </div>
            )}

            <div className="field-group">
              <label htmlFor="login-username">Username / Email</label>
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
              <label htmlFor="login-password">Password</label>
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
              >
                <Sparkles size={13} />
                <span>Autofill Demo: admin@ironpeak.com / admin@123</span>
              </button>
            </div>

            <button type="submit" className="btn-primary login-submit-btn">
              <span>Sign In to Dashboard</span>
            </button>
          </form>

          <div className="login-footer-actions">
            <button onClick={onBackToSite} className="back-site-link">
              <ArrowLeft size={14} />
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
          }

          .admin-login-card {
            background: #ffffff;
            border: 1px solid var(--border-card);
            border-radius: var(--radius-xl);
            width: 100%;
            max-width: 440px;
            padding: 40px;
            box-shadow: var(--shadow-lg);
          }

          .login-badge-header {
            text-align: center;
            margin-bottom: 28px;
          }

          .lock-icon-wrap {
            width: 52px;
            height: 52px;
            border-radius: 14px;
            background-color: var(--bg-dark);
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 16px auto;
          }

          .login-badge-header h2 {
            font-size: 1.6rem;
            color: var(--text-main);
            margin-bottom: 6px;
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
            background: #fff1f2;
            color: #e11d48;
            border: 1px solid #fecdd3;
            padding: 10px 14px;
            border-radius: var(--radius-md);
            font-size: 0.8rem;
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
            color: var(--text-main);
          }

          .field-group input {
            padding: 12px 14px;
            border-radius: var(--radius-md);
            border: 1px solid var(--border-light);
            font-family: var(--font-body);
            font-size: 0.9rem;
            outline: none;
            transition: all 0.2s ease;
          }

          .field-group input:focus {
            border-color: var(--bg-dark);
            box-shadow: 0 0 0 3px rgba(17, 19, 21, 0.08);
          }

          .demo-helper-row {
            display: flex;
            justify-content: center;
          }

          .demo-autofill-btn {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: var(--accent-red-bg);
            color: var(--accent-red);
            font-size: 0.76rem;
            font-weight: 700;
            padding: 6px 12px;
            border-radius: var(--radius-full);
            border: 1px solid var(--accent-badge-border);
          }

          .demo-autofill-btn:hover {
            opacity: 0.9;
          }

          .login-submit-btn {
            width: 100%;
            padding: 13px;
            font-size: 0.95rem;
            margin-top: 4px;
          }

          .login-footer-actions {
            margin-top: 24px;
            text-align: center;
            border-top: 1px solid var(--border-light);
            padding-top: 18px;
          }

          .back-site-link {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            font-size: 0.85rem;
            font-weight: 600;
            color: var(--text-muted);
          }

          .back-site-link:hover {
            color: var(--text-main);
          }
        `}</style>
      </div>
    );
  }

  // 2. AUTHENTICATED ADMIN DASHBOARD
  return (
    <div className="admin-portal-page">
      {/* Top Admin Navbar */}
      <header className="admin-top-nav">
        <div className="admin-nav-container">
          <div className="admin-brand-side">
            <button onClick={onBackToSite} className="admin-back-btn" title="Return to Public Site">
              <ArrowLeft size={16} />
              <span>Public Website</span>
            </button>
            <GymLogo size={36} glow={true} />
            <div className="admin-title-wrap">
              <span className="admin-pill-tag">ADMIN DESK</span>
              <h1 className="admin-page-title">Member Applications</h1>
            </div>
          </div>

          <div className="admin-actions-side">
            <span className="admin-user-tag">admin@ironpeak.com</span>

            <button onClick={handleLogout} className="admin-logout-btn" title="Sign out">
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content */}
      <main className="admin-main container">
        {/* Metric Summary Cards */}
        <div className="admin-metrics-row">
          <div className="admin-metric-card">
            <span className="m-label">Total Applications</span>
            <span className="m-val">{totalCount}</span>
            <span className="m-sub">All time registrations</span>
          </div>

          <div className="admin-metric-card card-interested">
            <div className="m-header">
              <span className="m-label">Interested</span>
              <CheckCircle2 size={16} className="m-icon green-icon" />
            </div>
            <span className="m-val green-val">{interestedCount}</span>
            <span className="m-sub">Ready for tour or join</span>
          </div>

          <div className="admin-metric-card card-call-later">
            <div className="m-header">
              <span className="m-label">Call Later</span>
              <Clock size={16} className="m-icon orange-icon" />
            </div>
            <span className="m-val orange-val">{callLaterCount}</span>
            <span className="m-sub">Requires follow-up call</span>
          </div>

          <div className="admin-metric-card card-not-interested">
            <div className="m-header">
              <span className="m-label">Not Interested</span>
              <XCircle size={16} className="m-icon gray-icon" />
            </div>
            <span className="m-val gray-val">{notInterestedCount}</span>
            <span className="m-sub">Declined / unreachable</span>
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
                {st === 'Interested' && <span className="tab-count">{interestedCount}</span>}
                {st === 'Call Later' && <span className="tab-count">{callLaterCount}</span>}
                {st === 'Not Interested' && <span className="tab-count">{notInterestedCount}</span>}
              </button>
            ))}

            <button onClick={loadData} className="refresh-data-btn" title="Refresh Table">
              <RefreshCw size={15} className={loading ? 'spinning' : ''} />
            </button>
          </div>
        </div>

        {/* Applications Table (Matches prompt specifications) */}
        <div className="applications-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Applicant Name</th>
                <th>Phone Number</th>
                <th>Age</th>
                <th>Selected Plan</th>
                <th>Applied Date</th>
                <th>Status</th>
                <th>Quick Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApps.length > 0 ? (
                filteredApps.map((app) => (
                  <tr key={app.id} className="table-row">
                    {/* Name */}
                    <td>
                      <div className="applicant-cell">
                        <strong className="applicant-name">{app.name}</strong>
                        {app.message && (
                          <span className="applicant-note" title={app.message}>
                            "{app.message}"
                          </span>
                        )}
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
                          <option value="Not Interested">Not Interested</option>
                          <option value="Call Later">Call Later</option>
                        </select>
                      </div>
                    </td>

                    {/* Quick Actions (Call & WhatsApp) */}
                    <td>
                      <div className="quick-actions-row">
                        <a 
                          href={`tel:${app.phone}`} 
                          className="action-icon-btn" 
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
                      <Search size={32} className="empty-icon" />
                      <h4>No applications matched your criteria</h4>
                      <p>Try clearing your search query or switching status filters.</p>
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
          <CheckCircle2 size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Loading Flash Screen when data fetch takes time */}
      <LoadingSplashScreen 
        show={loading} 
        title="IRONPEAK DESK" 
        subtitle="FETCHING MEMBER DATA FROM DATABASE..." 
      />

      <style>{`
        .admin-portal-page {
          min-height: 100vh;
          background-color: var(--bg-main);
          padding-bottom: 80px;
        }

        .admin-top-nav {
          background-color: #ffffff;
          border-bottom: 1px solid var(--border-light);
          padding: 14px 0;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .admin-nav-container {
          max-width: 1240px;
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
          background: #f4f5f6;
          padding: 6px 12px;
          border-radius: var(--radius-full);
        }

        .admin-back-btn:hover {
          color: var(--text-main);
          background: #e9ebed;
        }

        .admin-title-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .admin-pill-tag {
          font-size: 0.65rem;
          font-weight: 800;
          background: var(--bg-dark);
          color: #ffffff;
          padding: 3px 8px;
          border-radius: var(--radius-full);
          letter-spacing: 0.08em;
        }

        .admin-page-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-main);
        }

        .admin-actions-side {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .admin-user-tag {
          font-size: 0.82rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .admin-logout-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.82rem;
          font-weight: 600;
          color: #e11d48;
          background: #fff1f2;
          padding: 6px 14px;
          border-radius: var(--radius-full);
        }

        .admin-logout-btn:hover {
          background: #ffe4e6;
        }

        /* Main */
        .admin-main {
          margin-top: 32px;
        }

        /* Metrics */
        .admin-metrics-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
          margin-bottom: 28px;
        }

        .admin-metric-card {
          background: #ffffff;
          border: 1px solid var(--border-card);
          border-radius: var(--radius-lg);
          padding: 20px 24px;
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-sm);
        }

        .m-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .m-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-light);
          font-weight: 700;
          margin-bottom: 4px;
        }

        .m-val {
          font-family: var(--font-heading);
          font-size: 2.2rem;
          font-weight: 800;
          color: var(--text-main);
          letter-spacing: -0.02em;
          line-height: 1.1;
        }

        .green-val { color: #059669; }
        .orange-val { color: #d97706; }
        .gray-val { color: #64748b; }

        .green-icon { color: #059669; }
        .orange-icon { color: #d97706; }
        .gray-icon { color: #64748b; }

        .m-sub {
          font-size: 0.78rem;
          color: var(--text-muted);
          margin-top: 4px;
        }

        /* Controls */
        .admin-controls-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 20px;
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
          color: var(--text-light);
        }

        .search-input-box input {
          width: 100%;
          padding: 10px 38px 10px 38px;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-light);
          background: #ffffff;
          font-family: var(--font-body);
          font-size: 0.88rem;
          outline: none;
        }

        .search-input-box input:focus {
          border-color: var(--bg-dark);
          box-shadow: 0 0 0 3px rgba(17, 19, 21, 0.08);
        }

        .clear-search-btn {
          position: absolute;
          right: 12px;
          font-size: 0.75rem;
          color: var(--text-light);
          font-weight: 600;
        }

        .filter-pill-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .filter-tab-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          border-radius: var(--radius-full);
          font-size: 0.82rem;
          font-weight: 600;
          background: #ffffff;
          border: 1px solid var(--border-light);
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .filter-tab-pill.active {
          background: var(--bg-dark);
          border-color: var(--bg-dark);
          color: #ffffff;
        }

        .tab-count {
          background: rgba(0, 0, 0, 0.08);
          font-size: 0.72rem;
          padding: 1px 6px;
          border-radius: var(--radius-full);
        }

        .filter-tab-pill.active .tab-count {
          background: rgba(255, 255, 255, 0.2);
          color: #ffffff;
        }

        .refresh-data-btn {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 1px solid var(--border-light);
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-main);
        }

        .refresh-data-btn:hover {
          background: #f4f5f6;
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
          background: #ffffff;
          border: 1px solid var(--border-card);
          border-radius: var(--radius-xl);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          margin-bottom: 30px;
        }

        .admin-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .admin-table th {
          background-color: #f8faf9;
          padding: 14px 20px;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-light);
          font-weight: 700;
          border-bottom: 1px solid var(--border-light);
        }

        .admin-table td {
          padding: 16px 20px;
          border-bottom: 1px solid #f1f3f2;
          font-size: 0.88rem;
          vertical-align: middle;
        }

        .table-row:hover {
          background-color: #fafbfb;
        }

        .applicant-cell {
          display: flex;
          flex-direction: column;
        }

        .applicant-name {
          color: var(--text-main);
          font-size: 0.95rem;
          font-weight: 700;
        }

        .applicant-note {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-style: italic;
          margin-top: 2px;
          max-width: 260px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .phone-cell {
          font-family: monospace;
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-main);
        }

        .age-badge {
          background: #f4f5f6;
          padding: 3px 8px;
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 0.8rem;
          color: var(--text-main);
        }

        .plan-chip {
          display: inline-block;
          font-size: 0.78rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: var(--radius-full);
        }

        .plan-basic { background: #f3f4f6; color: #374151; }
        .plan-standard { background: var(--accent-red-bg); color: var(--accent-red); }
        .plan-premium { background: #fef3c7; color: #b45309; }
        .plan-annual { background: #111315; color: #ffffff; }

        .date-cell {
          font-size: 0.82rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        /* Status Dropdown (The Key Requirement) */
        .status-dropdown-wrap {
          position: relative;
        }

        .status-select {
          padding: 6px 12px;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          font-weight: 700;
          font-family: var(--font-body);
          outline: none;
          cursor: pointer;
          border: 1px solid;
          transition: all 0.2s ease;
        }

        .status-interested {
          background-color: #ecfdf5;
          color: #047857;
          border-color: #a7f3d0;
        }

        .status-call-later {
          background-color: #fffbeb;
          color: #b45309;
          border-color: #fde68a;
        }

        .status-not-interested {
          background-color: #f3f4f6;
          color: #4b5563;
          border-color: #e5e7eb;
        }

        .quick-actions-row {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .action-icon-btn {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #f4f5f6;
          color: var(--text-main);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .action-icon-btn:hover {
          background: var(--bg-dark);
          color: #ffffff;
        }

        .whatsapp-btn:hover {
          background: #25d366;
          color: #ffffff;
        }

        .empty-table-cell {
          text-align: center;
          padding: 60px 20px !important;
        }

        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .empty-icon {
          color: var(--text-light);
          margin-bottom: 12px;
        }

        .empty-state h4 {
          font-size: 1.1rem;
          color: var(--text-main);
          margin-bottom: 4px;
        }

        .empty-state p {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        /* Toast */
        .admin-toast {
          position: fixed;
          bottom: 24px;
          right: 24px;
          background: var(--bg-dark);
          color: #ffffff;
          padding: 12px 20px;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.88rem;
          font-weight: 600;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
          z-index: 1000;
          animation: toastIn 0.2s ease-out;
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
            min-width: 700px;
          }
        }
      `}</style>
    </div>
  );
}
