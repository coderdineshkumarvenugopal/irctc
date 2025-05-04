import { create } from 'zustand';
import { Seat, SeatStore } from '../types';

export const useStore = create<SeatStore>((set, get) => ({
  selectedSeats: [],
  
  selectSeat: (seat: Seat, gender?: 'male' | 'female') => {
    set((state) => ({
      selectedSeats: [...state.selectedSeats, { ...seat, status: 'selected', gender }]
    }));
  },
  
  unselectSeat: (seatId: string) => {
    set((state) => ({
      selectedSeats: state.selectedSeats.filter(seat => seat.id !== seatId)
    }));
  },
  
  updateSeatGender: (seatId: string, gender: 'male' | 'female') => {
    set((state) => ({
      selectedSeats: state.selectedSeats.map(seat => 
        seat.id === seatId ? { ...seat, gender } : seat
      )
    }));
  },
  
  getTotalFare: () => {
    const { selectedSeats } = get();
    return selectedSeats.reduce((total, seat) => total + seat.fare, 0);
  },
  
  resetSelection: () => {
    set({ selectedSeats: [] });
  }
}));