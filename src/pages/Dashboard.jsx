import "../styles/auth.css";
import "../styles/dashboard.css";
import { useSelector } from "react-redux";
import { Avatar } from "../components/Avatar";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { EmployeeList } from "../components/EmployeeList";

const Dashboard = () => {
  const user = useSelector((state) => state.user);
  const selectedItem = useSelector((state) => state.navItem); // this is the selected item in the sidebar
  const navigate = useNavigate();

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
