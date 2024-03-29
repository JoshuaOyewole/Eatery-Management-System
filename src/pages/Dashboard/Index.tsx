
import { useEffect } from "react";
import AdminDashboard from "../../components/ui/Dashboard/AdminDashboard";
import StaffDashboard from "../../components/ui/Dashboard/StaffDashboard";
import DashboardLayout from '../../Layout/Dashboard/Dashboard';
import { useAppSelector } from "../../redux/hooks/hooks";

const Dashboard = () => {
    const details = useAppSelector(state => state.auth.user);

    useEffect(() => {
        document.title = `Home`;
    }, [])

    return (
        <>
            <DashboardLayout >
                {
                    details.rank === "staff"
                        ? <StaffDashboard name={`${details.firstname} ${details.lastname}`} />
                        : details.rank == "admin" && <AdminDashboard name={`${details?.firstname} ${details?.lastname}`} />

                }
            </DashboardLayout>


        </>
    )
}

export default Dashboard