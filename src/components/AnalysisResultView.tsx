import React, { useState } from 'react';
import { AnalysisReport } from '../services/analyzer';
import { useLanguage } from '../context/LanguageContext';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Copy,
  Check,
  ExternalLink,
  ChevronRight,
  HeartHandshake,
  ArrowLeft,
  Info,
} from 'lucide-react';

interface AnalysisResultViewProps {
  report: AnalysisReport;
  onNewScan: () => void;
  familyMode: boolean;
  onToggleFamilyMode: () => void;
}

export const AnalysisResultView: React.FC<AnalysisResultViewProps> = ({
  report,
  onNewScan,
  familyMode,
  onToggleFamilyMode,
}) => {
  const { t } = useLanguage();
  const [activePlanTab, setActivePlanTab] = useState<'received' | 'clicked' | 'entered' | 'paid'>('received');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(report.actionPlan.safeResponse);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'HIGH':
        return {
          pillClass: 'status-red',
          textClass: 'var(--risk-high-text)',
          bgClass: 'var(--risk-high-bg)',
          borderClass: 'var(--risk-high-border)',
          label: t.report.levelHigh,
          icon: ShieldAlert,
        };
      case 'MEDIUM':
        return {
          pillClass: 'status-amber',
          textClass: 'var(--risk-med-text)',
          bgClass: 'var(--risk-med-bg)',
          borderClass: 'var(--risk-med-border)',
          label: t.report.levelMedium,
          icon: AlertTriangle,
        };
      default:
        return {
          pillClass: 'status-green',
          textClass: 'var(--risk-safe-text)',
          bgClass: 'var(--risk-safe-bg)',
          borderClass: 'var(--risk-safe-border)',
          label: report.riskScore <= 15 ? t.report.levelSafe : t.report.levelLow,
          icon: ShieldCheck,
        };
    }
  };

  const riskMeta = getRiskColor(report.riskLevel);
  const RiskIcon = riskMeta.icon;

  // Category translation
  const categoryName = (t.categories as Record<string, string>)[report.categoryKey] || t.categories.banking;

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '24px 20px' }}>
      {/* Header Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <button className="btn btn-secondary" onClick={onNewScan} style={{ fontSize: '0.85rem' }}>
          <ArrowLeft size={16} />
          <span>{t.report.newScanBtn}</span>
        </button>

        <button
          onClick={onToggleFamilyMode}
          className={`btn ${familyMode ? 'btn-primary' : 'btn-secondary'}`}
          style={{ fontSize: '0.85rem' }}
        >
          <HeartHandshake size={16} />
          <span>{familyMode ? `${t.familyMode.badge}: ON` : t.familyMode.toggleLabel}</span>
        </button>
      </div>

      {/* Family Mode Simplified Banner if active */}
      {familyMode && (
        <div
          style={{
            background: report.riskLevel === 'HIGH' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(14, 165, 233, 0.12)',
            border: `1px solid ${report.riskLevel === 'HIGH' ? 'var(--risk-high-border)' : 'var(--accent-cyan-border)'}`,
            borderRadius: 'var(--radius-md)',
            padding: '16px 20px',
            marginBottom: '24px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '1.05rem', color: report.riskLevel === 'HIGH' ? 'var(--risk-high-text)' : 'var(--accent-cyan)' }}>
            <HeartHandshake size={20} />
            <span>{t.familyMode.simplifiedTitle}</span>
          </div>
          <p style={{ marginTop: '8px', fontSize: '0.95rem', fontWeight: 600 }}>
            {report.riskLevel === 'HIGH' ? t.familyMode.alertHigh : report.riskLevel === 'MEDIUM' ? t.familyMode.alertMedium : t.familyMode.alertLow}
          </p>
          <ul style={{ marginTop: '10px', paddingLeft: '20px', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <li>{t.familyMode.rule1}</li>
            <li>{t.familyMode.rule2}</li>
            <li>{t.familyMode.rule3}</li>
            <li>{t.familyMode.rule4}</li>
          </ul>
        </div>
      )}

      {/* Primary Risk Overview Card */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: `1px solid ${riskMeta.borderClass}`,
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
          marginBottom: '24px',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: 'var(--radius-md)',
                background: riskMeta.bgClass,
                border: `1px solid ${riskMeta.borderClass}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: riskMeta.textClass,
              }}
            >
              <RiskIcon size={28} />
            </div>
            <div>
              <div style={{ fontSize: '0.82rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.05em' }}>
                {t.report.riskLevel}
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: riskMeta.textClass }}>
                {riskMeta.label}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{t.report.riskIndicatorLabel}</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, fontFamily: 'var(--font-display)' }}>
                {report.riskScore} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>/ 100</span>
              </div>
            </div>
            <div
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                fontSize: '0.84rem',
                fontWeight: 600,
                color: 'var(--accent-cyan)',
              }}
            >
              {categoryName}
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px', marginTop: '16px' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px' }}>
            {t.report.whatWeFound}
          </div>
          <div style={{ fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
            {report.summary}
          </div>
        </div>

        {/* Redaction Notice if sensitive data was present */}
        {report.sanitization.hasRedactions && (
          <div
            style={{
              marginTop: '14px',
              padding: '8px 12px',
              background: 'rgba(56, 189, 248, 0.08)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.82rem',
              color: '#38bdf8',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Info size={15} />
            <span>{t.messageScanner.redactedNotice}</span>
          </div>
        )}
      </div>

      {/* Why This Is Suspicious (Evidence Highlights) */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
          marginBottom: '24px',
        }}
      >
        <h3 style={{ fontSize: '1.08rem', fontWeight: 700, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlertTriangle size={18} style={{ color: 'var(--risk-med-text)' }} />
          <span>{t.report.whySuspicious}</span>
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {report.flaggedEvidence.map((item, index) => (
            <div
              key={index}
              style={{
                background: 'var(--bg-surface)',
                borderLeft: '4px solid var(--risk-high-solid)',
                borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
                padding: '12px 16px',
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem', color: '#fca5a5', marginBottom: '4px' }}>
                "{item.quote}"
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <strong>Reason:</strong> {item.reason}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Conversation Progression Timeline (if present) */}
      {report.timeline && (
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '24px',
            marginBottom: '24px',
          }}
        >
          <h3 style={{ fontSize: '1.08rem', fontWeight: 700, marginBottom: '6px' }}>
            {t.conversationAnalyzer.timelineTitle}
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '18px' }}>
            {t.conversationAnalyzer.timelineIntro}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
            {report.timeline.map((step, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '4px',
                      background: 'var(--accent-cyan-subtle)',
                      color: 'var(--accent-cyan)',
                    }}
                  >
                    PHASE {step.stepNumber}
                  </span>
                  <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>{step.title}</span>
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  {step.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Personalized Safety Action Plan */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
          marginBottom: '24px',
        }}
      >
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '14px' }}>
          {t.report.actionPlanTitle}
        </h3>

        {/* Tab Selector by Incident Stage */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '18px' }}>
          <button
            className={`btn ${activePlanTab === 'received' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActivePlanTab('received')}
            style={{ fontSize: '0.82rem' }}
          >
            {t.report.stateReceived}
          </button>
          <button
            className={`btn ${activePlanTab === 'clicked' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActivePlanTab('clicked')}
            style={{ fontSize: '0.82rem' }}
          >
            {t.report.stateClicked}
          </button>
          <button
            className={`btn ${activePlanTab === 'entered' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActivePlanTab('entered')}
            style={{ fontSize: '0.82rem' }}
          >
            {t.report.stateEntered}
          </button>
          <button
            className={`btn ${activePlanTab === 'paid' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActivePlanTab('paid')}
            style={{ fontSize: '0.82rem' }}
          >
            {t.report.statePaid}
          </button>
        </div>

        {/* Action Checklist for selected state */}
        <div style={{ background: 'var(--bg-surface)', padding: '18px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--accent-cyan)', marginBottom: '10px' }}>
            {t.report.whatToDoTitle}
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {(activePlanTab === 'received'
              ? report.actionPlan.receivedOnly
              : activePlanTab === 'clicked'
              ? report.actionPlan.clickedLink
              : activePlanTab === 'entered'
              ? report.actionPlan.enteredCredentials
              : report.actionPlan.sentMoney
            ).map((step, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.88rem' }}>
                <ChevronRight size={16} style={{ color: 'var(--accent-cyan)', flexShrink: 0, marginTop: '3px' }} />
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* What NOT To Do Critical Warnings */}
        <div style={{ marginTop: '16px', background: 'rgba(239, 68, 68, 0.08)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--risk-high-border)' }}>
          <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--risk-high-text)', marginBottom: '8px' }}>
            {t.report.whatNotToDoTitle}
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {report.actionPlan.whatNotToDo.map((warn, idx) => (
              <li key={idx} style={{ fontSize: '0.85rem', color: '#fca5a5' }}>
                ❌ {warn}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Suggested Safe Response */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
          marginBottom: '24px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>{t.report.safeResponseTitle}</div>
          <button className="btn btn-secondary" onClick={handleCopy} style={{ fontSize: '0.82rem', padding: '6px 12px' }}>
            {copied ? <Check size={14} style={{ color: 'var(--risk-safe-text)' }} /> : <Copy size={14} />}
            <span>{copied ? t.report.copied : t.report.copyResponseBtn}</span>
          </button>
        </div>

        <div
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)',
            padding: '14px 18px',
            fontStyle: 'italic',
            fontSize: '0.9rem',
            color: 'var(--text-secondary)',
          }}
        >
          "{report.actionPlan.safeResponse}"
        </div>
      </div>

      {/* Independent Verification Guidance */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '14px',
        }}
      >
        <div>
          <div style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
            {t.report.verifyTitle}
          </div>
          <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
            National Cyber Crime Reporting Portal Helpline: <strong>1930</strong> (Govt of India) | Official portal: <strong>cybercrime.gov.in</strong>
          </div>
        </div>

        <a
          href="https://cybercrime.gov.in"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary"
          style={{ fontSize: '0.82rem' }}
        >
          <span>cybercrime.gov.in</span>
          <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
};
