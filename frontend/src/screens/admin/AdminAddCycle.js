import React,{useState,useEffect} from "react";
import { AdminNavbar } from "./AdminNavbar";
import axios from "axios";
import './styles/Exercise.css';
import URL_ from '../../URL/url';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const AdminAddCycle=()=>{

    const navigate = useNavigate()

    const data = useSelector(state => state.AdminExerciseReducer.data);
    console.log(data)

    

    

    const [title,setTitle] =  useState()
    const [id,setId] = useState()


    const [stepNum1,setStepNum1] = useState(null)
    const [stepNum2,setStepNum2] = useState(null)
    const [occurance,setOccurance] = useState(null)
    const [message,setMessage] = useState(null)

    useEffect(()=>{
        if(!data) navigate('/admin/exercise/view')
        if(data){
            setId(data._id)
            setTitle(data.title)
        }
    },[])
    
   

    const handleSubmit =(event)=>{
        event.preventDefault();
        
        if(stepNum1 >= 1 && stepNum2 >1){
            console.log("valid steps")
            let arr = []
            for(let i = stepNum1;i<=stepNum2;i++){
                arr.push(Number(i))
            }
            console.log(arr)
            console.log(id)
            axios.post(URL_+'/admin/exercise/cycle/add',{
                "id":String(id),
                "cycle":arr,
                "occurance":Number(occurance)
            }).then((res)=>{
                console.log(res)
                if(res.status === 200){
                    setStepNum1(null)
                    setStepNum2(null)
                    setOccurance(null)
                    setMessage("Success!")
                }
            }).catch((err)=>{
                console.log(err)
            })
       

        }
        
        
    
    }


    return(
        <>
        <AdminNavbar />
            <form onSubmit={handleSubmit} id="form" >
             <div className="exer-container">
                <h1>Enter cycle details</h1>
                 <p style={{marginTop:'20px'}}>{title}</p>
                 <p style={{marginTop:'5px',fontSize:'12px'}}>{message}</p>
                 <p className="exer-label">Do step </p>
                 <input type="number" name="stepNum1" placeholder="Enter step eg : 1" onChange={(e)=>setStepNum1(e.target.value)} required/>
                 <p className="exer-label">to </p>

                 <input type="number" name="stepNum2" placeholder="Enter step eg: 2" onChange={(e)=>setStepNum2(e.target.value)} required/>
                 <p className="exer-label">for </p>

                 <input type="number" name="occurance" placeholder="Enter occurance" onChange={(e)=>setOccurance(e.target.value)} required/>
                 <p className="exer-label">times </p>
                 <button type="submit" style={{marginBottom:'0.8rem',marginTop:'2rem'}}>Add</button>
             </div>
             </form>

        </>
    )

}