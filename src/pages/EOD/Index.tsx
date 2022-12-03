import DashboardLayout from '../../Layout/Dashboard/Dashboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faHouseChimney
} from "@fortawesome/free-solid-svg-icons";

import Box from '../../components/ui/Dashboard/Box';

const EOD = () => {
    /* 
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState(''); 
    */

    return (
        <>
            <DashboardLayout >
                <main className='dashboard__content'>
                    <div className="dashboard__content--top">
                        <h2 className='dashboard__heading'>EOD (End of Day Transactions)</h2>
                        {/* <p>The buttons below show a few things you can do right away</p> */}
                        {/* 
                        IMPROVEMENT -- 16th Oct 2022, 8:19PM
                        The dashboard headings and paragraphs should be recieved as props here since they are reusable.
                        Instead of passing Children, a prop can replaced it and take the main as a prop and the dashboard heading, paragraphs as props also */}
                    </div>
                    <div className="dashboard__box-container">
                        <Box
                            icon={
                                <FontAwesomeIcon icon={faHouseChimney} className='dashboard__icon' />}
                                title='Today Sales for Today'
                                value={20}
                        />
                        <Box
                            icon={
                                <FontAwesomeIcon icon={faHouseChimney} className='dashboard__icon' />}
                            title='View Sales'
                        />
                        <Box
                            icon={
                                <FontAwesomeIcon icon={faHouseChimney} className='dashboard__icon' />}
                            title='Total Amount'
                            value={150000}
                        />
                        <Box
                            icon={
                                <FontAwesomeIcon icon={faHouseChimney} className='dashboard__icon' />}
                            title='Previous Records'
                            value={"View"}
                        />

                    </div>

                </main>
            </DashboardLayout>

        </>
    )
}

export default EOD