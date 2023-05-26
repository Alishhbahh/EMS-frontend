/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import "../styles/auth.css";
const { Sider } = Layout;
import "../styles/dashboard.css";
import logo from "../assets/logo3.png";
import { Menu, Layout } from "antd";
import { useDispatch, useSelector } from "react-redux";
import TaskIcon from "@mui/icons-material/Task";
import HomeIcon from "@mui/icons-material/Home";
import TodayIcon from "@mui/icons-material/Today";
import PeopleIcon from "@mui/icons-material/People";
import { selectNavItem } from "../redux/actions";

export const Sidebar = ({ user, collapsed, toggleCollapsed }) => {
  const { role } = user;
  const dispatch = useDispatch();
  const selectedItem = useSelector((state) => state.navItem); // this is the selected item in the sidebar

  const getItem= (label, key, icon) => {
    return {
      label,
      key,
      icon,
    };
  }

  const hrItems = [
    getItem("Dashboard", "dashboard", <HomeIcon style={{ fontSize: 22 }} />),
    getItem("Employees", "employees", <PeopleIcon style={{ fontSize: 22 }} />),
    getItem("Leaves", "leaves", <TaskIcon style={{ fontSize: 22 }} />),
    getItem("Schedule", "schedule", <TodayIcon style={{ fontSize: 22 }} />),
  ];

  const empItems = [
    getItem("Dashboard", "dashboard", <HomeIcon style={{ fontSize: 22 }} />),
    getItem( "Attendance", "attendance", <PeopleIcon style={{ fontSize: 22 }} />),
    getItem("Leaves", "leaves", <TaskIcon style={{ fontSize: 22 }} />),
    getItem("Schedule", "schedule", <TodayIcon style={{ fontSize: 22 }} />),
  ];

  const handleItemClick = (item) => {
    dispatch(selectNavItem(item.key));
  };

  return (
    <Sider
      theme="dark"
      collapsible
      collapsed={collapsed}
      onCollapse={toggleCollapsed}
      width={300}
    >
      <div className="logo">
        <img src={logo} alt="logo"  className="logo-img"/>
      </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={[selectedItem]}>
        {role === "HR"
          ? hrItems.map((item) => (
              <Menu.Item
                key={item.key}
                icon={item.icon}
                style={{height: 60}}
                onClick={() => handleItemClick(item)}
              >
                {item.label}
              </Menu.Item>
            ))
          : empItems.map((item) => (
              <Menu.Item
                key={item.key}
                icon={item.icon}
                style={{height: 60}}
                onClick={() => handleItemClick(item)}
              >
                {item.label}
              </Menu.Item>
            ))}
      </Menu>
    </Sider>
  );
};
