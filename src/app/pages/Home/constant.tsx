// constant.tsx
import { Train, Users, TicketCheck, CalendarClock } from "lucide-react";

export const dashboardStats = [
  {
    title: "Today's Bookings",
    value: 124593,
    icon: TicketCheck,
    suffix: "",
  },
  {
    title: "Active Users",
    value: 8754,
    icon: Users,
    suffix: "",
  },
  {
    title: "Trains Running",
    value: 1423,
    icon: Train,
    suffix: "",
  },
  {
    title: "Avg Booking Time (min)",
    value: 2.5,
    icon: CalendarClock,
    suffix: " min",
  },
];

export const bookingData = [
  { hour: "00:00", bookings: 2000 },
  { hour: "04:00", bookings: 5500 },
  { hour: "08:00", bookings: 10500 },
  { hour: "12:00", bookings: 17500 },
  { hour: "16:00", bookings: 21500 },
  { hour: "20:00", bookings: 24200 },
  { hour: "23:59", bookings: 26000 },
];

export const tableColumns = [
  {
    title: "Passenger Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Train No.",
    dataIndex: "trainNumber",
    key: "trainNumber",
  },
  {
    title: "Route",
    dataIndex: "route",
    key: "route",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
];
export const recentBookings = [
  {
    key: "1",
    name: "Dinesh Kumar",
    trainNumber: "12627",
    route: "Chennai - New Delhi",
    status: "Confirmed",
    date: "2025-05-03",
  },
  {
    key: "2",
    name: "Arun Raj ",
    trainNumber: "12951",
    route: "Chennai - New Delhi",
    status: "Waiting",
    date: "2025-05-03",
  },
  {
    key: "3",
    name: "Dinesh ",
    trainNumber: "12002",
    route: "Bhopal - New Delhi",
    status: "Confirmed",
    date: "2024-06-10",
  },
  {
    key: "4",
    name: "Dinesh",
    trainNumber: "12245",
    route: "Howrah - Bangalore",
    status: "Cancelled",
    date: "2023-07-03",
  },
  {
    key: "5",
    name: "Dinesh",
    trainNumber: "12397",
    route: "Patna - Delhi",
    status: "Confirmed",
    date: "2022-05-03",
  },
];
