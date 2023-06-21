import moment from "moment";
import { Avatar } from "antd";
import { useState } from "react";
import "../../styles/dashboard.css";
import { useSelector } from "react-redux";
import { EditEmployee } from "./EditEmployee";
import { EditOutlined } from "@ant-design/icons";
import { calendarColors } from "../../styles/colors";

export const EmployeeInfo = () => {
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.selectedUser);
  const randomColorKey =
    Object.keys(calendarColors)[
      Math.floor(Math.random() * Object.keys(calendarColors).length)
    ];

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const InfoHolder = ({ label, value }) => {
    return (
      <>
        <h4 className="emp-subinfo">
          {label} : {value}
        </h4>
      </>
    );
  };

  return (
    <div className="emp-profile-div">
      <div className="user-avatar-div">
        <Avatar
          size="large"
          className="emp-info-avatar"
          style={{
            backgroundColor: calendarColors[randomColorKey],
          }}
        >
          {user.name ? user.name[0].toUpperCase() : null}
        </Avatar>
      </div>
      <div className="user-info-div">
        <InfoHolder label="Name" value={user.name} />
        <InfoHolder label="Email" value={user.email} />
        <InfoHolder label="Contact Number" value={user.contactNumber} />
        <InfoHolder
          label="Joining Date"
          value={moment(user.joiningDate).format("LL")}
        />
        <InfoHolder
          label="Department"
          value={user.department?.deptName || "HR"}
        />
        <InfoHolder label="Role" value={user.name} />
      </div>
      <div className="edit-icon-div">
        <EditOutlined className="edit-icon" onClick={showModal} />
      </div>
      <EditEmployee open={open} handleCancel={handleCancel} user={user} />
    </div>
  );
};
