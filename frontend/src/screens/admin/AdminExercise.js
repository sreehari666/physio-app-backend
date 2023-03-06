import React,{useEffect, useState} from "react";
import { AdminNavbar } from "./AdminNavbar";
import {v4 as uuidv4} from 'uuid';
import axios from "axios";
import './styles/Exercise.css';
import URL_ from '../../URL/url';


export const AdminExercise = () =>{
    const [title,setTitle] =  useState()
    const [stepName,setStepName] = useState();
    const [stepDescription,setStepDescription] = useState();
    const [stepObj,setStepObj] =  useState();
    const [file, setFile] = useState();
    
    const [gif,setGif] = useState(null);
    let myuuid = uuidv4();


    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
        setGif(e.target.files[0])
        
    }

    const handleSubmit =(event)=>{
        event.preventDefault();
        const formData = new FormData();
        formData.append("title",title)
        formData.append("exID",myuuid)
        formData.append("image",gif,myuuid);
        formData.append("data",{
            title:title,
            exID:myuuid,
            steps: [{
            stepNum:1,
            stepName:stepName,
            stepDescription:stepDescription,
            stepObj:stepObj,
        }]})

        axios.post(URL_+'/admin/exercise',formData,{ headers: {'Content-Type': 'multipart/form-data'}}).then((res)=>{
            console.log(res)
        }).catch((err)=>{
            console.log(err)
        })
    
    }


    return(
        <>
            <AdminNavbar />
            <form onSubmit={handleSubmit} id="form" >
             <div className="exer-container">
                <h1>Enter exercise details</h1>
                 <a className="exer-a" href="https://colab.research.google.com/drive/1Ad1whqSzzSphTGm1MtgRzEYX1ib8pYeh?usp=sharing" target="_blank">Follow this link to train the model</a>                 
                 <input name="title" placeholder="Enter exercise title (eg: Cat camel stretch )" onChange={(e)=>setTitle(e.target.value)} />
                 <p className="exer-label">Enter details of step 1</p>
                 <input type="text" name="stepDescription" placeholder="Enter step name (eg: Pose1)" onChange={(e)=>setStepName(e.target.value)} />
                 <input type="text" name="stepDescription" placeholder="Enter step description (eg: Raise both hands)" onChange={(e)=>setStepDescription(e.target.value) }  />
                 <textarea name="stepObj" className="exer-textarea" rows="10" cols="100" placeholder="Copy and paste the json object from colab" onChange={(e)=>setStepObj(e.target.value)} />
                 <div className="exer-row">
                 <input type="file" name="gif" accept="image/gif" onChange={handleChange}/> 
                 <img className="exer-img" src={file} alt="gif" /> 
                 <button className="exer-btn" onClick={()=>console.log(myuuid)}>+ Add step</button>
                 </div>
                 <button type="submit" style={{marginBottom:'0.8rem',marginTop:'2rem'}}>Submit</button>
             </div>
             </form>
        </>
    )
}

