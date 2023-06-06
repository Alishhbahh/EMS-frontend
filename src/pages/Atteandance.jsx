import "../styles/dashboard.css";
import "../styles/attendance.css";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { Button } from "antd";
import {
  clockInApi,
  clockOutApi,
  getAttedanceApi,
  getCurrentAttendanceApi,
} from "../api/attendance";
import { ClockCircleOutlined, ScheduleOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { AttendanceHistory } from "../components/Attendance/AttendanceHistory";
import { colors } from "../styles/colors";

const Attendance = () => {
  const user = useSelector((state) => state.user);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [clockedIn, setClockedIn] = useState(false);
  const [clockedOut, setClockedOut] = useState(false);

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
        // dispatch(setClockedOut(true));
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const getAttendanceHistory = () => {
    getAttedanceApi(user.id).then((data) => {
      if (data.message) {
        setAttendanceHistory(data.message);
      } else {
        toast.error(data.error);
      }
    });
  };

  useEffect(() => {
    getAttendanceHistory();
  }, []);

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
              onClick={() => console.log("hi")}
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
        <AttendanceHistory attendance={attendanceHistory} />
      </div>
    </div>
  );
};

export default Attendance;
