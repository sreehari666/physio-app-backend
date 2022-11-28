import './profileBtn.css';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export const ProfileBtn=()=>{
    const [toggleBtn,setToggleBtn] = useState(false);
    const navigate = useNavigate();
    function Logout(){
        localStorage.setItem('accessToken',null)
        localStorage.setItem('refreshToken',null)
        console.log("logout")
        navigate('/')
    }
    return(
        <div className="profileBtnContainer">
            <button className='profile-icon-btn' onClick={()=>setToggleBtn(prev=>!toggleBtn)}><i className="fa-solid fa-user"></i></button>
            <div className={`row ${toggleBtn ? 'dropDownContainer' : 'dropDownContainer-expanded'}`}>
                <ul>
                    <li onClick={()=>null} className="profile-item">
                        Profile
                    </li>
                    <li className="profile-item" onClick={()=>Logout()}>
                        Logout
                    </li>
                </ul>
                
            </div>
        </div>
    )
}