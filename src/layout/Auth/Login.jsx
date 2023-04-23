import React, { useState } from "react";
import logo from "../../assets/Images/logo.png";
import { Button, Form, Input, Typography } from "antd";
import { loginAdmin } from "../../services/authRequest";
import { useDispatch } from "react-redux";
import "./Auth.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Password from "antd/es/input/Password";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const account = {
      email: email,
      password: password,
    };

    loginAdmin(account, dispatch, navigate);
  };

  return (
    <div className="auth-container">
      <div className="landing">
        <p className="landing-title">Welcome back with us ONE</p>
      </div>
      <div className="auth-form-container">
        <div className="auth-form">
          <div className="auth-form-header">
            <img src={logo} alt="" className="logo" />
            <p className="company-name">Ocean Network Express</p>
          </div>

          <div className="form-input">
            <Form name="form-auth">
              <Form.Item
                name="username"
                style={{ width: "100%" }}
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}>
                <Input
                  placeholder="Email Address"
                  style={{
                    padding: "8px 12px",
                    color: "var(--grayColor)",
                    fontWeight: "600",
                  }}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                name="password"
                style={{ width: "100%" }}
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}>
                <Password
                  placeholder="Password"
                  type="password"
                  style={{
                    padding: "8px 12px",
                    color: "var(--grayColor)",
                    fontWeight: "600",
                  }}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>
              <Form.Item style={{ textAlign: "center" }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  onClick={handleLogin}
                  style={{ padding: "5 px 10px", width: "100%" }}>
                  Continue
                </Button>
              </Form.Item>
            </Form>
            <div className="auth-bottom">
              <Typography>Forgot password ?</Typography>

              <Link to="/register">Sign up </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
