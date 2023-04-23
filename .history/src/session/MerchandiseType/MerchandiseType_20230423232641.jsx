import { Button, Form, Input, Popconfirm, Table, Modal } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import "./MerchandiseType.scss";
import { useDispatch, useSelector } from "react-redux";
import { accountAdmin, adminToken, allMerchandises } from "../../redux/selector";
import {
  createMerchandise,
  deleteMerchandise,
  getMerchandises,
  updateMerchandise,
} from "../../services/merchandiseRequest";
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

const MerchandiseType = (props) => {
  const [merchandiseTypeName, setMerchandiseTypeName] = useState("");
  const [price, setPrice] = useState("");


  // State core
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const account = useSelector(accountAdmin);
  const token = useSelector(adminToken);
  const Merchandises = useSelector(allMerchandises);
  const navigate = useNavigate();

  useEffect(() => {
    if (!account) {
      navigate("/login");
    }
    if (token) {
      getWarehouses(token, dispatch);
    }
  }, []);

  const handleAddMerchandise = () => {
    const data = {
      merchandiseTypeName,
      price,
    };
    createMerchandise(token, data, dispatch, navigate).then(() => {
      getMerchandises(token, dispatch);
    });
    setOpen(false);
  };

  const handleDelete = (id_merchandiseType) => {
    console.log(id_merchandiseType);
    deleteMerchandise(token, dispatch, id_merchandiseType).then(() => {
      getMerchandises(token, dispatch);
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
      dataIndex: "merchandiseTypeName",
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
        allMerchandises?.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.id_merchandiseType)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const handleSave = (row) => {
    const newData = [...Merchandises];
    const index = newData.findIndex(
      (item) => row.id_merchandiseType === item.id_merchandiseType
    );
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    const updatedItem = { ...newData[index], ...row };

    updateMerchandise(
      updatedItem,
      token,
      dispatch,
      updatedItem.id_merchandiseType
    ).then(() => {
      getMerchandises(token, dispatch);
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
    <div className="warehouse-session">
      <p className="warehouse-title">Merchandise management</p>
      <div className="">
        <Button
          onClick={showModal}
          type="primary"
          style={{
            marginBottom: 16,
          }}>
          Add new Merchandise
        </Button>
        <Table
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={Merchandises ?? []}
          columns={columns}
        />
      </div>
      <Modal
        title="Create new Merchandise"
        open={open}
        onCancel={handleCancel}
        footer={null}>
        <Form name="form-auth">
          <Form.Item
            name="name"
            style={{ width: "100%" }}
            rules={[
              { required: true, message: "Please input name Merchandise !" },
            ]}>
            <Input
              placeholder="Merchandise name"
              style={{
                padding: "8px 12px",
                color: "var(--grayColor)",
                fontWeight: "600",
              }}
              onChange={(e) => setMerchandiseTypeName(e.target.value)}
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
              onClick={handleAddMerchandise}
              style={{ padding: "5 px 10px", width: "100%" }}>
              Continue
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MerchandiseType;
