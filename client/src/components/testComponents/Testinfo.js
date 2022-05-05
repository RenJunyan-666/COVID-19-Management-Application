import React, { useEffect, useMemo, useState } from 'react'
import './style/testStyle.scss'
import store from '../../reducers/store'
import loadUsers from '../../actions/UserListAction'
import { hide } from '../../actions/BtnAction'
import { useNavigate, useLocation} from 'react-router-dom'
import getLoginUser from '../../actions/LoginUserAction'
import axios from 'axios'
import { PageHeader, Button, Tag, Row, Col, Image } from 'antd';
import greenCode from '../../images/greenCode.png'
import yellowCode from '../../images/yellowCode.png'
import redCode from '../../images/redCode.png'
import moment from 'moment'

//any design layout
const Content = ({ children, extraContent }) => (
  <Row>
    <div style={{ flex: 1 }}>{children}</div>
    <div className="image">{extraContent}</div>
  </Row>
);

export default function Testinfo(props) {
  const [users, setUsers] = useState([])
  const [showBtn, setShowBtn] = useState(store.getState().buttonReducer.show)
  const [user, setUser] = useState(store.getState().loginUserReducer.user)

  useEffect(()=>{
    //订阅全部用户
    store.dispatch(loadUsers())
  
    //得到全部用户
    store.subscribe(()=>{
      setUsers(store.getState().userListReducer.userList)
      setShowBtn(store.getState().buttonReducer.show)
    })

  }, [])

  useEffect(()=>{
    store.dispatch(getLoginUser(props.userId, users))
    store.subscribe(()=>{
      setUser(store.getState().loginUserReducer.user)
    })
  },[props.userId, users])

  //如果预约的话，就进行跳转，进入内层页面路由
  const navigate = useNavigate()
  let location = useLocation();
  const handleChangePage = (id, patient)=>{
    if(patient === ""){
      store.dispatch(hide())
      store.dispatch(getLoginUser(props.userId, users))
      navigate(`/test/hospitals/${id}`,{state:{idd:id}})
    }
    else{
      alert("You have scheduled your test, if you want to make another one, please cancel your previous one.")
    }
    
  }
  
  //取消预约
  const cancelAppointment = ()=>{
    window.alert("Schedule canceld");
    axios.put(`http://localhost:8000/useraccounts/${props.userId}`, { 
        _id:props.userId,
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
          patient:"",
          orderDate:"",
          location:"",
          testType:"",
          completedDate:"",
          provider:"",
          method:"",
          result:"",
          status:false
        }
      }).then(res=>{
        console.log("取消预约了")
        console.log(location.state);
        var id = location.state.idd;
        console.log('userid',id);
        id = id.replace("\"","").replace("\"","");
        // window.location.reload()
        navigate(`/`, {state:{idddd:id}, replce:true})
      }).catch(err=>console.log(err))
  }

  //找到当前登录用户
  const loginUser = useMemo(()=>users.filter(user=>(user._id === props.userId)), [users, props.userId]) 

  //显示健康码
  const showQRcode = (result)=>{
    switch(result){
      case "negative":
        return <Image width={200} src={greenCode}/>
      case "positive":
        return <Image width={200} src={redCode}/>
      default:
        return <Image width={200} src={yellowCode}/>
    }

    
  }

  return (
    <div>
          {
            loginUser.map(user=>
              <PageHeader
                key={user._id}
                title={user.userInfo.name}
                className="site-page-header"
                subTitle={user.userInfo.email}
                tags={(user.testInfo.status)?<Tag color="green">Completed</Tag>:<Tag color="blue">Pending</Tag>}
                extra={[
                  (user.testInfo.patient !== "") && (user.testInfo.status === false) && 
                  <Button key="2" onClick={()=>cancelAppointment()}>
                    Cancel Appointment
                  </Button>, //预约核酸检测后，取消预约按钮显示
                  showBtn && <Button key="1" type="primary" onClick={()=>handleChangePage(props.userId, user.testInfo.patient)}>
                    Schedule your COVID-19 Test
                  </Button>, //预约核酸过程中，预约按钮不显示
                  
                ]}
                avatar={{ src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4' }}
                style={{marginLeft:"50px", marginRight:"50px"}}
              >
                <Content
                  extraContent={
                    showQRcode(user.testInfo.result)
                  }
                >
                <Row>
                  <Col span={10} offset={3}>
                    <b>Patient: </b>{user.testInfo.patient}
                  </Col>
                  <Col span={8} offset={1}>
                    <b>Provider: </b>{user.testInfo.provider}
                  </Col>
                </Row><br/>
                <Row>
                  <Col span={10} offset={3}>
                    <b>Schedule Date: </b>{
                      (user.testInfo.orderDate !== null)?moment(user.testInfo.orderDate).format('YYYY-MM-DD'):""
                    }
                  </Col>
                  <Col span={8} offset={1}>
                    <b>Test Completed Date: </b>{
                      (user.testInfo.completedDate !== null)?moment(user.testInfo.completedDate).format('YYYY-MM-DD'):""
                    }
                  </Col>
                </Row><br/>
                <Row>
                  <Col span={10} offset={3}>
                    <b>Test Location: </b>{user.testInfo.location}
                  </Col>
                  <Col span={8} offset={1}>
                    <b>Test Method: </b>{user.testInfo.method}
                  </Col>
                </Row><br/>
                <Row>
                  <Col span={10} offset={3}>
                    <b>Test Type: </b>{user.testInfo.testType}
                  </Col>
                  <Col span={8} offset={1}>
                    <b>Result: </b>{user.testInfo.result}
                  </Col>
                </Row><br/>
                </Content>
                
              </PageHeader>
            )
          }
    </div>
  )
}
