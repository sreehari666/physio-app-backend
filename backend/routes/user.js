var express = require('express');
var router = express.Router();
const CommonFunc = require('../functions/commonFunctions');
const jwt = require('jsonwebtoken')
require('dotenv').config()
var _ = require('underscore');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/google/login',(req,res)=>{
  console.log(req.body)
  CommonFunc.GetUserDataByEmail('user',req.body.email).then((response)=>{
    console.log(response)
    if(!response){
      //user not exist so create an account
      CommonFunc.insertData('user',req.body).then((data)=>{
        console.log(data)
        const accessToken = jwt.sign({userid:data.insertedId},process.env.PRIVATE_KEY,{ expiresIn: '1m'})
        const refreshToken = jwt.sign({userid:data.insertedId},process.env.PRIVATE_KEY,{ expiresIn:'1h'})
        res.send({accessToken:accessToken,refreshToken:refreshToken,userid:data.insertedId})
      })
    }else{
      const accessToken = jwt.sign({userid:response._id},process.env.PRIVATE_KEY,{ expiresIn: '1m'})
      const refreshToken = jwt.sign({userid:response._id},process.env.PRIVATE_KEY,{ expiresIn:'1h'})
      res.send({accessToken:accessToken,refreshToken:refreshToken,userid:response._id})
    }
  })
  
})

router.post('/login',(req,res)=>{
  console.log(req.body)
})

router.post('/login/verify',(req,res)=>{
  console.log(req.body)
  jwt.verify(req.body.accessToken,process.env.PRIVATE_KEY, (err, decoded) => {
    console.log(decoded)
    if(!decoded){
      // invalid access token need to verify if request have a valid refresh token
      jwt.verify(req.body.refreshToken,process.env.PRIVATE_KEY, (err, decoded) => {
        if(decoded){
          const accessToken = jwt.sign({userid:decoded.userid},process.env.PRIVATE_KEY,{ expiresIn: '1m'})
          res.send({accessToken:accessToken,refreshToken:req.body.refreshToken})
        }else{
          //invalid refresh token
          res.status(401)
        }
      })
    }else{
      // valid accesstoken
      res.send({accessToken:req.body.accessToken,refreshToken:req.body.refreshToken})
    }
  })

})

router.post('/save/progress',(req,res)=>{
  console.log(req.body)
  CommonFunc.getDataByUserID('progress',req.body.userid).then((user)=>{
    console.log(user)

    if(!user){
      console.log("no user need create one")
      CommonFunc.insertData('progress',req.body).then((response)=>{
        console.log(response)
        res.status(200)
        
      }).catch((err)=>{
        console.log(err)
        res.send(500)
      })
    }else{
      //update
      console.log("user exist need to update data")
      CommonFunc.updateProgress('progress',req.body).then((response)=>{
        console.log(response)
        res.status(200)
      }).catch((err)=>{
        console.log(err)
        res.status(500)
      })

    }
   
  })
 
})

router.get('/report/get/:id',(req,res)=>{
  console.log(req.params.id)
  CommonFunc.getDataByUserID('progress',req.params.id).then((response)=>{
    if(response){
      console.log(response)
      const data = Array.from(response.data)
      console.log(data)
      console.log(typeof(data))
      console.log(_.groupBy(data,'exerciseID'))
      const groupedData = _.groupBy(data,'exerciseID')
      const keys = Object.keys(groupedData)
      const responseData =[]
      keys.forEach((key,index)=>{
        //call function that fetch exercise details by exercise id
        CommonFunc.getDataById('exercise',key).then((response_)=>{
          if(response_){
            console.log(response_)
            const progressData = groupedData[key]
            const title = response_.title
            const stepSize = response_.steps.length
            const maxObj = progressData.reduce((accumulator, current) => {
              return accumulator.stepNum > current.stepNum ? accumulator : current;
            });
  
            console.log("-------------------")
            console.log(progressData)
            console.log(title)
            console.log(stepSize)
            console.log(maxObj)
            const completionPercentage = maxObj.stepNum / stepSize * 100
            const obj ={
              key:key,
              title:title,
              completionPercentage:completionPercentage,
              progressData:progressData
            }
            responseData.push(obj)
  
            if(responseData.length === keys.length){
              res.send(responseData)
            }
          }
          
          
        })
        
    })

    }else{
      //no data found for the user
      res.status(404)
    }
  })
})


router.post('/current/course',(req,res)=>{
  console.log(req.body.userid)
    console.log(req.body)
  CommonFunc.getDataById('user',req.body.userid).then((response)=>{
    console.log(response)
    if(response){
      CommonFunc.updateUserCurrentCourse("user",req.body).then((data)=>{
        console.log(data)
        res.status(200)
      })
    }else{
      
    }
  })
})

router.get("/current/course/get/:id", async (req, res) => {
  console.log(req.params.id);
  const response = await CommonFunc.getDataByUserID("progress", req.params.id);
  if (response) {
    console.log(response);
    const data = Array.from(response.data);
    const groupedData = _.groupBy(data, "exerciseID");
    const keys = Object.keys(groupedData);
    let flag = false;
    let result = null;
    let resp = null;
    for (var i = 0; i < keys.length; i++) {
      //call function that fetch exercise details by exercise id
      const response_ = await CommonFunc.getDataById("exercise", keys[i]);
      if(response_){
          const progressData = groupedData[keys[i]];
          const stepSize = response_.steps.length;
          const maxObj = progressData.reduce((accumulator, current) => {
            return accumulator.stepNum > current.stepNum ? accumulator : current;
          });

          const completionPercentage = (maxObj.stepNum / stepSize) * 100;

          resp = await CommonFunc.getDataById("user", req.params.id);
          console.log(resp);
          resp.currentCourse.completionPercentage = 0;
          console.log(i);
          console.log(keys.length);

          if (keys[i] === resp.currentCourse._id) {
            resp.currentCourse.completionPercentage = completionPercentage;
            result = resp;
            flag = true;
          }
      }
    }
    console.log("exited from loop");
    if (flag) {
      console.log("response sent");
      res.send(result);
    } else {
      res.send(resp);
    }
  } else {
    //no data found for the user
    res.status(404);
  }
});

router.get('/exercise/get/:id',(req,res)=>{
  console.log(req.params.id)
  CommonFunc.getDataById('exercise',req.params.id).then((response)=>{
    console.log(response)
    res.send(response)
  })
})

module.exports = router;
