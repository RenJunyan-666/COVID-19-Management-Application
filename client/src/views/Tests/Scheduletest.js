import React, { useEffect, useState } from 'react'
import store from '../../reducers/store'
import { show, hide } from '../../actions/BtnAction'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { PageHeader, Input, Button, Row, Col } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import '../style/Test.scss'

export default function Scheduletest() {
  const [hospital] = useState(store.getState().hospitalReducer.hospital)
  const [user] = useState(store.getState().loginUserReducer.user)
  const [patient, setPatient] = useState("")
  const [orderDate, setOrderDate] = useState("")
  const [testType, setTestType] = useState("ThroatSwab")
  const params = useParams()

  useEffect(()=>{
    store.dispatch(hide())
    
    return ()=>{
        store.dispatch(show())
    }
  }, [])

  //跳转页面
  const navigate = useNavigate()
  let location = useLocation();
  const scheduleTest = ()=>{
    if(patient === "" || orderDate === null){
      alert("Please complete all information required!")
    }
    else{
      axios.put(`http://localhost:8000/useraccounts/${params.myid}`, { 
        _id:params.myid,
        email:user.email,
        password:user.password,
        userInfo:{
          name:user.userInfo.name,
          gender:user.userInfo.gender,
          age:user.userInfo.age,
          birth:user.userInfo.birth,
          address:user.userInfo.address,
          phone:user.userInfo.phone,
          email:user.userInfo.email
        },
        vaccineInfo:{
          patient:user.vaccineInfo.patient,
          orderDate:user.vaccineInfo.orderDate,
          location:user.vaccineInfo.location,
          dose:user.vaccineInfo.dose,
          insurance:user.vaccineInfo.insurance,
          vaccineType:user.vaccineInfo.vaccineInfo,
          provider:user.vaccineInfo.provider,
          status:user.vaccineInfo.status
        },
        testInfo:{
          patient:patient,
          orderDate:orderDate,
          location:hospital.address,
          testType:testType,
          completedDate:"",
          provider:"",
          method:"",
          result:"",
          status:false
        }
      }).then(res=>{
        console.log(location.state);
        var id = location.state.idd;
        console.log('userid',id);
        // const [userid] = useState(id);
        id = id.replace("\"","").replace("\"","");
        console.log("已经预约了")


        var r = window.confirm("Are you sure to schedule your PCR test?");
        if (r == true) {
          navigate('/', {state:{idddd:id}, replace:true})
        }
        else {
          window.alert("Schedule canceld");
        }

        // navigate('/', {state:{idddd:id}, replace:true})
        // window.location.replace("http://localhost:3000/test")
      }).catch(err=>console.log(err))
    }
  }

  return (
    <div className='div_testInfo'>
      <PageHeader
        className="site-page-header"
        title={hospital.hospitalName}
        subTitle={hospital.address}
      />
      
      <p><b>Current User: </b> {user.userInfo.name} - {user.userInfo.email}</p>

      <div className='div_form'>
        <Row style={{marginTop:"20px"}}>
          <Col span={4}><label>Patient Name</label></Col>
          <Col span={8} offset={1}>
            <Input placeholder="large size" prefix={<UserOutlined />} style={{width:"300px"}} onChange={evt=>setPatient(evt.target.value)}/>
          </Col>
        </Row>

        <Row style={{marginTop:"20px"}}>
          <Col span={4}><label>Order Time</label></Col>
          <Col span={8} offset={1}>
            <input type="date" onChange={evt=>setOrderDate(evt.target.value)}/>
          </Col>
        </Row>

        <Row style={{marginTop:"20px"}}>
          <Col span={4}><label>Pharmacy Location</label></Col>
          <Col span={8} offset={1}>
            {hospital.address}
          </Col>
        </Row>

        <Row style={{marginTop:"20px"}}>
          <Col span={4}><label>Choose Test Type</label></Col>
          <Col span={8} offset={1}>
            <input type="radio" name='testType' value="ThroatSwab" checked={testType==="ThroatSwab"} onChange={evt=>setTestType(evt.target.value)}/>
            <label>Throat Swab</label>
            <input type="radio" name='tesType' value="NasalSwab" checked={testType==="NasalSwab"} onChange={evt=>setTestType(evt.target.value)}/>
            <label>Nasal Swab</label>
          </Col>
        </Row>
      </div>

      <Button type="primary" onClick={()=>scheduleTest()} style={{marginTop:"50px", marginLeft:"400px"}}>Schedule COVID-19 Test</Button>  
    </div>
  )
}
