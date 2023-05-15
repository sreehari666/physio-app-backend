import React, { useState,useEffect } from "react";
import { AdminNavbar } from "./AdminNavbar";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import "./styles/Exercise.css";
import URL_ from "../../URL/url";
import { useSelector } from "react-redux";
// import AWS from "aws-sdk";

import { useNavigate } from "react-router-dom";

import { initializeApp } from "firebase/app";
import {getStorage,ref,uploadBytesResumable,getDownloadURL} from "firebase/storage"
import config from "../../config/config";

initializeApp(config.firebaseConfig)

const storage = getStorage();

// AWS.config.update({
//   accessKeyId: config.secrets.ACCESS_KEY,
//   secretAccessKey: config.secrets.SECRET_ACCESS_KEY,
// });

// const myBucket = new AWS.S3({
//   params: { Bucket: config.secrets.S3_BUCKET },
//   region: config.secrets.REGION,
// });

export const AdminEditExercise = (props) => {
  const navigate = useNavigate();

  const data = useSelector((state) => state.AdminExerciseReducer.data);
  console.log(data);

  const [title, setTitle] = useState();
  const [description,setDescription] = useState()
  const [stepNum, setStepNum] = useState();
  const [stepName, setStepName] = useState();
  const [stepDescription, setStepDescription] = useState();
  const [stepObj, setStepObj] = useState();
  const [file, setFile] = useState();
  const [progress, setProgress] = useState(0);

  const [gif, setGif] = useState(null);
  let myuuid = uuidv4();


  useEffect(() => {
    if (data) {
      console.log(data)
      setTitle(data.title)
      setDescription(data.description)
      setStepNum(data.stepNum)
      setStepName(data.stepName)
      setStepDescription(data.stepDescription)
      setStepObj(data.stepObj)
      setFile(data.filename)
    } else {
      navigate("/admin/exercise/view");
    }
  }, []);

  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
    setGif(e.target.files[0]);
  }

  // const uploadFile = (file) => {
  //   const params = {
  //     ACL: "public-read",
  //     Body: file,
  //     Bucket: config.secrets.S3_BUCKET,
  //     Key: data.id + "#" + stepNum + ".gif",
  //   };

  //   myBucket
  //     .putObject(params)
  //     .on("httpUploadProgress", (evt) => {
  //       console.log(evt);
  //       setProgress(Math.round((evt.loaded / evt.total) * 100));
  //       console.log(progress);
  //     })
  //     .send((err) => {
  //       if (err) console.log(err);
  //     });
  // };

  const uploadFile= async(file)=>{
    const storageRef = ref(storage, 'files/'+data._id+'#'+stepNum+'.gif')   
    const snapshot = await uploadBytesResumable(storageRef,file)
    const downloadURL = await getDownloadURL(snapshot.ref)
    console.log(downloadURL)
    return downloadURL
  }

  const handleSubmit =async (event) => {
    event.preventDefault();
    const downloadURL = await uploadFile(gif);
    console.log(downloadURL)
    const formData = new FormData();
    formData.append("id", data.id);
    formData.append("title", title);
    formData.append("description",description)
    formData.append("exID", myuuid);
    //formData.append("imageURL", downloadURL);
    formData.append(
      "steps",
      JSON.stringify([
        {
          stepNum: stepNum,
          stepName: stepName,
          stepDescription: stepDescription,
          stepObj: stepObj,
        },
      ])
    );

    axios
      .post(URL_ + "/admin/exercise/edit", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setTitle(null);
          setStepName(null);
          setStepDescription(null);
          setStepObj(null);
          setFile(null);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <AdminNavbar />
      <form onSubmit={handleSubmit} id="form">
        <div className="exer-container">
          <h1>Edit exercise details</h1>
          <a
            className="exer-a"
            href="https://colab.research.google.com/drive/1Ad1whqSzzSphTGm1MtgRzEYX1ib8pYeh?usp=sharing"
            target="_blank"
          >
            Follow this link to train the model
          </a>
          <input
            name="title"
            placeholder="Enter exercise title (eg: Cat camel stretch )"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            name="description"
            placeholder="Enter general exercise description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <p className="exer-label">Enter details of step {stepNum}</p>
          <input
            type="text"
            name="stepName"
            placeholder="Enter step name (eg: Pose1)"
            value={stepName}
            onChange={(e) => setStepName(e.target.value)}
            required
          />
          <input
            type="text"
            name="stepDescription"
            placeholder="Enter step description (eg: Raise both hands)"
            value={stepDescription}
            onChange={(e) => setStepDescription(e.target.value)}
            required
          />
          <textarea
            name="stepObj"
            className="exer-textarea"
            rows="10"
            cols="100"
            placeholder="Copy and paste the json object from colab"
            value={stepObj}
            onChange={(e) => setStepObj(e.target.value)}
            required
          />
          <div className="exer-row">
            <input
              type="file"
              name="gif"
              accept="image/gif"
              onChange={handleChange}
              required
            />
            <img className="exer-img" src={file} alt="gif" />
            <button className="exer-btn" onClick={() => console.log(myuuid)}>
              + Add step
            </button>
          </div>
          <button
            type="submit"
            style={{ marginBottom: "0.8rem", marginTop: "2rem" }}
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};
