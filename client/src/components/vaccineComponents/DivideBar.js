import React from 'react'
import { Layout } from 'antd';
import { MonitorOutlined } from '@ant-design/icons';
import './style/vaccineStyle.scss'

// test页面最顶上那块bar
export default function DivideBar() {
  const { Header } = Layout;

  return (
    <Header style={{ background: "#c82c11", height: "70px"}}>     
      <MonitorOutlined style={{
          fontSize:"50px",
          color:"white",
          padding:"15px",
          float:"left",
          marginLeft:"430px",
          marginTop:"-3px"
      }}/>
      <a className="ready">Get Ready For Your Vaccine?</a>
    </Header>      
  )
}