import {
  LoginOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import "../styles/auth.css";
import { useState } from "react";
import bg2 from "../assets/bg2.jpg";
import { Input, Button } from "antd";
import logo from "../assets/logo3.png";
import { resetPasswordApi } from "../api/auth";
import { ToastContainer, toast } from "react-toastify";
import { passwordValidator } from "../utils/validators";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { resetToken } = useParams(); // Retrieve the resetToken parameter from the URL
  const [password, setPassword] = useState({ value: "", error: "" });

  const handlePasswordReset = () => {
    const passwordError = passwordValidator(password.value);

    if (passwordError) {
      setPassword({ ...password, error: passwordError });
      return;
    }

    resetPasswordApi(resetToken, password.value)
      .then((data) => {
        if (data.message) {
          toast.success(data.message);
          setPassword({ value: "", error: "" });
          navigate("/login");
        } else {
          toast.error(data.error);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
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
            Enter your new password to reset your password
          </h6>

          <Input.Password
            size="large"
            placeholder="Password"
            value={password.value}
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
          <Button
            size={42}
            icon={<LoginOutlined />}
            className="register-button"
            onClick={() => handlePasswordReset()}
          >
            Reset Password
          </Button>
          <div className="account-line">
            <h6 style={{ marginRight: "5px" }}>Remember you password?</h6>
            <h5
              onClick={() => {
                navigate("/login");
              }}
            >
              Login Now
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
