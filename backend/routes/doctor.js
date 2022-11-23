var express = require('express');
var router = express.Router();
var CommonFunc = require('../functions/commonFunctions');
const jwt = require('jsonwebtoken')
require('dotenv').config()
const bcrypt = require('bcrypt');
const { response } = require('express');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/signup',(req,res)=>{
  console.log(req.body)
  if(req.body.name === null || req.body.email === null || req.body.password === null){
    res.sendStatus(404)
  }else{
    CommonFunc.GetUserDataByEmail('doctor',req.body.email).then((resp)=>{
      console.log(resp)
      if(resp === null){
        //new user
        CommonFunc.Signup('doctor',req.body).then((response)=>{
          const accessToken = jwt.sign({userid:response.insertedId},process.env.PRIVATE_KEY,{ expiresIn: '15s'})
          const refreshToken = jwt.sign({userid:response.insertedId},process.env.PRIVATE_KEY,{ expiresIn: '10m' })
          console.log(response);
          res.json({accessToken:accessToken,refreshToken:refreshToken})
        })
      }else{
        //user exist
        res.sendStatus(403)
      }
      
    })
  }
 

})

router.post('/login',(req,res)=>{
  console.log(req.body);
  if(req.body.email === null || req.body.password === null){
    res.sendStatus(404);
  }else{
    CommonFunc.Login('doctor',req.body).then((response)=>{
      if(response.status){
        //login success
        console.log('login success')
        console.log(response.data)
        const accessToken = jwt.sign({userid:response.data._id},process.env.PRIVATE_KEY,{ expiresIn: '15s'})
        const refreshToken = jwt.sign({userid:response.data._id},process.env.PRIVATE_KEY,{ expiresIn: '10m' })
        res.json({accessToken:accessToken,refreshToken:refreshToken})
      }else{
        //login failed
        console.log('login failed')
        console.log(response.data)
        res.sendStatus(401)

      }
      
    })
  }
})

router.post('/verifyLogin',(req,res)=>{
  console.log('verify login')
})

module.exports = router;
