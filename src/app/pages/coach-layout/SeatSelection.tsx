/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alert, Button, Card, Divider } from 'antd';
import React, { useState } from 'react';
import { Seat } from '../../types';
import TicketConfirmation from '../ai-chatbot/TicketConformation';
import PaymentPage from '../payment-page/PaymentPage';
import SeatLegend from './SeatLegend';
import TrainSeatLayout from './TrainSeatLayout';

interface SeatSelectionProps {
  seatsData: Seat[];
}

const SeatSelection: React.FC<SeatSelectionProps> = ({ seatsData }) => {
  const [state,setState]=useState('');
  return (

        <Card title="Train Seat Layout" variant="outlined" className=''>
        <div className='flex flex-col gap-8'>
        <Alert
        message="Seat Selection Information"
        description={`Hover over a seat to see its fare. Click to select. Train direction is to the left.`}
        type="info"
        showIcon
        className="mb-4"
      />
      
      <div className="flex flex-row justify-around">
          <TrainSeatLayout seatsData={seatsData} />
      <div className=''>
        {state==="Payment" && <PaymentPage/>}
        {state==="confirmed" && <TicketConfirmation/>}

      </div>
      </div>
      
      <Button
      type='primary'
      className='inherit'
      disabled={!seatsData}
      onClick={() => setState(state === 'confirmed' ? 'Payment' : 'confirmed')}
    >
      Book Now
    </Button>
      <Divider className="my-4" />
      <SeatLegend/>
        </div>
      </Card>
  );
};

export default SeatSelection;