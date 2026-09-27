import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { analyzeContent, AnalysisReport } from '../services/analyzer';
import { Link2, ShieldAlert, AlertTriangle, ArrowRight, ShieldCheck, Lock, ExternalLink } from 'lucide-react';

interface UrlCheckerProps {
  onAnalysisComplete: (report: AnalysisReport) => void;
}

export const UrlChecker: React.FC<UrlCheckerProps> = ({ onAnalysisComplete }) => {
  const { t, language } = useLanguage();
  const [urlInput, setUrlInput] = useState('');
  const [isChecking, setIsChecking] = useState(false);

  const sampleUrls = [
    { title: "SBI KYC Phishing Link", url: "http://sbi-kyc-update-portal.top/login" },
    { title: "India Post Delivery Scam", url: "http://delivery-update-example.com/track" },
    { title: "KBC Lottery Prize Link", url: "http://claim-prize-example.com/kbc25lakh" },
    { title: "Legitimate Swiggy UPI Link", url: "https://swiggy.com/order-help" },
  ];

  const handleCheck = () => {
    if (!urlInput.trim()) return;
    setIsChecking(true);

    setTimeout(() => {
      const report = analyzeContent(urlInput, 'url', language);
      setIsChecking(false);
      onAnalysisComplete(report);
    }, 600);
  };

  return (
    <div style={{ maxWidth: '840px', margin: '0 auto', padding: '24px 20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '1.45rem', fontWeight: 800, fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Link2 style={{ color: 'var(--accent-cyan)' }} size={24} />
          <span>{t.urlChecker.title}</span>
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
          {t.urlChecker.subtitle}
        </p>
      </div>

      {/* Critical Cybersecurity Educational Banner */}
      <div
        style={{
          background: 'rgba(245, 158, 11, 0.08)',
          border: '1px solid rgba(245, 158, 11, 0.25)',
          borderRadius: 'var(--radius-md)',
          padding: '14px 18px',
          marginBottom: '20px',
          display: 'flex',
          gap: '12px',
          alignItems: 'flex-start',
        }}
      >
        <Lock size={18} style={{ color: 'var(--risk-med-text)', flexShrink: 0, marginTop: '2px' }} />
        <div style={{ fontSize: '0.84rem', color: '#fde68a', lineHeight: 1.5 }}>
          {t.urlChecker.httpsNotice}
        </div>
      </div>

      {/* Quick Demo Scenarios */}
      <div style={{ marginBottom: '18px' }}>
        <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px' }}>
          {t.dashboard.quickDemoTitle}:
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {sampleUrls.map((sample, idx) => (
            <button
              key={idx}
              className="btn btn-secondary"
              onClick={() => setUrlInput(sample.url)}
              style={{ fontSize: '0.78rem', padding: '6px 12px' }}
            >
              <span>{sample.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder={t.urlChecker.inputPlaceholder}
            style={{
              flex: 1,
              minWidth: '260px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-sm)',
              padding: '12px 16px',
              color: 'var(--text-primary)',
              fontSize: '0.95rem',
              outline: 'none',
              fontFamily: 'var(--font-mono)',
            }}
            onFocus={(e) => (e.target.style.borderColor = 'var(--accent-cyan)')}
            onBlur={(e) => (e.target.style.borderColor = 'var(--border-medium)')}
          />
          <button
            className="btn btn-primary"
            onClick={handleCheck}
            disabled={!urlInput.trim() || isChecking}
            style={{ padding: '0 24px' }}
          >
            {isChecking ? (
              <span>{t.urlChecker.analyzingUrl}</span>
            ) : (
              <>
                <span>{t.urlChecker.checkBtn}</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
