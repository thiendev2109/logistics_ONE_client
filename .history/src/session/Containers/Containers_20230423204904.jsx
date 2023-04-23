import { Button, Form, Input, Popconfirm, Table, Modal, DatePicker, Radio, } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Containers.scss";
import { accountAdmin, adminToken, allContainers } from "../../redux/selector";
import {
  createContainer,
  deleteContainer,
  getContainers,
  updateContainer,
} from "../../services/containerRequest";
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

const Containers = (props) => {
  const [containerPosition, setcontainerPosition] = useState("");
  const [size, setsize] = useState("");
  const [id_warehouse, setId_warehouse] = useState("");

    // State core
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const account = useSelector(accountAdmin);
    const token = useSelector(adminToken);
    const containers = useSelector(allContainers);
    const navigate = useNavigate();

  useEffect(() => {
    if (!account) {
      navigate("/login");
    }
    if (token) {
      getContainers(token, dispatch);
    }
  }, []);

  const handleAddContainer = () => {
    const data = {
      containerPosition,
      size,
      id_warehouse,
    };
    createContainer(token, data, dispatch, navigate).then(() => {
      getContainers(token, dispatch);
    });
    setOpen(false);
  };

  const handleDelete = (id_container) => {
    console.log(id_container);
    deleteContainer(token, dispatch, id_container).then(() => {
      getContainers(token, dispatch);
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
      title: "Container Position",
      dataIndex: "containerPosition",
      editable: true,
    },
    {
      title: "Size",
      dataIndex: "size",
      editable: true,
    },
    {
      title: "ID Warehouse",
      dataIndex: "id_warehouse",
      editable: true,
    },
 
    {
      title: "Action",
      dataIndex: "operation",
      render: (_, record) =>
        allContainers?.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.id_container)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];
  const handleSave = (row) => {
    const newData = [...containers];
    const index = newData.findIndex(
      (item) => row.id_container === item.id_container
    );
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    const updatedItem = { ...newData[index], ...row };

    updateContainer(
      updatedItem,
      token,
      dispatch,
      updatedItem.id_container
    ).then(() => {
      getContainers(token, dispatch);
    });
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
    <div className="container-session">
      <p className="container-title">Containers management</p>
      <div className="">
        <Button
          onClick={showModal}
          type="primary"
          style={{
            marginBottom: 16,
          }}>
          Add new container
        </Button>
        <Table
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={containers ?? []}
          columns={columns}
        />
      </div>
      <Modal
        title="Create new container"
        open={open}
        onCancel={handleCancel}
        footer={null}>
        <Form name="form-auth">
          <Form.Item
            name="name"
            style={{ width: "100%" }}
            rules={[
              { required: true, message: "Please input name warehouse !" },
            ]}>
            <Input
              placeholder="Warehouse name"
              style={{
                padding: "8px 12px",
                color: "var(--grayColor)",
                fontWeight: "600",
              }}
              onChange={(e) => setWarehouseName(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="location"
            style={{ width: "100%" }}
            rules={[{ required: true, message: "Please input location!" }]}>
            <Input
              placeholder="Warehouse location"
              style={{
                padding: "8px 12px",
                color: "var(--grayColor)",
                fontWeight: "600",
              }}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="email"
            style={{ width: "100%" }}
            rules={[
              { required: true, message: "Please input Warehouse email!" },
            ]}>
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
            rules={[
              { required: true, message: "Please input Warehouse phone!" },
            ]}>
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
            name="capacity"
            style={{ width: "100%" }}
            rules={[{ required: true, message: "Please input capacity!" }]}>
            <Input
              placeholder="Capacity"
              style={{
                padding: "8px 12px",
                color: "var(--grayColor)",
                fontWeight: "600",
              }}
              onChange={(e) => setCapacity(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="country"
            style={{ width: "100%" }}
            rules={[{ required: true, message: "Please input  country!" }]}>
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
            rules={[{ required: true, message: "Please input address!" }]}>
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
            name="zipcode"
            style={{ width: "100%" }}
            rules={[{ required: true, message: "Please input zipcode!" }]}>
            <Input
              placeholder="Zipcode"
              style={{
                padding: "8px 12px",
                color: "var(--grayColor)",
                fontWeight: "600",
              }}
              onChange={(e) => setZipcode(e.target.value)}
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

export default Containers;
