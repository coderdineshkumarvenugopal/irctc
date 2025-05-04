import { APIResponse, PNRData } from "../types";

// Mock data for demonstration purposes
const mockPNRData: Record<string, PNRData> = {
  '1234567890': {
    pnrNumber: '1234567890',
    trainNumber: '12345',
    trainName: 'Rajdhani Express',
    dateOfJourney: '2025-07-15',
    fromStation: 'Delhi (DLI)',
    toStation: 'Mumbai (CSTM)',
    boardingPoint: 'Delhi (DLI)',
    reservationClass: '3A',
    chartStatus: 'Prepared',
    passengers: [
      {
        name: 'John Doe',
        age: 35,
        gender: 'Male',
        seatNumber: 'B1-42',
        status: 'Confirmed',
      },
      {
        name: 'Jane Doe',
        age: 30,
        gender: 'Female',
        seatNumber: 'B1-43',
        status: 'Confirmed',
      }
    ]
  },
  '9876543210': {
    pnrNumber: '9876543210',
    trainNumber: '54321',
    trainName: 'Shatabdi Express',
    dateOfJourney: '2025-07-16',
    fromStation: 'Bangalore (SBC)',
    toStation: 'Chennai (MAS)',
    boardingPoint: 'Bangalore (SBC)',
    reservationClass: 'CC',
    chartStatus: 'Prepared',
    passengers: [
      {
        name: 'Alice Smith',
        age: 28,
        gender: 'Female',
        seatNumber: 'C5-12',
        status: 'Confirmed',
      }
    ]
  },
  '5678901234': {
    pnrNumber: '5678901234',
    trainNumber: '67890',
    trainName: 'Duronto Express',
    dateOfJourney: '2025-07-18',
    fromStation: 'Kolkata (KOAA)',
    toStation: 'Delhi (DLI)',
    boardingPoint: 'Kolkata (KOAA)',
    reservationClass: '2A',
    chartStatus: 'Not Prepared',
    passengers: [
      {
        name: 'Bob Johnson',
        age: 45,
        gender: 'Male',
        seatNumber: 'Pending',
        status: 'Waitlisted',
      },
      {
        name: 'Carol Johnson',
        age: 40,
        gender: 'Female',
        seatNumber: 'Pending',
        status: 'Waitlisted',
      }
    ]
  }
};

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchPNRStatus = async (pnrNumber: string): Promise<APIResponse> => {
  // Simulate network delay
  await delay(1500);
  
  // Validate PNR format (10 digits)
  if (!/^\d{10}$/.test(pnrNumber)) {
    return {
      success: false,
      error: 'Invalid PNR format. PNR must be a 10-digit number.'
    };
  }

  // Check if PNR exists in our mock data
  if (mockPNRData[pnrNumber]) {
    return {
      success: true,
      data: mockPNRData[pnrNumber]
    };
  }

  // PNR not found
  return {
    success: false,
    error: 'PNR not found. Please check the PNR number and try again.'
  };
};