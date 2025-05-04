import React from 'react';

const SeatLegend: React.FC = () => {
  const legends = [
    { status: 'available', label: 'Available', color: 'bg-white border border-gray-300' },
    { status: 'booked', label: 'Booked', color: 'bg-gray-400 opacity-60' },
    { status: 'ladies', label: 'Ladies', color: 'bg-pink-200' },
    { status: 'selected', label: 'Selected', color: 'bg-green-500 text-white' },
  ];
  
  
  return (
    <div className="seat-legend">
      <h3 className="text-md font-medium mb-2">Legend</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {legends.map((legend, index) => (
          <div key={index} className="flex items-center">
            <div className={`w-6 h-6 ${legend.color} rounded-md shadow-sm mr-2`}></div>
            <span className="text-sm text-gray-700">{legend.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeatLegend;