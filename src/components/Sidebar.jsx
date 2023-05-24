import "../styles/auth.css";
import "../styles/dashboard.css";
import { Drawer, Menu } from "antd";
import TaskIcon from "@mui/icons-material/Task";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import TodayIcon from "@mui/icons-material/Today";
import { useDispatch } from "react-redux";

import logo from "../assets/logo3.png";
import { selectNavItem } from "../redux/actions";
export const Sidebar = ({ user }) => {
  const role = user.role;
  const dispatch= useDispatch();
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  const HRitems = [
    getItem("Dashboard", "dashboard", <HomeIcon style={{ fontSize: 22 }} />),
    getItem("Employees", "employees", <PeopleIcon style={{ fontSize: 22 }} />),
    getItem("Leaves", "leaves", <TaskIcon style={{ fontSize: 22 }} />),
    getItem("Schedule", "schedule", <TodayIcon style={{ fontSize: 22 }} />),
  ];

  const handleItemClick=(item)=>{
    dispatch(selectNavItem(item.key))
  }

  return (
    <Drawer
      placement="left"
      closable={false}
      open={true}
      key="left"
      headerStyle={{ display: "none" }} // Hide the header
      classNamea="drawer"
      // style={{width:"80%"}}
    >
      <div className="drawer-logo-container">
        <img src={logo} alt="My Image" className="drawer-logo" />
      </div>
      <Menu
        className="custom-menu"
        defaultSelectedKeys={["dashboard"]}
        mode="inline"
        items={role === "HR" ? HRitems : null}
        onClick={handleItemClick}
      />
    </Drawer>
  );
};
