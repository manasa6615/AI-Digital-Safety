import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { analyzeContent, AnalysisReport } from '../services/analyzer';
import { Image as ImageIcon, Upload, Trash2, ArrowRight, Link as LinkIcon, FileText } from 'lucide-react';

interface ScreenshotAnalyzerProps {
  onAnalysisComplete: (report: AnalysisReport) => void;
}

export const ScreenshotAnalyzer: React.FC<ScreenshotAnalyzerProps> = ({ onAnalysisComplete }) => {
  const { t, language } = useLanguage();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');
  const [detectedLinks, setDetectedLinks] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const sampleScreenshots = [
    {
      title: t.screenshotAnalyzer.demoSample1,
      text: "URGENT: SBI YONO Alert! Your account is blocked today due to pending PAN KYC. Update immediately to prevent permanent block: http://sbi-kyc-verify-portal.top/update",
      urls: ["http://sbi-kyc-verify-portal.top/update"],
    },
    {
      title: t.screenshotAnalyzer.demoSample2,
      text: "India Post: Delivery exception for parcel #IN-9482. Address incomplete. Pay Rs. 25 re-delivery fee within 24 hours: http://delivery-update-example.com/track",
      urls: ["http://delivery-update-example.com/track"],
    },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
        runOcrSimulation(
          "Screenshot analysis: Dear Customer, your bank account will be blocked in 2 hours. Click here to verify your identity: http://bank-verify-example.com/login"
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const loadSample = (sample: typeof sampleScreenshots[0]) => {
    setImagePreview('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><rect width="400" height="200" fill="%231e293b"/><text x="20" y="40" fill="%23f87171" font-size="14" font-family="sans-serif">SIMULATED SCAM SCREENSHOT</text><text x="20" y="80" fill="%23e2e8f0" font-size="12" font-family="sans-serif">SBI YONO Alert: Your account is blocked...</text></svg>');
    runOcrSimulation(sample.text);
  };

  const runOcrSimulation = (text: string) => {
    setIsProcessing(true);
    setTimeout(() => {
      setExtractedText(text);
      const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9-]+\.(?:com|org|in|top|xyz|club|live|info|icu|pw|vip|buzz|online|site|app|cc|link|tk|ml)\b[^\s]*)/gi;
      const found = Array.from(new Set(text.match(urlRegex) || []));
      setDetectedLinks(found);
      setIsProcessing(false);
    }, 700);
  };

  const handleAnalyze = () => {
    if (!extractedText) return;
    const report = analyzeContent(extractedText, 'screenshot', language);
    onAnalysisComplete(report);
  };

  return (
    <div style={{ maxWidth: '840px', margin: '0 auto', padding: '24px 20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '1.45rem', fontWeight: 800, fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ImageIcon style={{ color: 'var(--accent-cyan)' }} size={24} />
          <span>{t.screenshotAnalyzer.title}</span>
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
          {t.screenshotAnalyzer.subtitle}
        </p>
      </div>

      {/* Demo Screenshot Buttons */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '18px' }}>
        {sampleScreenshots.map((s, idx) => (
          <button
            key={idx}
            className="btn btn-secondary"
            onClick={() => loadSample(s)}
            style={{ fontSize: '0.8rem', padding: '6px 12px' }}
          >
            <span>{s.title}</span>
          </button>
        ))}
      </div>

      {/* Upload Zone */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '2px dashed var(--border-medium)',
          borderRadius: 'var(--radius-lg)',
          padding: '36px 20px',
          textAlign: 'center',
          cursor: 'pointer',
          marginBottom: '20px',
          transition: 'var(--transition-fast)',
        }}
        onClick={() => document.getElementById('screenshot-file-input')?.click()}
      >
        <input
          id="screenshot-file-input"
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          style={{ display: 'none' }}
          onChange={handleFileUpload}
        />
        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--accent-cyan-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', color: 'var(--accent-cyan)' }}>
          <Upload size={22} />
        </div>
        <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
          {t.screenshotAnalyzer.dropText}
        </div>
        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>
          {t.screenshotAnalyzer.dropSub}
        </div>
      </div>

      {/* Preview and Extracted Text Card */}
      {imagePreview && (
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '20px',
            marginBottom: '20px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              {isProcessing ? t.screenshotAnalyzer.analyzingOcr : t.screenshotAnalyzer.extractedTextTitle}
            </div>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setImagePreview(null);
                setExtractedText('');
                setDetectedLinks([]);
              }}
              style={{ fontSize: '0.8rem', padding: '4px 10px' }}
            >
              <Trash2 size={14} />
              <span>{t.screenshotAnalyzer.removeImage}</span>
            </button>
          </div>

          <div
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              padding: '14px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.88rem',
              color: 'var(--text-primary)',
              lineHeight: 1.6,
              marginBottom: '14px',
            }}
          >
            {isProcessing ? (
              <span style={{ color: 'var(--accent-cyan)' }}>{t.screenshotAnalyzer.analyzingOcr}</span>
            ) : (
              extractedText
            )}
          </div>

          {detectedLinks.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>
                {t.screenshotAnalyzer.detectedLinksTitle}:
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {detectedLinks.map((link, idx) => (
                  <span
                    key={idx}
                    style={{
                      padding: '4px 10px',
                      background: 'rgba(239, 68, 68, 0.12)',
                      border: '1px solid var(--risk-high-border)',
                      borderRadius: '4px',
                      fontSize: '0.82rem',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--risk-high-text)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <LinkIcon size={12} />
                    {link}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              className="btn btn-primary"
              onClick={handleAnalyze}
              disabled={isProcessing || !extractedText}
            >
              <span>{t.messageScanner.analyzeBtn}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
