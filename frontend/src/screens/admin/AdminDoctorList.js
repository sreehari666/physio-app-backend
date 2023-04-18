import { useState,useEffect } from "react";
import "./styles/DoctorList.css";
import axios from "axios";
import URL_ from "../../URL/url";



export const AdminDoctorList = () =>{
    const [names,setNames] = useState()
    function fetchData(){
        axios.get(URL_+'/doctors/get').then((response)=>{
            console.log(response.data)
            setNames(response.data)
        }).catch((err)=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        fetchData()
    },[])
    
   return(
    <>
        <div className="search-container">
            <div className="search-input-outer">
                <input className="search-input" type="text" placeholder="Search"></input>
            </div>
            
        </div>

        <div className="list-container-outer">
            <div className="list-box">

                <ul>
                    {names && names.map((item) => {
                     return( 
                    <li className="list-box-item" key={item._id}>
                        <div style={{width:'60%'}}>
                            {item.name}
                        </div>
                        <div style={{width:'40%',display:'flex',justifyContent:'flex-end'}}>
                            <button className="verified-btn">View profile</button>
                            {item.verified !== true ?(
                                <button className="verified-btn-red">Not Verified</button>
                            ):(
                                <button className="verified-btn">Verified</button>
                            )}
                            
                        </div>
                    </li>
                     )
                })}
                    
                </ul>
            </div>
            
        </div>
    </>
   ) 
    
   
}