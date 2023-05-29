import "../styles/auth.css";
import "../styles/dashboard.css";
import { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar as AntdAvatar, Dropdown } from "antd";

export const Avatar = ({ user, navigate }) => {
  const { name } = user;
  const firstLetter = name?.charAt(0).toUpperCase() ?? "";
  const [open, setOpen] = useState(false); // for dropdown menu

  const items = [
    {
      label: "Profile",
      key: "profile",
      icon: <UserOutlined />,
    },
    {
      label: "Logout",
      key: "logout",
      icon: <UserOutlined />,
    },
  ];

  const handleMenuClick = (e) => {
    if (e.key === "profile") {
      console.log("profile here");
      // TODO: navigate to profile page later on
    }
    if (e.key === "logout") {
      localStorage.clear();
      navigate("/login");
    }
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <Dropdown menu={menuProps} placement="bottomLeft" arrow>
      <AntdAvatar
        size="large"
        className="user-avatar"
        onClick={() => setOpen(!open)}
      >
        {firstLetter}
      </AntdAvatar>
    </Dropdown>
  );
};
