import "../../styles/dashboard.css";
import { useSelector } from "react-redux";
import { colors } from "../../styles/colors";
import { EmployeeInfo } from "../../components/Employees/EmployeeInfo";
import { AttendanceHistory } from "../../components/Attendance/AttendanceHistory";
import { ViewSchedule } from "../../components/Schedule/ViewSchedule";

const EmployeeDetails = () => {
  const user = useSelector((state) => state.selectedUser);

  return (
    <div className="content-div">
      <div className="emp-info-div">
        <EmployeeInfo />
      </div>
      {user.role === "HR" ? (
        <div
          style={{
            minHeight: "20%",
            maxHeight: "30%",
            backgroundColor: colors.lightprimary,
            display: "flex",
            flex: 1,
            borderRadius: "30px",
            margin: "10px",
            marginTop: "20px",
            padding: "10px",
            flexDirection: "column",
            overflowY: "scroll",
          }}
        >
          <AttendanceHistory userid={user._id} />
        </div>
      ) : null}
      <div
        style={{
          minHeight: "30%",
          display: "flex",
          flex: 1,
          borderRadius: "30px",
          margin: "10px",
          marginTop: "20px",
          padding: "10px",
          overflowY: "scroll",
        }}
      >
        <ViewSchedule user={user._id} />
      </div>
    </div>
  );
};

export default EmployeeDetails;
