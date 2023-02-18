import React,{useEffect,useState} from "react";
import "./doctor.css";
import background from "./assets/login_bg.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "react-google-login";
import {gapi} from "gapi-script";
import URL from '../../URL/url';

//const URL = 'http://192.168.1.45:5000'
//const URL = 'http://192.168.43.162:5000'

export const DoctorSignup=()=>{
    const navigate = useNavigate();
    
    const [name,setName] = useState(null);
    const [email,setEmail] = useState(null);
    const [password,setPassword] = useState(null);
    const [message,setMessage] = useState(null);
    const [id,setId] = useState(null)

    useEffect(()=>{
        axios.get(URL+'/get-client-id')
        .then(async(response)=>{
            console.log(response.data.CLIENT_ID)
            
            await gapi.load("client:auth2",()=>{
                console.log("gapi client auth2")
                console.log(response.data.CLIENT_ID)
                gapi.auth2.init({clientId:response.data.CLIENT_ID}).then((data)=>{
                    console.log(data)

                    setId(response.data.CLIENT_ID)
                })
                
            })
           
        }).catch((error)=>{
            console.log(error)
        })
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(email)
        axios.post(URL+'/signup',{
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

    const handleGoogleFailure = (result)=>{
        console.log("google error")
        console.log(result)
        setMessage("Login failed, please try again")
    }

    const handleGoogleSuccess = (googleData)=>{
        console.log("google success")
        console.log(googleData)
        console.log(googleData.profileObj.email)
        console.log(googleData.profileObj.name)
        axios.post(URL+'/google',{
            name:googleData.profileObj.name,
            email:googleData.profileObj.email,
            googgleId:googleData.profileObj.googgleId,
            imgUrl:googleData.profileObj.imageUrl,
            password:null,
        }).then((response)=>{
            console.log(response)

            localStorage.setItem('accessToken',response.data.accessToken)
            localStorage.setItem('refreshToken',response.data.refreshToken)
            navigate('/')
        }).catch((error)=>{
            console.log(error)
            navigate('/login')
            setMessage("Login failed, try again")
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
                    <a href="/login" style={{fontSize:'0.8rem',marginBottom:'0rem',marginTop:'1rem',color:'blue'}}>Already have an account? Login</a>
                    <button>Signup</button>
                    <p style={{fontSize:'0.8rem'}}>Or login with</p>
                        {id && <GoogleLogin
                        clientId={id}
                        render={renderProps => (
                            
                            <button onClick={renderProps.onClick} style={{height:'3rem',width:'3rem', borderRadius:'1.5rem', alignItems:'center',justifyContent:'center',marginTop:'0.5rem',backgroundColor:'#ffffff'}}><i className="fab fa-google fa-3x"></i></button>
                        )}
                        onSuccess={handleGoogleSuccess}
                        onFailure={handleGoogleFailure}
                        cookiePolicy={'single_host_origin'}>
    
                        </GoogleLogin>}
               </div>
            </div>
        </form>
        </>
    )
}