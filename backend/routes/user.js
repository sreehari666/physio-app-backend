var express = require('express');
var router = express.Router();
const CommonFunc = require('../functions/commonFunctions');
const jwt = require('jsonwebtoken')
require('dotenv').config()

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
  CommonFunc.getDataByUsetID('progress',req.body.userid).then((user)=>{
    console.log(user)
    if(!user){
      CommonFunc.insertData('progress',req.body).then((response)=>{
        console.log(response)
        res.status(200)
        
      }).catch((err)=>{
        console.log(err)
        res.send(500)
      })
    }else{
      //update
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



module.exports = router;
