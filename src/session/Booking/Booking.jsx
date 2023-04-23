import {
  Button,
  Form,
  Input,
  Popconfirm,
  Table,
  Modal,
  DatePicker,
  Radio,
  Select,
} from "antd";

import React, { useContext, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Booking.scss";

import {
  accountAdmin,
  adminToken,
  allBookings,
  allCustomers,
  allEmployees,
  allMerchandises,
  allServices,
  allWarehouses,
} from "../../redux/selector";
import {
  deleteCustomer,
  getCustomers,
  registerCustomer,
  updateCustomer,
} from "../../services/customerRequest";
import {
  createBooking,
  deleteBooking,
  getBookings,
  updateBooking,
} from "../../services/bookingRequest";

const { TextArea } = Input;

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}>
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}>
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};

const Booking = (props) => {
  //State for add new
  const [id_warehouse, setIdWarehouse] = useState("");
  const [id_customer, setIdCustomer] = useState("");
  const [id_service, setIdService] = useState("");
  const [id_merchandiseType, setIdMerchandise] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [requestDepartureDate, setRequestDepartureDate] = useState("");
  const [requestArrivelDate, setRequestArrivelDate] = useState("");
  const [status, setStatus] = useState(0);
  const [bookingNote, setBookingNote] = useState("");
  const [volumn1PCS, setVolumn] = useState("");
  const [totalWeight, setTotalWeight] = useState("");

  const onChangeReqDestinationDate = (date, dateString) => {
    setRequestDepartureDate(dateString);
  };
  const onChangeReqArrivelDate = (date, dateString) => {
    setRequestArrivelDate(dateString);
  };
  // State core
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const account = useSelector(accountAdmin);
  const token = useSelector(adminToken);
  const bookings = useSelector(allBookings);
  const warehouse = useSelector(allWarehouses);
  const customers = useSelector(allCustomers);
  const services = useSelector(allServices);
  const merchandises = useSelector(allMerchandises);
  const navigate = useNavigate();

  useEffect(() => {
    if (!account) {
      navigate("/login");
    }
    if (token) {
      getBookings(token, dispatch);
    }
  }, []);

  const handleAddCustomer = () => {
    const data = {
      id_warehouse,
      id_customer,
      id_service,
      id_merchandiseType,
      origin,
      destination,
      requestDepartureDate,
      requestArrivelDate,
      status,
      bookingNote,
      volumn1PCS,
      totalWeight,
    };
    createBooking(token, data, dispatch, navigate).then(() => {
      getBookings(token, dispatch);
    });
    setOpen(false);
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleDelete = (id_booking) => {
    deleteBooking(token, dispatch, id_booking).then(() => {
      getBookings(token, dispatch);
    });
  };
  const defaultColumns = [
    {
      title: "ID",
      dataIndex: `id_booking`,
      editable: false,
    },
    {
      title: "Warehouse",
      dataIndex: `id_warehouse`,
      editable: false,
    },
    {
      title: "Customer",
      dataIndex: "id_customer",
      editable: false,
    },
    {
      title: "Origin",
      dataIndex: "origin",
      editable: true,
    },
    {
      title: "Destination",
      dataIndex: "destination",
      editable: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      editable: false,
    },
    {
      title: "Total weight",
      dataIndex: "totalWeight",
      render: (text, record) => {
        return record.sex ? "Male" : "Female";
      },
    },

    {
      title: "Actions",
      dataIndex: "operation",
      render: (_, record) =>
        bookings?.length >= 1 ? (
          <>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record.id_booking)}>
              <a>Delete</a>
            </Popconfirm>
          </>
        ) : null,
    },
  ];

  const handleSave = (row) => {
    const newData = [...bookings];
    const index = newData.findIndex(
      (item) => row.id_booking === item.id_booking
    );
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    const updatedItem = { ...newData[index], ...row };

    updateBooking(updatedItem, token, dispatch, updatedItem.id_booking).then(
      () => {
        getBookings(token, dispatch);
      }
    );
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  return (
    <div className="booking-session">
      <p className="booking-title">Booking management</p>
      <div className="">
        <Button
          onClick={showModal}
          type="primary"
          style={{
            marginBottom: 16,
          }}>
          Add a booking
        </Button>
        <Table
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={bookings ?? []}
          columns={columns}
        />
      </div>
      <Modal
        title="Create new booking"
        open={open}
        onCancel={handleCancel}
        footer={null}
        width={700}>
        <Form name="form-auth">
          <Form.Item
            style={{ width: "100%" }}
            rules={[{ required: true, message: "Please choose warehouse !" }]}>
            <Select
              onChange={(value) => setIdWarehouse(value)}
              placeholder="Warehouse">
              {warehouse?.map((item) => {
                return (
                  <Select.Option value={item.id_warehouse}>
                    {item.warehouseName}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item
            style={{ width: "100%" }}
            rules={[{ required: true, message: "Please choose customer !" }]}>
            <Select
              onChange={(value) => setIdCustomer(value)}
              placeholder="Customer">
              {customers?.map((item) => {
                return (
                  <Select.Option value={item.id_customer}>
                    {item.email} - {item.lastname}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item
            style={{ width: "100%" }}
            rules={[{ required: true, message: "Please choose service !" }]}>
            <Select
              onChange={(value) => setIdService(value)}
              placeholder="Service">
              {services?.map((item) => {
                return (
                  <Select.Option value={item.id_service}>
                    {item.serviceName}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item
            style={{ width: "100%" }}
            rules={[
              { required: true, message: "Please choose merchandise !" },
            ]}>
            <Select
              onChange={(value) => setIdMerchandise(value)}
              placeholder="Merchandise">
              {merchandises?.map((item) => {
                return (
                  <Select.Option value={item.id_merchandiseType}>
                    {item.merchandiseTypeName}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item
            name="origin"
            style={{ width: "100%" }}
            rules={[{ required: true, message: "Please input origin!" }]}>
            <Input
              placeholder="Origin"
              style={{
                padding: "8px 12px",
                color: "var(--grayColor)",
                fontWeight: "600",
              }}
              onChange={(e) => setOrigin(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="destination"
            style={{ width: "100%" }}
            rules={[{ required: true, message: "Please input destination!" }]}>
            <Input
              placeholder="Destination"
              style={{
                padding: "8px 12px",
                color: "var(--grayColor)",
                fontWeight: "600",
              }}
              onChange={(e) => setDestination(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="des"
            style={{ width: "100%" }}
            rules={[{ required: true, message: "Please choose date start!" }]}>
            <DatePicker
              placeholder="Request date start"
              onChange={onChangeReqDestinationDate}
              style={{
                width: "100%",
                padding: "8px 12px",
                color: "var(--grayColor)",
                fontWeight: "600",
              }}
            />
          </Form.Item>

          <Form.Item
            name="arr"
            style={{ width: "100%" }}
            rules={[
              { required: true, message: "Please choose date arrivel!" },
            ]}>
            <DatePicker
              placeholder="Request date arrivel"
              onChange={onChangeReqArrivelDate}
              style={{
                width: "100%",
                padding: "8px 12px",
                color: "var(--grayColor)",
                fontWeight: "600",
              }}
            />
          </Form.Item>

          <Form.Item
            name="volumn"
            style={{ width: "100%" }}
            rules={[{ required: true, message: "Please input volumn!" }]}>
            <Input
              placeholder="Volumn per pcs"
              style={{
                padding: "8px 12px",
                color: "var(--grayColor)",
                fontWeight: "600",
              }}
              onChange={(e) => setVolumn(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="weight"
            style={{ width: "100%" }}
            rules={[{ required: true, message: "Please input total weight!" }]}>
            <Input
              placeholder="Total weight"
              style={{
                padding: "8px 12px",
                color: "var(--grayColor)",
                fontWeight: "600",
              }}
              onChange={(e) => setTotalWeight(e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <TextArea
              rows={4}
              placeholder="Booking notes"
              onChange={(e) => setBookingNote(e.target.value)}
            />
          </Form.Item>

          <Form.Item style={{ textAlign: "center" }}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              onClick={handleAddCustomer}
              style={{ padding: "5 px 10px", width: "100%" }}>
              Continue
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Booking;
