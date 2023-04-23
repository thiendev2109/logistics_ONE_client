/* eslint-disable jsx-a11y/anchor-is-valid */
import "./SideNav.scss";
import logo from "../../../assets/Images/logo.png";
import SideNavItem from "./SideNavItem";
import { ChevronDown } from "react-feather";
import { Divider, Drawer, Dropdown, Space } from "antd";
import { NavItems } from "./NavItem";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { accountAdmin } from "../../../redux/selector";

const SideNav = () => {
  const account = useSelector(accountAdmin);

  const items = [
    {
      key: "1",
      label: (
        <a onClick={() => handleChangeServer(1434)} target="_blank">
          Vietnam
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a onClick={() => handleChangeServer(1435)} target="_blank">
          Korea
        </a>
      ),
    },
  ];

  const handleChangeServer = (port) => {
    console.log(port);
  };
  const content = (
    <div className="scrollable-content">
      <div className="side-nav-header">
        <div className="side-nav-header-logo">
          <img src={logo} alt="" className="logo" />
          <div className="side-nav-header-logo-title">
            <p className="logo-title">Ocean Network Express</p>
            <Dropdown menu={{ items }} className="server">
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <p className="server-name">Head Quater</p>
                  <ChevronDown size={18} />
                </Space>
              </a>
            </Dropdown>
          </div>
        </div>
      </div>
      <Divider style={{ marginTop: "10px", marginBottom: "10px" }} />
      <ul className="side-nav-list">
        {account?.data.adminSystem === true
          ? NavItems.map((item) => {
              return (
                <SideNavItem
                  path={item.path}
                  icon={item.icon}
                  title={item.title}
                  key={item.key}
                />
              );
            })
          : NavItems.filter((item) => item.key !== 12 && item.key !== 5).map(
              (item) => {
                return (
                  <SideNavItem
                    path={item.path}
                    icon={item.icon}
                    title={item.title}
                    key={item.key}
                  />
                );
              }
            )}
      </ul>
    </div>
  );
  return (
    <Drawer
      width={280}
      style={{ padding: "12px", backgroundColor: "var(--primaryColor)" }}
      bodyStyle={{ padding: 0 }}
      placement="left"
      mask={false}
      closable={false}
      open={true}>
      {content}
    </Drawer>
  );
};

export default SideNav;
