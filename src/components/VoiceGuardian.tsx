import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { voiceAssistant } from '../services/voiceService';
import { analyzeContent, AnalysisReport } from '../services/analyzer';
import { Mic, Square, Volume2, VolumeX, RotateCcw, AlertCircle, Sparkles, ArrowRight, Shield } from 'lucide-react';

interface VoiceGuardianProps {
  onAnalysisComplete: (report: AnalysisReport) => void;
}

export const VoiceGuardian: React.FC<VoiceGuardianProps> = ({ onAnalysisComplete }) => {
  const { t, language, currentMeta } = useLanguage();
  const [isRecording, setIsRecording] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [voiceReport, setVoiceReport] = useState<AnalysisReport | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Multilingual voice simulation scenarios if mic is unavailable or for demo quick testing
  const voiceSimulationExamples: Record<string, string> = {
    en: "I received a phone call from a person claiming to be SBI bank manager. He said my ATM card and bank account will be blocked today within 30 minutes, and I must tell him the OTP sent to my mobile number to verify my account.",
    te: "నాకు ఒక వ్యక్తి ఫోన్ చేసి స్టేట్ బ్యాంక్ మేనేజర్ అని చెప్పాడు. నా బ్యాంక్ ఖాతా 30 నిమిషాల్లో బ్లాక్ చేయబడుతుందని, ఖాతాను సరిచేయడానికి నా ఫోన్‌కు వచ్చిన OTP చెప్పాలని అడిగాడు.",
    hi: "मुझे एक कॉल आया जिसमें कॉलर ने खुद को बैंक मैनेजर बताया। उसने कहा कि आपका बैंक खाता 30 मिनट में ब्लॉक हो जाएगा और खाते को चालू रखने के लिए आपके मोबाइल पर आया OTP तुरंत बताइए।",
    ta: "எனக்கு ஒரு போன் கால் வந்தது. அதில் பேசியவர் வங்கி மேலாளர் என்று கூறினார். உங்கள் வங்கி கணக்கு 30 நிமிடத்தில் முடக்கப்படும் என்றும், அதைத் தடுக்க உங்கள் போனுக்கு வந்த OTP எண்ணை சொல்லுமாறும் கேட்டார்.",
    kn: "ನನಗೆ ಒಬ್ಬ ವ್ಯಕ್ತಿ ಕರೆ ಮಾಡಿ ಬ್ಯಾಂಕ್ ಮ್ಯಾನೇಜರ್ ಎಂದು ಹೇಳಿದನು. ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಖಾತೆಯನ್ನು 30 ನಿಮಿಷಗಳಲ್ಲಿ ನಿರ್ಬಂಧಿಸಲಾಗುವುದು ಮತ್ತು ನಿಮ್ಮ ಫೋನ್‌ಗೆ ಬಂದ OTP ಹೇಳಬೇಕೆಂದು ಕೇಳಿದನು.",
    ml: "എനിക്ക് ഒരു ഫോൺ കോൾ വന്നു, വിളിച്ചയാൾ ബാങ്ക് മാനേജരാണെന്ന് പറഞ്ഞു. നിങ്ങളുടെ ബാങ്ക് അക്കൗണ്ട് 30 മിനിറ്റിനുള്ളിൽ ബ്ലോക്ക് ചെയ്യപ്പെടുമെന്നും അത് തടയാൻ ഫോണിൽ വന്ന OTP പറയണമെന്നും ആവശ്യപ്പെട്ടു.",
    mr: "मला एक कॉल आला ज्यामध्ये समोरच्या व्यक्तीने स्वतःला बँक व्यवस्थापक सांगितले. त्याने सांगितले की तुमचे बँक खाते ३० मिनिटांत ब्लॉक होईल आणि खाते वाचवण्यासाठी मोबाईलवर आलेला OTP सांगा.",
    bn: "আমাকে একজন ফোন করে নিজেকে ব্যাংক ম্যানেজার হিসেবে পরিচয় দিয়েছে। সে বলেছে আমার ব্যাংক অ্যাকাউন্ট ৩০ মিনিটের মধ্যে বন্ধ হয়ে যাবে এবং এটি ঠিক করতে মোবাইলে আসা OTP তাকে জানাতে হবে।",
    gu: "મને એક ફોન આવ્યો જેમાં સામેવાળાએ પોતાને બેંક મેનેજર કહ્યા. તેણે કહ્યું કે તમારું બેંક ખાતું 30 મિનિટમાં બ્લોક થઈ જશે અને ખાતું ચાલુ રાખવા માટે ફોન પર આવેલ OTP જણાવો.",
    pa: "ਮੈਨੂੰ ਇੱਕ ਕਾਲ ਆਈ ਜਿਸ ਵਿੱਚ ਵਿਅਕਤੀ ਨੇ ਖੁਦ ਨੂੰ ਬੈਂਕ ਮੈਨੇਜਰ ਦੱਸਿਆ। ਉਸਨੇ ਕਿਹਾ ਕਿ ਤੁਹਾਡਾ ਬੈਂਕ ਖਾਤਾ 30 ਮਿੰਟਾਂ ਵਿੱਚ ਬਲਾਕ ਹੋ ਜਾਵੇਗਾ ਅਤੇ ਇਸਨੂੰ ਬਚਾਉਣ ਲਈ ਮੋਬਾਈਲ 'ਤੇ ਆਇਆ OTP ਦੱਸੋ।",
  };

  const handleStartListening = () => {
    setErrorMessage(null);
    setTranscript('');
    setVoiceReport(null);

    const started = voiceAssistant.startListening(
      language,
      (text) => {
        setTranscript(text);
      },
      (err) => {
        setErrorMessage(t.voiceGuardian.micPermissionError + ` (${err})`);
        setIsRecording(false);
      },
      (listening) => {
        setIsRecording(listening);
      }
    );

    if (!started) {
      // Graceful fallback notice for non-supporting browsers
      setErrorMessage(t.voiceGuardian.micPermissionError);
    }
  };

  const handleStopListening = () => {
    voiceAssistant.stopListening();
    setIsRecording(false);
    if (transcript.trim()) {
      processTranscript(transcript);
    }
  };

  const handleSimulateVoice = () => {
    setErrorMessage(null);
    const sampleText = voiceSimulationExamples[language] || voiceSimulationExamples.en;
    setTranscript(sampleText);
    processTranscript(sampleText);
  };

  const processTranscript = (textToAnalyze: string) => {
    const report = analyzeContent(textToAnalyze, 'voice', language);
    setVoiceReport(report);

    // Speak the response in the selected language automatically if voice synthesis is supported
    const spokenAdvice = `${report.riskLevel === 'HIGH' ? t.report.levelHigh : t.report.levelMedium}. ${t.familyMode.rule1} ${t.familyMode.rule2}`;
    voiceAssistant.speak(spokenAdvice, language, 0.95, () => {
      setIsPlayingAudio(false);
    });
    setIsPlayingAudio(true);
  };

  const handleReplayAudio = () => {
    if (!voiceReport) return;
    const spokenAdvice = `${voiceReport.riskLevel === 'HIGH' ? t.report.levelHigh : t.report.levelMedium}. ${t.familyMode.rule1} ${t.familyMode.rule2}`;
    voiceAssistant.speak(spokenAdvice, language, 0.95, () => {
      setIsPlayingAudio(false);
    });
    setIsPlayingAudio(true);
  };

  const handleStopAudio = () => {
    voiceAssistant.stopSpeaking();
    setIsPlayingAudio(false);
  };

  const handleReset = () => {
    voiceAssistant.stopSpeaking();
    voiceAssistant.stopListening();
    setIsRecording(false);
    setIsPlayingAudio(false);
    setTranscript('');
    setVoiceReport(null);
    setErrorMessage(null);
  };

  useEffect(() => {
    return () => {
      voiceAssistant.stopSpeaking();
      voiceAssistant.stopListening();
    };
  }, []);

  return (
    <div style={{ maxWidth: '840px', margin: '0 auto', padding: '24px 20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '1.45rem', fontWeight: 800, fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Mic style={{ color: 'var(--accent-cyan)' }} size={24} />
          <span>{t.voiceGuardian.title}</span>
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
          {t.voiceGuardian.subtitle}
        </p>
      </div>

      {/* Language Synchronization Badge */}
      <div
        style={{
          background: 'var(--accent-cyan-subtle)',
          border: '1px solid var(--accent-cyan-border)',
          borderRadius: 'var(--radius-md)',
          padding: '10px 16px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.84rem',
          color: 'var(--accent-cyan)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Shield size={16} />
          <span>{t.voiceGuardian.voiceSettingsNote}</span>
        </div>
        <strong>{currentMeta.nativeName} ({currentMeta.bcp47})</strong>
      </div>

      {/* Primary Voice Interaction Hub */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '36px 24px',
          textAlign: 'center',
          boxShadow: 'var(--shadow-card)',
          marginBottom: '24px',
        }}
      >
        <div style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '24px', fontWeight: 500 }}>
          {t.voiceGuardian.instructions}
        </div>

        {/* Big Mic Button with Pulsing Waveform Animation */}
        <div style={{ position: 'relative', width: '96px', height: '96px', margin: '0 auto 24px' }}>
          {isRecording && (
            <div
              style={{
                position: 'absolute',
                inset: '-10px',
                borderRadius: '50%',
                border: '2px solid #ef4444',
                animation: 'pulse 1.5s infinite',
                opacity: 0.7,
              }}
            />
          )}
          <button
            onClick={isRecording ? handleStopListening : handleStartListening}
            style={{
              width: '96px',
              height: '96px',
              borderRadius: '50%',
              background: isRecording ? '#ef4444' : 'linear-gradient(135deg, #0284c7, #0369a1)',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              cursor: 'pointer',
              boxShadow: isRecording ? '0 0 24px rgba(239, 68, 68, 0.5)' : '0 4px 16px rgba(2, 132, 199, 0.4)',
              transition: 'var(--transition-fast)',
            }}
            aria-label={isRecording ? t.voiceGuardian.stopListening : t.voiceGuardian.startListening}
          >
            {isRecording ? <Square size={32} /> : <Mic size={36} />}
          </button>
        </div>

        <div style={{ fontSize: '0.9rem', fontWeight: 600, color: isRecording ? '#f87171' : 'var(--text-muted)' }}>
          {isRecording ? t.voiceGuardian.listeningStatus : t.voiceGuardian.startListening}
        </div>

        {/* Demo Voice Simulation Preset */}
        <div style={{ marginTop: '20px' }}>
          <button
            className="btn btn-secondary"
            onClick={handleSimulateVoice}
            style={{ fontSize: '0.82rem', padding: '6px 14px' }}
          >
            <Sparkles size={14} style={{ color: 'var(--accent-cyan)' }} />
            <span>Simulate Incident Voice Description ({currentMeta.nativeName})</span>
          </button>
        </div>

        {/* Error Notice */}
        {errorMessage && (
          <div
            style={{
              marginTop: '16px',
              padding: '10px 14px',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid var(--risk-high-border)',
              borderRadius: 'var(--radius-sm)',
              color: '#f87171',
              fontSize: '0.82rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            <AlertCircle size={16} />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>

      {/* Live Voice Transcript Box */}
      {transcript && (
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '20px',
            marginBottom: '24px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              {t.voiceGuardian.transcriptTitle}
            </div>
            <button className="btn btn-secondary" onClick={handleReset} style={{ fontSize: '0.78rem', padding: '4px 10px' }}>
              <RotateCcw size={13} />
              <span>{t.voiceGuardian.clearBtn}</span>
            </button>
          </div>

          <div
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              padding: '16px',
              fontSize: '0.95rem',
              color: 'var(--text-primary)',
              lineHeight: 1.6,
            }}
          >
            "{transcript}"
          </div>
        </div>
      )}

      {/* Voice Guardian Audio Assessment Card */}
      {voiceReport && (
        <div
          style={{
            background: 'var(--bg-card)',
            border: `1px solid ${voiceReport.riskLevel === 'HIGH' ? 'var(--risk-high-border)' : 'var(--risk-med-border)'}`,
            borderRadius: 'var(--radius-lg)',
            padding: '24px',
            marginBottom: '24px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: voiceReport.riskLevel === 'HIGH' ? 'var(--risk-high-text)' : 'var(--risk-med-text)' }}>
              {t.voiceGuardian.responseTitle}: {voiceReport.riskLevel === 'HIGH' ? t.report.levelHigh : t.report.levelMedium}
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              {isPlayingAudio ? (
                <button className="btn btn-danger" onClick={handleStopAudio} style={{ fontSize: '0.82rem' }}>
                  <VolumeX size={15} />
                  <span>{t.voiceGuardian.stopSpeechBtn}</span>
                </button>
              ) : (
                <button className="btn btn-secondary" onClick={handleReplayAudio} style={{ fontSize: '0.82rem' }}>
                  <Volume2 size={15} />
                  <span>{t.voiceGuardian.listenResponseBtn}</span>
                </button>
              )}
            </div>
          </div>

          {/* Key Rules in Native Language */}
          <div style={{ background: 'var(--bg-surface)', padding: '16px', borderRadius: 'var(--radius-md)', marginBottom: '16px' }}>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem' }}>
              <li style={{ color: '#fca5a5' }}>❌ {t.familyMode.rule1}</li>
              <li style={{ color: '#fca5a5' }}>❌ {t.familyMode.rule2}</li>
              <li style={{ color: '#fca5a5' }}>❌ {t.familyMode.rule3}</li>
              <li style={{ color: '#86efac' }}>✅ {t.familyMode.rule4}</li>
            </ul>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn btn-primary" onClick={() => onAnalysisComplete(voiceReport)}>
              <span>{t.history.viewReport}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
