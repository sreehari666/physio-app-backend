var express = require('express');
var router = express.Router();
const CommonFunc = require('../functions/commonFunctions');
const jwt = require('jsonwebtoken')
require('dotenv').config()
const multer = require('multer');
const { response } = require('express');
const upload = multer({ dest: 'images/' })
const fs = require('fs')

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
  // const imageName = req.file.filename
  // console.log(imageName)
  var steps = JSON.parse(req.body.steps)
  //steps[0].filename = imageName
  console.log(steps)
  req.body.steps = steps
  CommonFunc.getExerciseDataByTitle('exercise',req.body.title).then((resp)=>{
    console.log("title : ..........")
    console.log(resp)
    if(resp){
      res.sendStatus(409)
    }else{
      CommonFunc.insertData('exercise',req.body).then((response)=>{
        console.log(response)
        if(response.acknowledged){
          res.send(response.insertedId)
        }else{
          res.sendStatus(500)
        }
      })
    }
    
  })

})

router.post('/exercise/edit',upload.single('image'),(req,res)=>{
  console.log(req.body)
  var steps = JSON.parse(req.body.steps)
  // steps[0].filename = req.file.filename
  console.log(steps)
 
  CommonFunc.updateExerciseData('exercise',steps[0]).then((response)=>{
    console.log(response)
  })
})


router.get('/exercise/view',(req,res)=>{
  CommonFunc.getAllData('exercise').then((data)=>{
    res.send(data)
  })
})

router.get('/exercise/get/:id',(req,res)=>{
  console.log(req.params.id)
  CommonFunc.getDataById('exercise',req.params.id).then((response)=>{
    console.log(response)
    res.send(response)
  })
})

router.post('/exercise/add',upload.single('image'),(req,res)=>{
  console.log(req.body)
  var steps = JSON.parse(req.body.steps)
  // steps[0].filename = req.file.filename
  console.log(steps[0])
  
  CommonFunc.getDataById('exercise',req.body.id).then((resp)=>{
    console.log(resp.steps.length)
    console.log(steps[0].stepNum)
    if(resp.steps.length == steps[0].stepNum-1){
      CommonFunc.pushExerciseStep('exercise',steps[0],req.body.id).then((response)=>{
        console.log(response)
        res.sendStatus(200)
    
      })
    }else{
      console.log("step already exist")
    }
   

  })
  
})

router.post('/exercise/cycle/add',(req,res)=>{
  console.log(req.body)
  CommonFunc.insertData('cycles',req.body).then((response)=>{
    console.log(response)
    if(response.acknowledged){
      res.sendStatus(200)
    }else{
      res.sendStatus(500)
    }
  })
})

router.get('/exercise/cycle/view',(req,res)=>{
  CommonFunc.getAllData('cycles').then((response)=>{
    res.send(response)
  })
})

router.get('/exercise/cycle/get/:id',(req,res)=>{
  console.log(req.params.id)
  CommonFunc.getCycleById('cycles',req.params.id).then((response)=>{
    console.log(response)
    res.send(response)
  })
  
})

router.post('/exercise/cycle/edit',(req,res)=>{
  console.log(req.body)
  CommonFunc.editCycle('cycles',req.body).then((response)=>{
    console.log(response)
  })
})

router.delete('/exercise/cycle/delete/:id',(req,res)=>{
  console.log(req.params.id)
  CommonFunc.deleteById('cycles',req.params.id).then((response)=>{
    if(response.acknowledged){
      res.sendStatus(200)
    }
  })

})

router.post('/exercise/update/image',(req,res)=>{
  console.log(req.body)
  CommonFunc.updateImageURL("exercise",req.body).then((response)=>{
    console.log(response)
  })

})

// router.get('/image/get/:id',(req,res)=>{
//   console.log(req.params.id)
//   const path = '/image/'+id
//   const file = fs.createReadStream(path)
//   const filename = id+'.gif'
//   res.setHeader('Content-Disposition', 'attachment: filename="' + filename + '"')
//   file.pipe(res)
//   res.send(file)
// })

module.exports = router;
