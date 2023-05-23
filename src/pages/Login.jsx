import "../styles/auth.css";
import bg2 from "../assets/bg2.jpg";
import { Input, Button } from "antd";
import logo from "../assets/logo3.png";
import {
  LoginOutlined,
  MailOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import {
  emailValidator,
  passwordValidator,
} from "../utils/validators";
import axios from "axios";
import { useDispatch } from "react-redux";
import {addUser} from "../redux/actions"
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';




const Login = () => {
  const dispatch = useDispatch();

const navigate = useNavigate();

  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  const handleLogin = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (
      emailError ||
      passwordError 
    ) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    axios.post('http://localhost:8080/api/auth/login', 
    { 
      email: email.value,
      password: password.value
    }).then(response =>{
      toast.success("user logged in successfully");
      setEmail({value: '', error : ''})
      setPassword({value: '', error : ''})
      if(response.data.message){
        toast.success("User logged in Successfully")
        localStorage.setItem('token', response.data.message);
        console.log(response.data.message)
        const decoded =  jwt_decode(response.data.message);
        console.log("decoded", decoded)
         if(decoded){
          dispatch(addUser(decoded));
          navigate('/dashboard');
         }
        
      }
      else{
        toast.error("Error logging in. Re-enter your email and password")
      }
  
    }
    ).catch(error =>{
      toast.error(error.message)
    })

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
            Welcome back! Login to continue using TeamTrack
          </h6>

          <Input
            placeholder="Email"
            className="input-field"
            size="large"
            addonBefore={<MailOutlined className="form-icon" />}
            status={email.error ? "error" : undefined}
            onChange={(e) => setEmail({ value: e.target.value, error: ''})}
          />
          <h6 className="error">{email.error}</h6>

          <Input.Password
            placeholder="Password"
            className="input-field"
            size="large"
            iconRender={(visible) =>
              visible ? (
                <EyeOutlined style={{ color: "white" }} />
              ) : (
                <EyeInvisibleOutlined style={{ color: "white" }} />
              )
            }
            addonBefore={<LockOutlined className="form-icon" />}
            status={password.error ? "error" : undefined}
            onChange={(e) =>
              setPassword({ value: e.target.value, error: '' })
            }
          />
          <h6 className="error">{password.error}</h6>

         
            <h5 className="forgot-pass"
            onClick={() =>{
                console.log("forgot password")
            }}
            > Forgot Password?</h5>
          <Button
            className="register-button"
            icon={<LoginOutlined />}
            size={42}
            onClick={() => handleLogin()}
          >
            Login
          </Button>
          <div className="account-line">
            <h6 style={{ marginRight: "5px" }}>Don&apos;t have an account?</h6>
            <h5
              onClick={() => {
                window.location.href = "/register";
              }}
            >
              Register Now
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};



export default Login;