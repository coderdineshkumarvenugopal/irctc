import { Seat } from '../../types';


export const trainSeatsData: Seat[] = [
  // Sleeper Class - Compartment 1
  // Berth 1
  { id: 'S1-1', number: 'S1', type: 'lower', status: 'available', fare: 450, position: { row: 1, col: 1 } },
  { id: 'S1-2', number: 'S2', type: 'middle', status: 'available', fare: 450, position: { row: 1, col: 1 } },
  { id: 'S1-3', number: 'S3', type: 'upper', status: 'booked', fare: 450, position: { row: 1, col: 1 } },
  { id: 'S1-4', number: 'S4', type: 'lower', status: 'available', fare: 450, position: { row: 1, col: 2 } },
  { id: 'S1-5', number: 'S5', type: 'middle', status: 'ladies', fare: 450, position: { row: 1, col: 2 } },
  { id: 'S1-6', number: 'S6', type: 'upper', status: 'available', fare: 450, position: { row: 1, col: 2 } },
  { id: 'S1-7', number: 'S7', type: 'side-lower', status: 'available', fare: 450, position: { row: 1, col: 3 } },
  { id: 'S1-8', number: 'S8', type: 'side-upper', status: 'booked', fare: 450, position: { row: 1, col: 3 } },
  
  // Berth 2
  { id: 'S1-9', number: 'S9', type: 'lower', status: 'available', fare: 450, position: { row: 2, col: 1 } },
  { id: 'S1-10', number: 'S10', type: 'middle', status: 'booked', fare: 450, position: { row: 2, col: 1 } },
  { id: 'S1-11', number: 'S11', type: 'upper', status: 'available', fare: 450, position: { row: 2, col: 1 } },
  { id: 'S1-12', number: 'S12', type: 'lower', status: 'ladies', fare: 450, position: { row: 2, col: 2 } },
  { id: 'S1-13', number: 'S13', type: 'middle', status: 'available', fare: 450, position: { row: 2, col: 2 } },
  { id: 'S1-14', number: 'S14', type: 'upper', status: 'available', fare: 450, position: { row: 2, col: 2 } },
  { id: 'S1-15', number: 'S15', type: 'side-lower', status: 'available', fare: 450, position: { row: 2, col: 3 } },
  { id: 'S1-16', number: 'S16', type: 'side-upper', status: 'available', fare: 450, position: { row: 2, col: 3 } },
  
  // AC Class - Compartment 1
  // Berth 1
  { id: 'A1-1', number: 'A1', type: 'lower', status: 'available', fare: 950, position: { row: 1, col: 1 } },
  { id: 'A1-2', number: 'A2', type: 'middle', status: 'available', fare: 950, position: { row: 1, col: 1 } },
  { id: 'A1-3', number: 'A3', type: 'upper', status: 'booked', fare: 950, position: { row: 1, col: 1 } },
  { id: 'A1-4', number: 'A4', type: 'lower', status: 'available', fare: 950, position: { row: 1, col: 2 } },
  { id: 'A1-5', number: 'A5', type: 'middle', status: 'ladies', fare: 950, position: { row: 1, col: 2 } },
  { id: 'A1-6', number: 'A6', type: 'upper', status: 'available', fare: 950, position: { row: 1, col: 2 } },
  { id: 'A1-7', number: 'A7', type: 'side-lower', status: 'available', fare: 950, position: { row: 1, col: 3 } },
  { id: 'A1-8', number: 'A8', type: 'side-upper', status: 'booked', fare: 950, position: { row: 1, col: 3 } },
];