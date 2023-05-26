import { useState } from "react";
import "../styles/auth.css";
import "../styles/dashboard.css";
import { UserOutlined } from "@ant-design/icons";
import { Avatar as Avatarr, Dropdown } from "antd";

export const Avatar = ({ user, navigate }) => {
  const name = user.name;
  const firstLetter = name ? name.charAt(0).toUpperCase() : "";
  const [open, setOpen] = useState(false);

  const items = [
    {
      label: "Profile",
      key: "1",
      icon: <UserOutlined />,
    },
    {
      label: "Logout",
      key: "2",
      icon: <UserOutlined />,
    },
  ];

  const handleMenuClick = (e) => {
    if (e.key === "1") {
      console.log("profile here");
    }
    if (e.key === "2") {
      console.log("logout here");
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
      <Avatarr
        size="large"
        className="user-avatar"
        onClick={() => setOpen(!open)}
      >
        {firstLetter}
      </Avatarr>
    </Dropdown>
  );
};
