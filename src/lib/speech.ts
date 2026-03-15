"use client";

// Fallback simple usando Web Speech API del navegador
// En el futuro se puede conectar con Azure Speech SDK aquí
export class SpeechRecognitionService {
  private recognition: any;
  private isListening: boolean = false;

  constructor() {
    if (typeof window !== "undefined") {
      const SpeechRecognition = 
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = "es-ES";
      }
    }
  }

  public startListening(onResult: (text: string) => void, onError: (err: any) => void) {
    if (!this.recognition) {
      onError("Este navegador no soporta reconocimiento de voz.");
      return;
    }

    if (this.isListening) return;

    this.recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      onResult(text);
      this.isListening = false;
    };

    this.recognition.onerror = (event: any) => {
      onError(event.error);
      this.isListening = false;
    };

    this.recognition.onend = () => {
      this.isListening = false;
    };

    try {
      this.recognition.start();
      this.isListening = true;
    } catch (e) {
      onError(e);
    }
  }

  public stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }
}

export const speechService = new SpeechRecognitionService();
