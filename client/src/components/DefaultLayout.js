import {Space, Dropdown, Button, Col,Row} from "antd";
import React from 'react'
import { Link } from "react-router-dom";

function DefaultLayout(props){
const user = JSON.parse(localStorage.getItem('user'))

 const items = [
  {
    
    key: '1',
    label: (
      <a href="/">
        Home
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a href="/userbookings">
        Bookings
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a href="/admin">
        Admin
      </a>
    ),
  },
  {
    key: '4',
    label: (
         <li style={{color:'orangered'}}>Logout</li>
    ),
  },
];

  return(
    <div>
        <div className='header bs1'>
          <Row gutter={16} justify="center">
            <Col lg={20} sm={24} xs={24}>
            <div className='d-flex justify-content-between'>
            <h1><b><Link to='/' style={{color:'orangered'}}>Drive Ease</Link></b></h1>

             <Space direction="vertical">
    <Space wrap>
      <Dropdown
        menu={{
          items,
          onClick:({key})=>{
            if (key === '4'){
              localStorage.removeItem('user');
              window.location.href='./login'
            }
          }
        }}
        placement="bottom"
      >
        <Button>{user.username}</Button>
      </Dropdown>
      </Space>
  </Space>
            </div>
            </Col>
          </Row>

        </div>
        <div className='content'>
           {props.children}
        </div>
        <div className="footer text-center">
        <hr/>
          <p>Desigend and Developed By </p>   
          <p>Prateek</p>
        </div>
    </div>
  )
}

export default DefaultLayout