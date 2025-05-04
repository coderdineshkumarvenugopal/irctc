import { Station } from '../../types';

// Common Indian railway stations
const commonStations: Station[] = [
  { code: 'NDLS', name: 'New Delhi' },
  { code: 'MAS', name: 'Chennai Central' },
  { code: 'CSTM', name: 'Mumbai CST' },
  { code: 'HWH', name: 'Howrah' },
  { code: 'SBC', name: 'Bengaluru' },
  { code: 'BPL', name: 'Bhopal' },
  { code: 'JP', name: 'Jaipur' },
  { code: 'PUNE', name: 'Pune' },
  { code: 'BSB', name: 'Varanasi' },
  { code: 'LKO', name: 'Lucknow' },
  { code: 'ADI', name: 'Ahmedabad' },
  { code: 'CNB', name: 'Kanpur' },
  { code: 'HYB', name: 'Hyderabad' },
  { code: 'ALD', name: 'Allahabad' },
  { code: 'SVDK', name: 'Secunderabad' },
  { code: 'AGC', name: 'Agra Cantt' },
  { code: 'INDB', name: 'Indore' },
  { code: 'KLK', name: 'Kalka' },
  { code: 'CDG', name: 'Chandigarh' },
  { code: 'RNC', name: 'Ranchi' },
  { code: 'BBS', name: 'Bhubaneswar' },
  { code: 'GHY', name: 'Guwahati' },
  { code: 'NJP', name: 'New Jalpaiguri' },
  { code: 'SCL', name: 'Silchar' },
  { code: 'JAT', name: 'Jammu Tawi' },
  { code: 'PNBE', name: 'Patna' },
  { code: 'NDLS', name: 'Delhi' },  // Alternative name
  { code: 'BOM', name: 'Mumbai' },  // Alternative name
  { code: 'MAA', name: 'Chennai' },  // Alternative name
  { code: 'BLR', name: 'Bangalore' },  // Alternative name
  { code: 'CCU', name: 'Kolkata' },  // Alternative name
];

export const getStations = (): string[] => {
  return commonStations.map(station => station.name);
};

export const getStationByCode = (code: string): Station | undefined => {
  return commonStations.find(station => station.code === code);
};

export const getStationByName = (name: string): Station | undefined => {
  return commonStations.find(
    station => station.name.toLowerCase() === name.toLowerCase()
  );
};

export const searchStations = (query: string): Station[] => {
  if (!query || query.length < 2) return [];
  
  const lowerQuery = query.toLowerCase();
  
  return commonStations.filter(
    station => 
      station.name.toLowerCase().includes(lowerQuery) || 
      station.code.toLowerCase().includes(lowerQuery)
  );
};