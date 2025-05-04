import { Alert, Button, Card, Form, Input } from 'antd';
import { Train } from 'lucide-react';
import React from 'react';

interface PNRSearchProps {
  onSearch: (pnrNumber: string) => void;
  isLoading: boolean;
  error: string | null;
}

const PNRSearch: React.FC<PNRSearchProps> = ({ onSearch, isLoading, error }) => {
  const [form] = Form.useForm();
  const handleSearch = (values: { pnrNumber: string }) => {
    onSearch(values.pnrNumber);
  };

  return (
    <Card 
      className="w-full max-w-md shadow-lg transition-all duration-300 hover:shadow-xl"
      title={
        <div className="flex items-center gap-2 text-primary-600">
          <Train className="h-6 w-6 text-blue-500" />
          <span className="text-xl font-semibold">Check PNR </span>
        </div>
      }
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSearch}
        autoComplete="off"
      >
        <Form.Item
          name="pnrNumber"
          label={<span className="text-gray-700 font-medium">Enter 10-digit PNR Number</span>}
          rules={[
            { required: true, message: 'Please enter your PNR number' },
            { 
              pattern: /^\d{10}$/, 
              message: 'PNR number must be exactly 10 digits' 
            }
          ]}
        >
          <Input 
            placeholder="e.g., 1234567890" 
            size="large"
            className="font-mono"
            maxLength={10}
          />
        </Form.Item>

        {error && (
          <Alert
            message="Error"
            description={error}
            type="error"
            showIcon
            className="mb-4"
          />
        )}

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={isLoading}
            className="w-full bg-blue-500 hover:bg-blue-600 h-10 text-base"
          >
            {isLoading ? 'Checking PNR Status...' : 'Check PNR Status'}
          </Button>
        </Form.Item>
        
        <div className="text-xs text-gray-500 mt-2">
          <p>Demo PNR numbers: 1234567890, 9876543210, 5678901234</p>
        </div>
      </Form>
    </Card>
  );
};

export default PNRSearch;