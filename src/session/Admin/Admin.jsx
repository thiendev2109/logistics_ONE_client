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
import "./Admin.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  accountAdmin,
  adminToken,
  allAdmins,
  allEmployeeType,
  allEmployees,
  allWarehouses,
} from "../../redux/selector";
import { useNavigate } from "react-router-dom";
import {
  createAdmin,
  deleteAdmin,
  getAdmins,
  updateAdmin,
} from "../../services/adminRequest";
import Password from "antd/es/input/Password";
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

const Admin = (props) => {
  //State for add new
  const [adminName, setAdminName] = useState("");
  const [adminSystem, setAdminSystem] = useState(0);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [id_warehouse, setIdWarehouse] = useState("");

  // State core
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const account = useSelector(accountAdmin);
  const token = useSelector(adminToken);
  const admins = useSelector(allAdmins);
  const warehouse = useSelector(allWarehouses);
  const navigate = useNavigate();

  useEffect(() => {
    if (!account) {
      navigate("/login");
    }
    if (token) {
      getAdmins(token, dispatch);
    }
  }, []);

  const handleAddAdmin = () => {
    const data = {
      adminName,
      adminSystem,
      email,
      phone,
      password,
      id_warehouse,
    };
    createAdmin(token, data, dispatch, navigate).then(() => {
      getAdmins(token, dispatch);
    });
    setOpen(false);
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleDelete = (id_admin) => {
    deleteAdmin(token, dispatch, id_admin).then(() => {
      getAdmins(token, dispatch);
    });
  };

  const handleSave = (row) => {
    const newData = [...admins];
    const index = newData.findIndex((item) => row.id_admin === item.id_admin);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    const updatedItem = { ...newData[index], ...row };

    updateAdmin(updatedItem, token, dispatch, updatedItem.id_admin).then(() => {
      getAdmins(token, dispatch);
    });
  };

  const defaultColumns = [
    {
      title: "Name",
      dataIndex: "adminName",
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
      title: "Type",
      dataIndex: "adminSystem",
      editable: false,
      render: (text, record) => {
        return record.adminSystem ? "System" : "Branch";
      },
    },
    {
      title: "Warehouse",
      dataIndex: "id_warehouse",
      editable: false,
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) =>
        admins.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.id_admin)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];
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
    <div className="admin-session">
      <p className="admin-title">Admin management</p>
      <div className="">
        <Button
          onClick={showModal}
          type="primary"
          style={{
            marginBottom: 16,
          }}>
          Add a new admin
        </Button>
        <Table
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={admins ?? []}
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
            name="adminName"
            style={{ width: "100%" }}
            rules={[
              { required: true, message: "Please input your admin name!" },
            ]}>
            <Input
              placeholder="Admin name"
              style={{
                padding: "8px 12px",
                color: "var(--grayColor)",
                fontWeight: "600",
              }}
              onChange={(e) => setAdminName(e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Admin Role" style={{ width: "100%" }}>
            <Radio.Group
              defaultValue={adminSystem}
              onChange={(e) => setAdminSystem(e.target.value)}>
              <Radio value="1"> System </Radio>
              <Radio value="0"> Branch </Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="email"
            style={{ width: "100%" }}
            rules={[{ required: true, message: "Please input admin email!" }]}>
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
            rules={[{ required: true, message: "Please input admin phone!" }]}>
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
              { required: true, message: "Please input admin password!" },
            ]}>
            <Password
              placeholder="Password"
              style={{
                padding: "8px 12px",
                color: "var(--grayColor)",
                fontWeight: "600",
              }}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Warehouse"
            style={{ width: "100%" }}
            rules={[{ required: true, message: "Please choose warehouse !" }]}>
            <Select onChange={(value) => setIdWarehouse(value)}>
              {warehouse?.map((item) => {
                return (
                  <Select.Option value={item.id_warehouse}>
                    {item.warehouseName}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item style={{ textAlign: "center" }}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              onClick={handleAddAdmin}
              style={{ padding: "5 px 10px", width: "100%" }}>
              Continue
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Admin;
