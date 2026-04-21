import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import { Sun, Moon, Eye, MousePointer, Mail, Monitor, RefreshCw, ArrowLeft } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// ── Stat card ────────────────────────────────────────────────────
const StatCard = ({ icon: Icon, label, value, loading }) => (
  <div
    className="rounded-xl p-6 flex items-center gap-5"
    style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
  >
    <div
      className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
      style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)' }}
    >
      <Icon size={20} style={{ color: 'var(--color-accent)' }} />
    </div>
    <div>
      <p className="font-mono text-xs tracking-widest uppercase mb-1" style={{ color: 'var(--color-muted)' }}>
        {label}
      </p>
      {loading ? (
        <div className="h-7 w-16 rounded animate-pulse" style={{ background: 'var(--color-border)' }} />
      ) : (
        <p className="font-display font-bold text-3xl" style={{ color: 'var(--color-ink)' }}>{value}</p>
      )}
    </div>
  </div>
);

// ── Bar row ──────────────────────────────────────────────────────
const BarRow = ({ label, value, max }) => {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className="flex items-center gap-4">
      <span className="font-mono text-xs w-28 shrink-0 truncate" style={{ color: 'var(--color-muted)' }}>
        {label}
      </span>
      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--color-border)' }}>
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, background: 'var(--color-accent)' }}
        />
      </div>
      <span className="font-mono text-xs w-6 text-right shrink-0" style={{ color: 'var(--color-ink)' }}>
        {value}
      </span>
    </div>
  );
};

