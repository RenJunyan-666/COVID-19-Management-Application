import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import VaccineInfo from '../components/vaccineComponents/VaccineInfo'
import './style/Vaccine.scss'
// import Navbar from '../components/vaccineComponents/NavBar'
import DivideBar from '../components/vaccineComponents/DivideBar'
import Slogan from '../components/vaccineComponents/slogan'
import BestChoice from '../components/vaccineComponents/BestChoice'
import Help from '../components/vaccineComponents/Help'
import { Divider, Button, Layout } from 'antd';
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Vaccine() {
  const { Header } = Layout;

  const navigate = useNavigate();
  let location = useLocation();
  console.log(location.state);
  const id = location.state.iddd;
  console.log('userid',id);
  const [userid] = useState(id);
  console.log(userid);
  // const [userid] = useState("625cb616858723bf17a4689e")

  const handleChangePage = ()=>{ //back to home page
    
    console.log(location.state);
    const id = location.state.iddd;
    console.log('userid',id);
    // const [userid] = useState(id);
    const userid = id;
    console.log(userid);
    navigate('/', {state:{idddd: userid}});
  }

  const handleTestPage = ()=>{ //back to home page
    console.log(location.state);
    const id = location.state.iddd;
    console.log('userid',id);
    // const [userid] = useState(id);
    const userid = id;
    console.log(userid);
    navigate('/test', {state:{idd: userid}})
  }

  return (
    
      <div>
        {/* <Navbar/> */}

        <Header style={{ background: "#c82c11"}}>
          <Button type="dashed" ghost shape="round" icon={<LeftCircleOutlined/>}
              onClick={()=>handleChangePage()}>
                  Home
          </Button>

          <a data="blk">blk</a>

          <Button type="dashed" ghost shape="round" icon={<RightCircleOutlined/>}
              onClick={()=>handleTestPage()}> 
                  COVID-19 Test
          </Button>
        </Header>
            
              

        {/* slogan part */}
        <Slogan/>    
        {/* <div className='div_block'></div> */}

        <BestChoice/>
        <div className='div_block'></div>

        <DivideBar/>
        <div className='div_block'></div>

        <VaccineInfo userId={userid}/>

        



        {/* schedule test part */}
        <div className='div_block'></div>
        <Divider><center><h1>Schedule a COVID-19 Vaccine Pharmacy</h1></center></Divider>
        <div className='div_block'></div>

        {/* 路由容器 */}
        <Outlet></Outlet>

        <div className='div_block'></div>
        <Help/>
      </div>
    
  )
}

