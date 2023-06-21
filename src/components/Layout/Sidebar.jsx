/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
const { Sider } = Layout;
import "../../styles/auth.css";
import "../../styles/dashboard.css";
import { Menu, Layout } from "antd";
import logo from "../../assets/logo3.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TaskIcon from "@mui/icons-material/Task";
import HomeIcon from "@mui/icons-material/Home";
import TodayIcon from "@mui/icons-material/Today";
import PeopleIcon from "@mui/icons-material/People";
import HowToRegIcon from '@mui/icons-material/HowToReg';

export const Sidebar = ({ user, collapsed,  onMouseEnter, onMouseLeave}) => {
  const { role } = user;
  const navigate = useNavigate();
  const selectedItem = useSelector((state) => state.navItem); // this is the selected item in the sidebar

  const getItem = (label, key, icon) => {
    return {
      label,
      key,
      icon,
    };
  };

  const hrItems = [
    getItem("Dashboard", "dashboard", <HomeIcon style={{ fontSize: 22 }} />),
    getItem("Employees", "employees", <PeopleIcon style={{ fontSize: 22 }} />),
    getItem("Leaves", "leaves", <TaskIcon style={{ fontSize: 22 }} />),
    getItem("Schedule", "schedule", <TodayIcon style={{ fontSize: 22 }} />),
  ];

  const empItems = [
    getItem("Dashboard", "dashboard", <HomeIcon style={{ fontSize: 22 }} />),
    getItem("Attendance", "attendance", <HowToRegIcon style={{ fontSize: 22 }} />),
    getItem("Leaves", "leaves", <TaskIcon style={{ fontSize: 22 }} />),
    getItem("Schedule", "schedule", <TodayIcon style={{ fontSize: 22 }} />),
    getItem("Employees", "employees", <PeopleIcon style={{ fontSize: 22 }} />),
  ];

  const handleItemClick = (item) => {
    if(item===undefined){
      navigate("/dashboard");
    } else if(item.key === "employees"){
      navigate("/employees");
    }
    else if(item.key === "attendance"){
      navigate("/attendance");
    }
    else if(item.key === "leaves"){
      navigate("/leaves");
    }
    else if(item.key === "schedule"){
      navigate("/schedule");
    }
    else{
      navigate("/dashboard");
    }
  };

  return (
    <Sider
      theme="dark"
      collapsible
      collapsed={collapsed}
      width={250}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{position:"fixed", height:"100vh", zIndex:1}}
    >
      <div className="logo">
        <img src={logo} alt="logo" className="logo-img" />
      </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={[selectedItem]}>
        {role === "HR"
          ? hrItems.map((item) => (
              <Menu.Item
                key={item.key}
                icon={item.icon}
                style={{ height: 60 }}
                onClick={() => handleItemClick(item)}
              >
                {item.label}
              </Menu.Item>
            ))
          : empItems.map((item) => (
              <Menu.Item
                key={item.key}
                icon={item.icon}
                style={{ height: 60 }}
                onClick={() => handleItemClick(item)}
              >
                {item.label}
              </Menu.Item>
            ))}
      </Menu>
    </Sider>
  );
};
