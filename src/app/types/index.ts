export type PaymentMethod = 'wallet' | 'upi' | 'card' | 'netbanking';

export interface BookingState {
  fromStation: string;
  toStation: string;
  date: string;
  passengers: number;
  class: string;
  paymentMethod: PaymentMethod;
  bookingComplete: boolean;
  pnr: string;
  fare: number;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

export interface Station {
  code: string;
  name: string;
}

export interface Passenger {
  name: string;
  age: number;
  gender: string;
  seatNumber: string;
  status: string;
}

export interface PNRData {
  pnrNumber: string;
  trainNumber: string;
  trainName: string;
  dateOfJourney: string;
  fromStation: string;
  toStation: string;
  boardingPoint: string;
  reservationClass: string;
  chartStatus: 'Prepared' | 'Not Prepared';
  passengers: Passenger[];
}

export type PNRStatus = 
  | 'Confirmed' 
  | 'RAC' 
  | 'Waitlisted' 
  | 'Cancelled';

export interface APIResponse {
  success: boolean;
  data?: PNRData;
  error?: string;
}

export interface Seat {
  id: string;
  number: string | number;
  type: 'window' | 'aisle' | 'middle' | 'upper' | 'middle-upper' | 'lower' | 'side-lower' | 'side-upper';
  status: 'available' | 'booked' | 'ladies' | 'selected';
  fare: number;
  gender?: 'male' | 'female';
  position?: { row: number; col: number };
  deck?: 'upper' | 'lower';
}

export interface SeatStore {
  selectedSeats: Seat[];
  selectSeat: (seat: Seat, gender?: 'male' | 'female') => void;
  unselectSeat: (seatId: string) => void;
  updateSeatGender: (seatId: string, gender: 'male' | 'female') => void;
  getTotalFare: () => number;
  resetSelection: () => void;
}

export interface BookingContextType {
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
