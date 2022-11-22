const db = require('../config/connection');
const bcrypt = require('bcrypt');



module.exports={
    Signup:(collec,userData)=>{
        return new Promise(async(resolve,reject)=>{
            userData.password = await bcrypt.hash(userData.password,10);
            db.get().collection(collec).insertOne(userData).then((data)=>{
                console.log(data)
                resolve(data)
            })
        })
    },
    GetUserDataByEmail:(collec,email)=>{
        return new Promise(async(resolve,reject)=>{
            db.get().collection(collec).findOne({email:email}).then((response)=>{
                console.log(response)
                resolve(response)
            })
        })
        
    }
}