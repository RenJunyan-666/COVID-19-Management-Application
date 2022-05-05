import React, { useEffect, useMemo, useState } from 'react'
// import './style/testStyle.scss'
import store from '../../reducers/store'
import loadUsers from '../../actions/UserListAction'
import { hide } from '../../actions/BtnAction'
import { useLocation, useNavigate } from 'react-router-dom'
import getLoginUser from '../../actions/LoginUserAction'
import axios from 'axios'
import { PageHeader, Button, Tag, Row, Col, Image } from 'antd';
import vaccined from '../../images/vaccined.png'
import firstVaccined from '../../images/firstVaccined.png'
import secondVaccined from '../../images/secondVaccined.png'
import notVaccined from '../../images/notVaccined.png'
import moment from 'moment'

//any design layout
const Content = ({ children, extraContent }) => (
  <Row>
    <div style={{ flex: 1 }}>{children}</div>
    <div className="image">{extraContent}</div>
  </Row>
);

export default function VaccineInfo(props) {
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
  const navigate = useNavigate();
  const location = useLocation();
  const handleChangePage = (id, patient)=>{
    if(patient === ""){
      store.dispatch(hide())
      store.dispatch(getLoginUser(props.userId, users))
      navigate(`/vaccine/hospitals/${id}`,{state:{iddd:id}})
    }
    else{
      alert("You have scheduled your vaccine, if you want to make another one, please cancel your previous one.")
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
          patient:"",
          orderDate:"",
          location:"",
          dose:"",
          insurance:"",
          vaccineType:"",
          provider:"",
          status:false
        },
        testInfo:{
          patient:user.testInfo.patient,
          orderDate:user.testInfo.orderDate,
          location:user.testInfo.location,
          testType:user.testInfo.testType,
          completedDate:user.testInfo.completedDate,
          provider:user.testInfo.provider,
          method:user.testInfo.method,
          result:user.testInfo.result,
          status:false
        }
      }).then(res=>{
        console.log("取消预约了")

        console.log(location.state);
        var id = location.state.iddd;
        console.log('userid',id);
        // window.location.replace("http://localhost:3000/vaccine")
        navigate(`/`, {state:{idddd:id}, replace:true});
      }).catch(err=>console.log(err))
  }

  //找到当前登录用户
  const loginUser = useMemo(()=>users.filter(user=>(user._id === props.userId)), [users, props.userId]) 

  return (
    <div>
          {
            loginUser.map(user=>
              <PageHeader
                key={user._id}
                title={user.userInfo.name}
                className="site-page-header"
                subTitle={user.userInfo.email}
                tags={(user.vaccineInfo.status)?<Tag color="green">Completed</Tag>:<Tag color="blue">Pending</Tag>}
                extra={[
                  (user.vaccineInfo.patient !== "") && (user.vaccineInfo.status === false) && 
                  <Button key="2" onClick={()=>cancelAppointment()}>
                    Cancel Appointment
                  </Button>, //预约疫苗后，取消预约按钮显示
                  showBtn && <Button key="1" type="primary" onClick={()=>handleChangePage(props.userId, user.vaccineInfo.patient)}>
                    Schedule your COVID-19 vaccine
                  </Button>, //预约疫苗中，预约按钮不显示
                  
                ]}
                avatar={{ src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4' }}
                style={{marginLeft:"50px", marginRight:"50px"}}
              >
                <Content
                   extraContent={[
                     (user.vaccineInfo.status === false) && <Image width={200} src={notVaccined}/>,
                     (user.vaccineInfo.status === true) && (user.vaccineInfo.dose === "dose 1") && <Image width={200} src={firstVaccined}/>,
                     (user.vaccineInfo.status === true) && (user.vaccineInfo.dose === "dose 2") && <Image width={200} src={secondVaccined}/>,
                     (user.vaccineInfo.status === true) && (user.vaccineInfo.dose === "dose booster") && <Image width={200} src={vaccined}/>
                   ]}
                >   

                <Row>
                  <Col span={10} offset={3}>
                    <b>Patient: </b>{user.vaccineInfo.patient}
                  </Col>
                  <Col span={8} offset={1}>
                    <b>Provider: </b>{user.vaccineInfo.provider}
                  </Col>
                </Row><br/>
                <Row>
                  <Col span={10} offset={3}>
                    <b>Schedule Date: </b>{
                      (user.vaccineInfo.orderDate !== null)?moment(user.vaccineInfo.orderDate).format('YYYY-MM-DD'):""
                    }
                  </Col>
                  <Col span={8} offset={1}>
                    <b>Dose: </b>{user.vaccineInfo.dose}
                  </Col>
                </Row><br/>
                <Row>
                  <Col span={10} offset={3}>
                    <b>Vaccine Location: </b>{user.vaccineInfo.location}
                  </Col>
                  <Col span={8} offset={1}>
                    <b>Vaccine Type: </b>{user.vaccineInfo.vaccineType}
                  </Col>
                </Row><br/>
                </Content>
                
              </PageHeader>
            )
          }
    </div>
  )
}
