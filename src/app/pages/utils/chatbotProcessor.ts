import { useBooking } from '../../../context/BookingContext';
import { getStations } from './stationData';

export default class ChatbotProcessor {
  private synth: SpeechSynthesis;

  constructor() {
    this.synth = window.speechSynthesis;
  }

  async processMessage(message: string, bookingContext: ReturnType<typeof useBooking>): Promise<void> {
    const { addMessage, updateBooking, completeBooking, bookingState } = bookingContext;
    
    const lowerMessage = message.toLowerCase();

    if (this.containsBookingIntent(lowerMessage)) {
      const stations = this.extractStations(lowerMessage);
      const date = this.extractDate(lowerMessage);
      
      if (stations.from && stations.to) {
        updateBooking({
          fromStation: stations.from,
          toStation: stations.to,
        });
        
        const bookingDate = date || this.getTomorrowDate();
        updateBooking({ date: bookingDate });
        
        const response = `I've found a train from ${stations.from} to ${stations.to} for ${this.formatDate(bookingDate)}. Would you like to proceed with booking?`;
        
        addMessage({
          id: Date.now().toString(),
          text: response,
          sender: 'bot',
          timestamp: new Date().toISOString(),
        });
        
        this.speak(response);
        return;
      }
    }
    
    
    if (bookingState.fromStation && bookingState.toStation && bookingState.date) {
      if (this.containsConfirmationIntent(lowerMessage)) {
        completeBooking();
        const response = `Great! Your booking from ${bookingState.fromStation} to ${bookingState.toStation} has been confirmed. Your ticket details will be sent to you shortly.`;
        
        addMessage({
          id: Date.now().toString(),
          text: response,
          sender: 'bot',
          timestamp: new Date().toISOString(),
        });
        
        this.speak(response);
        return;
      }
    }
    
    
    const response = "I'm your IRCTC booking assistant. You can say something like 'Book a train from Delhi to Mumbai on 25th March' or 'I want to travel from Chennai to Bangalore tomorrow'.";
    
    addMessage({
      id: Date.now().toString(),
      text: response,
      sender: 'bot',
      timestamp: new Date().toISOString(),
    });
    
    this.speak(response);
  }

  private containsBookingIntent(message: string): boolean {
    const bookingKeywords = [
      'book', 'booking', 'reserve', 'reservation', 'ticket', 
      'train', 'travel', 'journey', 'from', 'to'
    ];
    
    return bookingKeywords.some(keyword => message.includes(keyword));
  }

  private containsConfirmationIntent(message: string): boolean {
    const confirmKeywords = [
      'yes', 'confirm', 'ok', 'okay', 'proceed', 'book it', 
      'book now', 'pay', 'payment', 'sure', 'go ahead'
    ];
    
    return confirmKeywords.some(keyword => message.includes(keyword));
  }

  private extractStations(message: string): { from: string; to: string } {
    const stations = getStations();
    let fromStation = '';
    let toStation = '';
    
    
    const fromToRegex = /from\s+([a-z\s]+)\s+to\s+([a-z\s]+)/i;
    const match = message.match(fromToRegex);
    
    if (match) {
      const potentialFrom = match[1].trim();
      const potentialTo = match[2].trim();
      
      
      fromStation = this.findBestMatchingStation(potentialFrom, stations);
      toStation = this.findBestMatchingStation(potentialTo, stations);
    }
    
    return { from: fromStation, to: toStation };
  }

  private extractDate(message: string): string | null {
    
    if (message.includes('tomorrow')) {
      return this.getTomorrowDate();
    }
    if (message.includes('today')) {
      return this.getTodayDate();
    }

    
    const datePatterns = [
     
      /(\d{1,2})[/-](\d{1,2})[/-](\d{4})/,
   
      /(\d{1,2})(st|nd|rd|th)?\s+(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s+(\d{4})/i,
    
      /(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s+(\d{1,2})(st|nd|rd|th)?\s+(\d{4})/i,
    ];

    for (const pattern of datePatterns) {
      const match = message.match(pattern);
      if (match) {
        const date = this.parseDate(match[0]);
        if (date && this.isValidFutureDate(date)) {
          return date.toISOString().split('T')[0];
        }
      }
    }

    return null;
  }

  private parseDate(dateStr: string): Date | null {
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? null : date;
  }

  private isValidFutureDate(date: Date): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 120); 
    
    return date >= today && date <= maxDate;
  }

  private getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  private getTomorrowDate(): string {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  }

  private findBestMatchingStation(input: string, stations: string[]): string {
    if (!input) return '';
    
    
    const capitalizedInput = input.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
    
    if (stations.includes(capitalizedInput)) {
      return capitalizedInput;
    }
    
    
    const matchingStation = stations.find(station => 
      station.toLowerCase().includes(input.toLowerCase())
    );
    
    return matchingStation || input; 
  }

  private formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  private speak(text: string): void {
    if (this.synth && text) {
          this.synth.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-IN';
      utterance.rate = 1;
      utterance.pitch = 1;
      
      this.synth.speak(utterance);
    }
  }
}