/* eslint-disable jsx-a11y/anchor-is-valid */
import "./SideNav.scss";
import logo from "../../../assets/Images/logo.png";
import SideNavItem from "./SideNavItem";
import { ChevronDown } from "react-feather";
import { Divider, Drawer, Dropdown, Space } from "antd";
import { NavItems } from "./NavItem";
import React from "react";

const SideNav = () => {
  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com">
          Singapore
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com">
          Korea
        </a>
      ),
    },
  ];
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
                  <p className="server-name">Vietnam</p>
                  <ChevronDown size={18} />
                </Space>
              </a>
            </Dropdown>
          </div>
        </div>
      </div>
      <Divider style={{ marginTop: "10px", marginBottom: "10px" }} />
      <ul className="side-nav-list">
        {NavItems.map((item) => {
          return (
            <SideNavItem
              path={item.path}
              icon={item.icon}
              title={item.title}
              key={item.key}
            />
          );
        })}
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
