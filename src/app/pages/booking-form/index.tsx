/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ClockCircleOutlined,
  HomeOutlined,
  RobotOutlined,
  SearchOutlined,
  SwapOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import {
  AutoComplete,
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Layout,
  Radio,
  Tabs
} from "antd";
import TabPane from "antd/es/tabs/TabPane";
import dayjs from "dayjs";
import { useState } from "react";
import ChatInterface from "../ai-chatbot";
import Pnr from "../pnr";
import TrainListPage from "../train-listing-page";
import './bookingform.css';
import { PopularStations } from "./constant";

const BookingForm = () => {
  
  const [form] = Form.useForm();
  const [fromStation, setFromStation] = useState<string>("");
  const [toStation, setToStation] = useState<string>("");
  const [searchStationDetails,setSearchStationDetails]=useState<any>();
  const [showDetails,setShowDetails]=useState(false);

  const handleSwapStations = () => {
    const tempFrom = fromStation;
    setFromStation(toStation);
    setToStation(tempFrom);
    form.setFieldsValue({
      fromStation: toStation,
      toStation: fromStation,
    });
  };


  const handleSearch = (values: any) => {
    setShowDetails(true);
    setSearchStationDetails({
      fromStation: values.fromStation,
      toStation: values.toStation,
      date: values.date.format("YYYY-MM-DD"),
      quota: values.quota,
      travelClass: values.travelClass,
    });
  };
  

  return (
    <div className="p-6 min-h-screen">
      <Card className="search-card mb-6 rounded-full bg-red" bordered={false}>
        <Tabs defaultActiveKey="1" size="large">
          <TabPane
            tab={
              <span>
                <ThunderboltOutlined />
                BOOK TICKET
              </span>
            }
            key="1"
          >
            <Form
              form={form}
              layout="vertical"
              initialValues={{
                quota: "GENERAL",
                travelClass: "SL",
                date: dayjs().add(1, "day"),
              }}
              onFinish={handleSearch}
            >
              <div className="flex flex-row gap-2 justify-between">
              
                <Col xs={24} md={10}>
                  <Form.Item
                    name="fromStation"
                    rules={[
                      { required: true, message: "Please select a station" },
                    ]}
                    label="From"
                  >
                    <AutoComplete
                      value={fromStation}
                      onChange={setFromStation}
                      options={PopularStations.map((station) => ({
                        value: station,
                      }))}
                      placeholder="From Station"
                      filterOption={(inputValue, option) =>
                        option!.value
                          .toUpperCase()
                          .indexOf(inputValue.toUpperCase()) !== -1
                      }
                    />
                  </Form.Item>
                </Col>
                <div className="flex gap-2 px-10">
                <Col
                  xs={24}
                  md={4}
                  className="flex items-center justify-center"
                >
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<SwapOutlined />}
                    onClick={handleSwapStations}
                    className="mt-8"
                  />
                </Col>
                </div>
                <Col xs={24} md={10}>
                  <Form.Item
                    name="toStation"
                    rules={[
                      { required: true, message: "Please select a station" },
                    ]}
                    label="To"
                  >
                    <AutoComplete
                      value={toStation}
                      onChange={setToStation}
                      options={PopularStations.map((station) => ({
                        value: station,
                      }))}
                      placeholder="To Station"
                      filterOption={(inputValue, option) =>
                        option!.value
                          .toUpperCase()
                          .indexOf(inputValue.toUpperCase()) !== -1
                      }
                    />
                  </Form.Item>
                </Col>
            
              </div>
              <div className="flex flex-row justify-between">
            
                <div className="flex p-2">
                
                  <Form.Item
                    name="date"
                    label="Date"
                    rules={[{ required: true, message: "Please select date" }]}
                  >
                    <DatePicker
                      style={{ width: "100%" }}
                      format="DD-MM-YYYY"
                      disabledDate={(current) => {
                        return current && current < dayjs().startOf("day");
                      }}
                    />
                  </Form.Item>
               
                </div>

                <div className="flex p-2">
                  <Form.Item name="quota" label="Quota">
                    <Radio.Group buttonStyle="solid">
                      <Radio.Button value="GENERAL">General</Radio.Button>
                      <Radio.Button value="TATKAL">Tatkal</Radio.Button>
                      <Radio.Button value="LADIES">Ladies</Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                </div>
                <div className="flex p-2">
                  <Form.Item name="travelClass" label="Class">
                    <Radio.Group buttonStyle="solid">
                      <Radio.Button value="SL">Sleeper</Radio.Button>
                      <Radio.Button value="3A">AC 3 Tier</Radio.Button>
                      <Radio.Button value="2A">AC 2 Tier</Radio.Button>
                      <Radio.Button value="1A">AC 1st Class</Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                </div>
              </div>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  block
                  icon={<SearchOutlined />}
                >
                  Search Trains
                </Button>
              </Form.Item>
            </Form>
          </TabPane>

          <TabPane
            tab={
              <span>
                <ClockCircleOutlined />
                PNR STATUS
              </span>
            }
            key="2"
          >
           <Pnr/>
          </TabPane>

          <TabPane
            tab={
              <span>
                <HomeOutlined />
                IRCTC HOTELS
              </span>
            }
            key="3"
          >
            <h1>Hey User There is no feature change for this tab</h1>
            <h1>please take different route</h1>

          </TabPane>

          <TabPane
            tab={
              <span>
                <RobotOutlined />
                AI BOOKING
              </span>
            }
            key="4"
          >
      <Layout>
           
        <ChatInterface />
      </Layout>
            {/* <ChatInterface/> */}
            {/* <AiBooking /> */}
          </TabPane>
        </Tabs>
      </Card>
      {showDetails&&<div className="p-1">
        <TrainListPage setSearchStationDetails={setSearchStationDetails} setShowDetails={setShowDetails} Details={searchStationDetails}/>
        </div>
      // {PnrStatus &&<}
        }
    </div>
  );
};

export default BookingForm;
