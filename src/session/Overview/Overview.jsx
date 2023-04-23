import React from "react";
import "./Overview.scss";
import {
  Circle,
  CheckSquare,
  Users,
  UserCheck,
  Box,
  Home,
} from "react-feather";
import { Space, Table, Tag } from "antd";
import CardCustom from "../../components/Card";
const Overview = (props) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];

  return (
    <div className="overview-session">
      <div className="overview-top">
        <CardCustom
          icon={<Circle color="red" />}
          number={20}
          title="On route vehicles"
        />
        <CardCustom
          icon={<CheckSquare color="green" />}
          number={5}
          title="New booking"
        />
        <CardCustom
          icon={<Users color="blue" />}
          number={20}
          title="Customers"
        />
        <CardCustom
          icon={<UserCheck color="yellow" />}
          number={20}
          title="Employees"
        />
        <CardCustom icon={<Box color="pink" />} number={5} title="Containers" />
        <CardCustom
          icon={<Home color="teal" />}
          number={20}
          title="Warehouse"
        />
      </div>
      <div className="overview-table">
        <p className="overview-table-title">New Booking</p>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default Overview;
