// dashboard.tsx
import { Card, Col, List, Row, Statistic, Table, Typography } from "antd";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  bookingData,
  dashboardStats,
  recentBookings,
  tableColumns,
} from "./constant";
import "./Home.scss";
const { Text } = Typography;
const Home = () => {
  return (
    <div className="p-6 space-y-6">
      <Text className="text-3xl font-bold text-gray-800 pb-2 flex flex-col">
        IRCTC Dashboard
      </Text>
      <Row gutter={16}>
        {dashboardStats.map((stat) => (
          <Col span={6} key={stat.title}>
            <Card className="rounded-2xl shadow-md">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <stat.icon className="text-blue-600" size={24} />
                </div>
                <Statistic
                  title={stat.title}
                  value={stat.value}
                  suffix={stat.suffix || null}
                />
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={16}>
        <Col span={16}>
          <Card
            title="Ticket Booking Trend (Last 24 Hours)"
            className="rounded-2xl shadow-md"
          >
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={bookingData}>
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="bookings"
                  stroke="#1890ff"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col span={8}>
          <Card title="IRCTC Quick Stats" className="rounded-2xl shadow-md">
            <List className="space-y-2 text-base text-gray-700">
              <List.Item>
                ⏰ Average Booking Time: <strong>2.5 mins</strong>
              </List.Item>
              <List.Item>
                🚆 Active Trains: <strong>1452</strong>
              </List.Item>
              <List.Item>
                📅 Bookings Today: <strong>1.2M+</strong>
              </List.Item>
              <List.Item>
                🧾 Cancelled Tickets: <strong>23.4K</strong>
              </List.Item>
              <List.Item>
                🌐 Most Used Route: <strong>Delhi → Mumbai</strong>
              </List.Item>
            </List>
          </Card>
        </Col>
      </Row>

      <Card title="Recent Bookings" className="rounded-2xl shadow-md">
        <Table
          columns={tableColumns}
          dataSource={recentBookings}
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </div>
  );
};

export default Home;
