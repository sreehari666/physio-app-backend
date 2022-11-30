import { AdminDoctorList } from "./AdminDoctorList"
import { AdminNavbar } from "./AdminNavbar"

export const AdminHome = ()=>{
    return(
        <>
            <AdminNavbar />
            <AdminDoctorList />
        </>
    )
}