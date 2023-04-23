import { Button, Form, Input, Popconfirm, Table, Modal } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import "./EmployeeType.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  accountAdmin,
  adminToken,
  allEmployeeType,
} from "../../redux/selector";
import { useNavigate } from "react-router-dom";
import {
  createEmployeeType,
  deleteEmployeeType,
  getEmployeeTypes,
  updateEmployeeType,
} from "../../services/employeeTypeRequest";
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

const EmployeeType = (props) => {
  //State for add new
  const [employeeTypeName, setEmployeeTypeName] = useState("");
  // State core
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const account = useSelector(accountAdmin);
  const token = useSelector(adminToken);
  const employeeTypes = useSelector(allEmployeeType);
  const navigate = useNavigate();

  useEffect(() => {
    if (!account) {
      navigate("/login");
    }
    if (token) {
      getEmployeeTypes(token, dispatch);
    }
  }, []);

  const handleCreateEmployeeType = () => {
    const data = {
      employeeTypeName,
    };
    createEmployeeType(token, data, dispatch, navigate).then(() => {
      getEmployeeTypes(token, dispatch);
    });
    setOpen(false);
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleDelete = (id_employeeType) => {
    deleteEmployeeType(token, dispatch, id_employeeType).then(() => {
      getEmployeeTypes(token, dispatch);
    });
  };

  const handleSave = (row) => {
    const newData = [...employeeTypes];
    const index = newData.findIndex(
      (item) => row.id_employeeType === item.id_employeeType
    );
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    const updatedItem = { ...newData[index], ...row };

    updateEmployeeType(
      updatedItem,
      token,
      dispatch,
      updatedItem.id_employeeType
    ).then(() => {
      getEmployeeTypes(token, dispatch);
    });
  };

  const defaultColumns = [
    {
      title: "ID",
      dataIndex: "id_employeeType",
    },
    {
      title: "Name",
      dataIndex: "employeeTypeName",
      editable: true,
    },
    {
      title: "Action",
      dataIndex: "operation",
      render: (_, record) =>
        employeeTypes?.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.id_employeeType)}>
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
    <div className="employee-type-session">
      <p className="employee-type-title">Employee type management</p>
      <div className="">
        <Button
          onClick={showModal}
          type="primary"
          style={{
            marginBottom: 16,
          }}>
          Add new type
        </Button>
        <Table
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={employeeTypes ?? []}
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
            name="name"
            style={{ width: "100%" }}
            rules={[
              { required: true, message: "Please input employee type name!" },
            ]}>
            <Input
              placeholder="Employee type name"
              style={{
                padding: "8px 12px",
                color: "var(--grayColor)",
                fontWeight: "600",
              }}
              onChange={(e) => setEmployeeTypeName(e.target.value)}
            />
          </Form.Item>

          <Form.Item style={{ textAlign: "center" }}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              onClick={handleCreateEmployeeType}
              style={{ padding: "5 px 10px", width: "100%" }}>
              Continue
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EmployeeType;
