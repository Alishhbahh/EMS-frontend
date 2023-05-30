/* eslint-disable prettier/prettier */
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import moment from "moment";
import "../styles/auth.css";
import "../styles/dashboard.css";
import { useState } from "react";
import { Input, Button } from "antd";
import { Modal, DatePicker } from "antd";
import { useDispatch } from "react-redux";
import { colors } from "../styles/colors";
import { editEmployeeApi } from "../api/employee";
import { setSelectedUser } from "../redux/actions";
import { ToastContainer, toast } from "react-toastify";

export const EditEmployee = ({ open, user, handleCancel }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState({ value: user?.name, error: "" });
  const [email, setEmail] = useState({ value: user?.email, error: "" });
  const [joiningDate, setJoiningDate] = useState({ value: user?.joiningDate, error: ""});
  const [contactNumber, setContactNumber] = useState({ value: user?.contactNumber, error: ""});

  const onChange = (date, dateString) => {
    setJoiningDate({ value: dateString, error: "" });
  };

  const handleEdit = (name, joiningDate, contactNumber) => {
    editEmployeeApi(user._id, name, joiningDate, contactNumber)
      .then((data) => {
        if (data.message) {
          toast.success("User Updated Successfully");
          dispatch(setSelectedUser(data.message));
          handleCancel();
        } else {
          toast.error("Something went wrong");
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <Modal
      title="Edit Employee Info"
      open={open}
      onCancel={handleCancel}
      style={{
        backgroundColor: colors.primary,
        color: colors.white,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <ToastContainer />
      <Input
        size="large"
        value={name.value}
        placeholder="Name"
        className="input-field"
        addonBefore={<UserOutlined className="form-icon" />}
        status={name.error ? "error" : undefined}
        onChange={(e) => setName({ value: e.target.value, error: null })}
      />
      <h6 className="error">{name.error}</h6>
      <Input
        size="large"
        value={email.value}
        placeholder="Email"
        className="input-field"
        disabled={true}
        addonBefore={<MailOutlined className="form-icon" />}
        status={email.error ? "error" : undefined}
        onChange={(e) => setEmail({ value: e.target.value, error: "" })}
      />
      <h6 className="error">{email.error}</h6>

      <Input
        size="large"
        className="input-field"
        value={contactNumber.value}
        placeholder="Contact Number"
        status={contactNumber.error ? "error" : undefined}
        addonBefore={<PhoneOutlined className="form-icon" />}
        onChange={(e) => setContactNumber({ value: e.target.value, error: "" })}
      />
      <h6 className="error">{contactNumber.error}</h6>
      <DatePicker
        value={joiningDate.value ? moment(joiningDate.value) : null}
        onChange={onChange}
      />
      <h6 className="error">{joiningDate.error}</h6>
      <Button
        size={42}
        icon={<LoginOutlined />}
        className="register-button"
        onClick={() =>
          handleEdit(name.value, contactNumber.value, joiningDate.value)
        }
      >
        Save
      </Button>
    </Modal>
  );
};
