import {
  clockInApi,
  clockOutApi,
  getCurrentAttendanceApi,
} from "../api/attendance";
import { Button } from "antd";
import "../styles/dashboard.css";
import "../styles/attendance.css";
import { useSelector } from "react-redux";
import { colors } from "../styles/colors";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { ClockCircleOutlined, ScheduleOutlined } from "@ant-design/icons";
import { AttendanceHistory } from "../components/Attendance/AttendanceHistory";

const Attendance = () => {
  const user = useSelector((state) => state.user);
  const [clockedIn, setClockedIn] = useState(false);
  const [clockedOut, setClockedOut] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    getCurrentAttendanceApi(currentTime.toLocaleDateString(), user.id).then(
      (res) => {
        if (res.message) {
          //if attendance already exists
          setClockedIn(true);
          if (res.data.clockOutTime) {
            setClockedOut(true);
          }
        }
      }
    );
  }, [clockedOut]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleClockIn = () => {
    clockInApi(
      user.id,
      currentTime.toLocaleDateString(),
      currentTime.toLocaleTimeString(undefined, { hour12: true })
    )
      .then(() => {
        toast.success("Clocked In Successfully");
        setClockedIn(true);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleClockOut = () => {
    if (!clockedIn) {
      return toast.error("You need to clock in first");
    }
    clockOutApi(
      user.id,
      currentTime.toLocaleDateString(),
      currentTime.toLocaleTimeString(undefined, { hour12: true })
    )
      .then(() => {
        setClockedOut(true);
        toast.success("Clocked Out Successfully");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="content-div">
      <div
        style={{
          flexDirection: "row",
          display: "flex",
          height: "30%",
        }}
      >
        <ToastContainer />
        <div className="date-div">
          <div className="date-content">
            <h4 className="date-overlay"> {currentTime.getDate()}</h4>
            <div>
              <h6 className="atdc-day">
                {currentTime.toLocaleDateString(undefined, {
                  month: "long",
                })}
              </h6>
              <h6 className="atdc-year">{currentTime.getFullYear()}</h6>
              <h6 className="atdc-day">
                {" "}
                {currentTime.toLocaleDateString(undefined, { weekday: "long" })}
              </h6>
            </div>
          </div>
        </div>

        <div className="attendance-div">
          <h4 className="atdc-date">
            Time: {currentTime.toLocaleTimeString(undefined, { hour12: true })}{" "}
          </h4>

          <div className="atdc-buttons-div">
            <Button
              disabled={clockedIn}
              icon={<ClockCircleOutlined style={{ fontSize: "25px" }} />}
              style={{ fontSize: "20px" }}
              className="clock-in-button"
              onClick={() => {
                setClockedIn(true);
                handleClockIn();
              }}
            >
              Clock-In
            </Button>
            <Button
              disabled={clockedOut}
              icon={<ClockCircleOutlined style={{ fontSize: "25px" }} />}
              className="clock-in-button"
              onClick={() => handleClockOut()}
            >
              Clock-Out
            </Button>
            <Button
              icon={<ScheduleOutlined style={{ fontSize: "25px" }} />}
              className="clock-in-button"
              onClick={() => console.log("HANDLE THIS DURING LEAVE MANAGEMENT")}
            >
              Request Leave
            </Button>
          </div>
        </div>
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
        <AttendanceHistory userid={user.id} />
      </div>
    </div>
  );
};

export default Attendance;
