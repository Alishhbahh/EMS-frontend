import {
  UserOutlined,
  LoginOutlined,
  MailOutlined,
  LockOutlined,
  PhoneOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import {
  emailValidator,
  nameValidator,
  passwordValidator,
  phoneValidator,
  joiningValidator,
} from "../utils/validators";
import "../styles/auth.css";
import moment from "moment";
import { useState } from "react";
import bg2 from "../assets/bg2.jpg";
import logo from "../assets/logo3.png";
import { registerApi } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { Input, Button, DatePicker } from "antd";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [joiningDate, setJoiningDate] = useState({ value: "", error: "" });
  const [contactNumber, setContactNumber] = useState({ value: "", error: "" });

  const handleRegistration = () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    const phoneError = phoneValidator(contactNumber.value);
    const joiningError = joiningValidator(joiningDate.value);
    if (
      emailError ||
      passwordError ||
      nameError ||
      phoneError ||
      joiningError
    ) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      setJoiningDate({ ...joiningDate, error: joiningError });
      setContactNumber({
        ...contactNumber,
        error: phoneError,
      });
      return;
    }

    registerApi(
      name.value,
      email.value,
      password.value,
      contactNumber.value,
      joiningDate.value
    )
      .then((data) => {
        if (data.message) {
          toast.success(data.message);
          setName({ value: "", error: "" });
          setContactNumber({ value: "", error: "" });
          setEmail({ value: "", error: "" });
          setJoiningDate({ value: "", error: "" });
          setPassword({ value: "", error: "" });
        } else {
          toast.error(data.error);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const onChange = (date, dateString) => {
    setJoiningDate({ value: dateString, error: "" });
  };

  return (
    <div
      className="auth-container"
      style={{
        backgroundImage: `url(${bg2})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <ToastContainer />
      <div className="main-container">
        <div className="sub-container">
          <img src={logo} alt="logo" className="logo" />
          <h6 className="sub-heading">
            Fill the form below to register as HR.
          </h6>

          <Input
            size="large"
            placeholder="Name"
            value={name.value}
            className="input-field"
            status={name.error ? "error" : undefined}
            addonBefore={<UserOutlined className="form-icon" />}
            onChange={(e) => setName({ value: e.target.value, error: "" })}
          />
          <h6 className="error">{name.error}</h6>
          <Input
            size="large"
            placeholder="Email"
            value={email.value}
            className="input-field"
            status={email.error ? "error" : undefined}
            addonBefore={<MailOutlined className="form-icon" />}
            onChange={(e) => setEmail({ value: e.target.value, error: "" })}
          />
          <h6 className="error">{email.error}</h6>

          <Input.Password
            size="large"
            placeholder="Password"
            className="input-field"
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
            size="large"
            className="input-field"
            value={contactNumber.value}
            placeholder="Contact Number"
            status={contactNumber.error ? "error" : undefined}
            addonBefore={<PhoneOutlined className="form-icon" />}
            onChange={(e) =>
              setContactNumber({ value: e.target.value, error: "" })
            }
          />
          <h6 className="error">{contactNumber.error}</h6>

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
          <div className="account-line">
            <h6 style={{ marginRight: "5px" }}>Already have an account?</h6>
            <h5
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
