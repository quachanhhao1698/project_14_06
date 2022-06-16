import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'antd/dist/antd.css';
import { PlusOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Modal, Input, Select, Table,  Row, Col, DatePicker, Tabs } from 'antd';
import store from '../../store/store'
import '../../App.css'
const { TabPane } = Tabs;
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
const { Option } = Select;
const { Column } = Table;



export default function () {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const customer = ['Công ty X', 'Công ty Y', 'Công ty Z'];
    const money = ['VNĐ', '$'];

    return (
        <>
            <Button onClick={showModal} type='primary' danger style={{ borderRadius: '5px' }} icon={<PlusOutlined />} >Thêm mới</Button>

            <Modal style={{ padding: 0,top:20 }} title="Thêm hóa đơn" visible={isModalVisible} onCancel={handleCancel} width={'90%'} footer={false} >

                <div className={'modal__invoice'}>
                    <div className='modal__nav'>
                        <div className='modal__nav--button'>
                            <Button type='primary' danger style={{ borderRadius: 5, marginRight: 10 }} icon={<SaveOutlined />}>Lưu</Button>
                            <Button style={{ borderRadius: 5 }} icon={<CloseOutlined />}>Hủy</Button>
                        </div>

                        <div className='modal__nav--status '>
                            <div>Chưa ghi sổ</div>
                            <div>Ghi sổ</div>
                            <div>Hủy</div>
                        </div>
                    </div>
                    <div>
                        <hr style={{ height: 5, backgroundColor: '#f0f2f5', border: 'none' }} />
                    </div>
                    <div className='modal__content'>
                        <div>
                            <Row style={{ marginBottom: 10 }}>
                                <Col style={{ marginRight: 10 }}>
                                    <label>Số chứng từ</label>
                                    <Input />
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
                                <Col style={{ marginRight: 10 }}>
                                    <label>Ngày chứng từ (*)</label>
                                    <DatePicker defaultValue={moment('01/01/2015', dateFormatList[0])} format={dateFormatList} />
                                </Col>
                                <Col style={{ marginRight: 10 }}>
                                    <label>Ngày hạch toán (*)</label>
                                    <DatePicker defaultValue={moment('01/01/2015', dateFormatList[0])} format={dateFormatList} />
                                </Col>
                                <Col style={{ marginRight: 10 }}>
                                    <label>Khách hàng (*)</label>
                                    <Select style={{ width: '100%' }}>
                                        {customer.map(item =>
                                            <Option key={item} value={item}>{item}</Option>
                                        )}
                                    </Select>
                                </Col>
                                <Col style={{ marginRight: 10 }}>
                                    <label>Loại tiền</label>
                                    <Select style={{ width: '100%' }}>
                                        {money.map(item =>
                                            <Option key={item} value={item}>{item}</Option>
                                        )}
                                    </Select>
                                </Col>
                                <Col style={{ marginRight: 10 }}>
                                    <label>Tỷ giá</label>
                                    <Input />
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
                                    <Table dataSource={''} bordered>
                                        <Column title="#" dataIndex="" key="" />
                                        <Column title="Mã sản phẩm" dataIndex="" key="" />
                                        <Column title="Sản phẩm" dataIndex="" key="" />
                                        <Column title="Đơn giá" dataIndex="" key="" />
                                        <Column title="SL" dataIndex="" key="" />
                                        <Column title="ĐVT" dataIndex="" key="" />
                                        <Column title="Thành tiền" dataIndex="" key="" />
                                        <Column title="TK nợ" dataIndex="" key="" />
                                        <Column title="TK có" dataIndex="" key="" />
                                        <Column title="Kho" dataIndex="" key="" />
                                        <Column title="Khoản mục" dataIndex="" key="" />
                                    </Table>
                                </TabPane>
                                <TabPane tab="Chiết khấu" key="2">
                                    <Table dataSource={''} bordered>
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
                                    <Table dataSource={''} bordered>
                                        <Column title="#" dataIndex="" key="" />
                                        <Column title="Sản phẩm" dataIndex="" key="" />
                                        <Column title="Diễn giải thuế" dataIndex="" key="" />
                                        <Column title="Thuế" dataIndex="" key="" />
                                        <Column title="Tiền thuế" dataIndex="" key="" />
                                        <Column title="TK nợ" dataIndex="" key="" />
                                        <Column title="TK có" dataIndex="" key="" />
                                    </Table>
                                </TabPane>
                                {/* <TabPane tab="Phiếu xuất kho" key="4">
                                    Phiếu xuất kho
                                </TabPane> */}
                            </Tabs>
                        </div>
                    </div>

                </div>
            </Modal>
        </>
    )
}
