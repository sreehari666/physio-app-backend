import React,{useEffect, useState} from "react";
import { AdminNavbar } from "./AdminNavbar";
import {v4 as uuidv4} from 'uuid';
import axios from "axios";
import './styles/Exercise.css';
import URL from '../../URL/url';


export const AdminExercise = () =>{
    const [title,setTitle] =  useState()
    const [stepName,setStepName] = useState();
    const [stepDescription,setStepDescription] = useState();
    const [stepObj,setStepObj] =  useState();
    const [file, setFile] = useState([]);
    let myuuid = uuidv4();


    function handleChange(e) {
        console.log(e.target.files);
        setFile([...file,URL.createObjectURL(e.target.files[0])]);
    }

    const handleSubmit =(event)=>{
        event.preventDefault();
        
        axios.post(URL+'/admin/exercise',{
            title:title,
            exID:myuuid,
            steps:[{
                stepName:stepName,
                stepDescription:stepDescription,
                stepObj:stepObj,
                stepGif:file,
            }]
            
        }).then((response)=>{
            
            
        }).catch((error)=>{
            
        })
    }


    return(
        <>
            <AdminNavbar />
            <form onSubmit={handleSubmit} >
             <div className="exer-container">
                <h1>Enter exercise details</h1>
                 <a className="exer-a" href="https://colab.research.google.com/drive/1Ad1whqSzzSphTGm1MtgRzEYX1ib8pYeh?usp=sharing" target="_blank">Follow this link to train the model</a>                 
                 <input name="title" placeholder="Enter exercise title (eg: Cat camel stretch )" onChange={(e)=>setTitle(e.target.value)} />
                 <p className="exer-label">Enter details of step 1</p>
                 <input type="text" name="stepDescription" placeholder="Enter step description (eg: Raise both hands)" onChange={(e)=>setStepName(e.target.value)} />
                 <input type="text" name="stepDescription" placeholder="Enter step description (eg: Raise both hands)" onChange={(e)=>setStepDescription(e.target.value) }  />
                 <textarea name="stepObj" className="exer-textarea" rows="10" cols="100" placeholder="Copy and paste the json object from colab" onChange={(e)=>setStepObj(e.target.value)} />
                 <div className="exer-row">
                 <input type="file" name="gif" accept="image/gif" onChange={handleChange}/> 
                 <img className="exer-img" src={file[0]} alt="gif" /> 
                 <button className="exer-btn" onClick={()=>console.log(myuuid)}>+ Add step</button>
                 </div>
                 <button type="submit" style={{marginBottom:'0.8rem',marginTop:'2rem'}}>Submit</button>
             </div>
             </form>
        </>
    )
}

// export const AdminExercise = () =>{
//     const [file, setFile] = useState([]);
//     const [step,setStep] =  useState(1);
//     const [title,setTitle] =  useState();
//     const [stepName,setStepName] = useState([]);
//     const [stepDescription,setStepDescription] = useState([]);
//     const [stepObj,setStepObj] =  useState([]);
//     const [data,setData] = useState([{
//         "id":"",
//         "stepName":"",
//         "stepDescription":"",
//         "stepObj":""
//     }]);
//     const [result,setResult] = useState([])

//     function handleChange(e) {
//         console.log(e.target.files);
//         setFile([...file,URL.createObjectURL(e.target.files[0])]);
//     }

//     const incrementStep =()=>{    
//         var count = step + 1
//         setStep(count)

//         console.log(stepName)
        
        
//     }

//     const handleSubmit =(event)=>{
//         console.log(title)
//         for(let i=0;i<step;i++){

//         }
        
//     }
//     const updateForm = ()=>{
        
//     }

//     const forms = []
   
//     for(let i=0;i<step;i++){
//         forms.push(
//             <div key={step*i}>  
//                 {/* <input name={"stepNum"+step} type="number" placeholder="Enter step number" onChange={setStep(ste)} /> */}
//                 <input type="text" name="stepName" placeholder="Enter step name (eg: pose1)" onChange={(e)=>{
//                     var items = [...stepName]
//                     items[i] = e.target.value
//                     setStepName(items)
//                 }} />
//                 <input type="text" name="stepDescription" placeholder="Enter step description (eg: Raise both hands)" onChange={(e)=>{
//                     var items = [...stepDescription]
//                     items[i] = e.target.value
//                     setStepDescription(items)
//                 }} />
//                 <textarea name="stepObj" className="exer-textarea" rows="10" cols="100" placeholder="Copy and paste the json object from colab" onChange={(e)=>{
//                     var items = [...stepObj]
//                     items[i] = e.target.value
//                     setStepObj(items)
//                 }} />
//                 <p className="exer-label">Select a gif image that demonstrating the pose</p>
//                 <div className="exer-row">
//                 {/* <input type="file" name="gif" accept="image/gif" onChange={handleChange}/> 
//                 <img className="exer-img" src={file[i-1]} alt="gif" />  */}
//                 <button className="exer-btn" onClick={incrementStep}>+ Add step</button>
//                 </div>
                
//             </div>
//         )
//     }

//     return(
//         <>
//             <AdminNavbar />
//             <form onSubmit={handleSubmit}>
//             <div className="exer-container">
//                 <h1>Enter exercise details</h1>
//                 <a className="exer-a" href="https://colab.research.google.com/drive/1Ad1whqSzzSphTGm1MtgRzEYX1ib8pYeh?usp=sharing" target="_blank">Follow this link to train the model</a>
//                 <input name="title" placeholder="Enter exercise title (eg: Cat camel stretch )" onChange={(e)=>setTitle(e.target.value)} />
//                 {forms.map((res)=>{
//                     return res 
//                 })}

//                 <button type="submit" style={{marginBottom:'0.8rem',marginTop:'2rem'}}>Submit</button>
//             </div>
//             </form>
//         </>
//     )
// }