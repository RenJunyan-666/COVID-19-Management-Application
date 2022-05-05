import './App.scss';

import Register from './views/Register';
import Login from './views/Login';
import Layout from './components/loginComponents/Layout';
import Home from './views/Home';
import Test from './views/Test';
import Hospitals from './views/Tests/Hospitals.js';
import Scheduletest from './views/Tests/Scheduletest.js';
import Vaccine from './views/Vaccine.js'
import Hospitals_Vaccine from './views/Vaccines/Hospitals.js'
import ScheduleVaccine from './views/Vaccines/ScheduleVaccine.js'
import Unauthorized from './views/Unauthorized';
import { Hospital } from './views/Hospital';


import React from 'react';
import RequireAuth from './components/loginComponents/RequireAuth';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import EditSuccess from './views/EditSuccess';


export const API = 'http://localhost:8000';

function App() {
  return (
    // <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            {/* public routes */}
            {/* <Route path='linkpage' element={<LinkPage />} /> */}
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='unauthorized' element={<Unauthorized />} />

            {/* Protected routes */}
            <Route element={<RequireAuth allowedRoles={[2001, 5150, 1984]} />}>
              <Route path='/' element={<Home />} />
              <Route element={<RequireAuth allowedRoles={[2001, 1984]} />}>
              <Route path='/test' element={<Test />}>
                <Route path='hospitals/:myid' element={<Hospitals />} />
                <Route path='scheduletests/:myid' element={<Scheduletest />} />
              </Route>
              <Route path='/vaccine' element={<Vaccine />}>
                <Route path='hospitals/:myid' element={<Hospitals_Vaccine />} />
                <Route path='schedulevaccines/:myid' element={<ScheduleVaccine />} />
              </Route>
              </Route>
              </Route>
            <Route element={<RequireAuth allowedRoles={[5150, 1984]} />}>
              <Route path='/hospital' element={<Hospital />} />
            </Route>
            <Route path='/editsuccess' element={<EditSuccess />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
    //  </React.StrictMode>
  );
}

export default App;