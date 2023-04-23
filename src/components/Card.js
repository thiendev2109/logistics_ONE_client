import React from "react";
import "./Card.scss";
import { Card } from "antd";

function CardCustom(props) {
  return (
    <Card className="card-container">
      <div className="card-content">
        <div className="card-content-icon">{props.icon}</div>
        <div className="card-content-number">{props.number}</div>
      </div>
      <p className="card-content-title">{props.title}</p>
    </Card>
  );
}

export default CardCustom;
