import "../styles/auth.css";
import { Input, Button, DatePicker, Select } from "antd";
import {
  UserOutlined,
  LoginOutlined,
  MailOutlined,
  LockOutlined,
  PhoneOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import {
  emailValidator,
  nameValidator,
  passwordValidator,
  phoneValidator,
  joiningValidator,
  deptValidator,
} from "../utils/validators";
import axios from "axios";
import moment from "moment";
import { ProfileOutlined } from "@ant-design/icons";
import { Switch } from "antd";
const { Option } = Select;

export const RegistrationForm = ({ setShowForm }) => {
  const [checked, setChecked] = useState("Team Lead");
  const [name, setName] = useState({ value: "", error: "" });
  const [contactNumber, setContactNumber] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [joiningDate, setJoiningDate] = useState({ value: "", error: "" });
  const [dept, setDept] = useState({ value: "", error: "" });
  const [departments, setDepartments] = useState([]);

  const handleRegistration = () => {
    const deptError = deptValidator(dept.value);
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const phoneError = phoneValidator(contactNumber.value);
    const passwordError = passwordValidator(password.value);
    const joiningError = joiningValidator(joiningDate.value);
    if (
      emailError ||
      passwordError ||
      nameError ||
      phoneError ||
      joiningError ||
      deptError
    ) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      setJoiningDate({ ...joiningDate, error: joiningError });
      setContactNumber({
        ...contactNumber,
        error: phoneError,
      });
      setDept({
        ...contactNumber,
        error: phoneError,
      });
      return;
    }

    axios
      .post("http://localhost:8080/api/auth/register", {
        name: name.value,
        contactNumber: contactNumber.value,
        joiningDate: joiningDate.value,
        role: checked,
        department: dept.value,
        email: email.value,
        password: password.value,
      })
      .then((response) => {
        if (response.data.message) {
          toast.success(response.data.message);
          setName({ value: "", error: "" });
          setEmail({ value: "", error: "" });
          setPassword({ value: "", error: "" });
          setContactNumber({ value: "", error: "" });
          setJoiningDate({ value: "", error: "" });
          setDept({ value: "", error: "" });
        } else {
          toast.error(response.data.error);
        }
      })
      .catch((error) => {
        toast.error(error.data.message);
      });
  };

  const getDepartments = () => {
    axios
      .get("http://localhost:8080/api/emp/getdepts")
      .then((response) => {
        setDepartments(response.data.message);
      })
      .catch((error) => {
        toast.error(error.data.message);
      });
  };

  useEffect(() => {
    getDepartments();
  }, []);

  const onChange = (date, dateString) => {
    setJoiningDate({ value: dateString, error: "" });
  };

  return (
    <div className="sub-container" style={{ width: "45%" }}>
      <ToastContainer />
      <Button onClick={() => setShowForm(false)} type="text" danger>
        ✖
      </Button>
      <Switch
        defaultChecked
        onChange={() =>
          setChecked(checked === "Employee" ? "Team Lead" : "Employee")
        }
      />
      {checked === "Team Lead" ? (
        <h6 className="title">Team Lead Registration</h6>
      ) : (
        <h6 className="title">Employee Registration</h6>
      )}
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
        addonBefore={<MailOutlined className="form-icon" />}
        status={email.error ? "error" : undefined}
        onChange={(e) => setEmail({ value: e.target.value, error: "" })}
      />
      <h6 className="error">{email.error}</h6>
      <Input.Password
        size="large"
        value={password.value}
        placeholder="Password"
        className="input-field"
        iconRender={(visible) =>
          visible ? (
            <EyeOutlined style={{ color: "white" }} />
          ) : (
            <EyeInvisibleOutlined style={{ color: "white" }} />
          )
        }
        addonBefore={<LockOutlined className="form-icon" />}
        status={password.error ? "error" : undefined}
        onChange={(e) => setPassword({ value: e.target.value, error: "" })}
      />
      <h6 className="error">{password.error}</h6>
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
      {checked === "Team Lead" ? (
        <>
          <Input
            size="large"
            value={dept.value}
            className="input-field"
            placeholder="Department"
            status={name.error ? "error" : undefined}
            addonBefore={<ProfileOutlined className="form-icon" />}
            onChange={(e) => setDept({ value: e.target.value, error: "" })}
          />
          <h6 className="error">{dept.error}</h6>
        </>
      ) : (
        <Select
          placeholder={<span style={{ color: "gray" }}>Select department</span>}
          className="dropdown-field"
          onChange={(e) => setDept({ value: e, error: "" })}
        >
          {departments.map((dept) => (
            <Option key={dept._id} value={dept.deptName}>
              {dept.deptName}
            </Option>
          ))}
        </Select>
      )}
      <DatePicker
        value={joiningDate.value ? moment(joiningDate.value) : null}
        onChange={onChange}
      />
      <h6 className="error">{joiningDate.error}</h6>
      <Button
        size={42}
        icon={<LoginOutlined />}
        className="register-button"
        onClick={() => handleRegistration()}
      >
        Register
      </Button>
    </div>
  );
};
