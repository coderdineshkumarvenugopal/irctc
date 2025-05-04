import React, { useState } from 'react';
import { Calendar, Users, Train } from 'lucide-react';
import { searchStations } from '../utils/stationData';
import { Station } from '../../types';
import { useBooking } from '../../../context/BookingContext';

const BookingForm = () => {
  const { bookingState, updateBooking } = useBooking();
  const [fromSearchResults, setFromSearchResults] = useState<Station[]>([]);
  const [toSearchResults, setToSearchResults] = useState<Station[]>([]);
  
  const handleFromStationSearch = (query: string) => {
    updateBooking({ fromStation: query });
    setFromSearchResults(searchStations(query));
  };
  
  const handleToStationSearch = (query: string) => {
    updateBooking({ toStation: query });
    setToSearchResults(searchStations(query));
  };
  
  const selectFromStation = (station: Station) => {
    updateBooking({ fromStation: station.name });
    setFromSearchResults([]);
  };
  
  const selectToStation = (station: Station) => {
    updateBooking({ toStation: station.name });
    setToSearchResults([]);
  };
  
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateBooking({ date: e.target.value });
  };
  
  const handlePassengersChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateBooking({ passengers: parseInt(e.target.value, 10) });
  };
  
  const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateBooking({ class: e.target.value });
  };

  // Generate today's date in YYYY-MM-DD format for min date attribute
  const today = new Date().toISOString().split('T')[0];
  
  // Generate date 120 days from today for max date attribute
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 120);
  const maxDateStr = maxDate.toISOString().split('T')[0];
  
  return (
    <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 bg-blue-50 border-b">
        <h2 className="text-lg font-medium text-blue-800">Complete Your Booking</h2>
      </div>
      
      <div className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">From Station</label>
            <div className="relative">
              <input
                type="text"
                value={bookingState.fromStation}
                onChange={(e) => handleFromStationSearch(e.target.value)}
                placeholder="Enter origin station"
                className="w-full p-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Train className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              
              {fromSearchResults.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {fromSearchResults.map((station) => (
                    <div
                      key={station.code}
                      className="p-2 hover:bg-blue-50 cursor-pointer"
                      onClick={() => selectFromStation(station)}
                    >
                      <div className="font-medium">{station.name}</div>
                      <div className="text-xs text-gray-500">{station.code}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">To Station</label>
            <div className="relative">
              <input
                type="text"
                value={bookingState.toStation}
                onChange={(e) => handleToStationSearch(e.target.value)}
                placeholder="Enter destination station"
                className="w-full p-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Train className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              
              {toSearchResults.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {toSearchResults.map((station) => (
                    <div
                      key={station.code}
                      className="p-2 hover:bg-blue-50 cursor-pointer"
                      onClick={() => selectToStation(station)}
                    >
                      <div className="font-medium">{station.name}</div>
                      <div className="text-xs text-gray-500">{station.code}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Travel Date</label>
            <div className="relative">
              <input
                type="date"
                value={bookingState.date}
                onChange={handleDateChange}
                min={today}
                max={maxDateStr}
                className="w-full p-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Passengers</label>
              <div className="relative">
                <select
                  value={bookingState.passengers}
                  onChange={handlePassengersChange}
                  className="w-full p-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Passenger' : 'Passengers'}
                    </option>
                  ))}
                </select>
                <Users className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Class</label>
              <select
                value={bookingState.class}
                onChange={handleClassChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="1A">AC First Class (1A)</option>
                <option value="2A">AC 2 Tier (2A)</option>
                <option value="3A">AC 3 Tier (3A)</option>
                <option value="SL">Sleeper (SL)</option>
                <option value="CC">AC Chair Car (CC)</option>
                <option value="2S">Second Sitting (2S)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;