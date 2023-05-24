import "../styles/auth.css";
import "../styles/dashboard.css";
import { Drawer, Menu , Button} from "antd";
import TaskIcon from "@mui/icons-material/Task";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import TodayIcon from "@mui/icons-material/Today";
import { useDispatch , useSelector} from "react-redux";
import logo from "../assets/logo3.png";
import { selectNavItem, setDrawerCollapse } from "../redux/actions";
import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';


export const Sidebar = ({ user }) => {
  const role = user.role;
  const dispatch= useDispatch();
  const [collapse, setCollapse]= useState(false);
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
    // <div className={`drawer-content-wrapper ${collapse ? 'collapsed' : 'expanded'}`} >
    <Drawer
    placement="left"
    closable={false}
    visible={true}
    key="left"
    headerStyle={{ display: "none" }}
    style={{ width: collapse ? '100px' : '300px' }}
  >
    <div className="drawer-logo-container">
      <img src={logo} alt="My Image" className="drawer-logo" />
      <div className="drawer-toggle-icon" onClick={() => {
        setCollapse(!collapse)
        dispatch(setDrawerCollapse(collapse))
        }}>
        {collapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </div>
    </div>

    {collapse ? (
      <Menu
        className="custom-menu icon-menu"
        defaultSelectedKeys={["dashboard"]}
        mode="inline"
        items={role === "HR" ? HRitems.map(item => ({ ...item, label: null })) : null}
        onClick={handleItemClick}
      />
    ) : (
      <Menu
        className="custom-menu full-menu"
        defaultSelectedKeys={["dashboard"]}
        mode="inline"
        items={role === "HR" ? HRitems : null}
        onClick={handleItemClick}
      />
    )}
  </Drawer>
  // </div>

  );
};
