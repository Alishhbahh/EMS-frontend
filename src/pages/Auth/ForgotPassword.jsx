import "../../styles/auth.css";
import { useState } from "react";
import bg2 from "../../assets/bg2.jpg";
import { Input, Button } from "antd";
import logo from "../../assets/logo3.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { emailValidator } from "../../utils/validators";
import { LoginOutlined, MailOutlined } from "@ant-design/icons";
import { forgotPasswordApi } from "../../api/auth";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState({ value: "", error: "" });

  const handleForgotPassword = () => {
    const emailError = emailValidator(email.value);

    if (emailError) {
      setEmail({ ...email, error: emailError });
      return;
    }

    forgotPasswordApi(email.value)
      .then((data) => {
        if (data.message) {
          toast.success(data.message);
          setEmail({ value: "", error: "" });
          // To easily access the link from console. I am using test account in backend to send mail so link is not sent to gmail yet.
          console.log("link", data.link);
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
            Enter your email and we will send you a reset link
          </h6>
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
          <Button
            size={42}
            icon={<LoginOutlined />}
            className="register-button"
            onClick={() => handleForgotPassword()}
          >
            Send Email
          </Button>
          <div className="account-line">
            <h6 style={{ marginRight: "5px" }}>Remember your password?</h6>
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

export default ForgotPassword;
