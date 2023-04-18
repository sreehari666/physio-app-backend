const AddData=(payload)=>{
    return{
        type:'ADD_DATA',
        payload:payload
    }
}

const AddCycle=(payload)=>{
    return{
        type:'ADD_CYCLE',
        payload:payload
    }
}

export default{
    AddData,
    AddCycle
}