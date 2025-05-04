import { createContext, ReactNode, useContext, useState } from 'react';
import { BookingState, Message, PaymentMethod } from '../app/types/index';

interface BookingContextType {
  bookingState: BookingState;
  messages: Message[];
  isListening: boolean;
  isProcessing: boolean;
  addMessage: (message: Message) => void;
  setBookingState: (state: BookingState) => void;
  updateBooking: (updates: Partial<BookingState>) => void;
  setIsListening: (isListening: boolean) => void;
  setIsProcessing: (isProcessing: boolean) => void;
  resetBooking: () => void;
  completeBooking: () => void;
}

const initialBookingState: BookingState = {
  fromStation: '',
  toStation: '',
  date: '',
  passengers: 1,
  class: '2A',
  paymentMethod: 'wallet' as PaymentMethod,
  bookingComplete: false,
  pnr: '',
  fare: 0,
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [bookingState, setBookingState] = useState<BookingState>(initialBookingState);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I am RailBot, your AI travel assistant. How can I help you with your train booking today?',
      sender: 'bot',
      timestamp: new Date().toISOString(),
    },
  ]);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const addMessage = (message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const updateBooking = (updates: Partial<BookingState>) => {
    setBookingState((prev) => ({ ...prev, ...updates }));
  };

  const resetBooking = () => {
    setBookingState(initialBookingState);
  };

  const completeBooking = () => {
    const pnr = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    const fare = Math.floor(500 + Math.random() * 1500);
    
    setBookingState((prev) => ({
      ...prev,
      bookingComplete: true,
      pnr,
      fare,
    }));
    
    addMessage({
      id: Date.now().toString(),
      text: `Your booking has been confirmed! PNR: ${pnr}. Total fare: ₹${fare}`,
      sender: 'bot',
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <BookingContext.Provider
      value={{
        bookingState,
        messages,
        isListening,
        isProcessing,
        addMessage,
        setBookingState,
        updateBooking,
        setIsListening,
        setIsProcessing,
        resetBooking,
        completeBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};