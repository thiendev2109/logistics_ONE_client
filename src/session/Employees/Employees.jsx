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
import "./Employees.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  accountAdmin,
  adminToken,
  allEmployeeType,
  allEmployees,
  allWarehouses,
} from "../../redux/selector";
import { useNavigate } from "react-router-dom";
import {
  createEmployee,
  deleteEmployee,
  getEmployees,
  updateEmployee,
} from "../../services/employeeRequest";
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

const Employees = (props) => {
  //State for add new
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [cardIndentify, setCardIndentify] = useState("");
  const [birthday, setBirthday] = useState("");
  const [sex, setSex] = useState("1");
  const [id_warehouse, setIdWarehouse] = useState("");
  const [id_employeeType, setIdEmployeeType] = useState("");

  const onChangeBirthday = (date, dateString) => {
    setBirthday(dateString);
  };

  // State core
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const account = useSelector(accountAdmin);
  const token = useSelector(adminToken);
  const employees = useSelector(allEmployees);
  const warehouse = useSelector(allWarehouses);
  const empTypes = useSelector(allEmployeeType);
  const navigate = useNavigate();

  useEffect(() => {
    if (!account) {
      navigate("/login");
    }
    if (token) {
      getEmployees(token, dispatch);
    }
  }, []);

  const handleAddEmployee = () => {
    const data = {
      firstname,
      lastname,
      email,
      phone,
      city,
      country,
      address,
      cardIndentify,
      birthday,
      sex,
      id_warehouse,
      id_employeeType,
    };
    createEmployee(token, data, dispatch, navigate).then(() => {
      getEmployees(token, dispatch);
    });
    setOpen(false);
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleDelete = (id_employee) => {
    deleteEmployee(token, dispatch, id_employee).then(() => {
      getEmployees(token, dispatch);
    });
  };

  const handleSave = (row) => {
    const newData = [...employees];
    const index = newData.findIndex(
      (item) => row.id_employee === item.id_employee
    );
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    const updatedItem = { ...newData[index], ...row };

    updateEmployee(updatedItem, token, dispatch, updatedItem.id_employee).then(
      () => {
        getEmployees(token, dispatch);
      }
    );
  };

  const defaultColumns = [
    {
      title: "ID",
      dataIndex: "id_employee",
      editable: true,
    },
    {
      title: "Name",
      dataIndex: "lastname",
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
      dataIndex: "name",
      editable: false,
    },
    {
      title: "Warehouse",
      dataIndex: "id_warehouse",
      editable: false,
    },
    {
      title: "Sex",
      dataIndex: "sex",
      render: (text, record) => {
        return record.sex ? "Male" : "Female";
      },
    },

    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) =>
        employees?.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.id_employee)}>
            <Button style={{ color: "white", backgroundColor: "blue" }}>
              Delete
            </Button>
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
    <div className="employee-session">
      <p className="employee-title">Employees management</p>
      <div className="">
        <Button
          onClick={showModal}
          type="primary"
          style={{
            marginBottom: 16,
          }}>
          Add new employee
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
            name="card"
            style={{ width: "100%" }}
            rules={[
              { required: true, message: "Please input card indentify!" },
            ]}>
            <Input
              placeholder="Card Indentify"
              style={{
                padding: "8px 12px",
                color: "var(--grayColor)",
                fontWeight: "600",
              }}
              onChange={(e) => setCardIndentify(e.target.value)}
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

          <Form.Item
            label="Employee Type"
            style={{ width: "100%" }}
            rules={[{ required: true, message: "Please choose warehouse !" }]}>
            <Select onChange={(value) => setIdEmployeeType(value)}>
              {empTypes?.map((item) => {
                return (
                  <Select.Option value={item.id_employeeType}>
                    {item.employeeTypeName}
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
              onClick={handleAddEmployee}
              style={{ padding: "5 px 10px", width: "100%" }}>
              Continue
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Employees;
