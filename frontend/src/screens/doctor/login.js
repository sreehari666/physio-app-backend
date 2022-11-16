import "./doctor.css";
import background from "./assets/login_bg.png"

export const DoctorLogin=()=>{


    return(
        <>
        <div className="main-heading">
            <h2>Welcome doctors</h2>
        </div>
        
        <div className="container">
                
               <img src={background} alt='' className="bg_image"  />
               <div className="loginContainer">
                    <h3>Login to your account</h3>
                    <input placeholder="Name" />
                    <input placeholder="Email" />
                    <button>Login</button>
               </div>
        </div>
        </>
    )
}