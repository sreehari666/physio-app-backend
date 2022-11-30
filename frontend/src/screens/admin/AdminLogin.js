import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export const AdminLogin = ()=>{

    const URL = 'http://192.168.1.45:5000'

    const navigate = useNavigate();

    const [email,setEmail] = useState(null);
    const [password,setPassword] = useState(null);
    const [message,setMessage] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(email)
        axios.post(URL+'/admin/login',{
            email:email,
            password:password,
        }).then((response)=>{
            console.log(response);

            if(response.data.accessToken && response.data.refreshToken){
                localStorage.setItem('adminAccessToken',response.data.accessToken)
                localStorage.setItem('adminRefreshToken',response.data.refreshToken)
              
                setEmail(null);
                setPassword(null);
                navigate('/admin')

            }
            
        }).catch((error)=>{
            console.log(error)
            setMessage("Login failed, Try again")
            navigate('/admin/login')

        })
    }


    return(
        <>
            <div className="main-heading">
                <h2>Welcome Admin</h2>
            </div>
            <form onSubmit={handleSubmit}>
            <div className="admin-login-container">
                <div className="loginContainer">
                    <h3>Login to your account</h3>
                    <p style={{fontSize:12}}>{message}</p>
                    <input type="email" placeholder="Email" name="email" onChange={(e)=>setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" name="password" onChange={(e)=>setPassword(e.target.value)} />
                    
                    <button type="submit" style={{marginBottom:'0.8rem',marginTop:'0.8rem'}}>Login</button>
                   
                       
               </div>
            </div>
            </form>
        </>
    )
}