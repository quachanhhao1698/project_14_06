import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'antd/dist/antd.css';
import { PlusOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Modal, Input, Select, Card, Table, Tag, Row, Col, DatePicker } from 'antd';
import store from '../../store/store'
import '../../App.css'
import CreateInvoice from './CreateInvoice';

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
const { Column } = Table;


export default function SaleManager() {
    const [state, setState] = useState(() => store.getState());
   

    useEffect(() => {
        store.subscribe(() => {
            setState(() => store.getState())
        })

        // console.log('sale', state);

    });
    return (
        <>
        <CreateInvoice/>
            <Table dataSource={state.saleState.SaleData} bordered>

                <Column title="#" dataIndex="key" key="key" />
                <Column title="Số chứng từ" dataIndex="id_chungtu" key="id_chungtu" />

                <Column title="Số hóa đơn" dataIndex="bill_id" key="bill_id" />
                <Column title="Diễn giải" dataIndex="description" key="description" />
                <Column title="Khách hàng" dataIndex="customer" key="customer" />
                <Column title="Ngày chứng từ" dataIndex="date_chungtu" key="date_chungtu" />
                <Column title="Ngày hạch toán" dataIndex="date_hachtoan" key="date_hachtoan" />
                <Column title="Tổng tiền" dataIndex="total" key="total" />
                <Column
                    title="Trạng thái"
                    dataIndex="status"
                    key="status"
                    render={(status) => (
                        <>
                            {status == 1 ? <Tag color="blue">Chưa ghi sổ</Tag>
                                : status == 2 ? <Tag color="green">Ghi sổ</Tag>
                                    : <Tag color="red">Hủy</Tag>}


                        </>
                    )}
                />

            </Table>

           
        </>
    )
}
