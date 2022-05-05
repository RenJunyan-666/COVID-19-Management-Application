import React from 'react'
import { Layout, Button } from 'antd';
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import '../vaccineComponents/style/vaccineStyle.scss';
import { Image } from 'antd';
import logol from '../../images/Huskyhead.png'
import logo2 from '../../images/NEULogo.png'

// test页面最顶上那块bar
export default function Navbar() {
  const { Header } = Layout;


  return (
    <Layout>
        <Header style={{ background: "#c82c11"}}>            
            <a style={{
              marginLeft: "860px"
            }}></a>
            <a data="bk">INFO 6150 Final Project &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; --made by npGroup</a>
            <Image preview={false} src={logol} style={{
              width: "80px",
              marginTop:"-125px",
              marginLeft: "983PX",
            }}/>
            <Image src={logo2} style={{
              width: "180px",
              marginTop:"-130px",
              marginLeft: "-1100PX"
            }}/>
        </Header>
    </Layout>
    
  )
}