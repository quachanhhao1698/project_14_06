import React, { useState } from 'react';
import { Button, Modal, Input, Select } from 'antd'
import "antd/dist/antd.css";
import * as ActionType from '../controllers/actionTypes'
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
const { Option } = Select;


export default function () {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const dispatch = useDispatch()
    const [name,setName]=useState();
    const [user,setUser]=useState();
    

    const showModal = () => {
        setIsModalVisible(true);
    };

    
    const handleOk = () => {
        dispatch({type:ActionType.API_CREATE_DEPARTMENT,data:{
            id:Math.random(),
            name:name,
            status:true,
            user:user
        }})
        setIsModalVisible(false);
        
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const children = ['Nguyễn Văn A','Trần Văn B','Lý Văn C'];

    
   
    return (
        <div>
            <Button shape='circle' type='primary' onClick={showModal}>+</Button><span> Quản lý phòng ban</span>
            <Modal title="Tạo mới phòng ban" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <label>Tên phòng ban</label>
                <Input onChange={(e)=>{setName(e.target.value)}} />
                <label>Trưởng phòng</label>
                <br />
                <Select style={{width: '100%',}} onSelect={(value)=>{setUser(value)}}  >
                    {children.map(item =>
                        <Option key={item} value={item}>{item}</Option>
                    )}
                </Select>

            </Modal>
            <hr/>
        </div>
    )
}
