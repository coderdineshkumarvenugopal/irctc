/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    ClockCircleOutlined,
    FilterOutlined,
    InfoCircleOutlined,
    LeftOutlined
} from '@ant-design/icons';
import {
    Alert,
    Badge,
    Button,
    Card,
    Checkbox,
    Col,
    DatePicker,
    Divider,
    Drawer,
    Form,
    List,
    Radio,
    Row,
    Space,
    Table,
    Tag,
    Typography
} from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockTrains } from './constant';
const { Title, Text } = Typography;


interface Props {
    Details: { fromStation: string;
        toStation: string;
        date: string;
        quota: string;
        travelClass: string;}; 
        setShowDetails:(newState:boolean)=>void;
        setSearchStationDetails:any;
    };

const TrainListPage: React.FC<Props> = ({Details,setShowDetails,setSearchStationDetails}:Props) => {
  const navigate = useNavigate();
  const searchParams=Details;


  const trains=mockTrains;
  const [loading, setLoading] = useState(true);
  const [filterDrawerVisible, setFilterDrawerVisible] = useState(false);
  // const [filters, setFilters] = useState({
  //   departureTime: [],
  //   trainTypes: [],
  //   availabilityOnly: false
  // });

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  const handleFilter = (values: any) => {
    console.log('Filter values:', values);
    setFilterDrawerVisible(false);
    // Would implement actual filtering logic here
  };

  const getAvailabilityColor = (status: string) => {
    if (status.includes('Available')) return 'success';
    if (status.includes('WL') || status.includes('RAC')) return 'warning';
    return 'error';
  };

  const renderPassengerInfo = (train: any) => (
    <div>
      <Title level={5}>Available Classes</Title>
      <div className='flex justify-between '>
      <Space wrap>
        {train.availableClasses.map((cls: string) => (
          <Tag 
            key={cls} 
            color={cls === searchParams.travelClass ? 'blue' : 'default'}
          >
            {cls}
          </Tag>
        ))}
      </Space>
      <Button type='primary' onClick={()=>navigate('/coach-selection')} className=''>Book Now</Button>
      </div>
      
      <Divider />
      
      <List
        size="small"
        header={<Title level={5}>Seat Availability</Title>}
        dataSource={train.availability}
        renderItem={(item: any) => (
          <List.Item>
            <Text>{item.date}</Text>
            <Badge 
              status={getAvailabilityColor(item.status)} 
              text={item.status} 
            />
          </List.Item>
        )}
      />
    </div>
  );

  const formattedDate = dayjs(searchParams.date).format('DD MMM YYYY, ddd');
  
  const columns = [
    {
      title: 'Train Number & Name',
      dataIndex: 'name',
      key: 'name',
      render: (_: any, record: any) => (
        <>
          <Text strong>{record.number} - {record.name}</Text>
          <div>
            <Text type="secondary">Runs on: </Text>
            {record.runningDays.map((day: string) => (
              <Tag key={day} color="blue" style={{ margin: '2px' }}>
                {day}
              </Tag>
            ))}
          </div>
        </>
      ),
    },
    {
      title: 'Departure',
      dataIndex: 'departure',
      key: 'departure',
      render: (departure: string, record: any) => (
        <>
          <Text strong style={{ fontSize: '16px' }}>{departure}</Text>
          <div>
            <Text type="secondary">{record.departureStation}</Text>
          </div>
        </>
      ),
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      render: (duration: string) => (
        <div style={{ textAlign: 'center' }}>
          <Text>{duration}</Text>
          <div>
            <ClockCircleOutlined style={{ color: '#1890ff' }} />
          </div>
        </div>
      ),
    },
    {
      title: 'Arrival',
      dataIndex: 'arrival',
      key: 'arrival',
      render: (arrival: string, record: any) => (
        <>
          <Text strong style={{ fontSize: '16px' }}>{arrival}</Text>
          <div>
            <Text type="secondary">{record.arrivalStation}</Text>
          </div>
        </>
      ),
    },
    {
      title: `${searchParams.travelClass} Class`,
      key: 'availability',
      render: (_: any, record: any) => {
        const classAvailability = record.availability[0];
        return (
          <>
            <Title level={5} style={{ margin: 0 }}>₹{record.fare[searchParams.travelClass]}</Title>
            <Badge 
              status={getAvailabilityColor(classAvailability.status)} 
              text={classAvailability.status} 
            />
          </>
        );
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, __: any) => (
        <Space size="small" direction="vertical" style={{ width: '100%' }}>
          <Button type="primary" block>
            View Details
          </Button>
          <Button type="text" block size="small">
            Train Schedule
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="train-list-container fade-in">
      <Card className="search-result-header mb-3">
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={16}>
            <Space direction="vertical" size={0}>
              <Title level={4} className="mb-0">
                {searchParams.fromStation} to {searchParams.toStation}
              </Title>
              <Text>{formattedDate} | {searchParams.quota} Quota</Text>
            </Space>
          </Col>
          <Col xs={24} md={8} style={{ textAlign: 'right' }}>
            <Space>
              <Button 
                icon={<LeftOutlined />} 
                onClick={() => {
                    setSearchStationDetails({});
                    setShowDetails(false);
                }}
              >
                Modify Search
              </Button>
              <Button 
                type="primary" 
                icon={<FilterOutlined />} 
                onClick={() => setFilterDrawerVisible(true)}
              >
                Filter
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {!loading && (
        <Alert
          message={`${trains.length} Trains found`}
          type="info"
          showIcon
          className="mb-3"
        />
      )}

      <Card bordered={false}>
        <Table
          columns={columns}
          dataSource={trains}
          loading={loading}
          rowKey="number"
          expandable={{
            expandedRowRender: renderPassengerInfo,
            expandRowByClick: true,
            expandIcon: ({ expanded, onExpand, record }) =>
              expanded ? (
                <Button 
                  type="text" 
                  icon={<InfoCircleOutlined />} 
                  onClick={e => onExpand(record, e)} 
                />
              ) : (
                <Button 
                  type="text" 
                  icon={<InfoCircleOutlined />} 
                  onClick={e => onExpand(record, e)} 
                />
              ),
          }}
          pagination={{ 
            position: ['bottomCenter'],
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '50'],
            showTotal: (total) => `Total ${total} trains`,
          }}
        />
      </Card>

      <Drawer
        title="Filter Trains"
        placement="right"
        onClose={() => setFilterDrawerVisible(false)}
        open={filterDrawerVisible}
        width={320}
      >
        <Form layout="vertical" onFinish={handleFilter}>
          <Form.Item label="Departure Time" name="departureTime">
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                <Col span={24}>
                  <Checkbox value="00:00-06:00">00:00 - 06:00</Checkbox>
                </Col>
                <Col span={24}>
                  <Checkbox value="06:00-12:00">06:00 - 12:00</Checkbox>
                </Col>
                <Col span={24}>
                  <Checkbox value="12:00-18:00">12:00 - 18:00</Checkbox>
                </Col>
                <Col span={24}>
                  <Checkbox value="18:00-24:00">18:00 - 24:00</Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item label="Train Type" name="trainType">
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                <Col span={24}>
                  <Checkbox value="RAJDHANI">Rajdhani</Checkbox>
                </Col>
                <Col span={24}>
                  <Checkbox value="SHATABDI">Shatabdi</Checkbox>
                </Col>
                <Col span={24}>
                  <Checkbox value="SUPERFAST">Superfast</Checkbox>
                </Col>
                <Col span={24}>
                  <Checkbox value="EXPRESS">Express</Checkbox>
                </Col>
                <Col span={24}>
                  <Checkbox value="PASSENGER">Passenger</Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item label="Journey Date" name="journeyDate">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label="Class" name="class">
            <Radio.Group>
              <Radio.Button value="SL">SL</Radio.Button>
              <Radio.Button value="3A">3A</Radio.Button>
              <Radio.Button value="2A">2A</Radio.Button>
              <Radio.Button value="1A">1A</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item>
            <Checkbox name="availabilityOnly">
              Show trains with available seats only
            </Checkbox>
          </Form.Item>

          <Space style={{ width: '100%' }}>
            <Button type="primary" htmlType="submit" block>
              Apply Filters
            </Button>
            <Button onClick={() => setFilterDrawerVisible(false)} block>
              Cancel
            </Button>
          </Space>
        </Form>
      </Drawer>
    </div>
  );
};

export default TrainListPage;