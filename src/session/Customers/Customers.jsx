import {
  Button,
  Form,
  Input,
  Popconfirm,
  Table,
  Modal,
  DatePicker,
  Radio,
} from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Customers.scss";
import Password from "antd/es/input/Password";
import { accountAdmin, adminToken, allCustomers } from "../../redux/selector";
import {
  deleteCustomer,
  getCustomers,
  registerCustomer,
  updateCustomer,
} from "../../services/customerRequest";
import { createAxios } from "../../createInstance";
import authAdminSlice from "../../redux/slice/authAdminSlice";
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

const Customers = (props) => {
  //State for add new
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [company, setCompany] = useState("");
  const [birthday, setBirthday] = useState("");
  const [sex, setSex] = useState("1");
  const onChangeBirthday = (date, dateString) => {
    setBirthday(dateString);
  };
  // State core
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const account = useSelector(accountAdmin);
  const token = useSelector(adminToken);
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
      firstname,
      lastname,
      email,
      phone,
      password,
      city,
      country,
      address,
      company,
      birthday,
      sex,
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
        customers?.length >= 1 ? (
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
    const newData = [...customers];
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
    <div className="customer-session">
      <p className="customer-title">Customer management</p>
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
          dataSource={customers ?? []}
          columns={columns}
        />
      </div>
      <Modal
        title="Create new customer"
        open={open}
        onCancel={handleCancel}
        footer={null}>
        <Form name="form-auth">
          <Form.Item
            name="firstname"
            style={{ width: "100%" }}
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}>
            <Input
              placeholder="First name"
              style={{
                padding: "8px 12px",
                color: "var(--grayColor)",
                fontWeight: "600",
              }}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="lastname"
            style={{ width: "100%" }}
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}>
            <Input
              placeholder="Last name"
              style={{
                padding: "8px 12px",
                color: "var(--grayColor)",
                fontWeight: "600",
              }}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="email"
            style={{ width: "100%" }}
            rules={[{ required: true, message: "Please input your email!" }]}>
            <Input
              placeholder="Email Address"
              style={{
                padding: "8px 12px",
                color: "var(--grayColor)",
                fontWeight: "600",
              }}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="phone"
            style={{ width: "100%" }}
            rules={[{ required: true, message: "Please input your phone!" }]}>
            <Input
              placeholder="Phone number"
              style={{
                padding: "8px 12px",
                color: "var(--grayColor)",
                fontWeight: "600",
              }}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="password"
            style={{ width: "100%" }}
            rules={[
              { required: true, message: "Please input your password!" },
            ]}>
            <Input
              placeholder="Password"
              type="password"
              style={{
                padding: "8px 12px",
                color: "var(--grayColor)",
                fontWeight: "600",
              }}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="city"
            style={{ width: "100%" }}
            rules={[{ required: true, message: "Please input your city!" }]}>
            <Input
              placeholder="City"
              style={{
                padding: "8px 12px",
                color: "var(--grayColor)",
                fontWeight: "600",
              }}
              onChange={(e) => setCity(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="country"
            style={{ width: "100%" }}
            rules={[{ required: true, message: "Please input your country!" }]}>
            <Input
              placeholder="Country"
              style={{
                padding: "8px 12px",
                color: "var(--grayColor)",
                fontWeight: "600",
              }}
              onChange={(e) => setCountry(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="address"
            style={{ width: "100%" }}
            rules={[{ required: true, message: "Please input your address!" }]}>
            <Input
              placeholder="Address"
              style={{
                padding: "8px 12px",
                color: "var(--grayColor)",
                fontWeight: "600",
              }}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="company"
            style={{ width: "100%" }}
            rules={[{ required: true, message: "Please input your company!" }]}>
            <Input
              placeholder="Company"
              style={{
                padding: "8px 12px",
                color: "var(--grayColor)",
                fontWeight: "600",
              }}
              onChange={(e) => setCompany(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="birthday"
            style={{ width: "100%" }}
            rules={[
              { required: true, message: "Please input your birthday!" },
            ]}>
            <DatePicker
              placeholder="Birthday"
              onChange={onChangeBirthday}
              style={{
                width: "100%",
                padding: "8px 12px",
                color: "var(--grayColor)",
                fontWeight: "600",
              }}
            />
          </Form.Item>

          <Form.Item
            label="Sex"
            style={{ width: "100%" }}
            rules={[{ required: true, message: "Please input your sex!" }]}>
            <Radio.Group
              defaultValue={sex}
              onChange={(e) => setSex(e.target.value)}>
              <Radio value="1"> Male </Radio>
              <Radio value="0"> Female </Radio>
            </Radio.Group>
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

export default Customers;
