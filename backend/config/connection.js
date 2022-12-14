require('dotenv').config()
const mongoClient=require('mongodb').MongoClient
const state={
    db:null
}

module.exports.connect=function(done){
   
    mongoClient.connect(process.env.MONOGO_URL,(err,data)=>{
        if(err) return done(err)
        state.db=data.db(process.env.DATABASE_NAME)
        done()
    })
    
}
module.exports.get=function(){
    return state.db
}