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
                <a href="/account"><li className="items-li"><i className="fa-solid fa-user"></i><p className={`row ${toggleBtn ? 'item-text-x' : 'item-text'}`}>Account</p></li></a>
                <a href="/admin/exercise/view"><li className="items-li"><i className="fa-solid fa-person-walking"></i><p className={`row ${toggleBtn ? 'item-text-x' : 'item-text'}`}>Exercise</p></li></a>
                <a href="/"><li className="items-li"><i className="fa-solid fa-house"></i><p className={`row ${toggleBtn ? 'item-text-x' : 'item-text'}`}>Home</p></li></a>
                <a href="/patients"><li className="items-li"><i className="fa-solid fa-user-group"></i><p className={`row ${toggleBtn ? 'item-text-x' : 'item-text'}`}>Patients</p></li></a>
                <a href="/settings"><li className="items-li"><i className="fa-solid fa-gear"></i><p className={`row ${toggleBtn ? 'item-text-x' : 'item-text'}`}>Settings</p></li></a>
                <li className="items-li">
                    <button className={`row ${toggleBtn ? 'logout-btn' : 'logout-btn-expanded'}`}  onClick={()=>Logout()}>Logout</button>
                </li>
            </ul>
        </nav>
    )
    
}