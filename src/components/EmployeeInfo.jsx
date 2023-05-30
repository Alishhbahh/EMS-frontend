import moment from "moment";
import { Avatar } from "antd";
import "../styles/dashboard.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { EditEmployee } from "./EditEmployee";
import { EditOutlined } from "@ant-design/icons";

export const EmployeeInfo = () => {
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.selectedUser);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div className="emp-info-div">
      <div className="emp-profile-div">
        <div className="user-avatar-div">
          <Avatar size="large" className="emp-info-avatar">
            {user.name ? user.name[0] : null}
          </Avatar>
        </div>
        <div className="user-info-div">
          <h6 className="emp-name"> Name: {user.name}</h6>
          <p className="emp-subinfo">Email: {user.email}</p>
          <p className="emp-subinfo">Contact Number: {user.contactNumber}</p>
          <p className="emp-subinfo">
            Joining Date: {moment(user.joiningDate).format("LL")}
          </p>
          <p className="emp-subinfo">
            Department: {user.department ? user.department.deptName : null}
          </p>
          <p className="emp-subinfo">Role: {user.role}</p>
        </div>
        <div className="edit-icon-div">
          <EditOutlined className="edit-icon" onClick={showModal} />
        </div>
        <EditEmployee open={open} handleCancel={handleCancel} user={user} />
      </div>
    </div>
  );
};
