import React from 'react';
import { Card, Divider } from 'antd';
import { TicketIcon } from 'lucide-react';
import JourneyInfo from './JourneyInfo';
import PassengerInfo from './PassengerInfo';
import { PNRData } from '../../types';

interface PNRDetailsProps {
  pnrData: PNRData;
}

const PNRDetails: React.FC<PNRDetailsProps> = ({ pnrData }) => {
  return (
    <div className="w-full max-w-4xl animate-fade-in">
      <Card 
        className="shadow-lg transition-all duration-300 hover:shadow-xl"
        title={
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TicketIcon className="h-6 w-6 text-blue-500" />
              <span className="text-xl font-semibold">PNR Status</span>
            </div>
            <div className="bg-gray-100 px-3 py-1 rounded-full">
              <span className="text-sm font-mono">PNR: {pnrData.pnrNumber}</span>
            </div>
          </div>
        }
      >
        <JourneyInfo journeyDetails={pnrData} />
        
        <Divider />
        
        <PassengerInfo passengers={pnrData.passengers} />
        
        <div className="mt-6 text-xs text-gray-500 flex justify-between items-center">
          <div>Last updated: {new Date().toLocaleString()}</div>
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 bg-green-500 rounded-full"></span>
            <span>Live Status</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PNRDetails;