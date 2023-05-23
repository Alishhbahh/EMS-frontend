import "../styles/auth.css";
import "../styles/dashboard.css";
import { Drawer, Menu } from "antd";
import TaskIcon from "@mui/icons-material/Task";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import TodayIcon from "@mui/icons-material/Today";

import logo from "../assets/logo3.png";

export const Sidebar = ({ user }) => {
  const role = user.role;
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  const HRitems = [
    getItem("Dashboard", "1", <HomeIcon style={{ fontSize: 22 }} />),
    getItem("Employees", "2", <PeopleIcon style={{ fontSize: 22 }} />),
    getItem("Leaves", "3", <TaskIcon style={{ fontSize: 22 }} />),
    getItem("Schedule", "4", <TodayIcon style={{ fontSize: 22 }} />),
  ];

  return (
    <Drawer
      placement="left"
      closable={false}
      open={true}
      key="left"
      headerStyle={{ display: "none" }} // Hide the header
      classNamea="ant-drawer-wrapper-body"
    >
      <div className="drawer-logo-container">
        <img src={logo} alt="My Image" className="drawer-logo" />
      </div>
      <Menu
        className="custom-menu"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={role === "HR" ? HRitems : null}
      />
    </Drawer>
  );
};
