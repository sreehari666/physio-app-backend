const db = require('../config/connection');
const bcrypt = require('bcrypt');
const { ObjectID, ObjectId } = require('bson');
const { reject } = require('underscore');
const { resource } = require('../app');




module.exports={
    Signup:(collec,userData)=>{
        return new Promise(async(resolve,reject)=>{
            userData.password = await bcrypt.hash(userData.password,10);
            console.log(userData.password)
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
                    if(user.password){
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
    googleSignup:(collec,userData)=>{
        return new Promise(async(resolve,reject)=>{
            db.get().collection(collec).insertOne(userData).then((data)=>{
                resolve(data)
            })
        })
    },
    getAllData:(collec)=>{
        return new Promise(async(resolve,reject)=>{
            resolve(db.get().collection(collec).find().toArray())
        })
    },
    insertData:(collec,data)=>{
        return new Promise(async(resolve,reject)=>{
            db.get().collection(collec).insertOne(data).then((res)=>{
                resolve(res)
            })
        })
    },
    getExerciseDataByTitle:(collec,title)=>{
        return new Promise(async(resolve,reject)=>{
            db.get().collection(collec).findOne({title:title}).then((res)=>{
                resolve(res)
            })
        })
    },
    updateExerciseData:(collec,data)=>{
        return new Promise(async(resolve,reject)=>{
            db.get().collection(collec).updateOne({"steps.stepNum":data.stepNum},{
                $set:{
                    "steps.$.stepName":data.stepName,
                    "steps.$.stepDescription":data.stepDescription,
                    "steps.$.stepObj":data.stepObj,
                    "steps.$.filename":data.filename,
                }
            }).then((res)=>{
                resolve(res)
            })
        })
    },
    pushExerciseStep:(collec,data,id)=>{
        return new Promise(async(resolve,reject)=>{
            db.get().collection(collec).updateOne({_id:ObjectId(id)},{$push:{"steps":data }}).then((res)=>{
                resolve(res)
            })
        })
    },
    getDataById:(collec,id)=>{
        return new Promise(async(resolve,reject)=>{
            db.get().collection(collec).findOne({_id:ObjectId(id)}).then((res)=>{
                resolve(res)
            }).catch((err)=>{
                console.error(err)
            })
        })
    },
    getCycleById:(collec,id)=>{
        return new Promise(async(resolve,reject)=>{
            db.get().collection(collec).findOne({id:id}).then((res)=>{
                resolve(res)
            }).catch((err)=>{
                console.error(err)
            })
        })
    },
    editCycle:(collec,data)=>{
        return new Promise(async(resolve,reject)=>{
            db.get().collection(collec).updateOne({id:data.id},{
                $set:{
                    cycle:data.cycle,
                    occurance:data.occurance
                }
            }).then((res)=>{
                resolve(res)
            })
        })
    },
    deleteById:(collec,id)=>{
        return new Promise(async(resolve,reject)=>{
            db.get().collection(collec).deleteOne({_id:ObjectId(id)}).then((res)=>{
                resolve(res)
            }).catch((err)=>{
                console.error(err)
            })
        })
    },
    getDataByUserID:(collec,userid)=>{
        return new Promise(async(resolve,reject)=>{
            db.get().collection(collec).findOne({userid:userid}).then((res)=>{
                resolve(res)
            }).catch((err)=>{
                console.error(err)
            })
        })
    },
    updateProgress:(collec,data)=>{
        return new Promise(async(resolve,reject)=>{
            db.get().collection(collec).updateOne({"userid":data.userid},{
                $push:{
                    "data":data.data[0],
                   
                }
            }).then((res)=>{
                resolve(res)
            })
        })
    },
    updateUserCurrentCourse:(collec,course)=>{
        return new Promise(async(resolve,reject)=>{
            db.get().collection(collec).updateOne({_id:ObjectId(course.userid)},{
                $set:{
                    "currentCourse":course,
                   
                }
            }).then((res)=>{
                resolve(res)
            })
        })
    },
    updateImageURL:(collec,data)=>{
        return new Promise(async(resolve,reject)=>{
            db.get().collection(collec).updateOne({_id:ObjectId(data.id)},{
                $set:{
                    "imageURL":data.imageURL
                }
            }).then((res)=>{
                resolve(res)
            })
        })
    },
    updateUserPassword:(collec,user)=>{
        console.log(user)
        return new Promise(async(resolve,reject)=>{
            user.password = await bcrypt.hash(user.password,10);
            db.get().collection(collec).updateOne({_id:ObjectId(user._id)},{
                $set:{
                    password:user.password
                }
            }).then((res)=>{
                resolve(res)
            })
        })
    }


    
}