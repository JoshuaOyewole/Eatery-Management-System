import DashboardLayout from '../../Layout/Dashboard/Dashboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHouseChimney
} from "@fortawesome/free-solid-svg-icons";

import Box from '../../components/ui/Dashboard/Box';

const Dashboard = () => {
    /* 
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState(''); 
    */

    return (
        <>
            <DashboardLayout >
                <main className='dashboard__content'>
                    <div className="dashboard__content--top">
                        <h2 className='dashboard__heading'>Hi, Joshua O - Welcome to Dashboard</h2>
                        <p>The buttons below show a few things you can do right away</p>

                    </div>
                    <div className="dashboard__box-container">
                        <Box
                           icon={
                           <FontAwesomeIcon icon={faHouseChimney} className='dashboard__icon' />}
                            title='View Orders'
                        />
                        <Box
                            icon={
                                <FontAwesomeIcon icon={faHouseChimney} className='dashboard__icon' />}
                            title='View Orders'
                        />
                        <Box
                            icon={
                                <FontAwesomeIcon icon={faHouseChimney} className='dashboard__icon' />}
                            title='Manage Orders'
                        />
                        <Box
                            icon={
                                <FontAwesomeIcon icon={faHouseChimney} className='dashboard__icon' />}
                            title='EOD'
                        />
                    </div>

                </main>
            </DashboardLayout>

        </>
    )
}

export default Dashboard