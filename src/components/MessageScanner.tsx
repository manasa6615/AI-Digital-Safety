import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { analyzeContent, AnalysisReport } from '../services/analyzer';
import { DEMO_SCENARIOS } from '../services/demoData';
import { SearchCode, Sparkles, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';

interface MessageScannerProps {
  onAnalysisComplete: (report: AnalysisReport) => void;
}

export const MessageScanner: React.FC<MessageScannerProps> = ({ onAnalysisComplete }) => {
  const { t, language } = useLanguage();
  const [inputMessage, setInputMessage] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');

  const handleAnalyze = () => {
    if (!inputMessage.trim()) return;

    setIsAnalyzing(true);
    setLoadingStep(t.loading.readingContent);

    setTimeout(() => {
      setLoadingStep(t.loading.checkingPatterns);
      setTimeout(() => {
        setLoadingStep(t.loading.preparingAdvice);
        setTimeout(() => {
          const report = analyzeContent(inputMessage, 'message', language);
          setIsAnalyzing(false);
          onAnalysisComplete(report);
        }, 300);
      }, 350);
    }, 350);
  };

  const handleLoadDemo = (content: string) => {
    setInputMessage(content);
  };

  return (
    <div style={{ maxWidth: '840px', margin: '0 auto', padding: '24px 20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '1.45rem', fontWeight: 800, fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <SearchCode style={{ color: 'var(--accent-cyan)' }} size={24} />
          <span>{t.messageScanner.title}</span>
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
          {t.messageScanner.subtitle}
        </p>
      </div>

      {/* Quick Demo Scenarios Ribbon */}
      <div style={{ marginBottom: '18px' }}>
        <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px' }}>
          {t.dashboard.quickDemoTitle}:
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {DEMO_SCENARIOS.slice(0, 4).map((demo) => (
            <button
              key={demo.id}
              className="btn btn-secondary"
              onClick={() => handleLoadDemo(demo.content)}
              style={{ fontSize: '0.78rem', padding: '6px 12px' }}
            >
              <Sparkles size={13} style={{ color: 'var(--accent-cyan)' }} />
              <span>{demo.defaultTitle}</span>
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
          padding: '20px',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <textarea
          rows={6}
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder={t.messageScanner.inputPlaceholder}
          style={{
            width: '100%',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-sm)',
            padding: '14px',
            color: 'var(--text-primary)',
            fontSize: '0.95rem',
            resize: 'vertical',
            outline: 'none',
          }}
          onFocus={(e) => (e.target.style.borderColor = 'var(--accent-cyan)')}
          onBlur={(e) => (e.target.style.borderColor = 'var(--border-medium)')}
        />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '14px', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <ShieldCheck size={16} style={{ color: 'var(--risk-safe-text)' }} />
            <span>{t.messageScanner.privacyNote}</span>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              className="btn btn-secondary"
              onClick={() => setInputMessage('')}
              disabled={!inputMessage || isAnalyzing}
            >
              <Trash2 size={16} />
              <span>{t.messageScanner.clearBtn}</span>
            </button>

            <button
              className="btn btn-primary"
              onClick={handleAnalyze}
              disabled={!inputMessage.trim() || isAnalyzing}
            >
              {isAnalyzing ? (
                <span>{loadingStep}</span>
              ) : (
                <>
                  <span>{t.messageScanner.analyzeBtn}</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
