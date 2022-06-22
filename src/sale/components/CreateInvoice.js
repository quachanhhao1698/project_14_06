import React, { useState, useEffect, useContext, useRef } from "react";
import moment from "moment";
import "antd/dist/antd.css";
import {
  PlusOutlined,
  SaveOutlined,
  CloseOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import {
  Button, Modal, Input, Select, Table, Row, Col, DatePicker, Tabs, Form, Popconfirm
} from "antd";
import store from "../../store/store";
import "../../App.css";
const { TabPane } = Tabs;
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];
const { Option } = Select;
const { Column } = Table;

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
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
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
        ]}
      >
        <Input style={{ width: '100%' }} ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          padding: 0,
          width: '100%'
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

export default function () {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const today = moment().date() + "/" + (moment().month() + 1) + "/" + moment().year();
  const customer = ["Công ty X", "Công ty Y", "Công ty Z"];
  const money = ["VNĐ", "$"];

  const [dataSource, setDataSource] = useState([
    // {
    //   key: '1',
    //   product: 'Đá',
    //   price: '',
    //   quantity: '',
    //   total: ''
    // },
  ]);
  const [count, setCount] = useState(1);

  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const defaultColumns = [

    {
      title: '#',
      dataIndex: 'key',
      width: '2%'
    },
    {
      title: 'Mã sản phẩm',
      dataIndex: '',
      width: '8%',
      render: () =>
        <Select style={{ width: '100%' }}>
          <Option value={'SP1'}>SP1</Option>
          <Option value={'SP2'}>SP2</Option>
          <Option value={'SP3'}>SP3</Option>
        </Select>
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'product',
      width: '10%',
      editable: true,
      render: (text) => <Input value={text} />
    },
    {
      title: 'Đơn giá',
      dataIndex: 'price',
      width: '10%',
      editable: true,
      render: (price) => <Input value={price} onChange={e => console.log('DG: ', e.target.value)} />
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      width: '10%',
      editable: true,
      render: (quantity) => <Input value={quantity} />
    },
    {
      title: 'Đơn vị tính',
      dataIndex: '',
      width: '5%',
      render: () =>
        <Select style={{ width: '100%' }}>
          <Option value={'M1'}>M1</Option>
          <Option value={'M2'}>M2</Option>
          <Option value={'M3'}>M3</Option>
        </Select>
    },
    {
      title: 'Thành tiền',
      dataIndex: '',
      width: '10%',
      render: (_, record) => {
        console.log(record);
        let total = record.total =Number(record.price) * Number(record.quantity)
        console.log(total);
        return (

          <Input value={total}  disabled />
        )
      }
    },
    {
      title: 'TK nợ',
      dataIndex: '',
      width: '10%',
      render: () =>
        <Select style={{ width: '100%' }}>
          <Option value={'130'}>130</Option>
          <Option value={'131'}>131</Option>
          <Option value={'132'}>132</Option>
        </Select>
    },
    {
      title: 'TK có',
      dataIndex: '',
      width: '10%',
      render: () =>
        <Select style={{ width: '100%' }}>
          <Option value={'5111'}>5111</Option>
          <Option value={'5222'}>5222</Option>
          <Option value={'5333'}>5333</Option>
        </Select>
    },
    {
      title: 'Kho',
      dataIndex: '',
      width: '15%',
      render: () =>
        <Select style={{ width: '100%' }}>
          <Option value={'Kho 1'}>Kho 1</Option>
          <Option value={'Kho 2'}>Kho 2</Option>
          <Option value={'Kho 3'}>Kho 3</Option>
        </Select>
    },
    {
      title: 'Khoản mục',
      dataIndex: '',
      width: '15%',
      render: () =>
        <Select style={{ width: '100%' }}>
          <Option value={'Khoản mục 1'}>Khoản mục 1</Option>
          <Option value={'Khoản mục 2'}>Khoản mục 2</Option>
          <Option value={'Khoản mục 3'}>Khoản mục 3</Option>
        </Select>
    },
    {
      title: '',
      dataIndex: 'operation',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>

            <Button icon={<CloseOutlined />} style={{ border: 'none', color: 'red' }}></Button>
          </Popconfirm>
        ) : null,
    },
  ];

  const handleAdd = () => {
    const newData = {
      key: count,
      product: '',
      price: '',
      quantity: '',
      total: ''
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setDataSource(newData);
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


  let tong = 0;
  dataSource.forEach(data=>{
    tong += data.total
    console.log(tong);
  })

  let thue= (tong*10)/100

  return (
    <>
      <Button
        onClick={showModal}
        type="primary"
        danger
        style={{ borderRadius: "5px", marginBottom: 10 }}
        icon={<PlusOutlined />}
      >
        Thêm mới
      </Button>

      <Modal
        style={{ padding: 0, top: 10 }}
        title="Thêm hóa đơn"
        visible={isModalVisible}
        onCancel={handleCancel}
        width={"100%"}
        footer={false}
      >
        <div className={"modal__invoice"}>
          <div className="modal__nav">
            <div className="modal__nav--button">
              <Button
                type="primary"
                danger
                style={{ borderRadius: 5, marginRight: 10 }}
                icon={<SaveOutlined />}
              >
                Lưu
              </Button>
              <Button style={{ borderRadius: 5 }} icon={<CloseOutlined />}>
                Hủy
              </Button>
            </div>

            <div className="modal__nav--status ">
              <div>Chưa ghi sổ</div>
              <div>Ghi sổ</div>
              <div>Hủy</div>
            </div>
          </div>
          <div>
            <hr
              style={{ height: 5, backgroundColor: "#f0f2f5", border: "none" }}
            />
          </div>
          <div className="modal__content">
            <div>
              <Row style={{ marginBottom: 10 }}>
                <Col style={{ marginRight: 10 }}>
                  <label>Số chứng từ</label>
                  <Input disabled value={"DBH/2022/003"} />
                </Col>
                <Col style={{ marginRight: 10 }}>
                  <label>Ký hiệu hóa đơn</label>
                  <Input />
                </Col>
                <Col>
                  <label>Số hóa đơn</label>
                  <Input />
                </Col>
              </Row>
            </div>
            <div>
              <Row style={{ marginBottom: 10 }}>
                <Col span={8} style={{ marginRight: 10 }}>
                  <Row>
                    <Col
                      span={12}
                      style={{
                        marginRight: 10,
                        borderRadius: 5,
                        width: "100%",
                      }}
                    >
                      <label>Ngày chứng từ (*)</label>
                      <DatePicker style={{ width: '100%' }}
                        defaultValue={moment(today, dateFormatList[0])}
                        format={dateFormatList}
                      />
                    </Col>
                    <Col span={12} style={{ marginRight: 10 }}>
                      <label>Ngày hạch toán (*)</label>
                      <DatePicker style={{ width: '100%' }}
                        defaultValue={moment(today, dateFormatList[0])}
                        format={dateFormatList}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col span={8} style={{ marginRight: 10 }}>
                  <label>Khách hàng (*)</label>
                  <Select style={{ width: "100%" }}>
                    {customer.map((item) => (
                      <Option key={item} value={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </Col>
                <Col span={8}>
                  <Row>
                    <Col span={4} style={{ marginRight: 10 }}>
                      <label>Loại tiền</label>
                      <Select style={{ width: "100%" }}>
                        {money.map((item) => (
                          <Option key={item} value={item}>
                            {item}
                          </Option>
                        ))}
                      </Select>
                    </Col>
                    <Col span={20} style={{ marginRight: 10 }}>
                      <label>Tỷ giá</label>
                      <Input value={1} disabled />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
            <div>
              <label>Diễn giải</label>
              <Input />
            </div>

            <div>
              <Tabs defaultActiveKey="1">
                <TabPane tab="Chi tiết phát sinh" key="1">
                  <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                    scroll={{ x: 1200 }}
                  />
                </TabPane>
                <TabPane tab="Chiết khấu" key="2">
                  <Table dataSource={""} bordered>
                    <Column title="#" dataIndex="" key="" />
                    <Column title="Sản phẩm" dataIndex="" key="" />
                    <Column title="Diễn giải" dataIndex="" key="" />
                    <Column title="CK (%)" dataIndex="" key="" />
                    <Column title="Tiền chiết khấu" dataIndex="" key="" />
                    <Column title="TK nợ" dataIndex="" key="" />
                    <Column title="TK có" dataIndex="" key="" />
                  </Table>
                </TabPane>
                <TabPane tab="Thuế" key="3">
                  <Table dataSource={""} bordered>
                    <Column title="#" dataIndex="" key="" />
                    <Column title="Sản phẩm" dataIndex="" key="" />
                    <Column title="Diễn giải thuế" dataIndex="" key="" />
                    <Column title="Thuế" dataIndex="" key="" />
                    <Column title="Tiền thuế" dataIndex="" key="" />
                    <Column title="TK nợ" dataIndex="" key="" />
                    <Column title="TK có" dataIndex="" key="" />
                  </Table>
                </TabPane>
              </Tabs>
            </div>
          </div>
          <Row>
            <Col span={12}>
              <Button
                onClick={handleAdd}
                type="primary"
                style={{
                  marginBottom: 16,
                }}
                icon={<PlusCircleOutlined />}
              >
                Thêm mới dòng
              </Button>
            </Col>

            <Col span={12}>
              <Row>
                <Col span={12} style={{ fontWeight: "bold" }}>
                  Tổng tiền trước thuế:
                </Col>
                <Col span={12}>{tong}</Col>
              </Row>
              <Row>
                <Col span={12} style={{ fontWeight: "bold" }}>
                  Thuế:
                </Col>
                <Col span={12}>{thue}</Col>
              </Row>
              <Row>
                <Col span={12} style={{ fontWeight: "bold" }}>
                  Tổng tiền:
                </Col>
                <Col span={12}>{tong-thue}</Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Modal>
    </>
  );
}
