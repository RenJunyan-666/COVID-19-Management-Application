import React, { useState } from 'react'
import { Layout, Button } from 'antd';
import { ArrowLeftOutlined, Html5Outlined, GithubOutlined, AntDesignOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import './style/testStyle.scss'

// test页面最顶上那块bar
export default function Navbar() {
  const { Header } = Layout;
  const [size] = useState('large')
  const navigate = useNavigate()
  let location = useLocation();
  
  // const handleChangePage = ()=>{ //back to home page
  //   console.log(location.state);
  //   const id = location.state.idddd;
  //   console.log('userid',id);
  //   // const [userid] = useState(id);
  //   const userid = id;
  //   console.log(userid);
  //   navigate('/', {state:{idddd: userid}});
  // }

  return (
    <Layout className="layout">
        <Header>
            <div className="logo" />
            {/* <Button type="primary" shape="round" icon={<ArrowLeftOutlined/>} size={size}
            onClick={()=>handleChangePage()}>
                Back to Home
            </Button> */}
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
            
        </Header>
    </Layout>
  )
}
