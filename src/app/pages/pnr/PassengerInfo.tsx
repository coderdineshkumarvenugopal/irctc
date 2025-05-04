import React from 'react';
import { Table, Tag } from 'antd';
import { Passenger } from '../../types';

interface PassengerInfoProps {
  passengers: Passenger[];
}

const PassengerInfo: React.FC<PassengerInfoProps> = ({ passengers }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'success';
      case 'rac':
        return 'warning';
      case 'waitlisted':
        return 'processing';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const columns = [
    {
      title: 'Passenger',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Passenger) => (
        <div>
          <div className="font-medium">{text}</div>
          <div className="text-xs text-gray-500">
            {record.age} yrs | {record.gender}
          </div>
        </div>
      ),
    },
    {
      title: 'Seat/Berth',
      dataIndex: 'seatNumber',
      key: 'seatNumber',
      render: (text: string) => (
        <span className="font-mono">{text}</span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>
          {status}
        </Tag>
      ),
    },
  ];

  return (
    <div className="mt-4 animate-fade-in transition-all">
      <h3 className="text-lg font-medium mb-2">Passenger Information</h3>
      <Table 
        dataSource={passengers.map((passenger, index) => ({ ...passenger, key: index }))}
        columns={columns} 
        pagination={false}
        className="border border-gray-200 rounded-lg overflow-hidden"
        size="middle"
      />
    </div>
  );
};

export default PassengerInfo;