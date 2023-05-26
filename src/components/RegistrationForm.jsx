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
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    const phoneError = phoneValidator(contactNumber.value);
    const joiningError = joiningValidator(joiningDate.value);
    const deptError = deptValidator(dept.value);
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
        toast.success(response.data.message);
        setName({ value: "", error: "" });
        setEmail({ value: "", error: "" });
        setPassword({ value: "", error: "" });
        setContactNumber({ value: "", error: "" });
        setJoiningDate({ value: "", error: "" });
        setDept({ value: "", error: "" });
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
        placeholder="Name"
        className="input-field"
        size="large"
        value={name.value}
        addonBefore={<UserOutlined className="form-icon" />}
        status={name.error ? "error" : undefined}
        onChange={(e) => setName({ value: e.target.value, error: null })}
      />
      <h6 className="error">{name.error}</h6>
      <Input
        placeholder="Email"
        className="input-field"
        size="large"
        value={email.value}
        addonBefore={<MailOutlined className="form-icon" />}
        status={email.error ? "error" : undefined}
        onChange={(e) => setEmail({ value: e.target.value, error: "" })}
      />
      <h6 className="error">{email.error}</h6>

      <Input.Password
        placeholder="Password"
        className="input-field"
        size="large"
        value={password.value}
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
        placeholder="Contact Number"
        className="input-field"
        size="large"
        value={contactNumber.value}
        addonBefore={<PhoneOutlined className="form-icon" />}
        status={contactNumber.error ? "error" : undefined}
        onChange={(e) => setContactNumber({ value: e.target.value, error: "" })}
      />
      <h6 className="error">{contactNumber.error}</h6>
      {checked === "Team Lead" ? (
        <>
          <Input
            placeholder="Department"
            className="input-field"
            size="large"
            value={dept.value}
            addonBefore={<ProfileOutlined className="form-icon" />}
            status={name.error ? "error" : undefined}
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
        className="register-button"
        icon={<LoginOutlined />}
        size={42}
        onClick={() => handleRegistration()}
      >
        Register
      </Button>
    </div>
  );
};
