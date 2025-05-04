import {
    CheckCircleOutlined,
    DownloadOutlined,
    FileTextOutlined,
    ShareAltOutlined,
} from '@ant-design/icons';
import { Button, Card, Col, Divider, Row, Tag, Typography } from 'antd';
import { useBooking } from '../../../context/BookingContext';

const { Title, Text } = Typography;

const TicketConfirmation = () => {
  const { bookingState } = useBooking();
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };
  
  // Generate train number and name
  const trainNumber = Math.floor(10000 + Math.random() * 9000).toString();
  const getTrainName = () => {
    const prefixes = ['Rajdhani', 'Shatabdi', 'Duronto', 'Vande Bharat', 'Garib Rath', 'Jan Shatabdi', 'Sampark Kranti'];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    return `${prefix} Express`;
  };
  const trainName = getTrainName();
  
  // Generate platform and coach
  const platform = Math.floor(1 + Math.random() * 10).toString();
  const getCoach = () => {
    const classMap: Record<string, string> = {
      '1A': 'A',
      '2A': 'B',
      '3A': 'C',
      'SL': 'S',
      'CC': 'E',
      '2S': 'D'
    };
    const prefix = classMap[bookingState.class] || 'S';
    const number = Math.floor(1 + Math.random() * 9);
    return `${prefix}${number}`;
  };
  const coach = getCoach();
  
  // Generate seat numbers
  const generateSeatNumbers = () => {
    const seats = [];
    for (let i = 0; i < bookingState.passengers; i++) {
      seats.push(Math.floor(1 + Math.random() * 72).toString());
    }
    return seats;
  };
  const seatNumbers = generateSeatNumbers();
  
  return (
    <Card bordered className="shadow-sm">
      <Row align="middle" className="bg-green-50 border-b p-4">
        <Col>
          <CheckCircleOutlined className="text-green-600 text-2xl mr-3 bg-green-100 p-2 rounded-full" />
        </Col>
        <Col>
          <Title level={4} className="text-green-800 m-0">
            Booking Confirmed!
          </Title>
          <Text type="secondary">Your e-ticket has been generated</Text>
        </Col>
      </Row>
  
      <Card
        className="my-4 border border-blue-100 bg-blue-50"
        type="inner"
        title={
          <Row justify="space-between" align="middle">
            <Col>
              <FileTextOutlined className="text-blue-600 mr-2" />
              <Text strong className="text-blue-800">PNR: {bookingState.pnr}</Text>
            </Col>
            <Col>
              <Tag color="blue">
                {trainNumber} • {trainName}
              </Tag>
            </Col>
          </Row>
        }
      >
        <Row justify="space-between" className="mb-4">
          <Col>
            <Text type="secondary">From</Text>
            <Title level={5}>{bookingState.fromStation}</Title>
            <Text type="secondary">Platform {platform}</Text>
          </Col>
          <Col>
            <Divider type="vertical" />
          </Col>
          <Col style={{ textAlign: 'right' }}>
            <Text type="secondary">To</Text>
            <Title level={5}>{bookingState.toStation}</Title>
            <Text>{formatDate(bookingState.date)}</Text>
          </Col>
        </Row>
  
        <Divider />
  
        <Row justify="space-between">
          <Col><Text strong>Travel Class:</Text></Col>
          <Col>{bookingState.class}</Col>
        </Row>
        <Row justify="space-between">
          <Col><Text strong>Coach:</Text></Col>
          <Col>{coach}</Col>
        </Row>
        <Row justify="space-between">
          <Col><Text strong>Seat Numbers:</Text></Col>
          <Col>{seatNumbers.join(', ')}</Col>
        </Row>
        <Row justify="space-between">
          <Col><Text strong>Fare:</Text></Col>
          <Col><Text strong>₹{bookingState.fare}</Text></Col>
        </Row>
        <Row justify="space-between">
          <Col><Text strong>Payment Method:</Text></Col>
          <Col className="capitalize">{bookingState.paymentMethod}</Col>
        </Row>
      </Card>
  
      <Row gutter={16} justify="center">
        <Col span={12}>
          <Button
            block
            icon={<DownloadOutlined />}
            type="default"
            className="border-blue-600 text-blue-600"
          >
            Download E-Ticket
          </Button>
        </Col>
        <Col span={12}>
          <Button
            block
            icon={<ShareAltOutlined />}
            type="default"
            className="border-blue-600 text-blue-600"
          >
            Share Ticket
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default TicketConfirmation;