import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, Smartphone, Key, Laptop, CheckCircle2 } from 'lucide-react';

export const SecurityCenter: React.FC = () => {
  const { t } = useLanguage();
  const [mfaActive, setMfaActive] = useState(true);

  return (
    <div style={{ maxWidth: '840px', margin: '0 auto', padding: '24px 20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '1.45rem', fontWeight: 800, fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ShieldCheck style={{ color: 'var(--risk-safe-text)' }} size={24} />
          <span>{t.securityCenter.title}</span>
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
          {t.securityCenter.subtitle}
        </p>
      </div>

      {/* MFA Card */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-md)', background: 'var(--accent-cyan-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-cyan)' }}>
            <Smartphone size={22} />
          </div>
          <div>
            <div style={{ fontSize: '1.05rem', fontWeight: 700 }}>{t.securityCenter.mfaTitle}</div>
            <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>{t.securityCenter.mfaDesc}</div>
            <div style={{ fontSize: '0.82rem', fontWeight: 600, color: mfaActive ? 'var(--risk-safe-text)' : '#f87171', marginTop: '4px' }}>
              {mfaActive ? t.securityCenter.mfaEnabled : t.securityCenter.mfaDisabled}
            </div>
          </div>
        </div>

        <button
          className={`btn ${mfaActive ? 'btn-secondary' : 'btn-primary'}`}
          onClick={() => setMfaActive(!mfaActive)}
        >
          <span>{t.securityCenter.toggleMfa}</span>
        </button>
      </div>

      {/* Active Device Session */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
          marginBottom: '20px',
        }}
      >
        <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '14px' }}>
          <Laptop size={22} style={{ color: 'var(--accent-cyan)' }} />
          <div>
            <div style={{ fontSize: '1rem', fontWeight: 700 }}>{t.securityCenter.sessionTitle}</div>
            <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>{t.securityCenter.activeSession}</div>
          </div>
        </div>
        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', background: 'var(--bg-surface)', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
          ⏱ {t.securityCenter.lastLogin} | 🔒 {t.securityCenter.passwordStatus}
        </div>
      </div>
    </div>
  );
};
