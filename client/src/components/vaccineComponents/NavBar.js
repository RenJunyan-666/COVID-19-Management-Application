import React from 'react'
import { Layout, Button } from 'antd';
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './style/vaccineStyle.scss'

// test页面最顶上那块bar
export default function Navbar() {
  const { Header } = Layout;
  const navigate = useNavigate()
  const handleChangePage = ()=>{ //back to home page
    navigate('/home')
  }
  const handleTestPage = ()=>{ //back to home page
    navigate('/test')
  }

  return (
    <Layout>
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
    </Layout>
    
  )
}