import React,{useState,useEffect} from "react";
import { AdminNavbar } from "./AdminNavbar";
import "./styles/ExerciseList.css";
import axios from "axios";
import URL_ from "../../URL/url";
import { useNavigate } from "react-router-dom";
import {useDispatch } from "react-redux";
import allActions from "../../redux/actions";


export const AdminExerciseList = () =>{
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [data,setData] = useState([])
    const [cycles,setCycles] = useState([])
    const [expand,setExpand] =  useState()
    const [empty,setEmpty] = useState()
    const [loading,setLoading] =  useState(true)
    
    const fetchData = ()=>{
        axios.get(URL_+'/admin/exercise/view').then((res)=>{
            console.log(res.data)

            if(res.status === 200){
                setLoading(false)
                if(Array.isArray(res.data) && !res.data.length){
                    setEmpty(true)
                }else{
                    setEmpty(false)
                }
                setData(res.data)
            }  
        }).catch((err)=>{
            console.log(err)
        })
    }

    const fetchCycles =()=>{
        axios.get(URL_+'/admin/exercise/cycle/view/').then((res)=>{
            console.log(res)
            if(res.status === 200) setCycles(res.data)
        })
    }

    const deleteCycle = (cycleID)=>{
        axios.delete(URL_+'/admin/exercise/cycle/delete/').then((res)=>{
            console.log(res)
            if(res.status === 200){
                navigate('/admin/exercise/view')
            }
        })
    }

    useEffect(()=>{
        fetchData()
        fetchCycles()
    },[])


    const ExerciseExpanded =(props)=>{
        
        console.log(props.data._id)
        console.log(expand)
       if(props.data._id === expand){

        return(
            <div>
                 {props.data.steps && props.data.steps.map((item)=>{
                    return(
                        <div className="exer-view" key={item.stepNum}>
                            <div style={{display:'flex',justifyContent:'space-between'}}>
                            <p>Step {item.stepNum}</p>
                              <button className="edit-btn" onClick={()=>{
                                item.id = props.data._id
                                item.title = props.data.title
                                item.description = props.data.description
                                dispatch(allActions.AdminExerciseAction.AddData(item))
                                navigate('/admin/exercise/edit')
                                }} >Edit</button>
                            </div>
                                                      
                            <div className="exer-step">
                                <p>Name: {item.stepName}</p>
                                <p style={{marginTop:'20px'}}>Description: </p>
                                <p style={{marginTop:'20px'}}>{item.stepDescription}</p>
                                <p style={{marginTop:'20px'}}>Object: </p>
                                <p style={{marginTop:'20px'}}>{item.stepObj}</p>
                                <p>{data[0].filename}</p>
                                
                            </div>
                            
                        </div>
                    )
                 })}
                 
                 <div className="exer-add-view">
                    
                    {/* TODO List of cycles */}

                    {cycles && cycles.map((item)=>{
                        
                        if(item.id === props.data._id){
                            return(
                                <>
                                <div style={{marginLeft:'50px',marginBottom:'5px',marginTop:'5px',height:'fit-content',display:'flex',flexDirection:'row'}}>
                                    <p>Do step {item.cycle[0]} to step {item.cycle[item.cycle.length-1]} for {item.occurance} times</p>
                                    <button className="verified-btn" style={{marginLeft:'50px',marginBottom:'5px',height:'20px',width:'40px'}} onClick={()=>{
                                        dispatch(allActions.AdminExerciseAction.AddCycle(item.id))
                                        navigate('/admin/exercise/edit/cycle')
                                    }}
                                    >Edit</button>

                                    <button className="verified-btn" style={{marginLeft:'50px',marginBottom:'5px',height:'20px',width:'50px'}} onClick={()=>{
                                        alert("Do you want to delete?")
                                        console.log(item._id)
                                        deleteCycle(item._id)
                                    }}
                                    >Delete</button>
                                </div>
                                <hr color="#eeeeee"></hr>
                                </>
                            )
                        }else{
                            return null
                        }
                    })}

                    <button className="verified-btn" style={{marginLeft:'50px',marginBottom:'10px',marginTop:'10px'}} onClick={()=>{
                        dispatch(allActions.AdminExerciseAction.AddData(props.data))
                        navigate('/admin/exercise/add/cycle')
                    }}
                    >+ Add cycle</button>
                 <hr></hr>
                    <button className="verified-btn" style={{marginLeft:'50px',marginTop:'10px'}} onClick={()=>{
                        dispatch(allActions.AdminExerciseAction.AddData(props.data))
                        navigate('/admin/exercise/add')}} >+ Add step</button>
                 </div>
            </div>
        )
       }
        
    }

if(loading === true){
    return(
        <div className="loader-container">
                <div className="spinner"></div>

        </div>

    )
}

    
   return(
    <>
        <AdminNavbar />
        <div className="search-container">
            <div className="search-input-outer">
                <input className="search-input" type="text" placeholder="Search"></input>
            </div>           
        </div>

        {empty == true ? (
            <div className="list-container-outer" style={{flexDirection:'column',marginTop:'50px'}}>
                <p>No exercises found !</p>
                <button className="verified-btn" style={{marginTop:'50px'}} onClick={()=>navigate('/admin/exercise')} >+ Add exercises</button>
            </div>
        ):(
            <>
            <div className="list-container-outer">
                <div style={{width:'80%',display:'flex',justifyContent:'flex-end',}}>
                    <button className="verified-btn" onClick={()=>navigate('/admin/exercise')} >+ Add exercise</button>
                </div>
            </div>
            <div className="list-container-outer">
                    

            <div className="list-box">
                <ul>
                    {data && data.map((item) => {
                     return( 
                        <div key={item._id}>
                            <li className="list-box-item" >
                                <div style={{width:'60%'}}>
                                    {item.title}
                                </div>
                                <div style={{width:'40%',display:'flex',justifyContent:'flex-end'}}>
                                    <button className="verified-btn" onClick={()=>setExpand(item._id)} >View steps</button>
                                </div>
                                
                            </li>
                            <div style={{flexDirection:'column'}}>
                                <ExerciseExpanded data={item} />                       
                            </div>
                        </div>
                    )
                })}
                    
                </ul>
            </div>
            
        </div>
        </>
        )}

        
    </>
   ) 
    
   
}