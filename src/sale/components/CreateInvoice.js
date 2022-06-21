import React, { useState, useEffect } from "react";
import moment from "moment";
import "antd/dist/antd.css";
import {
  PlusOutlined,
  SaveOutlined,
  CloseOutlined,
  PlusCircleOutlined,
  SmallDashOutlined,
} from "@ant-design/icons";
import {
  Button,
  Modal,
  Input,
  Select,
  Table,
  Row,
  Col,
  DatePicker,
  Tabs,
} from "antd";
import store from "../../store/store";
import "../../App.css";
const { TabPane } = Tabs;
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];
const { Option } = Select;
const { Column } = Table;

export default function () {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data_ctps, setData_ctps] = useState([
    {
      stt: "1", id: 1, sanpham: [
        { masp: "SP1", tensp: "Đá", dongia: 10000, DVT: 'M1' },
        { masp: "SP2", tensp: "Cát", dongia: 100000, DVT: 'M2' },
        { masp: "SP3", tensp: "Xi măng", dongia: 80000, DVT: 'M3' },
      ]
    },
  ]);

  const [masp,setMasp]=useState([])
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const today =
    moment().date() + "/" + (moment().month() + 1) + "/" + moment().year();

  const customer = ["Công ty X", "Công ty Y", "Công ty Z"];
  const money = ["VNĐ", "$"];

  const handleAddRow = () => {
    let newdata = {
      id: Math.random(),
      stt: data_ctps.length + 1,
      sanpham: [
        { masp: "SP1", tensp: "Đá", dongia: 10000, DVT: 'M1' },
        { masp: "SP2", tensp: "Cát", dongia: 100000, DVT: 'M2' },
        { masp: "SP3", tensp: "Xi măng", dongia: 80000, DVT: 'M3' },
      ],
    };
    let update = [...data_ctps, newdata];
    setData_ctps(update);
    console.log(data_ctps);
  };
  const handleDeleteRow = (id) => {
    let update = data_ctps.filter(data => data.id !== id)
    setData_ctps(update)
  }

  const handletotal = ()=>{
    
  }

  const columns_ctps = [
    {
      title: "#",
      dataIndex: "stt",
      key: "stt",
      width:20,
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Mã sản phẩm",
      dataIndex: "sanpham",
      width:120,
      key: "sanpham",
      render: (_, { sanpham }) => (
        <>
          <Select style={{width:'100%'}}>
            {sanpham.map(sp =>

              <Option key={sp.masp} value={sp.masp}>{sp.masp}</Option>
            )}
          </Select>
        </>
      ),
    },
    {
      title: "Sản phẩm",
      dataIndex: "tensp",
      key: "tensp",
      width:200,
      render: (text) => <Input value={text} />,
    },
    {
      title: "Đơn giá",
      dataIndex: "address",
      key: "address",
      width:150,
      render: (text) => <Input value={text} />,
    },
    {
      title: "SL",
      dataIndex: "sl",
      key: "sl",
      width:100,
      render: (text) => <Input value={text} />,
    },
    {
      title: "ĐVT",
      dataIndex: "address",
      width:100,
      key: "address",
      render: (text) => (
        <Select style={{width:'100%'}}>
          <Option value={'M1'}>M1</Option>
          <Option value={'M2'}>M2</Option>
          <Option value={'M3'}>M3</Option>
        </Select>
      ),
    },
    {
      title: "Thành tiền",
      dataIndex: "address",
      key: "address",
      width:150,
      render: (text) => <Input value={text} disabled onChange={handletotal} />,
    },
    {
      title: "TK nợ",
      dataIndex: "address",
      width:100,
      key: "address",
      render: (text) => (
        <Select style={{width:'100%'}}>
          <Option value={'130'}>130</Option>
          <Option value={'131'}>131</Option>
          <Option value={'132'}>132</Option>
        </Select>
      ),
    },
    {
      title: "TK có",
      dataIndex: "address",
      width:100,
      key: "address",
      render: (text) => (
        <Select style={{width:'100%'}}>
          <Option value={'5000'}>5000</Option>
          <Option value={'5111'}>5111</Option>
          <Option value={'5222'}>5222</Option>
        </Select>
      ),
    },
    {
      title: "Kho",
      dataIndex: "address",
      key: "address",
      render: (text) => (
        <Select style={{width:'100%'}}>
          <Option  value={'Kho vật liệu xây dựng 1'}>Kho vật liệu xây dựng 1</Option>
          <Option value={'Kho vật liệu xây dựng 2'}>Kho vật liệu xây dựng 2</Option>
          <Option value={'Kho vật liệu xây dựng 3'}>Kho vật liệu xây dựng 3</Option>
        </Select>
      ),
    },
    {
      title: "Khoản mục",
      dataIndex: "address",
      width:150,
      key: "address",
      render: (text) => (
        <Select style={{width:'100%'}}>
          <Option value={'Khoản mục 1'}>Khoản mục 1</Option>
          <Option value={'Khoản mục 2'}>Khoản mục 2</Option>
          <Option value={'Khoản mục 3'}>Khoản mục 3</Option>
        </Select>
      ),
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      width:50,
      render: (_,{id}) =>
        <Button type="ghost" style={{ border: 'none', color: 'red' }}
          icon={<CloseOutlined />}
           onClick={()=>{handleDeleteRow(id)}}
           >
        </Button>
    },
  ];

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
                      <DatePicker style={{width:'100%'}}
                        defaultValue={moment(today, dateFormatList[0])}
                        format={dateFormatList}
                      />
                    </Col>
                    <Col span={12} style={{ marginRight: 10 }}>
                      <label>Ngày hạch toán (*)</label>
                      <DatePicker style={{width:'100%'}}
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
                    dataSource={data_ctps}
                    bordered
                    columns={columns_ctps}
                    scroll={{ x: 1300 }}
                    size='small'
                   
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
                type="link"
                style={{ width: 0, padding: "4px 0px" }}
                icon={<PlusCircleOutlined />}
                onClick={handleAddRow}
              >
                Thêm mới dòng
              </Button>
            </Col>

            <Col span={12}>
              <Row>
                <Col span={12} style={{ fontWeight: "bold" }}>
                  Tổng tiền trước thuế:
                </Col>
                <Col span={12}>100.0000</Col>
              </Row>
              <Row>
                <Col span={12} style={{ fontWeight: "bold" }}>
                  Thuế:
                </Col>
                <Col span={12}>10.0000</Col>
              </Row>
              <Row>
                <Col span={12} style={{ fontWeight: "bold" }}>
                  Tổng tiền:
                </Col>
                <Col span={12}>90.0000</Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Modal>
    </>
  );
}
