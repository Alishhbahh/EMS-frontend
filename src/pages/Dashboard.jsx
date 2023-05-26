import { useSelector } from "react-redux";
import "../styles/auth.css";
import "../styles/dashboard.css";
import { useNavigate } from "react-router-dom";

import { Sidebar } from "../components/Sidebar";
import { EmployeeList } from "../components/EmployeeList";
import { Avatar } from "../components/Avatar";
const Dashboard = () => {
  const user = useSelector((state) => state.user);
  const selectedItem = useSelector((state) => state.navItem);
  const navigate = useNavigate();
  console.log("selected", selectedItem);

  console.log("user in dashboard", user);
  let displayedComponent = "dashboard";
  if (selectedItem === "employees") {
    displayedComponent = <EmployeeList user={user} navigate={navigate} />;
  }

  return (
    <div className="auth-container">
      <div className="main-container">
        <Sidebar user={user} />
        <Avatar user={user} navigate={navigate} />
        {displayedComponent}
      </div>
    </div>
  );
};

export default Dashboard;
