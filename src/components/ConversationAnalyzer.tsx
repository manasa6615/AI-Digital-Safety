import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { analyzeContent, AnalysisReport } from '../services/analyzer';
import { DEMO_SCENARIOS } from '../services/demoData';
import { MessagesSquare, Sparkles, Trash2, ArrowRight } from 'lucide-react';

interface ConversationAnalyzerProps {
  onAnalysisComplete: (report: AnalysisReport) => void;
}

export const ConversationAnalyzer: React.FC<ConversationAnalyzerProps> = ({ onAnalysisComplete }) => {
  const { t, language } = useLanguage();
  const [conversationText, setConversationText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const conversationDemo = DEMO_SCENARIOS.find(d => d.id === 'conversation_job_flow') || DEMO_SCENARIOS[0];

  const handleAnalyze = () => {
    if (!conversationText.trim()) return;
    setIsAnalyzing(true);

    setTimeout(() => {
      const report = analyzeContent(conversationText, 'conversation', language);
      setIsAnalyzing(false);
      onAnalysisComplete(report);
    }, 700);
  };

  return (
    <div style={{ maxWidth: '840px', margin: '0 auto', padding: '24px 20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '1.45rem', fontWeight: 800, fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <MessagesSquare style={{ color: 'var(--accent-cyan)' }} size={24} />
          <span>{t.conversationAnalyzer.title}</span>
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
          {t.conversationAnalyzer.subtitle}
        </p>
      </div>

      {/* Demo Loader Ribbon */}
      <div style={{ marginBottom: '16px' }}>
        <button
          className="btn btn-secondary"
          onClick={() => setConversationText(conversationDemo.content)}
          style={{ fontSize: '0.82rem' }}
        >
          <Sparkles size={14} style={{ color: 'var(--accent-cyan)' }} />
          <span>{t.conversationAnalyzer.loadConversationDemo}</span>
        </button>
      </div>

      {/* Input Textarea */}
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
          rows={10}
          value={conversationText}
          onChange={(e) => setConversationText(e.target.value)}
          placeholder={t.conversationAnalyzer.inputPlaceholder}
          style={{
            width: '100%',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-sm)',
            padding: '14px',
            color: 'var(--text-primary)',
            fontSize: '0.9rem',
            fontFamily: 'var(--font-mono)',
            resize: 'vertical',
            outline: 'none',
            lineHeight: 1.6,
          }}
          onFocus={(e) => (e.target.style.borderColor = 'var(--accent-cyan)')}
          onBlur={(e) => (e.target.style.borderColor = 'var(--border-medium)')}
        />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px', marginTop: '14px' }}>
          <button
            className="btn btn-secondary"
            onClick={() => setConversationText('')}
            disabled={!conversationText || isAnalyzing}
          >
            <Trash2 size={16} />
            <span>{t.messageScanner.clearBtn}</span>
          </button>

          <button
            className="btn btn-primary"
            onClick={handleAnalyze}
            disabled={!conversationText.trim() || isAnalyzing}
          >
            {isAnalyzing ? (
              <span>{t.loading.analyzingContext}</span>
            ) : (
              <>
                <span>{t.conversationAnalyzer.analyzeBtn}</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
