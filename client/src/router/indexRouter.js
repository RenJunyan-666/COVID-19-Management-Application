import React from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import Home from '../views/Home.js'
import Vaccine from '../views/Vaccine.js'
import Test from '../views/Test.js'
import Login from '../views/Login.js'
import Hospitals from '../views/Tests/Hospitals.js'
import Scheduletest from '../views/Tests/Scheduletest.js'
import Hospitals_Vaccine from '../views/Vaccines/Hospitals.js'
import ScheduleVaccine from '../views/Vaccines/ScheduleVaccine.js'
import { Hospital } from '../views/Hospital';

export default function MRouter() {
  return (
    <Routes>
        {/* <Route path='/home' element={<Home/>}/> */}
        <Route path='/vaccine' element={<Vaccine/>}/>
        {/* <Route path='/login' element={<Login/>}/> */}

        {/* 动态路由 */}
        {/* <Route path='/test/:myid' element={<Test/>}/> */}
        <Route path='/test' element={<Test/>}>
          <Route path='hospitals/:myid' element={<Hospitals/>}/>
          <Route path='scheduletests/:myid' element={<Scheduletest/>}/>
        </Route>

        {/* 动态路由 */}
        {/* <Route path='/vaccine/:myid' element={<Vaccine/>}/> */}
        <Route path='/vaccine' element={<Vaccine/>}>
          <Route path='hospitals/:myid' element={<Hospitals_Vaccine/>}/>
          <Route path='schedulevaccines/:myid' element={<ScheduleVaccine/>}/>
        </Route>

        <Route path='/hospital' element={<Hospital />} />
        <Route path='*' element={<Navigate to="/home"/>}/>
    </Routes>
  )
}