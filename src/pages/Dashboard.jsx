import { useSelector } from "react-redux";
import "../styles/auth.css";
import "../styles/dashboard.css";
import { useNavigate } from 'react-router-dom';


import {Avatar} from '../components/Avatar';
import { Sidebar } from "../components/Sidebar";
const Dashboard = () => {
  const user=  useSelector((state) => state.user);
  const navigate = useNavigate();


    console.log("user in dashboard", user)
  

    return (
      <div className="auth-container">
        <div className="main-container">

          <Sidebar user={user}/>
          <Avatar user={user} navigate={navigate}/>
        </div>


      </div>
    )
}

export default Dashboard;