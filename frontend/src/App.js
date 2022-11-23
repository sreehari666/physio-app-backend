import { BrowserRouter, Route, Routes } from "react-router-dom";
import {DoctorHome} from './screens/doctor/home';
import {DoctorLogin} from './screens/doctor/login';
import {DoctorSignup} from './screens/doctor/Signup';
import { useState,useEffect } from "react";
import axios from "axios";

const URL = 'http://192.168.1.45:5000'

function App() {

  const [accessToken,setAccessToken] = useState(null);
  const [refreshToken,setRefreshToken] = useState(null);


  useEffect(()=>{
    localStorage.getItem('accessToken')
    localStorage.getItem('refreshToken')
    axios.post(URL+'/verifyLogin',
    {
      accessToken:accessToken,
      refreshToken:refreshToken,
    })
    .then((response)=>{
      console.log(response)
    }).catch((error)=>{
      console.log(error)
    })
  })
  
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<DoctorHome />} />
        <Route exact path='/login' element={<DoctorLogin />} />
        <Route exact path='/signup' element={<DoctorSignup />} />
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;
