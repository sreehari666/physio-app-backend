const db = require('../config/connection');
const bcrypt = require('bcrypt');
const { response } = require('express');
const jwt = require('jsonwebtoken')



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
        
    },
    Login:(collec,userData)=>{
        console.log(userData.password)
        return new Promise(async(resolve,reject)=>{
            // userData.password = await bcrypt.hash(userData.password,10);
                const user = await db.get().collection(collec).findOne({email:userData.email})
                console.log(user)
                if(user){
                    console.log(user.password)
                    console.log(userData.password)
                    bcrypt.compare(userData.password,user.password).then((status)=>{
                        console.log(status)
                        if(status){
                            resolve({status:true,data:user})
                        }else{
                            resolve({status:false,data:null})
                        }
                    })
                    
                }else{
                    resolve({status:false,data:null})
                }
                
                
            })
        
    },
    refreshTokens:(refreshToken)=>{
        return new Promise(async(resolve,reject)=>{
            db.get().collection('refreshTokens').insertOne({refreshToken}).then((data)=>{
                console.log(data)
                resolve(data)
            })
        })
    },
    getAllData:(collec)=>{
        return new Promise(async(resolve,reject)=>{
            resolve(db.get().collection(collec).find().toArray())
        })
    }
}