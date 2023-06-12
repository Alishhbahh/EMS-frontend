import "../../styles/dashboard.css";
import { useSelector } from "react-redux";
import { colors } from "../../styles/colors";
import { EmployeeInfo } from "../../components/Employees/EmployeeInfo";
import { AttendanceHistory } from "../../components/Attendance/AttendanceHistory";

const EmployeeDetails = () => {
  const user = useSelector((state) => state.selectedUser);

  return (
    <div className="content-div">
      <div className="emp-info-div">
        <EmployeeInfo />
      </div>
      <div
        style={{
          minHeight: "70%",
          backgroundColor: colors.lightprimary,
          display: "flex",
          flex: 1,
          borderRadius: "30px",
          margin: "10px",
          marginTop: "20px",
          padding: "10px",
          flexDirection: "column",
        }}
      >
        <AttendanceHistory userid={user._id} />
      </div>
    </div>
  );
};

export default EmployeeDetails;
