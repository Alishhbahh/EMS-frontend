/* eslint-disable react-hooks/exhaustive-deps */
import "../styles/auth.css";
import "../styles/dashboard.css";
import { Drawer, Menu } from "antd";
import TaskIcon from "@mui/icons-material/Task";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import TodayIcon from "@mui/icons-material/Today";
import { useDispatch } from "react-redux";
import logo from "../assets/logo3.png";
import { selectNavItem, setDrawerCollapse } from "../redux/actions";
import { useState, useEffect } from "react";

export const Sidebar = ({ user }) => {
  const role = user.role;
  const dispatch = useDispatch();
  const [collapse, setCollapse] = useState(false);
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 500) {
        setCollapse(true);
        dispatch(setDrawerCollapse(true));
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const hrItems = [
    getItem("Dashboard", "dashboard", <HomeIcon style={{ fontSize: 22 }} />),
    getItem("Employees", "employees", <PeopleIcon style={{ fontSize: 22 }} />),
    getItem("Leaves", "leaves", <TaskIcon style={{ fontSize: 22 }} />),
    getItem("Schedule", "schedule", <TodayIcon style={{ fontSize: 22 }} />),
  ];

  const empItems = [
    getItem("Dashboard", "dashboard", <HomeIcon style={{ fontSize: 22 }} />),
    getItem(
      "Attendance",
      "Attendance",
      <PeopleIcon style={{ fontSize: 22 }} />
    ),
    getItem("Leaves", "leaves", <TaskIcon style={{ fontSize: 22 }} />),
    getItem("Schedule", "schedule", <TodayIcon style={{ fontSize: 22 }} />),
  ];

  const handleItemClick = (item) => {
    dispatch(selectNavItem(item.key));
  };
  console.log("collapse", collapse);
  return (
    <Drawer
      placement="left"
      closable={false}
      open={true}
      key="left"
      headerStyle={{ display: "none" }}
      style={{ width: collapse ? "100px" : "300px" }}
    >
      <div className="drawer-logo-container">
        <img src={logo} alt="My Image" className="drawer-logo" />
      </div>

      {collapse ? (
        <Menu
          className="custom-menu icon-menu"
          defaultSelectedKeys={["dashboard"]}
          mode="inline"
          items={
            role === "HR"
              ? hrItems.map((item) => ({ ...item, label: null }))
              : empItems.map((item) => ({ ...item, label: null }))
          }
          onClick={handleItemClick}
        />
      ) : (
        <Menu
          className="custom-menu full-menu"
          defaultSelectedKeys={["dashboard"]}
          mode="inline"
          items={role === "HR" ? hrItems : empItems}
          onClick={handleItemClick}
        />
      )}
    </Drawer>
  );
};
