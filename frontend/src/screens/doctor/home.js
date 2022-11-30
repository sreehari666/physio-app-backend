import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './doctor.css';
import { Navbar } from './Navbar';
import { ListBox } from './listBox';
import { Heading } from './heading';
import { ProfileBtn } from './profileBtn';
import axios from 'axios';


const URL = 'http://192.168.1.45:5000';
//const URL = 'http://192.168.43.162:5000'

export const DoctorHome=()=>{
const navigate = useNavigate();
const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  useEffect(()=>{
    console.log(localStorage.getItem('accessToken'))
    console.log(localStorage.getItem('refreshToken'))
    axios.get(URL+'/home',{ headers: {"Authorization" : `Bearer ${localStorage.getItem('accessToken')}`,"refreshToken": `Bearer ${localStorage.getItem('refreshToken')}`} })
    .then((response)=>{
      console.log("response")
      console.log(response.data.accessToken)
      if(response.data.accessToken === undefined){
        console.log("token undefined")
      }else{
        localStorage.setItem('accessToken',response.data.accessToken)
      }
      

    }).catch((error)=>{
      console.log(error)
      navigate('/login')
    })
  })


  return(
    <div>
        {loading?(
            <div className="loader-container">
                <div className="spinner"></div>

            </div>

        ):(

            <>  
                <ProfileBtn />
                <Heading />
                <Navbar />
                {/* <ListBox /> */}
                
            </>

        )}
    </div>
  )
  
    
}