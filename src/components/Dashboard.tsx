import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { DEMO_SCENARIOS, DemoScenario } from '../services/demoData';
import { AnalysisReport } from '../services/analyzer';
import {
  ShieldAlert,
  ShieldCheck,
  SearchCode,
  Image as ImageIcon,
  Link2,
  MessagesSquare,
  Mail,
  Mic,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  History,
} from 'lucide-react';

interface DashboardProps {
  onSelectTool: (toolId: string) => void;
  onLoadScenario: (scenario: DemoScenario) => void;
  recentScans: AnalysisReport[];
  onViewReport: (report: AnalysisReport) => void;
  user: { name: string; email: string } | null;
  familyMode: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({
  onSelectTool,
  onLoadScenario,
  recentScans,
  onViewReport,
  user,
  familyMode,
}) => {
  const { t } = useLanguage();

  const totalAnalyses = recentScans.length + 14;
  const highRiskCount = recentScans.filter((s) => s.riskLevel === 'HIGH').length + 5;
  const linksChecked = recentScans.reduce((acc, s) => acc + s.detectedUrls.length, 0) + 18;
  const actionsCompleted = totalAnalyses * 2;

  const tools = [
    {
      id: 'message-scanner',
      icon: SearchCode,
      title: t.dashboard.cardMessageTitle,
      desc: t.dashboard.cardMessageDesc,
    },
    {
      id: 'screenshot-analyzer',
      icon: ImageIcon,
      title: t.dashboard.cardScreenshotTitle,
      desc: t.dashboard.cardScreenshotDesc,
    },
    {
      id: 'url-checker',
      icon: Link2,
      title: t.dashboard.cardUrlTitle,
      desc: t.dashboard.cardUrlDesc,
    },
    {
      id: 'conversation-analyzer',
      icon: MessagesSquare,
      title: t.dashboard.cardConversationTitle,
      desc: t.dashboard.cardConversationDesc,
    },
    {
      id: 'message-scanner', // Email uses the scanner with email sample
      icon: Mail,
      title: t.dashboard.cardEmailTitle,
      desc: t.dashboard.cardEmailDesc,
    },
    {
      id: 'voice-guardian',
      icon: Mic,
      title: t.dashboard.cardVoiceTitle,
      desc: t.dashboard.cardVoiceDesc,
    },
  ];

  return (
    <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '28px 24px' }}>
      {/* Header Greeting & Security Status */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '28px',
        }}
      >
        <div>
          <h1
            style={{
              fontSize: '1.65rem',
              fontWeight: 800,
              fontFamily: 'var(--font-display)',
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
            }}
          >
            {t.dashboard.greeting}{user ? `, ${user.name}` : ''}
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            {t.dashboard.securityStatusDesc}
          </p>
        </div>

        <div className="status-pill status-green">
          <span className="status-indicator-dot" />
          <span>{t.app.protectionActive}</span>
        </div>
      </div>

      {/* Family Mode Notice if enabled */}
      {familyMode && (
        <div
          style={{
            background: 'rgba(236, 72, 153, 0.12)',
            border: '1px solid rgba(236, 72, 153, 0.35)',
            borderRadius: 'var(--radius-md)',
            padding: '12px 18px',
            marginBottom: '24px',
            fontSize: '0.88rem',
            color: '#f472b6',
            fontWeight: 500,
          }}
        >
          🛡️ {t.dashboard.familyModeActiveNotice}
        </div>
      )}

      {/* Telemetry Metrics Grid */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-header">
            <span>{t.dashboard.metricAnalyses}</span>
            <ShieldCheck size={16} style={{ color: 'var(--accent-cyan)' }} />
          </div>
          <div className="metric-value">{totalAnalyses}</div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span>{t.dashboard.metricHighRisk}</span>
            <ShieldAlert size={16} style={{ color: '#f87171' }} />
          </div>
          <div className="metric-value" style={{ color: '#f87171' }}>{highRiskCount}</div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span>{t.dashboard.metricLinks}</span>
            <Link2 size={16} style={{ color: '#fbbf24' }} />
          </div>
          <div className="metric-value">{linksChecked}</div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span>{t.dashboard.metricSafetyActions}</span>
            <ShieldCheck size={16} style={{ color: 'var(--risk-safe-text)' }} />
          </div>
          <div className="metric-value">{actionsCompleted}</div>
        </div>
      </div>

      {/* Quick Simulated Threat Scenarios Ribbon */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '20px',
          marginBottom: '32px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <Sparkles size={16} style={{ color: 'var(--accent-cyan)' }} />
          <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>{t.dashboard.quickDemoTitle}</h3>
        </div>
        <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
          {t.dashboard.quickDemoDesc}
        </p>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {DEMO_SCENARIOS.map((demo) => (
            <button
              key={demo.id}
              className="btn btn-secondary"
              onClick={() => onLoadScenario(demo)}
              style={{ fontSize: '0.82rem', padding: '8px 14px' }}
            >
              <span>{demo.defaultTitle}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Primary Security Tools Grid */}
      <div style={{ marginBottom: '14px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, fontFamily: 'var(--font-display)' }}>
          {t.dashboard.toolsTitle}
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>
          {t.dashboard.toolsSubtitle}
        </p>
      </div>

      <div className="tools-grid">
        {tools.map((tool, idx) => {
          const Icon = tool.icon;
          return (
            <div
              key={idx}
              className="tool-card"
              onClick={() => onSelectTool(tool.id)}
            >
              <div className="tool-card-icon">
                <Icon size={22} />
              </div>
              <div>
                <div className="tool-card-title">{tool.title}</div>
                <div className="tool-card-desc">{tool.desc}</div>
              </div>
              <div className="tool-card-action">
                <span>{t.nav.scanMessage}</span>
                <ArrowRight size={14} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Security Analyses */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <History size={18} style={{ color: 'var(--accent-cyan)' }} />
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{t.dashboard.recentActivityTitle}</h3>
        </div>

        {recentScans.length === 0 ? (
          <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', textAlign: 'center', padding: '24px' }}>
            {t.dashboard.noRecentActivity}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {recentScans.slice(0, 5).map((scan) => {
              const catName = (t.categories as Record<string, string>)[scan.categoryKey] || scan.categoryKey;
              return (
                <div
                  key={scan.id}
                  onClick={() => onViewReport(scan)}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 16px',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    transition: 'var(--transition-fast)',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 600 }}>{catName}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      {scan.inputType.toUpperCase()} • {scan.timestamp}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span
                      className={`status-pill ${
                        scan.riskLevel === 'HIGH'
                          ? 'status-red'
                          : scan.riskLevel === 'MEDIUM'
                          ? 'status-amber'
                          : 'status-green'
                      }`}
                    >
                      {scan.riskLevel === 'HIGH' ? t.report.levelHigh : scan.riskLevel === 'MEDIUM' ? t.report.levelMedium : t.report.levelLow}
                    </span>
                    <ArrowRight size={14} style={{ color: 'var(--text-muted)' }} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
