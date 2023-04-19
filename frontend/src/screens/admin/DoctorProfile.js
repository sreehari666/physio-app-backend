import React from "react";
import { AdminNavbar } from "./AdminNavbar";
import "./styles/DoctorProfile.css";
import { useSelector } from "react-redux";

export const DoctorProfile = ()=>{
    const state = useSelector(state => state.DoctorProfileReducer.data)
    console.log(state)
    return(
        <>
            <AdminNavbar />

            <div className="dcontainer">
            
            <div className="lcontainer">
                <h3>{state.name}</h3> 
                <h4>{state.email}</h4>
                <br></br>
                <div style={{display:"flex",flexDirection:'row'}}>
                    {state.verified===true ?(
                        <p className="verified">Verified</p>

                    ):(
                        <p className="verified">Not Verified</p>

                    )}
                    
                    <p style={{marginLeft:'14px'}}> Learn More</p>
                </div>
                {state.verified === true ? (
                    <>
                    <h4>NMC Register Number</h4>
                    <h6>37984562347857234985</h6>
                    
                    <h4>State medical council</h4>
                    <h6>Travancore Cochin Medical Council, Trivandrum</h6>
                    
                    <h4>University</h4>
                    <h6>U.Bombay</h6>
                    </>
                ):(
                    null
                )}
                
            </div>
            <div className="rcontainer">
                <img className="circle" src="https://previews.123rf.com/images/jemastock/jemastock1702/jemastock170202778/71262443-man-medical-doctor-cartoon-icon-over-white-background-colorful-desing-vector-illustration.jpg"></img>
            </div>       
                

            </div>

        </>
    )
}