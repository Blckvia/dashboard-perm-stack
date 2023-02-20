import './sidebar.scss'
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import CloudDoneRoundedIcon from '@mui/icons-material/CloudDoneRounded';
import HubRoundedIcon from '@mui/icons-material/HubRounded';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';


const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="top">
                <span className="logo">blckvia</span>
            </div>
            <hr />
            <div className="center">
                <ul>
                    <p className="title">MAIN</p>
                    <li>
                        <DashboardIcon className="icon"/>
                        <span>Dashboard</span>
                    </li>
                    <p className="title">LISTS</p>
                    <li>
                        <AccountCircleOutlinedIcon className="icon"/>
                        <span>Users</span>
                    </li>
                    <li>
                        <MenuBookRoundedIcon className="icon"/>
                        <span>Books</span>
                    </li>
                    <li>
                        <CreditCardOutlinedIcon className="icon"/>
                        <span>Orders</span>
                    </li>
                    <li>
                        <LocalShippingIcon className="icon"/>
                        <span>Delivery</span>
                    </li>
                    <p className="title">USEFUL</p>
                    <li>
                        <InsertChartIcon className="icon"/>
                        <span>Stats</span>
                    </li>
                    <li>
                        <NotificationsNoneRoundedIcon className="icon"/>
                        <span>Modifications</span>
                    </li>
                    <p className="title">SERVICE</p>
                    <li>
                        <CloudDoneRoundedIcon className="icon"/>
                        <span>System Health</span>
                    </li>
                    <li>
                        <HubRoundedIcon className="icon"/>
                        <span>Logs</span>
                    </li>
                    <li>
                        <SettingsApplicationsIcon className="icon"/>
                        <span>Settings</span>
                    </li>
                    <p className="title">USER</p>
                    <li>
                        <AccountBoxRoundedIcon className="icon"/>
                        <span>Profile</span>
                    </li>
                    <li>
                        <LogoutRoundedIcon className="icon"/>
                        <span>Logout</span>
                    </li>
                </ul>
            </div>
            <div className="bottom">
                <div className="colorOption"></div>
                <div className="colorOption"></div>
            </div>
        </div>
    );
};

export default Sidebar;