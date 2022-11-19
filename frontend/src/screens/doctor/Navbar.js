import './NavbarStyle.css';
import {useState} from "react";

export const Navbar=()=>{

    const [toggleBtn,setToggleBtn] = useState(true);
    return(
        <nav 
        className={`row ${toggleBtn ? 'NavbarItems' : 'NavbarItems-expanded'}`}
        onClick={()=>setToggleBtn(prev=>!toggleBtn)}>
            
            <ul>
                
                <li className="btn-top"><a onClick={()=>setToggleBtn(prev=>!toggleBtn)}><i className="fa-solid fa-bars"></i></a></li> 
                <li className="items-li"><a href="/account"><i className="fa-solid fa-user"></i></a><p className={`row ${toggleBtn ? 'item-text-x' : 'item-text'}`}>Account</p></li>
                <li className="items-li"><a href="/"><i className="fa-solid fa-house"></i></a><p className={`row ${toggleBtn ? 'item-text-x' : 'item-text'}`}>Home</p></li>
                <li className="items-li"><a href="/patients"><i className="fa-solid fa-user-group"></i></a><p className={`row ${toggleBtn ? 'item-text-x' : 'item-text'}`}>Patients</p></li>
                {/* <li><button>click</button></li> */}
                <li className="items-li"><a href="/settings"><i className="fa-solid fa-gear"></i></a><p className={`row ${toggleBtn ? 'item-text-x' : 'item-text'}`}>Settings</p></li>
                
            </ul>
        </nav>
    )
    
}