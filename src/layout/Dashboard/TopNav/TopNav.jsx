/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Search, CornerRightDown, MessageCircle } from "react-feather";
import { Dropdown } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import womanImg from "../../../assets/Images/woman.png";

import "./TopNav.scss";
import { accountAdmin, adminToken } from "../../../redux/selector";
import { logoutAdmin } from "../../../services/authRequest";
const TopNav = () => {
  const account = useSelector(accountAdmin);
  const token = useSelector(adminToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAdmin(dispatch, account?.data.id_customer, token, navigate);
  };
  const items = account
    ? [
        {
          key: "1",
          label: (
            <a rel="noopener noreferrer" href="https://www.antgroup.com">
              Hi , {account?.data.adminName}
            </a>
          ),
        },
        {
          key: "2",
          label: (
            <p rel="noopener noreferrer" onClick={handleLogout}>
              Log out
            </p>
          ),
        },
        {
          key: "3",
          label: (
            <p>
              Role ,{" "}
              {account?.data.adminSystem === true
                ? "Admin System"
                : "Admin Branch"}
            </p>
          ),
        },
      ]
    : [
        {
          key: "1",
          label: (
            <Link rel="noopener noreferrer" to="/login">
              Log in
            </Link>
          ),
        },
      ];
  return (
    <div className="top-nav">
      <div className="top-nav-box">
        <div className="top-nav-search">
          <Search color="var(--grayColor)" />
        </div>
        <div className="top-nav-more">
          <CornerRightDown
            color="var(--grayColor)"
            style={{ marginRight: "20px" }}
          />
          <MessageCircle
            color="var(--grayColor)"
            style={{ marginRight: "20px" }}
          />
          <Dropdown menu={{ items }} className="server">
            <a onClick={(e) => e.preventDefault()}>
              <div className="info-ava">
                <img src={womanImg} alt="" className="ava" />
              </div>
            </a>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
