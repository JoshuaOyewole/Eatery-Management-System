import { useEffect, useState } from "react"
import AdminDashboard from "../../components/ui/Dashboard/AdminDashboard";
import StaffDashboard from "../../components/ui/Dashboard/StaffDashboard";
import DashboardLayout from '../../Layout/Dashboard/Dashboard';
import { GetCurrentMonth } from "../../utils/function";


const Dashboard = () => {
    const [currentMonth, setCurrentMonth] = useState<string>('')
    const [isAdmin] = useState<Boolean>(true);//Should be gotten from REQUEST after LOGIN
    const [username] = useState<String>('Joshua');


    useEffect(() => {
        //Get all Sales Record

        //Get Current Month
        setCurrentMonth(GetCurrentMonth());
    }, [])


    return (
        <>
            <DashboardLayout >
                {
                    isAdmin
                        ? <AdminDashboard currentMonth={currentMonth} name={"Orisfina"} />
                        : <StaffDashboard currentMonth={currentMonth} name={username} />
                }
            </DashboardLayout>

        </>
    )
}

export default Dashboard