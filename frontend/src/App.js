import { BrowserRouter, Route, Routes } from "react-router-dom";
import {DoctorHome} from './screens/doctor/home';
import {DoctorLogin} from './screens/doctor/login';
import {DoctorSignup} from './screens/doctor/Signup';
import {AdminLogin} from './screens/admin/AdminLogin';
import { AdminHome } from "./screens/admin/AdminHome";
import { AdminExercise } from "./screens/admin/AdminExercise";
import { AdminExerciseList } from "./screens/admin/AdminExerciseList";
import { AdminEditExercise } from "./screens/admin/AdminEditExercise";
import { AdminAddExerciseStep } from "./screens/admin/AdminAddExerciseStep";
import { AdminAddCycle } from "./screens/admin/AdminAddCycle";
import { AdminEditCycle } from "./screens/admin/AdminEditCycle";
import { DoctorProfile } from "./screens/admin/DoctorProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route exact path='/' element={<DoctorHome />} />
        <Route exact path='/login' element={<DoctorLogin />} />
        <Route exact path='/signup' element={<DoctorSignup />} />
        <Route exact path="/admin/login" element={<AdminLogin />} />
        <Route exact path="/admin" element={<AdminHome />} />
        <Route exact path="/admin/exercise" element = {<AdminExercise />} />
        <Route exact path="/admin/exercise/view" element={<AdminExerciseList />} />
        <Route exact path="/admin/exercise/edit" element={<AdminEditExercise />} />
        <Route exact path="/admin/exercise/add" element={<AdminAddExerciseStep />} />
        <Route exact path="/admin/exercise/add/cycle" element={<AdminAddCycle />} />
        <Route exact path="/admin/exercise/edit/cycle" element={<AdminEditCycle />} />
        <Route exact path="/admin/doctor/profile" element={<DoctorProfile/>}/>
        

      </Routes>
    </BrowserRouter>
   
  );
}

export default App;
