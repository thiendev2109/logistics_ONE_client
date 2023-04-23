import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import authAdminSlice from "../../redux/slice/authAdminSlice";
import SideNav from "./SideNav/SideNav";
import TopNav from "./TopNav/TopNav";
import "./Layout.scss";
const Layout = ({ children }) => {
  return (
    <div>
      <SideNav />
      <TopNav />
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
