var express = require('express');
var router = express.Router();
const CommonFunc = require('../functions/commonFunctions');
const jwt = require('jsonwebtoken')
require('dotenv').config()
const multer = require('multer')
const upload = multer({ dest: 'images/' })

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('admin page');
});

router.post('/login',(req,res)=>{
  console.log(req.body)
  CommonFunc.Login('admin',req.body).then((response)=>{
    console.log(response)
    if(response.status == true){
      const accessToken = jwt.sign({userid:response.data._id},process.env.PRIVATE_KEY,{ expiresIn: '1m'})
      const refreshToken = jwt.sign({userid:response.data._id},process.env.PRIVATE_KEY,{ expiresIn: '1h'})
      res.json({accessToken:accessToken,refreshToken:refreshToken})
    }else{
      res.sendStatus(401)
    }
  })
  
})

router.post('/exercise',upload.single('image'),(req,res)=>{
  console.log(req.body)
  const imageName = req.file.filename
  console.log(imageName)
  CommonFunc.insertData('exercise',req.body).then((response)=>{
    console.log(response)
    if(response.acknowledged){
      res.send(response.insertedId)
    }else{
      res.sendStatus(500)
    }
  })
})


module.exports = router;
