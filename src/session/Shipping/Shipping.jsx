import {
  Button,
  Form,
  Input,
  Divider,
  DatePicker,
  Select,
  Table,
  Modal,
  Space,
  Tag,
  Row,
  Col,
} from "antd";
import "./Shipping.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  accountAdmin,
  adminToken,
  allBookings,
  allEmployees,
} from "../../redux/selector";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
  //State for add new
  const [id_booking, setBooking] = useState("");
  const [id_employee, setEmployee] = useState("");
  const [shippingStartDate, setShippingStartDate] = useState("");
  const [shippingArrivelExpectedDate, setShippingArrivelExpectedDate] =
    useState("");
  const [containerCount, setContainerCount] = useState("");
  const [totalCost, setTotalCost] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(0);

  const onStartShip = (date, dateString) => {
    setShippingStartDate(dateString);
  };

  const onDelivered = (date, dateString) => {
    setShippingArrivelExpectedDate(dateString);
  };
  // State core
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const account = useSelector(accountAdmin);
  const token = useSelector(adminToken);
  const bookings = useSelector(allBookings);
  const employees = useSelector(allEmployees).filter(
    (item) => item.id_employeeType === "0b70bf2a-662b-46e4-8fbd-dd8c07c5f90f"
  );
  const navigate = useNavigate();
  const handleCancel = () => {
    setOpen(false);
  };

  const showModal = () => {
    setOpen(true);
  };
  const columns = [
    {
      title: "Employee",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Booking",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Container",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Start Date",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Arrivel Date",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Cost",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Status",
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
    <div className="shipping-session">
      <p className="shipping-title">Shipping management</p>
      <div className="">
        <Button
          onClick={showModal}
          type="primary"
          style={{
            marginBottom: 16,
          }}>
          Add new shipping
        </Button>
        <Table columns={columns} dataSource={data} />
      </div>
      <Modal
        title="New shipping"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}>
        <Form form={form}>
          <Row justify={"space-between"}>
            <Col span={11}>
              <Form.Item
                style={{ width: "100%" }}
                rules={[
                  { required: true, message: "Please choose booking !" },
                ]}>
                <Select
                  placeholder="Booking"
                  onChange={(value) => setBooking(value)}>
                  {bookings?.map((item) => {
                    return (
                      <Select.Option value={item.id_booking}>
                        {item.id_booking}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item
                style={{ width: "100%" }}
                rules={[
                  { required: true, message: "Please choose employee  !" },
                ]}>
                <Select
                  placeholder="Employee"
                  onChange={(value) => setEmployee(value)}>
                  {employees?.map((item) => {
                    return (
                      <Select.Option value={item.id_employee}>
                        {item.firstname} {item.lastname}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row justify={"space-between"}>
            <Col span={11}>
              <Form.Item
                name="start"
                style={{ width: "100%" }}
                rules={[{ required: true, message: "Please input !" }]}>
                <DatePicker
                  placeholder="Shipping Start"
                  onChange={onStartShip}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    color: "var(--grayColor)",
                    fontWeight: "600",
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item
                name="end"
                style={{ width: "100%" }}
                rules={[{ required: true, message: "Please input !" }]}>
                <DatePicker
                  onChange={onDelivered}
                  placeholder="Delivery Expected"
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    color: "var(--grayColor)",
                    fontWeight: "600",
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row justify={"space-between"}>
            <Col span={11}>
              <Form.Item
                name="container"
                style={{ width: "100%" }}
                rules={[
                  { required: true, message: "Please input container num " },
                ]}>
                <Input
                  placeholder="Container number"
                  style={{
                    padding: "8px 12px",
                    color: "var(--grayColor)",
                    fontWeight: "600",
                  }}
                  onChange={(e) => setContainerCount(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item
                name="total"
                style={{ width: "100%" }}
                rules={[{ required: true, message: "Please input cost!" }]}>
                <Input
                  placeholder="Total Cost"
                  style={{
                    padding: "8px 12px",
                    color: "var(--grayColor)",
                    fontWeight: "600",
                  }}
                  onChange={(e) => setTotalCost(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          <Row justify={"space-between"}>
            <Col span={11}>
              <Form.Item
                style={{ width: "100%" }}
                rules={[
                  { required: true, message: "Please choose payment method !" },
                ]}>
                <Select placeholder="Payment method">
                  <Select.Option value="0">Cash On Delivery</Select.Option>
                  <Select.Option value="1">Online Payment</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item
                name="card"
                style={{ width: "100%" }}
                rules={[
                  { required: true, message: "Please input card indentify!" },
                ]}>
                <Input
                  disabled
                  value={totalCost}
                  placeholder="Total Cost"
                  style={{
                    padding: "8px 12px",
                    color: "var(--grayColor)",
                    fontWeight: "600",
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default Shipping;
