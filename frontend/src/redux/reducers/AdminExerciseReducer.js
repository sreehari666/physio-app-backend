const initExerciseData = {
    data:null,
    cycleID:null,
}

const AdminExerciseReducer =(state = initExerciseData,action)=>{

    switch (action.type) {
        case 'ADD_DATA':
            console.log(action.payload)
            return{
                ...state,
                data:action.payload
            }
        case 'ADD_CYCLE':
            return{
                ...state,
                cycleID:action.payload
            }
    
        default:
            return state;
    }
}

export default AdminExerciseReducer;