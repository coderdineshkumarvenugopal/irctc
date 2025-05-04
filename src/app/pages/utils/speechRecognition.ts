/* eslint-disable @typescript-eslint/no-explicit-any */
export default class SpeechRecognition {
    recognition: any;
    isListening: boolean = false;
  
    constructor() {
      // Check if browser supports speech recognition
      const SpeechRecognition =  (window as any).webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = 'en-IN';
      } else {
        console.error('Speech recognition not supported in this browser');
      }
    }
  
    start(): Promise<string> {
      if (!this.recognition) {
        return Promise.reject('Speech recognition not supported');
      }
  
      return new Promise((resolve, reject) => {
        this.isListening = true;
        
        this.recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          resolve(transcript);
        };
  
        this.recognition.onerror = (event: any) => {
          this.isListening = false;
          reject(`Speech recognition error: ${event.error}`);
        };
  
        this.recognition.onend = () => {
          this.isListening = false;
        };
  
        try {
          this.recognition.start();
        } catch (error) {
          this.isListening = false;
          reject(error);
        }
      });
    }
  
    stop() {
      if (this.recognition && this.isListening) {
        this.recognition.stop();
        this.isListening = false;
      }
    }
  }