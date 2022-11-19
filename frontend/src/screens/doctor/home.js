import './doctor.css';
import { Navbar } from './Navbar';
import { ListBox } from './listBox';
import { Heading } from './heading';

export const DoctorHome=()=>{
    return(
        <div>
           <Navbar />
           <Heading />
           <ListBox />
           
        </div>
    )
}