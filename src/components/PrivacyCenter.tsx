import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Lock, ShieldAlert, Trash2, CheckCircle2, RefreshCw } from 'lucide-react';

interface PrivacyCenterProps {
  onClearHistory: () => void;
  onResetProfile: () => void;
}

export const PrivacyCenter: React.FC<PrivacyCenterProps> = ({ onClearHistory, onResetProfile }) => {
  const { t } = useLanguage();
  const [clearedNotice, setClearedNotice] = useState(false);

  const handleWipe = () => {
    onClearHistory();
    setClearedNotice(true);
    setTimeout(() => setClearedNotice(false), 3000);
  };

  return (
    <div style={{ maxWidth: '840px', margin: '0 auto', padding: '24px 20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '1.45rem', fontWeight: 800, fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Lock style={{ color: 'var(--accent-cyan)' }} size={24} />
          <span>{t.privacyCenter.title}</span>
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
          {t.privacyCenter.subtitle}
        </p>
      </div>

      {/* Strict Privacy Rule Banner */}
      <div
        style={{
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid var(--risk-high-border)',
          borderRadius: 'var(--radius-md)',
          padding: '16px 20px',
          marginBottom: '24px',
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
        }}
      >
        <ShieldAlert size={22} style={{ color: 'var(--risk-high-text)', flexShrink: 0 }} />
        <div style={{ fontSize: '0.92rem', fontWeight: 600, color: '#fca5a5' }}>
          {t.privacyCenter.warningBanner}
        </div>
      </div>

      {/* What Data is Stored Card */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
          marginBottom: '24px',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '10px' }}>
          {t.privacyCenter.dataStoredTitle}
        </h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
          {t.privacyCenter.dataStoredDesc}
        </p>

        <div style={{ background: 'var(--bg-surface)', padding: '14px 18px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', fontSize: '0.85rem' }}>
          🛡️ <strong>{t.privacyCenter.localOnly}:</strong> Numbers matching 4-8 digit OTPs, 16-digit debit/credit card sequences, and passwords are permanently masked to <code>[REDACTED]</code> on the client side before any analysis algorithms run.
        </div>
      </div>

      {/* User Data Controls */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '14px' }}>
          {t.privacyCenter.accountDataTitle}
        </h3>

        {clearedNotice && (
          <div
            style={{
              padding: '10px 14px',
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid var(--risk-safe-border)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--risk-safe-text)',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '16px',
            }}
          >
            <CheckCircle2 size={16} />
            <span>{t.privacyCenter.wipeSuccess}</span>
          </div>
        )}

        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
          <button className="btn btn-danger" onClick={handleWipe}>
            <Trash2 size={16} />
            <span>{t.privacyCenter.wipeHistoryBtn}</span>
          </button>

          <button className="btn btn-secondary" onClick={onResetProfile}>
            <RefreshCw size={16} />
            <span>{t.privacyCenter.deleteAccountBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
