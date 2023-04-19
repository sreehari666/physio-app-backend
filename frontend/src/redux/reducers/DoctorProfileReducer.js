const initData={
    data:null
}

const DoctorProfileReducer=(state=initData,action)=>{
    switch (action.type) {
        case 'ADD_PROFILE_DATA':
            return{
                ...state,
                data:action.payload,
            }
        default:
            return state;
    }
}

export default DoctorProfileReducer
