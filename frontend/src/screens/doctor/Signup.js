import "./doctor.css";
import background from "./assets/login_bg.png";
import { useState } from "react";
import axiox from "axios";
import { useNavigate } from "react-router-dom";

const URL = 'http://192.168.1.45:5000'
//const URL = 'http://192.168.43.162:5000'

export const DoctorSignup=()=>{
    const navigate = useNavigate();
    
    const [name,setName] = useState(null);
    const [email,setEmail] = useState(null);
    const [password,setPassword] = useState(null);
    
    const [message,setMessage] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(email)
        axiox.post(URL+'/signup',{
            name:name,
            email:email,
            password:password,
        })
        .then((response)=>{
            console.log(response)
            console.log(response.data.accessToken)
            localStorage.setItem('accessToken',response.data.accessToken)
            localStorage.setItem('refreshToken',response.data.refreshToken)
            navigate('/')
            setName(null);
            setEmail(null);
            setPassword(null);
            
        }).catch((error)=>{
            console.log("error")
            console.log(error.response.status)
            if(error.response.status === 403) setMessage("You already have an account");

            if(error.response.status === 404) setMessage("Something went wrong");
               
        })
    }

    return(
        <>
        <div className="main-heading">
            <h2>Welcome doctors</h2>
        </div>
        <form onSubmit={handleSubmit}>
            <div className="container">
                
               <img src={background} alt='' className="bg_image"  />
               <div className="loginContainer">
                    <h3>Create your account</h3>
                    <p style={{fontSize:12}}>{message}</p>
                    <input type="text" placeholder="Name" name="name" onChange={(e)=>setName(e.target.value)} />
                    <input type="email" placeholder="Email" name="email" onChange={(e)=>setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" name="password" onChange={(e)=>setPassword(e.target.value)} />
                    <button>Signup</button>
               </div>
            </div>
        </form>
        </>
    )
}