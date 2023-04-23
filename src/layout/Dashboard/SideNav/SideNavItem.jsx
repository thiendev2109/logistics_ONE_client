import React from "react";
import { Link } from "react-router-dom";
import "./SideNavItem.scss";

const SideNavItem = (props) => {
  return (
    <Link to={props.path} className="side-nav-item">
      <div className="side-nav-item-icon">{props.icon}</div>
      <p className="side-nav-item-title">{props.title}</p>
    </Link>
  );
};

export default SideNavItem;
