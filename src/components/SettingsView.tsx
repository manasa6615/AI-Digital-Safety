import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SUPPORTED_LANGUAGES, SupportedLanguage } from '../locales';
import { Settings as SettingsIcon, Globe, Mic, CheckCircle2, HeartHandshake, Volume2 } from 'lucide-react';

interface SettingsViewProps {
  familyMode: boolean;
  onToggleFamilyMode: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  familyMode,
  onToggleFamilyMode,
}) => {
  const { language, setLanguage, t } = useLanguage();
  const [speechSpeed, setSpeechSpeed] = useState('0.95');
  const [autoSpeech, setAutoSpeech] = useState(true);
  const [showSaved, setShowSaved] = useState(false);

  const handleSave = () => {
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2500);
  };

  return (
    <div style={{ maxWidth: '840px', margin: '0 auto', padding: '24px 20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '1.45rem', fontWeight: 800, fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <SettingsIcon style={{ color: 'var(--accent-cyan)' }} size={24} />
          <span>{t.settings.title}</span>
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
          {t.settings.subtitle}
        </p>
      </div>

      {showSaved && (
        <div
          style={{
            padding: '12px 18px',
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid var(--risk-safe-border)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--risk-safe-text)',
            fontSize: '0.88rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '20px',
          }}
        >
          <CheckCircle2 size={18} />
          <span>{t.settings.savedNotice}</span>
        </div>
      )}

      {/* Language Section */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
          marginBottom: '20px',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
          <Globe size={18} style={{ color: 'var(--accent-cyan)' }} />
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{t.settings.languageLabel}</h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '10px' }}>
          {SUPPORTED_LANGUAGES.map((item) => {
            const isSelected = item.code === language;
            return (
              <button
                key={item.code}
                className={`btn ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setLanguage(item.code as SupportedLanguage)}
                style={{
                  justifyContent: 'flex-start',
                  padding: '10px 14px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  border: isSelected ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                }}
              >
                <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>{item.nativeName}</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>{item.name}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Voice Configuration */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
          marginBottom: '20px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
          <Mic size={18} style={{ color: 'var(--accent-cyan)' }} />
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{t.voiceGuardian.title}</h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
              {t.settings.speechSpeedLabel} ({speechSpeed}x)
            </label>
            <input
              type="range"
              min="0.75"
              max="1.25"
              step="0.05"
              value={speechSpeed}
              onChange={(e) => setSpeechSpeed(e.target.value)}
              style={{ width: '100%', maxWidth: '360px', accentColor: 'var(--accent-cyan)' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <input
              type="checkbox"
              id="auto-speech"
              checked={autoSpeech}
              onChange={(e) => setAutoSpeech(e.target.checked)}
              style={{ width: '18px', height: '18px', accentColor: 'var(--accent-cyan)' }}
            />
            <label htmlFor="auto-speech" style={{ fontSize: '0.9rem', color: 'var(--text-primary)', cursor: 'pointer' }}>
              {t.settings.autoSpeechLabel}
            </label>
          </div>
        </div>
      </div>

      {/* Family Safety Mode Configuration */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
          marginBottom: '24px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
          <HeartHandshake size={18} style={{ color: '#ec4899' }} />
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{t.familyMode.badge}</h3>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <input
            type="checkbox"
            id="family-default"
            checked={familyMode}
            onChange={onToggleFamilyMode}
            style={{ width: '18px', height: '18px', accentColor: '#ec4899' }}
          />
          <label htmlFor="family-default" style={{ fontSize: '0.9rem', color: 'var(--text-primary)', cursor: 'pointer' }}>
            {t.settings.familyModeDefault}
          </label>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button className="btn btn-primary" onClick={handleSave} style={{ padding: '10px 24px' }}>
          <span>{t.settings.saveBtn}</span>
        </button>
      </div>
    </div>
  );
};
