import { BulbFilled, BulbOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Dropdown,
  Layout,
  Menu,
  MenuProps,
  Typography,
} from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/constant";
import { letterToNumber } from "../../utils/letterToNumber";
import { COLOR_LIST, getMenuItems, menuItems } from "./constant";
import "./index.scss";
import IRCTCCollapsed from "/images/sidenav/IRCTC-collapsed.svg";
import irctc from "/images/sidenav/irctc.svg";
import Logout from "/images/sidenav/logout.svg";
import Settings from "/images/sidenav/setting.svg";
import SVG from "react-inlinesvg";
const { Sider } = Layout;
interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}
const SideNav: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const [hideMenu, setHideMenu] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = useMemo(
    () => location.pathname.split("/")[1],
    [location.pathname]
  );
  const currentMenuItem: string = useMemo(
    () => (pathname ? pathname : ROUTES.HOME),
    [pathname]
  );
  const [selectedKeys, setSelectedKeys] = useState<string[]>([
    menuItems[currentMenuItem],
  ]);
  const listMenuItems = getMenuItems(currentMenuItem);
  const [randomColor] = useState(String(COLOR_LIST[letterToNumber("a")]));
  const { Text } = Typography;
  const onClick: MenuProps["onClick"] = (e) => {
    const path = e.key;
   
    navigate(path);
  };
  const navigationHandler: MenuProps["onChange"] = () => {
    navigate(pathname);
  };
  const onMouseEnter = useCallback(() => {
    setCollapsed(false);
    setHideMenu(false);
  }, []);
  const onMouseLeave = useCallback(() => {
    setCollapsed(true);
    setHideMenu(true);
  }, []);
  const hanleLogoutClick = () => {
    navigate("/login");
  };
  const items: MenuProps["items"] = [
    {
      key: "Account settings",
      label: (
        <div
          onClick={() => navigate(`/${ROUTES.ACCOUNT_SETTINGS}`)}
          className="flex gap-2"
        >
          <img src={Settings} alt="" />
          <span> Settings </span>
        </div>
      ),
    },
    {
      key: "Toggle settings",
      label: (
        <div
          onClick={toggleDarkMode}
          className="flex gap-2 items-center cursor-pointer"
        >
          {darkMode ? <BulbFilled /> : <BulbOutlined />}
          <Text>{darkMode ? "Light Mode" : "Dark Mode"}</Text>
        </div>
      ),
    },
    {
      key: "logout",
      label: (
        <div onClick={hanleLogoutClick} className="flex gap-2">
          <img src={Logout} alt="" />
          <Text> Logout</Text>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const newPathname = location.pathname.split("/")[1];
    const selectedKey = [menuItems[newPathname]];
    setSelectedKeys(selectedKey);
  }, [location.pathname]);
  return (
    <Sider
      width={256}
      breakpoint="xl"
      trigger={null}
      collapsible
      collapsedWidth={64}
      collapsed={collapsed}
      onMouseEnter={() => onMouseEnter()}
      onMouseLeave={() => onMouseLeave()}
      style={{
        borderRadius: "12px",
        border: "2px solid #193D88",
        boxSizing: "content-box",
        overflow: "hidden",
      }}
      className={`m-2 sideNav rounded-[12px] bg-transparent fixed ${
        hideMenu && "sidenav-menu-hidden flex flex-col gap-16"
      }`}
    >
      <div
        role="button"
        onClick={() => setCollapsed((prev) => !prev)}
        id="sidenav-logo"
        className="select-none w-full flex  flex-none gap-[16px] items-end justify-start h-[32px] px-[16px] mt-[10px] "
      >
        <img
          src={irctc}
          alt="irctc-name"
          width="32px"
          height="32px"
          className=""
        />
        {!collapsed && <SVG src={IRCTCCollapsed} />}
      </div>
      <div className="overflow-auto flex flex-col rounded-[12px] h-full w-full text-white  w-inherit max-w-64  border-primary trigger cursor-pointer ">
        <div className="flex flex-1 flex-col justify-between w-[100]">
          <Menu
            mode="inline"
            onChange={navigationHandler}
            onClick={onClick} // use this to handle navigation
            items={listMenuItems}
            className="px-[6px] sidenav-ant-selected sidenav-menu !bg-inherit border-primary text-gray-300 flex-1"
            defaultSelectedKeys={[menuItems[currentMenuItem]]}
            selectedKeys={selectedKeys}
            style={{ borderInlineEnd: 0 }} // this removes default right border
          />
          <div className="w-full bg-surface-primary ">
            <div
              id="irctc-tour-logout-icon "
              className="flex p-[12px] gap-[16px] justify-start font-medium border-primary"
            >
              <div className="select-none">
                <Avatar size={"large"} className={`capitalize ${randomColor} `}>
                  D
                </Avatar>
              </div>

              {!collapsed && (
                <div className="flex flex-1 justify-between items-center relative overflow-hidden">
                  <div className="flex flex-col items-start justify-start max-w-[148px]">
                    <span
                      title={"Dinesh"}
                      className="text-body text-[14px] overflow-hidden whitespace-nowrap  w-full leading-5"
                    >
                      Dinesh
                    </span>
                  </div>
                  <Dropdown
                    menu={{
                      items,
                    }}
                    placement="topLeft"
                    className="w-fit"
                  >
                    <Button
                      size="large"
                      type="text"
                      className="border border-primary flex items-center justify-center sidebar-user-action-icon "
                    >
                      <BsThreeDotsVertical
                        color="white"
                        size={"small"}
                        className="text-[24px]"
                      />
                    </Button>
                  </Dropdown>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Sider>
  );
};

export default SideNav;
