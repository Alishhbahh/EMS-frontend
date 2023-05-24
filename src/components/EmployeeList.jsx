import "../styles/auth.css";
import "../styles/dashboard.css";
import { Drawer, Menu } from "antd";
import TaskIcon from "@mui/icons-material/Task";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import TodayIcon from "@mui/icons-material/Today";
import { DownOutlined, UserOutlined, UserAddOutlined } from "@ant-design/icons";
import React, { useState } from 'react';
import logo from "../assets/logo3.png";
import { Breadcrumb, Input, Dropdown, Tooltip, Button, Space } from "antd";
const { Search } = Input;
import { Avatar } from "./Avatar";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { useSelector } from "react-redux";

export const EmployeeList = ({ user, navigate }) => {
  const onSearch = (value) => console.log(value);
  const collapse = useSelector((state) => state.collapse);

  const [searchType, setSearchType] = useState("Everyone");
  const handleButtonClick = (e) => {
  
    console.log("click left button", e);
  };
  const handleMenuClick = (e) => {
    setSearchType(e.key);
  };
  const items = [
    {
      label: "Everyone",
      key: "Everyone",
      icon: <UserOutlined />,
    },
    {
      label: "Team Lead",
      key: "Team Lead",
      icon: <UserOutlined />,
    },
    {
      label: "Employees",
      key: "Employees",
      icon: <UserOutlined />,
    },
    {
      label: "HR",
      key: "HR",
      icon: <UserOutlined />,
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <div className="right-div" style={{left: collapse ? '300px': '100px' }}>
      <div className="search-div">
     
        <Search
          placeholder="Search.."
          allowClear
          onSearch={onSearch}
          className="emp-search"
        />
        <Dropdown.Button
          className="type-dropdown"
          overlayStyle={{ maxHeight: "200px" }}
          menu={menuProps}
          onClick={handleButtonClick}
        >
          {searchType}
        </Dropdown.Button>

        <Avatar user={user} navigate={navigate} />
      </div>
      <div className="bottom-div">
      <Button
            className="add-emp-button"
            icon={<UserAddOutlined />}
            size={42}
            onClick={() => handleLogin()}
          >
            Register Employee
          </Button>
          </div>
    </div>
  );
};
