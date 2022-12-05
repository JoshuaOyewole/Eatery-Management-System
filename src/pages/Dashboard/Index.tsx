import { useEffect, useState } from "react"
import AdminDashboard from "../../components/ui/Dashboard/AdminDashboard";
import StaffDashboard from "../../components/ui/Dashboard/StaffDashboard";
import DashboardLayout from '../../Layout/Dashboard/Dashboard';


const Dashboard = () => {
    const [currentMonth, setcurrentMonth] = useState<String>('');
    const [isAdmin] = useState<Boolean>(true);//Should be gotten from REQUEST after LOGIN
    /* const [username, setUsername] = useState('');*/

    function getCurrentMonth() {
        const months = ['January', 'Febraury', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const currentMonth = new Date().getMonth();
        return setcurrentMonth(months[currentMonth]);
    }

    useEffect(() => {
        getCurrentMonth();
    }, [])


    return (
        <>
            <DashboardLayout >
                {
                    isAdmin 
                        ? <AdminDashboard currentMonth={currentMonth} name='Joshua O' /> 
                        : <StaffDashboard currentMonth={currentMonth} name='John Doe' /> 
                }
            </DashboardLayout>

        </>
    )
}

export default Dashboard