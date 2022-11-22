import "./doctor.css";
import background from "./assets/login_bg.png";
import { useState } from "react";

const URL = 'http://192.168.1.45:5000'

export const DoctorLogin=()=>{
    
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(email)
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
                    <h3>Login to your account</h3>
                    <input type="email" placeholder="Email" name="email" onChange={(e)=>setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" name="password" onChange={(e)=>setPassword(e.target.value)} />
                    <button>Login</button>
               </div>
            </div>
        </form>
        </>
    )
}