// ── Main dashboard ───────────────────────────────────────────────
const Dashboard = () => {
  const { isDark, toggleTheme } = useTheme();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastFetched, setLastFetched] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/api/analytics/summary`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setData(await res.json());
      setLastFetched(new Date());
    } catch (e) {
      setError('Could not reach backend. Make sure the server is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const fmt = (d) => new Date(d).toLocaleString('en-IN', {
    day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit',
  });

  const eventLabel = { page_view: 'Page View', project_click: 'Project Click', contact_submit: 'Contact Submit' };
  const maxProject = data ? Math.max(...data.projects.map(p => p.clicks), 1) : 1;
  const maxBrowser = data ? Math.max(...data.browsers.map(b => b.count), 1) : 1;

  return (
    <div className="min-h-screen font-sans" style={{ background: 'var(--color-bg)', color: 'var(--color-ink)' }}>

      {/* Header */}
      <div
        className="sticky top-0 z-10 border-b"
        style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', backdropFilter: 'blur(12px)' }}
      >
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="flex items-center gap-1.5 font-mono text-xs tracking-widest uppercase transition-colors duration-200"
              style={{ color: 'var(--color-muted)' }}
              onMouseOver={e => e.currentTarget.style.color = 'var(--color-accent)'}
              onMouseOut={e => e.currentTarget.style.color = 'var(--color-muted)'}
            >
              <ArrowLeft size={13} /> Portfolio
            </a>
            <span style={{ color: 'var(--color-border)' }}>/</span>
            <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--color-ink)' }}>
              Analytics
            </span>
          </div>

          <div className="flex items-center gap-3">
            {lastFetched && (
              <span className="font-mono text-[10px]" style={{ color: 'var(--color-muted)' }}>
                Updated {fmt(lastFetched)}
              </span>
            )}
            <button
              onClick={fetchData}
              className="flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 rounded-lg transition-colors duration-200"
              style={{ border: '1px solid var(--color-border)', color: 'var(--color-muted)' }}
              onMouseOver={e => e.currentTarget.style.color = 'var(--color-ink)'}
              onMouseOut={e => e.currentTarget.style.color = 'var(--color-muted)'}
            >
              <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
            <button
              onClick={toggleTheme}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200"
              style={{ border: '1px solid var(--color-border)', color: 'var(--color-muted)' }}
            >
              {isDark ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">

        {/* Error */}
        {error && (
          <div
            className="rounded-xl p-4 font-mono text-sm"
            style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444' }}
          >
            {error}
          </div>
        )}

        {/* Stat cards */}
        <div className="grid sm:grid-cols-3 gap-4">
          <StatCard icon={Eye}            label="Page Views"   value={data?.totals.page_view    ?? 0} loading={loading} />
          <StatCard icon={MousePointer}   label="Project Clicks" value={data?.totals.project_click ?? 0} loading={loading} />
          <StatCard icon={Mail}           label="Contact Submits" value={data?.totals.contact_submit ?? 0} loading={loading} />
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          {/* Project clicks */}
          <div
            className="rounded-xl p-6 space-y-4"
            style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
          >
            <p className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--color-muted)' }}>
              Project Clicks
            </p>
            {loading ? (
              <div className="space-y-3">
                {[1,2,3].map(i => (
                  <div key={i} className="h-4 rounded animate-pulse" style={{ background: 'var(--color-border)' }} />
                ))}
              </div>
            ) : data?.projects.length === 0 ? (
              <p className="font-mono text-xs" style={{ color: 'var(--color-muted)' }}>No data yet.</p>
            ) : (
              <div className="space-y-3">
                {data.projects.map(p => (
                  <BarRow key={p.title} label={p.title} value={p.clicks} max={maxProject} />
                ))}
              </div>
            )}
          </div>

          {/* Browser breakdown */}
          <div
            className="rounded-xl p-6 space-y-4"
            style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
          >
            <div className="flex items-center gap-2">
              <Monitor size={14} style={{ color: 'var(--color-muted)' }} />
              <p className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--color-muted)' }}>
                Browsers
              </p>
            </div>
            {loading ? (
              <div className="space-y-3">
                {[1,2,3].map(i => (
                  <div key={i} className="h-4 rounded animate-pulse" style={{ background: 'var(--color-border)' }} />
                ))}
              </div>
            ) : data?.browsers.length === 0 ? (
              <p className="font-mono text-xs" style={{ color: 'var(--color-muted)' }}>No data yet.</p>
            ) : (
              <div className="space-y-3">
                {data.browsers.map(b => (
                  <BarRow key={b.name} label={b.name} value={b.count} max={maxBrowser} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent events */}
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: '1px solid var(--color-border)' }}
        >
          <div
            className="px-6 py-4 border-b"
            style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
          >
            <p className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--color-muted)' }}>
              Recent Events
            </p>
          </div>

          {loading ? (
            <div className="divide-y" style={{ borderColor: 'var(--color-border)' }}>
              {[...Array(5)].map((_, i) => (
                <div key={i} className="px-6 py-4 flex items-center gap-4">
                  <div className="h-4 w-24 rounded animate-pulse" style={{ background: 'var(--color-border)' }} />
                  <div className="h-4 w-32 rounded animate-pulse" style={{ background: 'var(--color-border)' }} />
                  <div className="h-4 flex-1 rounded animate-pulse" style={{ background: 'var(--color-border)' }} />
                </div>
              ))}
            </div>
          ) : !data?.recent?.length ? (
            <div className="px-6 py-8 text-center font-mono text-xs" style={{ color: 'var(--color-muted)' }}>
              No events recorded yet.
            </div>
          ) : (
            <div className="divide-y overflow-x-auto" style={{ borderColor: 'var(--color-border)' }}>
              {data.recent.map((ev, i) => (
                <div
                  key={i}
                  className="px-6 py-3.5 flex items-center gap-4 min-w-0"
                  style={{ background: i % 2 === 0 ? 'var(--color-bg)' : 'var(--color-surface)' }}
                >
                  {/* Badge */}
                  <span
                    className="font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 rounded shrink-0"
                    style={{
                      background: ev.event_type === 'page_view'
                        ? 'rgba(107,255,198,0.1)' : ev.event_type === 'project_click'
                        ? 'rgba(99,102,241,0.12)' : 'rgba(251,191,36,0.12)',
                      color: ev.event_type === 'page_view'
                        ? 'var(--color-accent)' : ev.event_type === 'project_click'
                        ? '#818cf8' : '#fbbf24',
                    }}
                  >
                    {eventLabel[ev.event_type] ?? ev.event_type}
                  </span>

                  {/* Payload */}
                  <span className="font-mono text-xs truncate flex-1" style={{ color: 'var(--color-muted)' }}>
                    {ev.payload ? JSON.stringify(ev.payload) : '—'}
                  </span>

                  {/* Time */}
                  <span className="font-mono text-[10px] shrink-0" style={{ color: 'var(--color-muted)' }}>
                    {fmt(ev.created_at)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

// Wrap with ThemeProvider so CSS vars work on this standalone page
const AdminPage = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default AdminPage;
