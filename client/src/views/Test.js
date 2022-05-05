import React, { useState } from 'react'
import Header from '../components/testComponents/Header'
import { Layout, Button } from 'antd';
import { ArrowLeftOutlined, Html5Outlined, GithubOutlined, AntDesignOutlined } from '@ant-design/icons';
import { Outlet } from 'react-router-dom'
import Testinfo from '../components/testComponents/Testinfo'
import './style/Test.scss'
import Advertisement from '../components/testComponents/Advertisement'
import Detail from '../components/testComponents/Detail'
import Navbar from '../components/testComponents/Navbar'
import { useLocation, useNavigate } from 'react-router-dom';

export default function Test() {
  let location = useLocation();
  const navigate = useNavigate();
  console.log(location.state);
  const id = location.state.idd;
  console.log('userid',id);
  const [userid] = useState(id);
  console.log(userid);
  // const [userid] = useState("625d6868249a47b7d224beec")
  //const [userid] = useState("625cb616858723bf17a4689e")

  const handleChangePage = ()=>{ //back to home page
    const { Header } = Layout;
    console.log(location.state);
    const id = location.state.idd;
    console.log('userid',id);
    // const [userid] = useState(id);
    const userid = id;
    console.log(userid);
    navigate('/', {state:{idddd: userid}});
  }

  return (
    
      <div>    
        <div data="navBackColor">
          <Button type="primary" 
                  size="large" 
                  shape="round" 
                  icon={<ArrowLeftOutlined/>}  
                  onClick={()=>handleChangePage()} 
                  style={{
                    marginTop: "10px",
                    marginLeft:"50px"
                  }}>
                  Back to Home
          </Button>
          <Html5Outlined style={{
                fontSize:"40px",
                color:"white",
                padding:"10px",
                float:"right",
                marginRight:"30px"
          }}/>
          <GithubOutlined style={{
                fontSize:"40px",
                color:"white",
                padding:"10px",
                float:"right",
                marginRight:"30px"
          }}/>
          <AntDesignOutlined style={{
                fontSize:"40px",
                color:"white",
                padding:"10px",
                float:"right",
                marginRight:"30px"
          }}/> 
        </div>
        

        {/* header */}
        <div className='div_block'></div>
        <center><h1>Welcome to COVID-19 Test</h1></center>
        <div className='div_block'></div>
        <Header/>

        {/* show test information part */}
        <div className='div_block'></div>
        <h1>Here is COVID-19 Test information</h1>
        <div className='div_block'></div>
        <Testinfo userId={userid}/>

        {/* schedule test part */}
        <div className='div_block'></div>
        <h1>Please schedule your COVID-19 test</h1>
        <div className='div_block'></div>
        {/* 路由容器 */}
        <Outlet></Outlet>
        

        {/* three cards part */}
        <div className='div_block'></div>
        <h1>We’re here to support you through COVID-19</h1>
        <div className='div_block'></div>
        <Advertisement/>

        {/* question and answer part */}
        <div className='div_block'></div>
        <h1>Question & Answer</h1>
        <div className='div_block'></div>
        <Detail/>
      </div>
    
  )
}
