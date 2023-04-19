import { combineReducers } from "redux";
import AdminExerciseReducer from "./AdminExerciseReducer";
import DoctorProfileReducer from "./DoctorProfileReducer";


const rootReducer = combineReducers({
    AdminExerciseReducer,
    DoctorProfileReducer
})

export default rootReducer;