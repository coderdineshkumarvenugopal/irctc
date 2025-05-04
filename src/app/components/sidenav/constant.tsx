import { MenuProps, Tooltip, Typography } from "antd";
import { House, TrainFront } from "lucide-react";
import React from "react";
import SVG from "react-inlinesvg";
import { ROUTES } from "../../routes/constant";
import threeDots from "/images/sidenav/three-dots.svg";
const { Text } = Typography;
type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group",
  tooltip?: boolean
): MenuItem {
  return {
    key,
    icon,
    children,
    label: tooltip ? <Tooltip title={label}>{label}</Tooltip> : label,
    type,
  } as MenuItem;
}
export const menuItems = {
  [ROUTES.HOME]: `${ROUTES.HOME}`,
  [ROUTES.LOGIN]: `${ROUTES.LOGIN}`,
  [ROUTES.SIGN_IN]: ROUTES.SIGN_IN,
  [ROUTES.PAYMENT]: ROUTES.PAYMENT,
  [ROUTES.FORGOT_PASSWORD]: ROUTES.FORGOT_PASSWORD,
  [ROUTES.BOOKING]: `${ROUTES.BOOKING}`,
  [ROUTES.DETAILS]: `${ROUTES.DETAILS}`,
  [ROUTES.COACH_SELECTION]: ROUTES.COACH_SELECTION,
  [ROUTES.ACCOUNT_SETTINGS]: ROUTES.ACCOUNT_SETTINGS,
  [ROUTES.ACCOUNT_SETTINGS]: ROUTES.ACCOUNT_SETTINGS,
};
export const getMenuItems = (currentMenuItem: string) => {
  const getFillColor = (value: string) =>
    currentMenuItem === value
      ? "fill-primary sidebar-menu-item-icon stroke-primary"
      : "fill-neutral sidebar-menu-item-icon";
  const arr: MenuProps["items"] = [];

  arr.push(
    getItem(
      <Text>Home</Text>,
      `${ROUTES.HOME}`,
      <House 
        className={getFillColor(ROUTES.HOME)}
        style={{ fontSize: "16px" }}
      />
    )
  );
  arr.push(
    getItem(
      <Text>Book Ticket</Text>,
      `${ROUTES.BOOKING}`,
      <TrainFront className={getFillColor(ROUTES.BOOKING)}
      style={{ fontSize: "16px" }}/>
     
    )
    
  );
  // arr.push(
  //   getItem(
  //     <Text>Disha</Text>,
  //     ``,
  //     <div></div>,
  //   )
  // );
  // arr.push(
  //   getItem(
  //     <Text>Contact Us</Text>,
  //     ``,
  //     <div></div>,
  //   )
  // );
  // arr.push(
  //   getItem(
  //     <Text>Help and Support</Text>,
  //     ``,
  //     <div></div>,
  //   )
  // );

  return arr;
};

export const COLOR_LIST = [
  "bg-surface-warning-priority",
  "bg-surface-action-hover",
  "bg-[#B91C1C]",
  "bg-[#15803D]",
];

export const threeDotsImage = <SVG src={threeDots} />;
