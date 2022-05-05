import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import store from '../../reducers/store'
import {show, hide} from '../../actions/BtnAction.js'
import chooseHospital from '../../actions/HospitalAction'
import loadHospitals from '../../actions/HospitalListAction'
import { Card, Input } from 'antd'
import '../style/Vaccine.scss'

const { Meta } = Card
const { Search } = Input

export default function Hospitals_Vaccine() {
  const [hospitalList, setHospitalList] = useState([])
  const [searchText, setSearchText] = useState("")
  const params = useParams()

  //跳转页面
  const navigate = useNavigate()
  const handleChangePage = (hospital, id)=>{
    store.dispatch(chooseHospital(hospital))
    navigate(`/vaccine/schedulevaccines/${id}`, {state:{iddd:id}})
  }

  //redux发布
  useEffect(()=>{
    store.dispatch(hide()) //hide button

    //加载医院数据
    store.dispatch(loadHospitals())

    //订阅加载医院,拿到dispatch的结果
    store.subscribe(()=>{
        setHospitalList(store.getState().hospitalListReducer.hospitalList)
    })

    return ()=>{
        store.dispatch(show())
    }
  },[])

  //模糊查询
  const getHospitalList = useMemo(()=>hospitalList.filter(
      item=>item.hospitalName.toUpperCase().includes(searchText.toUpperCase()) || 
      item.address.toUpperCase().includes(searchText.toUpperCase())
      ), [hospitalList, searchText])

  return (
    <div className='div_testInfo'>
        <Search placeholder="search hospital for your vaccine" enterButton
         style={{width:"400px", marginBottom:"20px"}}
         onChange={event=>{
            setSearchText(event.target.value)
        }}/>
        {
            getHospitalList.map(item=>
                <Card
                    hoverable
                    style={{ width: 600, height:100, marginTop:"10px" }}
                    onClick={()=>handleChangePage(item, params.myid)}
                    key={item._id}
                >
                    <Meta title={item.hospitalName} description={item.address} />
                    <Meta description={item.hospitalPhone}/>
                </Card>)
        }
    </div>
  )
}
