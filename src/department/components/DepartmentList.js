import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux/es/exports'
import { Row, Col, Card, Avatar, Tag, Modal, Switch, Dropdown, Menu, Input, Button } from 'antd';
import { EllipsisOutlined, PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import 'antd/dist/antd.css';
import * as ActionType from '../controllers/actionTypes'
import store from '../../store/store'
const { Meta } = Card;


const DepartmentItem = (department) => {
  const dispatch = useDispatch()
  // console.log(department);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSubModalVisible, setSubIsModalVisible] = useState(false);
  const [name, setName] = useState()

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };


  const showSubModal = () => {
    setSubIsModalVisible(true);
  }

  const handleCancelSubModal = () => {
    setSubIsModalVisible(false);
  };

  const handleOkSubModal = () => {
    dispatch({
      type: ActionType.API_UPDATE_DEPARTMENT_NAME,
      data: {
        id: department.department.id,
        name: name
      }
    })
    setSubIsModalVisible(false);
  };

  const onChangeStatus = (e) => {
    dispatch({
      type: ActionType.API_UPDATE_DEPARTMENT_STATUS,
      data: {
        id: department.department.id,
        status: e
      }
    })
    // console.log(e);
  }


  return (
    <>
      <Col>
        <Card
          onClick={() => { showModal() }}
          bordered={true}
          style={{
            width: 200,
            margin: 10
          }}
          actions={[
            <Tag color={(department.department.status) && department.department.status ? 'green' : 'red'} >
              {(department.department.status) && department.department.status ? 'Hoạt động' : 'Ngừng hoạt động'}
            </Tag>
          ]}
        >
          <Meta
            avatar={<Avatar src={department.department.img} />}
            title={
              <div style={{ display: 'flex', alignItem: 'center', }}>

                <div className="info three_dot">
                  <div className="name three_dot">
                    {department.department.name}
                  </div>
                  <div style={{ fontWeight: 'normal', fontSize: 14 }}>
                  </div>
                  <div style={{ fontWeight: 'normal', fontSize: 14, color: '#00BFFF' }}>{department.department.user ? department.department.user.length : '0'} thành viên</div>

                </div>
              </div>
            }
          />
        </Card></Col>

      <Modal title="Chi tiết phòng ban" footer={false} visible={isModalVisible} onCancel={handleCancel}>
        <div>
          <div style={{ position: 'absolute', top: 18, right: 80 }}>
            <Switch defaultChecked={department.department.status ? true : false} onChange={(e) => { onChangeStatus(e) }} />
          </div>
          <div style={{ position: 'absolute', top: 18, right: 50 }}>
            <Dropdown overlay={
              <Menu>
                <React.Fragment>
                  <Menu.Item key="1" onClick={showSubModal}><span >Chỉnh sửa tên phòng ban</span> </Menu.Item>
                  <Menu.Item key="2" > <span >Chỉnh sửa trưởng phòng</span> </Menu.Item>
                </React.Fragment>
              </Menu>
            } trigger={['click']}>
              <EllipsisOutlined />
            </Dropdown>
          </div>
        </div>

        <Row gutter={10}>
          <Col span={6}>
            <div className="img">

              <img
                type="department"
                src={department.department.img}
                // width={140}
                style={{
                  width: 130,
                  height: 130,
                  objectFit: 'cover',
                  border:'1px solid black'
                }}
              />

            </div>
          </Col>
          <Col style={{padding:10,marginLeft:10}}>
            <h3>{department.department.name}</h3>
            <p>Trưởng phòng: {department.department.user[department.department.user.findIndex(u => u.user_role_position === 1)].name}</p>
          </Col>

        </Row>
        <Row>
          <Button type='primary'  color='#2d5289' style={{marginTop:10}}>+ Thêm thành viên</Button>
        </Row>
        <Row>
          
        </Row>

      </Modal>

      <Modal title="Chỉnh sửa tên phòng ban"
        okText="Cập nhật"
        visible={isSubModalVisible}
        onCancel={handleCancelSubModal}
        onOk={handleOkSubModal}
      >
        <label>Tên phòng ban</label>
        <Input onChange={(e) => { setName(e.target.value) }} />
      </Modal>
    </>
  )
}

export default function DepartmentList() {
  const [state, setState] = React.useState(() => store.getState());

  useEffect(() => {
    store.subscribe(() => {
      setState(() => store.getState())
    })

  });
  return (
    <div>
      <Row>
        {state.departments.map(department => (
          <DepartmentItem department={department} key={department.id} />
        )
        )}
      </Row>


    </div>
  )
}
