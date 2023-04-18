var express = require('express');
var router = express.Router();
var CommonFunc = require('../functions/commonFunctions');
const jwt = require('jsonwebtoken')
require('dotenv').config()



async function verifyLogin(req,res,next){
    console.log('middleware ')
    console.log(req.headers)
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1] 
    const refreshHeader = req.headers.refreshtoken
    const refreshToken = req.headers.refreshtoken && refreshHeader.split(' ')[1]
    console.log(token)
    if (token) {
      jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded) => {
        console.log("decoded")
        console.log(decoded)
        if(decoded === undefined){
          //invalid access token 
          console.log("invalid access token")
          console.log("refresh token")
          console.log(refreshToken)
          if(refreshToken == null) return res.sendStatus(403)
          
          jwt.verify(refreshToken,process.env.PRIVATE_KEY,(err,user)=>{
            if(err){
              res.sendStatus(403)
            }else{
              console.log(user)
              next()
            }
          
          })

        }else{
          console.log('valid access token')
          next()
        }
      })
    }
  
  
}


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  
});

router.post('/signup',(req,res)=>{
  req.body.googleId = null;
  req.body.imgUrl = null;
  req.body.verified = false
  console.log(req.body)
  if(req.body.name === null || req.body.email === null || req.body.password === null){
    res.sendStatus(404)
  }else{
    CommonFunc.GetUserDataByEmail('doctor',req.body.email).then((resp)=>{
      console.log(resp)
      if(resp === null){
        //new user
        CommonFunc.Signup('doctor',req.body).then((response)=>{
          const accessToken = jwt.sign({userid:response.insertedId},process.env.PRIVATE_KEY,{ expiresIn: '1m'})
          const refreshToken = jwt.sign({userid:response.insertedId},process.env.PRIVATE_KEY,{ expiresIn: '1h'})
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
        const accessToken = jwt.sign({userid:response.data._id},process.env.PRIVATE_KEY,{ expiresIn: '1m'})
        const refreshToken = jwt.sign({userid:response.data._id},process.env.PRIVATE_KEY,{ expiresIn:'1h'})
      
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


router.post('/google',(req,res)=>{
  console.log(req.body)
  if(req.body){
  
    CommonFunc.GetUserDataByEmail('doctor',req.body.email).then((response)=>{
      console.log(response)
      if(response){
        //user exist
        const accessToken = jwt.sign({userid:response._id},process.env.PRIVATE_KEY,{ expiresIn: '1m'})
        const refreshToken = jwt.sign({userid:response._id},process.env.PRIVATE_KEY,{ expiresIn:'1h'})
        
        res.json({accessToken:accessToken,refreshToken:refreshToken})
      }else{
        //user not exist need to create account
        CommonFunc.googleSignup('doctor',req.body).then((response)=>{
          console.log(response)
          if(response){
            const accessToken = jwt.sign({userid:response.insertedId},process.env.PRIVATE_KEY,{ expiresIn: '1m'})
            const refreshToken = jwt.sign({userid:response.insertedId},process.env.PRIVATE_KEY,{ expiresIn:'1h'})
            
            res.json({accessToken:accessToken,refreshToken:refreshToken})
          }
        })

      }
    })

  }else{
     res.sendStatus(404)
  }
})

router.get('/get-client-id',(req,res)=>{
  res.json({CLIENT_ID:process.env.CLIENT_ID})
})



router.get('/home',verifyLogin,(req,res)=>{


  res.sendStatus(200)
  // res.sendStatus(200)
  // console.log('request get')
  // const refreshHeader = req.headers.refreshtoken
  // const refreshToken = req.headers.refreshtoken && refreshHeader.split(' ')[1]
  // const newAccessToken =jwt.sign({userid:user.userid},process.env.PRIVATE_KEY,{ expiresIn: '30s'})
  // res.json({accessToken:newAccessToken})
  // console.log(req.headers.authorization)
  //res.sendStatus(200)
})

router.get('/doctors/get',(req,res)=>{
  CommonFunc.getAllData('doctor').then((response)=>{
    console.log(response)
    res.send(response)
  })
})




module.exports = router;
