import "../styles/dashboard.css";
import "../styles/attendance.css";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Button } from "antd";
import { ClockCircleOutlined, ScheduleOutlined } from "@ant-design/icons";

const Attendance = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [clockedIn, setClockedIn] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
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
                toast.success("Clocked In Successfully");
              }}
            >
              Clock-In
            </Button>
            <Button
              disabled={!clockedIn}
              icon={<ClockCircleOutlined style={{ fontSize: "25px" }} />}
              className="clock-in-button"
              onClick={() => console.log("hi")}
            >
              Clock-Out
              {/* <br />
            {currentTime.toLocaleTimeString()} */}
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
    </div>
  );
};

export default Attendance;
