
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Seat as SeatType } from '../../types';
import Seat from './Seat';

interface TrainSeatLayoutProps {
  seatsData: SeatType[];
}

const TrainSeatLayout: React.FC<TrainSeatLayoutProps> = ({ seatsData }) => {
  const compartments: Record<string, SeatType[]> = {};
  
  seatsData.forEach(seat => {
    const compartmentId = String(seat.number).replace(/\d+/g, '');
    if (!compartments[compartmentId]) compartments[compartmentId] = [];
    compartments[compartmentId].push(seat);
  });
  
  const groupSeatsByRow = (seats: SeatType[]) => {
    const rows: Record<number, SeatType[]> = {};
    
    seats.forEach(seat => {
      if (seat.position) {
        const { row } = seat.position;
        if (!rows[row]) rows[row] = [];
        rows[row].push(seat);
      }
    });
    
    return Object.entries(rows).sort(([rowA], [rowB]) => 
      parseInt(rowA) - parseInt(rowB)
    );
  };
  
  return (
    <div className="train-layout ">
      {Object.entries(compartments).map(([compartmentId, seats]) => (
        <div key={compartmentId} className="compartment mb-8">
          
          <div className="grid grid-cols-1 gap-6">
            {groupSeatsByRow(seats).map(([row, rowSeats]) => (
              <div key={`${compartmentId}-${row}`} className="berth-group flex">
                <div className="flex flex-wrap gap-3 p-2 border border-gray-200 rounded-md">
                  {/* Lower berths */}
                  <div className="flex gap-3">
                    {rowSeats
                      .filter(seat => seat.type === 'lower')
                      .sort((a, b) => (a.position?.col || 0) - (b.position?.col || 0))
                      .map(seat => (
                        <div key={seat.id} className="relative">
                          <Seat seat={seat} />
                          <span className="text-xs text-gray-500 mt-1 block text-center">Lower</span>
                        </div>
                      ))}
                  </div>
                  
                  {/* Middle berths */}
                  <div className="flex gap-3">
                    {rowSeats
                      .filter(seat => seat.type === 'middle' || seat.type === 'middle-upper')
                      .sort((a, b) => (a.position?.col || 0) - (b.position?.col || 0))
                      .map(seat => (
                        <div key={seat.id} className="relative">
                          <Seat seat={seat}  />
                          <span className="text-xs text-gray-500 mt-1 block text-center">Middle</span>
                        </div>
                      ))}
                  </div>
                  
                  {/* Upper berths */}
                  <div className="flex gap-3">
                    {rowSeats
                      .filter(seat => seat.type === 'upper')
                      .sort((a, b) => (a.position?.col || 0) - (b.position?.col || 0))
                      .map(seat => (
                        <div key={seat.id} className="relative">
                          <Seat seat={seat}  />
                          <span className="text-xs text-gray-500 mt-1 block text-center">Upper</span>
                        </div>
                      ))}
                  </div>
                </div>
                
                {/* Side berths */}
                <div className="ml-6 flex flex-col gap-3">
                  {rowSeats
                    .filter(seat => seat.type === 'side-lower' || seat.type === 'side-upper')
                    .sort((a:any) => 
                     
                       a.type === 'side-lower' ? -1 : 1

                    )
                    .map(seat => (
                      <div key={seat.id} className="relative">
                        <Seat seat={seat} />
                        <span className="text-xs text-gray-500 mt-1 block text-center">
                          {seat.type === 'side-lower' ? 'Side Lower' : 'Side Upper'}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      
    </div>
  );
};

export default TrainSeatLayout;