import { Button, Form, Input, Popconfirm, Table, Modal, Select } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import "./Vehicals.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  accountAdmin,
  adminToken,
  allVehicals,
  allWarehouses,
} from "../../redux/selector";
import { useNavigate } from "react-router-dom";
import {
  createVehical,
  deleteVehical,
  getVehicals,
  updateVehical,
} from "../../services/vehicalRequest";
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

const Vehicals = (props) => {
  //State for add new
  const [licensePlate, setLicensePlate] = useState("");
  const [id_warehouse, setIdWarehouse] = useState("");
  const [vehicalLocation, setVehicalLocation] = useState("");
  const [type, setType] = useState("0");
  // State core
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const account = useSelector(accountAdmin);
  const token = useSelector(adminToken);
  const vehicals = useSelector(allVehicals);
  const warehouse = useSelector(allWarehouses);
  const navigate = useNavigate();

  const handleAddVehical = () => {
    const data = {
      licensePlate,
      vehicalLocation,
      id_warehouse,
      type,
    };
    createVehical(token, data, dispatch, navigate).then(() => {
      getVehicals(token, dispatch);
    });
    setOpen(false);
  };

  useEffect(() => {
    if (!account) {
      navigate("/login");
    }
    if (token) {
      getVehicals(token, dispatch);
    }
  }, []);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleDelete = (id_vehical) => {
    deleteVehical(token, dispatch, id_vehical).then(() => {
      getVehicals(token, dispatch);
    });
  };

  const handleSave = (row) => {
    const newData = [...vehicals];
    const index = newData.findIndex(
      (item) => row.id_vehical === item.id_vehical
    );
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    const updatedItem = { ...newData[index], ...row };

    updateVehical(updatedItem, token, dispatch, updatedItem.id_vehical).then(
      () => {
        getVehicals(token, dispatch);
      }
    );
  };

  const defaultColumns = [
    {
      title: "License Plate",
      dataIndex: "licensePlate",
      editable: true,
    },
    {
      title: "Location",
      dataIndex: "vehicalLocation",
      editable: false,
    },
    {
      title: "Type",
      dataIndex: "type",
      editable: false,
      render: (text, record) => {
        return record.type === 0 ? "Truck" : "Ship";
      },
    },
    {
      title: "Warehouse",
      dataIndex: "id_warehouse",
      editable: false,
    },
    {
      title: "Actions",
      dataIndex: "operation",
      render: (_, record) =>
        vehicals?.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.id_vehical)}>
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
    <div className="vehical-session">
      <p className="vehical-title">Vehicals management</p>
      <div className="">
        <Button
          onClick={showModal}
          type="primary"
          style={{
            marginBottom: 16,
          }}>
          Add new vehical
        </Button>
        <Table
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={vehicals ?? []}
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
            name="licensePlate"
            style={{ width: "100%" }}
            rules={[
              { required: true, message: "Please input license plate!" },
            ]}>
            <Input
              placeholder="License plate"
              style={{
                padding: "8px 12px",
                color: "var(--grayColor)",
                fontWeight: "600",
              }}
              onChange={(e) => setLicensePlate(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="location"
            style={{ width: "100%" }}
            rules={[{ required: true, message: "Please input location" }]}>
            <Input
              placeholder="Location"
              style={{
                padding: "8px 12px",
                color: "var(--grayColor)",
                fontWeight: "600",
              }}
              onChange={(e) => setVehicalLocation(e.target.value)}
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

          <Form.Item
            label="Employee Type"
            style={{ width: "100%" }}
            rules={[{ required: true, message: "Please choose warehouse !" }]}>
            <Select onChange={(value) => setType(value)}>
              <Select.Option value="0">Truck</Select.Option>
              <Select.Option value="1">Ship</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item style={{ textAlign: "center" }}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              onClick={handleAddVehical}
              style={{ padding: "5 px 10px", width: "100%" }}>
              Continue
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Vehicals;
