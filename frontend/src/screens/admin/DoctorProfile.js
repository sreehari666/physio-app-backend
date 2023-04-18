import React from "react";
import { AdminNavbar } from "./AdminNavbar";
import "./styles/DoctorProfile.css"

export const DoctorProfile = ()=>{
    return(
        <>
            <AdminNavbar />

            <div className="dcontainer">
            
            <div className="lcontainer">
                <h3>John Mathew</h3> 
                <h6>johnmathew@gmail.com</h6>
                <p className="verified">Verified</p> <p> Learn More</p>
                <h4>NMC Register Number</h4>
                <h6>37984562347857234985</h6>
                
                <h4>State medical council</h4>
                <h6>Travancore Cochin Medical Council, Trivandrum</h6>
                
                <h4>University</h4>
                <h6>U.Bombay</h6>
            </div>
            <div className="rcontainer">
                <img className="circle" src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png"></img>
            </div>       
                

            </div>

        </>
    )
}