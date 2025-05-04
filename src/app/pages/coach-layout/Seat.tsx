import { Tooltip } from 'antd';
import React, { useState } from 'react';
import { useStore } from '../../custom-hooks/useStore';
import { Seat as SeatType } from '../../types';

interface SeatProps {
  seat: SeatType; 
}

const Seat: React.FC<SeatProps> = ({ seat }) => {
  const { selectedSeats, selectSeat, unselectSeat } = useStore();
  const [hovered, setHovered] = useState(false);

  const isSelected = selectedSeats.some(s => s.id === seat.id);

  const handleSeatClick = () => {
    if (seat.status === 'booked' || seat.status === 'ladies') return;

    if (isSelected) {
      unselectSeat(seat.id);
    } else {
      selectSeat(seat);
    }
  };

  const getSeatColor = () => {
    if (isSelected) return 'bg-green-500 text-white';
    if (seat.status === 'booked') return 'bg-gray-400 text-gray-700 opacity-60';
    if (seat.status === 'ladies') return 'bg-pink-200 text-pink-800';
    if (seat.type === 'window') return 'bg-blue-100 text-blue-800';
    if (seat.type === 'aisle') return 'bg-purple-100 text-purple-800';
    return 'bg-white text-gray-800';
  };

  return (
    <Tooltip
      title={`${seat.type.charAt(0).toUpperCase() + seat.type.slice(1)} Seat: ₹${seat.fare}`}
      placement="top"
      open={hovered}
    >
      <div
        className={`seat relative flex items-center justify-center
           w-12 h-10 
          ${getSeatColor()}
          border rounded-md transition-all duration-200
          ${hovered && seat.status !== 'booked' ? 'scale-105 shadow-md' : 'shadow-sm'}
          ${seat.status !== 'booked' && seat.status !== 'ladies' ? 'cursor-pointer' : 'cursor-not-allowed'}`}
        onClick={handleSeatClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <span className="text-xs font-medium">{seat.number}</span>
      </div>
    </Tooltip>
  );
};

export default Seat;
