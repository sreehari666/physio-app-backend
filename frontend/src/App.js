import { BrowserRouter, Route, Routes } from "react-router-dom";
import {DoctorHome} from './screens/doctor/home';
import {DoctorLogin} from './screens/doctor/login';
import {DoctorSignup} from './screens/doctor/Signup';
import {AdminLogin} from './screens/admin/AdminLogin';
import { AdminHome } from "./screens/admin/AdminHome";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<DoctorHome />} />
        <Route exact path='/login' element={<DoctorLogin />} />
        <Route exact path='/signup' element={<DoctorSignup />} />
        <Route exact path="/admin/login" element={<AdminLogin />} />
        <Route exact path="/admin" element={<AdminHome />} />
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;
