import { useEffect, useState } from "react"
import AdminDashboard from "../../components/ui/Dashboard/AdminDashboard";
import StaffDashboard from "../../components/ui/Dashboard/StaffDashboard";
import DashboardLayout from '../../Layout/Dashboard/Dashboard';
import { GetCurrentMonth } from "../../utils/function";
import { useAppSelector } from "../../redux/hooks/hooks";


const Dashboard = () => {
    const [currentMonth, setCurrentMonth] = useState<string>('')
    const rank = useAppSelector(state=> state.auth.details?.rank);
    const f_name = useAppSelector(state=> state.auth.details?.firstname);
    const l_name = useAppSelector(state=> state.auth.details?.lastname);


    useEffect(() => {
        //Get all Sales Record

        //Get Current Month
        setCurrentMonth(GetCurrentMonth());
    }, [])


    return (
        <>
            <DashboardLayout >
                {
                    rank === "staff"
                        ? <StaffDashboard currentMonth={currentMonth} name={`${f_name} ${l_name}`} />
                        : <AdminDashboard currentMonth={currentMonth} name={`${f_name} ${l_name}`} />
                    
                }
            </DashboardLayout>

        </>
    )
}

export default Dashboard