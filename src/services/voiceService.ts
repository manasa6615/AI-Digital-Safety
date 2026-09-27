import { SupportedLanguage, SUPPORTED_LANGUAGES } from '../locales';

export interface VoiceRecognitionState {
  isListening: boolean;
  transcript: string;
  error: string | null;
  interimTranscript: string;
}

export const getBcp47Code = (lang: SupportedLanguage): string => {
  const found = SUPPORTED_LANGUAGES.find(l => l.code === lang);
  return found ? found.bcp47 : 'en-IN';
};

// Web Speech API interface declarations
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionInstance extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onstart: ((this: SpeechRecognitionInstance, ev: Event) => void) | null;
  onresult: ((this: SpeechRecognitionInstance, ev: SpeechRecognitionEvent) => void) | null;
  onerror: ((this: SpeechRecognitionInstance, ev: Event & { error: string }) => void) | null;
  onend: ((this: SpeechRecognitionInstance, ev: Event) => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition?: {
      new (): SpeechRecognitionInstance;
    };
    webkitSpeechRecognition?: {
      new (): SpeechRecognitionInstance;
    };
  }
}

export class VoiceAssistant {
  private recognition: SpeechRecognitionInstance | null = null;
  private synthesis: SpeechSynthesis | null = null;
  private activeUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognitionClass) {
      try {
        this.recognition = new SpeechRecognitionClass();
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
      } catch (err) {
        console.warn("SpeechRecognition init error:", err);
      }
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synthesis = window.speechSynthesis;
    }
  }

  public isSupported(): boolean {
    return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  }

  public startListening(
    lang: SupportedLanguage,
    onTranscriptUpdate: (transcript: string, isFinal: boolean) => void,
    onError: (err: string) => void,
    onStateChange: (listening: boolean) => void
  ): boolean {
    if (!this.recognition) {
      onError("Speech recognition is not supported in this browser.");
      return false;
    }

    try {
      this.recognition.lang = getBcp47Code(lang);
      
      this.recognition.onstart = () => {
        onStateChange(true);
      };

      this.recognition.onresult = (event: SpeechRecognitionEvent) => {
        let fullTranscript = '';
        let isFinalResult = false;
        for (let i = 0; i < event.results.length; ++i) {
          fullTranscript += event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            isFinalResult = true;
          }
        }
        onTranscriptUpdate(fullTranscript, isFinalResult);
      };

      this.recognition.onerror = (event: Event & { error: string }) => {
        console.error("SpeechRecognition error:", event.error);
        onError(event.error);
        onStateChange(false);
      };

      this.recognition.onend = () => {
        onStateChange(false);
      };

      this.recognition.start();
      return true;
    } catch (e: any) {
      onError(e?.message || "Failed to start microphone recording.");
      onStateChange(false);
      return false;
    }
  }

  public stopListening(): void {
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (err) {
        console.warn("Error stopping recognition:", err);
      }
    }
  }

  public speak(
    text: string,
    lang: SupportedLanguage,
    rate: number = 0.95,
    onEnd?: () => void
  ): void {
    if (!this.synthesis) {
      console.warn("SpeechSynthesis not supported.");
      onEnd?.();
      return;
    }

    this.stopSpeaking();

    const utterance = new SpeechSynthesisUtterance(text);
    const bcp47 = getBcp47Code(lang);
    utterance.lang = bcp47;
    utterance.rate = rate;
    utterance.pitch = 1.0;

    // Find best voice match if available
    const voices = this.synthesis.getVoices();
    const matchedVoice = voices.find(v => v.lang === bcp47 || v.lang.startsWith(lang));
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onend = () => {
      this.activeUtterance = null;
      onEnd?.();
    };

    utterance.onerror = (e) => {
      console.warn("SpeechSynthesis error:", e);
      this.activeUtterance = null;
      onEnd?.();
    };

    this.activeUtterance = utterance;
    this.synthesis.speak(utterance);
  }

  public stopSpeaking(): void {
    if (this.synthesis) {
      this.synthesis.cancel();
      this.activeUtterance = null;
    }
  }

  public isSpeaking(): boolean {
    return !!(this.synthesis && this.synthesis.speaking);
  }
}

export const voiceAssistant = new VoiceAssistant();
