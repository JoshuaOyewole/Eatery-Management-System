import { useEffect, useState } from "react"
import AdminDashboard from "../../components/ui/Dashboard/AdminDashboard";
import StaffDashboard from "../../components/ui/Dashboard/StaffDashboard";
import DashboardLayout from '../../Layout/Dashboard/Dashboard';


const Dashboard = () => {
    const [currentMonth, setcurrentMonth] = useState<String>('');
    const [isAdmin] = useState<Boolean>(true);//Should be gotten from REQUEST after LOGIN
    const [username] = useState<String>('Joshua');

    function getCurrentMonth() {
        const months = ['January', 'Febraury', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return setcurrentMonth(months[new Date().getMonth()]);
    }

    useEffect(() => {
        //Get all Sales Record

        //Get Current Month
        getCurrentMonth();
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