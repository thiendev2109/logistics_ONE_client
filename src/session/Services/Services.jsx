import {
  Button,
  Form,
  Input,
  Popconfirm,
  Table,
  Modal,
  Space,
  Tag,
} from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import "./Services.scss";
import { useDispatch, useSelector } from "react-redux";
import { accountAdmin, adminToken, allServices } from "../../redux/selector";
import {
  createService,
  deleteService,
  getServices,
  updateService,
} from "../../services/serviceRequest";
import { useNavigate } from "react-router-dom";
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

const Services = (props) => {
  const [serviceName, setServiceName] = useState("");
  const [price, setPrice] = useState("");

  // State core
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const account = useSelector(accountAdmin);
  const token = useSelector(adminToken);
  const services = useSelector(allServices);
  const navigate = useNavigate();

  useEffect(() => {
    if (!account) {
      navigate("/login");
    }
    if (token) {
      getServices(token, dispatch);
    }
  }, []);

  const handleAddService = () => {
    const data = {
      serviceName,
      price,
    };
    createService(token, data, dispatch, navigate).then(() => {
      getServices(token, dispatch);
    });
    setOpen(false);
  };
  const handleDelete = (id_customer) => {
    console.log(id_customer);
    deleteService(token, dispatch, id_customer).then(() => {
      getServices(token, dispatch);
    });
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const showModal = () => {
    setOpen(true);
  };

  const defaultColumns = [
    {
      title: "Name",
      dataIndex: "serviceName",
      editable: true,
    },
    {
      title: "Price",
      dataIndex: "price",
      editable: true,
    },

    {
      title: "Action",
      dataIndex: "operation",
      render: (_, record) =>
        allServices?.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.id_service)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const handleSave = (row) => {
    const newData = [...services];
    const index = newData.findIndex(
      (item) => row.id_service === item.id_service
    );
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    const updatedItem = { ...newData[index], ...row };

    updateService(updatedItem, token, dispatch, updatedItem.id_service).then(
      () => {
        getServices(token, dispatch);
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
    <div className="warehouse-session">
      <p className="warehouse-title">Service management</p>
      <div className="">
        <Button
          onClick={showModal}
          type="primary"
          style={{
            marginBottom: 16,
          }}>
          Add new service
        </Button>
        <Table
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={services ?? []}
          columns={columns}
        />
      </div>
      <Modal
        title="Create new service"
        open={open}
        onCancel={handleCancel}
        footer={null}>
        <Form name="form-auth">
          <Form.Item
            name="name"
            style={{ width: "100%" }}
            rules={[
              { required: true, message: "Please input name service !" },
            ]}>
            <Input
              placeholder="Service name"
              style={{
                padding: "8px 12px",
                color: "var(--grayColor)",
                fontWeight: "600",
              }}
              onChange={(e) => setServiceName(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="price"
            style={{ width: "100%" }}
            rules={[{ required: true, message: "Please input Price!" }]}>
            <Input
              placeholder="Price"
              style={{
                padding: "8px 12px",
                color: "var(--grayColor)",
                fontWeight: "600",
              }}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Item>

          <Form.Item style={{ textAlign: "center" }}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              onClick={handleAddService}
              style={{ padding: "5 px 10px", width: "100%" }}>
              Continue
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Services;
