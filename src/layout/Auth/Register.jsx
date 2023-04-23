import React, { useState } from "react";
import logo from "../../assets/Images/logo.png";
import { Button, Form, Input, Typography, DatePicker, Radio } from "antd";

import { useDispatch } from "react-redux";
import "./Auth.scss";
import { useNavigate, Link } from "react-router-dom";
import { registerCustomer } from "../../services/customerRequest";

function Login(props) {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [company, setCompany] = useState("");
  const [birthday, setBirthday] = useState("");
  const [sex, setSex] = useState("0");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeBirthday = (date, dateString) => {
    setBirthday(dateString);
  };

  const handleRegister = () => {
    const data = {
      firstname,
      lastname,
      email,
      phone,
      password,
      city,
      country,
      address,
      company,
      birthday,
      sex,
    };
    registerCustomer(data, dispatch, navigate);
  };

  return (
    <div className="auth-container">
      <div className="landing">
        <p className="landing-title">Welcome to Ocean Network Express</p>
      </div>
      <div className="auth-form-container">
        <div className="auth-form">
          <div className="auth-form-header">
            <img src={logo} alt="" className="logo" />
            <p className="company-name">Ocean Network Express</p>
          </div>

          <p className="note">Let be a member us</p>

          <div className="form-input">
            <Form name="form-auth">
              <Form.Item
                name="firstname"
                style={{ width: "100%" }}
                rules={[
                  { required: true, message: "Please input your first name!" },
                ]}>
                <Input
                  placeholder="First name"
                  style={{
                    padding: "8px 12px",
                    color: "var(--grayColor)",
                    fontWeight: "600",
                  }}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                name="lastname"
                style={{ width: "100%" }}
                rules={[
                  { required: true, message: "Please input your last name!" },
                ]}>
                <Input
                  placeholder="Last name"
                  style={{
                    padding: "8px 12px",
                    color: "var(--grayColor)",
                    fontWeight: "600",
                  }}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                name="email"
                style={{ width: "100%" }}
                rules={[
                  { required: true, message: "Please input your email!" },
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
                name="phone"
                style={{ width: "100%" }}
                rules={[
                  { required: true, message: "Please input your phone!" },
                ]}>
                <Input
                  placeholder="Phone number"
                  style={{
                    padding: "8px 12px",
                    color: "var(--grayColor)",
                    fontWeight: "600",
                  }}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                name="password"
                style={{ width: "100%" }}
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}>
                <Input
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

              <Form.Item
                name="city"
                style={{ width: "100%" }}
                rules={[
                  { required: true, message: "Please input your city!" },
                ]}>
                <Input
                  placeholder="City"
                  style={{
                    padding: "8px 12px",
                    color: "var(--grayColor)",
                    fontWeight: "600",
                  }}
                  onChange={(e) => setCity(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                name="country"
                style={{ width: "100%" }}
                rules={[
                  { required: true, message: "Please input your country!" },
                ]}>
                <Input
                  placeholder="Country"
                  style={{
                    padding: "8px 12px",
                    color: "var(--grayColor)",
                    fontWeight: "600",
                  }}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                name="address"
                style={{ width: "100%" }}
                rules={[
                  { required: true, message: "Please input your address!" },
                ]}>
                <Input
                  placeholder="Address"
                  style={{
                    padding: "8px 12px",
                    color: "var(--grayColor)",
                    fontWeight: "600",
                  }}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                name="company"
                style={{ width: "100%" }}
                rules={[
                  { required: true, message: "Please input your company!" },
                ]}>
                <Input
                  placeholder="Company"
                  style={{
                    padding: "8px 12px",
                    color: "var(--grayColor)",
                    fontWeight: "600",
                  }}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                name="birthday"
                style={{ width: "100%" }}
                rules={[
                  { required: true, message: "Please input your birthday!" },
                ]}>
                <DatePicker
                  placeholder="Birthday"
                  onChange={onChangeBirthday}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    color: "var(--grayColor)",
                    fontWeight: "600",
                  }}
                />
              </Form.Item>

              <Form.Item
                label="Sex"
                style={{ width: "100%" }}
                rules={[{ required: true, message: "Please input your sex!" }]}>
                <Radio.Group
                  defaultValue={sex}
                  onChange={(e) => setSex(e.target.value)}>
                  <Radio value="0"> Male </Radio>
                  <Radio value="1"> Female </Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item style={{ textAlign: "center" }}>
                <Button
                  onClick={handleRegister}
                  type="primary"
                  htmlType="submit"
                  size="large"
                  style={{ padding: "5 px 10px", width: "100%" }}>
                  Continue
                </Button>
              </Form.Item>
            </Form>
            <div className="auth-bottom">
              <Typography>Already have an account ?</Typography>

              <Link to="/login">Sign in </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
