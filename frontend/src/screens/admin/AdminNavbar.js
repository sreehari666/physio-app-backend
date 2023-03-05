import {useState} from "react";
import { useNavigate } from "react-router-dom";

export const AdminNavbar=()=>{

    const [toggleBtn,setToggleBtn] = useState(true);
    const navigate = useNavigate();

    function Logout(){
        localStorage.setItem('adminAccessToken',null)
        localStorage.setItem('adminRefreshToken',null)
        console.log("logout")
        navigate('/admin')
    }

    return(
        <nav 
        className={`row ${toggleBtn ? 'NavbarItems' : 'NavbarItems-expanded'}`}>
            
            <ul>
                <li className="btn-top"><a onClick={()=>setToggleBtn(prev=>!toggleBtn)}><i className="fa-solid fa-bars"></i></a></li> 
                <li className="items-li"><a href="/account"><i className="fa-solid fa-user"></i></a><p className={`row ${toggleBtn ? 'item-text-x' : 'item-text'}`}>Account</p></li>
                <li className="items-li"><a href="/exercise"><i className="fa-solid fa-person-walking"></i></a><p className={`row ${toggleBtn ? 'item-text-x' : 'item-text'}`}>Exercise</p></li>
                <li className="items-li"><a href="/"><i className="fa-solid fa-house"></i></a><p className={`row ${toggleBtn ? 'item-text-x' : 'item-text'}`}>Home</p></li>
                <li className="items-li"><a href="/patients"><i className="fa-solid fa-user-group"></i></a><p className={`row ${toggleBtn ? 'item-text-x' : 'item-text'}`}>Patients</p></li>
                <li className="items-li"><a href="/settings"><i className="fa-solid fa-gear"></i></a><p className={`row ${toggleBtn ? 'item-text-x' : 'item-text'}`}>Settings</p></li>
                <li className="items-li">
                    <button className={`row ${toggleBtn ? 'logout-btn' : 'logout-btn-expanded'}`}  onClick={()=>Logout()}>Logout</button>
                </li>
            </ul>
        </nav>
    )
    
}