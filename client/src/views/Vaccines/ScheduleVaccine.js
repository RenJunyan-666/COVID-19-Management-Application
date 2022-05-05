import React, { useEffect, useState } from 'react'
import store from '../../reducers/store'
import { show, hide } from '../../actions/BtnAction'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { PageHeader, Input, Button, Row, Col } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import '../style/Vaccine.scss'

export default function ScheduleVaccine() {
  const [hospital] = useState(store.getState().hospitalReducer.hospital)
  const [user] = useState(store.getState().loginUserReducer.user)
  const [patient, setPatient] = useState("")
  const [orderDate, setOrderDate] = useState("")
  const [vaccineType, setVaccineType] = useState("Moderna")
  const [dose, setDose] = useState("dose 1")
  const params = useParams()

  useEffect(()=>{
    store.dispatch(hide())
    
    return ()=>{
        store.dispatch(show())
    }
  }, [])

  

  //跳转页面
  const navigate = useNavigate();
  const location = useLocation();
  const scheduleVaccine = ()=>{
    if(patient === "" || orderDate === ""){
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
          patient:patient,
          orderDate:orderDate,
          location:hospital.address,
          dose:dose,
          insurance:user.vaccineInfo.insurance,
          vaccineType:vaccineType,
          provider:"",
          status:false
        },
        testInfo:{
          patient:user.testInfo.patient,
          orderDate:user.testInfo.orderDate,
          location:user.testInfo.location,
          // testType:user.testInfo,testType,
          completedDate:user.testInfo.completedDate,
          provider:user.testInfo.provider,
          method:user.testInfo.method,
          result:user.testInfo.result,
          status:user.testInfo.status
        }
      }).then(res=>{
        console.log("已经预约了")
        console.log(location.state);
        var id = location.state.iddd;
        console.log('userid',id);
        // // window.location.replace("http://localhost:3000/vaccine")

        var r = window.confirm("Are you sure to schedule your vaccine?");
        if (r === true) {
          navigate(`/`, {state:{idddd:id}, replace:true});
        }
        else {
          window.alert("Schedule canceld");
        }



        // navigate(`/`, {state:{idddd:id}, replace:true});
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
            <Input placeholder="patient name" prefix={<UserOutlined />} style={{width:"300px"}} onChange={evt=>setPatient(evt.target.value)}/>
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
          <Col span={4}><label>Choose Vaccine Dose</label></Col>
          <Col span={8} offset={1}>
            <input type="radio" name='dose 1' value="dose 1" checked={dose==="dose 1"} onChange={evt=>setDose(evt.target.value)}/>
            <label>dose 1</label>
            <input type="radio" name='dose 2' value="dose 2" checked={dose==="dose 2"} onChange={evt=>setDose(evt.target.value)}/>
            <label>dose 2</label>
            <input type="radio" name='dose booster' value="dose booster" checked={dose==="dose booster"} onChange={evt=>setDose(evt.target.value)}/>
            <label>dose booster</label>
          </Col>
        </Row>

        <Row style={{marginTop:"20px"}}>
          <Col span={4}><label>Choose Vaccine Type</label></Col>
          <Col span={8} offset={1}>
            <input type="radio" name='Pfizer' value="Pfizer" checked={vaccineType==="Pfizer"} onChange={evt=>setVaccineType(evt.target.value)}/>
            <label>Pfizer</label>
            <input type="radio" name='Moderna' value="Moderna" checked={vaccineType==="Moderna"} onChange={evt=>setVaccineType(evt.target.value)}/>
            <label>Moderna</label>
            <input type="radio" name='Johnson & Johnson' value="Johnson & Johnson" checked={vaccineType==="Johnson & Johnson"} onChange={evt=>setVaccineType(evt.target.value)}/>
            <label>Johnson & Johnson</label>
          </Col>
        </Row>
      </div>

      <Button type="primary" onClick={()=>scheduleVaccine()} style={{marginTop:"50px", marginLeft:"400px"}}>Schedule COVID-19 Vaccine</Button>  
    </div>
  )
}
