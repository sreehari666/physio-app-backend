var express = require('express');
var router = express.Router();
var CommonFunc = require('../functions/commonFunctions');
const jwt = require('jsonwebtoken')
require('dotenv').config()

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
          console.log(response);
          res.json({accessToken:accessToken})
        })
      }else{
        //user exist
        res.sendStatus(403)
      }
      
    })
  }
 

})

module.exports = router;
