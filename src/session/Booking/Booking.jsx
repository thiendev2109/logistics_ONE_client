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
  allCustomers,
  allEmployees,
  allWarehouses,
} from "../../redux/selector";
import {
  deleteCustomer,
  getCustomers,
  registerCustomer,
  updateCustomer,
} from "../../services/customerRequest";

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
  const employees = useSelector(allEmployees);
  const warehouse = useSelector(allWarehouses);
  const customers = useSelector(allCustomers);
  const navigate = useNavigate();

  useEffect(() => {
    if (!account) {
      navigate("/login");
    }
    if (token) {
      getCustomers(token, dispatch);
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
    registerCustomer(data, dispatch, navigate).then(() => {
      getCustomers(token, dispatch);
    });
    setOpen(false);
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleDelete = (id_customer) => {
    console.log(id_customer);
    deleteCustomer(token, dispatch, id_customer).then(() => {
      getCustomers(token, dispatch);
    });
  };
  const defaultColumns = [
    {
      title: "Name",
      dataIndex: `lastname`,
      editable: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      editable: true,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      editable: true,
    },
    {
      title: "City",
      dataIndex: "city",
      editable: true,
    },
    {
      title: "Address",
      dataIndex: "address",
      editable: true,
    },
    {
      title: "Sex",
      dataIndex: "sex",
      render: (text, record) => {
        return record.sex ? "Male" : "Female";
      },
    },

    {
      title: "Actions",
      dataIndex: "operation",
      render: (_, record) =>
        employees?.length >= 1 ? (
          <>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record.id_customer)}>
              <a>Delete</a>
            </Popconfirm>
          </>
        ) : null,
    },
  ];

  const handleSave = (row) => {
    const newData = [...employees];
    const index = newData.findIndex(
      (item) => row.id_customer === item.id_customer
    );
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    const updatedItem = { ...newData[index], ...row };

    updateCustomer(updatedItem, token, dispatch, updatedItem.id_customer).then(
      () => {
        getCustomers(token, dispatch);
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
          Add a customer
        </Button>
        <Table
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={employees ?? []}
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
            rules={[{ required: true, message: "Please choose customer !" }]}>
            <Select
              onChange={(value) => setIdService(value)}
              placeholder="Service">
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
            rules={[{ required: true, message: "Please choose customer !" }]}>
            <Select
              onChange={(value) => setIdMerchandise(value)}
              placeholder="Merchandise">
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
