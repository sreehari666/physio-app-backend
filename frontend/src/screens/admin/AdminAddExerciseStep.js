import React, { useState, useEffect } from "react";
import { AdminNavbar } from "./AdminNavbar";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import "./styles/Exercise.css";
import URL_ from "../../URL/url";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import allActions from "../../redux/actions";
import AWS from "aws-sdk";
import config from "../../config/config";

AWS.config.update({
  accessKeyId: config.secrets.ACCESS_KEY,
  secretAccessKey: config.secrets.SECRET_ACCESS_KEY,
});

const myBucket = new AWS.S3({
  params: { Bucket: config.secrets.S3_BUCKET },
  region: config.secrets.REGION,
});

export const AdminAddExerciseStep = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.AdminExerciseReducer.data);
  console.log(data);

  const [title, setTitle] = useState();
  const [stepNum, setStepNum] = useState();
  const [stepName, setStepName] = useState();
  const [stepDescription, setStepDescription] = useState();
  const [stepObj, setStepObj] = useState();
  const [file, setFile] = useState();
  const [progress, setProgress] = useState(0);

  const [gif, setGif] = useState(null);
  let myuuid = uuidv4();

  function fetchData() {
    axios
      .get(URL_ + "/admin/exercise/get/" + data._id)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setStepNum(res.data.steps.length + 1);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    if (data) {
      fetchData();
      console.log(data);
      setTitle(data.title);
    } else {
      navigate("/admin/exercise/view");
    }
  }, []);

  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
    setGif(e.target.files[0]);
  }

  const uploadFile = (file) => {
    const params = {
      ACL: "public-read",
      Body: file,
      Bucket: config.secrets.S3_BUCKET,
      Key: data._id + "#" + stepNum + ".gif",
    };

    myBucket
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        console.log(evt);
        setProgress(Math.round((evt.loaded / evt.total) * 100));
        console.log(progress);
      })
      .send((err) => {
        if (err) console.log(err);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    uploadFile(gif);
    const formData = new FormData();
    formData.append("id", data._id);
    formData.append("title", title);
    formData.append("exID", myuuid);
    formData.append("image", gif);
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
      .post(URL_ + "/admin/exercise/add", formData, {
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
        } else {
          console.log(res.status);
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
          <h1>Add a new step</h1>
          <a
            className="exer-a"
            href="https://colab.research.google.com/drive/1Ad1whqSzzSphTGm1MtgRzEYX1ib8pYeh?usp=sharing"
            target="_blank"
          >
            Follow this link to train the model
          </a>

          {/* <input name="title" placeholder="Enter exercise title (eg: Cat camel stretch )" onChange={(e)=>setTitle(e.target.value)} required/> */}
          <p className="exer-label" style={{ fontSize: "16px" }}>
            Exercise title: {title}
          </p>
          <p className="exer-label">Enter details of step {stepNum}</p>
          <input
            type="text"
            name="stepDescription"
            placeholder="Enter step name (eg: Pose1)"
            onChange={(e) => setStepName(e.target.value)}
            required
          />
          <input
            type="text"
            name="stepDescription"
            placeholder="Enter step description (eg: Raise both hands)"
            onChange={(e) => setStepDescription(e.target.value)}
            required
          />
          <textarea
            name="stepObj"
            className="exer-textarea"
            rows="10"
            cols="100"
            placeholder="Copy and paste the json object from colab"
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
