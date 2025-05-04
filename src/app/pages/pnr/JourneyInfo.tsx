import { Badge, Card, Descriptions } from 'antd';
import { ArrowRight, Calendar, MapPin, Train } from 'lucide-react';
import React from 'react';
import { PNRData } from '../../types';

interface JourneyInfoProps {
  journeyDetails: PNRData;
}

const JourneyInfo: React.FC<JourneyInfoProps> = ({ journeyDetails }) => {
  // Format the date for better readability
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <Card className="mt-4 animate-fade-in shadow-md hover:shadow-lg transition-all duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
            <Train className="h-5 w-5 text-blue-500" />
            Train Information
          </h3>
          <Descriptions layout="vertical" size="small" column={1} bordered>
            <Descriptions.Item label="Train Number">
              <span className="font-semibold">{journeyDetails.trainNumber}</span>
            </Descriptions.Item>
            <Descriptions.Item label="Train Name">
              <span className="font-semibold">{journeyDetails.trainName}</span>
            </Descriptions.Item>
            <Descriptions.Item label="Class">
              <Badge status="processing" text={journeyDetails.reservationClass} />
            </Descriptions.Item>
            <Descriptions.Item label="Chart Status">
              <Badge 
                status={journeyDetails.chartStatus === 'Prepared' ? 'success' : 'warning'} 
                text={journeyDetails.chartStatus} 
              />
            </Descriptions.Item>
          </Descriptions>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-500" />
            Journey Details
          </h3>
          <Descriptions layout="vertical" size="small" column={1} bordered>
            <Descriptions.Item label="Date of Journey">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-gray-600" />
                <span>{formatDate(journeyDetails.dateOfJourney)}</span>
              </div>
            </Descriptions.Item>
            <Descriptions.Item label="Journey Route">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 min-w-4 text-green-500" />
                <span className="font-medium">{journeyDetails.fromStation}</span>
                <ArrowRight className="h-4 w-4 text-gray-400" />
                <MapPin className="h-4 w-4 min-w-4 text-red-500" />
                <span className="font-medium">{journeyDetails.toStation}</span>
              </div>
            </Descriptions.Item>
            <Descriptions.Item label="Boarding Point">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-blue-500" />
                <span>{journeyDetails.boardingPoint}</span>
              </div>
            </Descriptions.Item>
          </Descriptions>
        </div>
      </div>
    </Card>
  );
};

export default JourneyInfo;