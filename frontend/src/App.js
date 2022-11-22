import { BrowserRouter, Route, Routes } from "react-router-dom";
import {DoctorHome} from './screens/doctor/home';
import {DoctorLogin} from './screens/doctor/login';
import {DoctorSignup} from './screens/doctor/Signup';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<DoctorHome />} />
        <Route exact path='/login' element={<DoctorLogin />} />
        <Route exact path='/signup' element={<DoctorSignup />} />
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;
