import { useEffect, useState } from "react";
import { Calendar, Badge } from "antd";
import "../../styles/schedule.css";
import { getScheduleApi } from "../../api/schedule";
import { calendarColors } from "../../styles/colors";

export const ViewSchedule = ({ user }) => {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    getScheduleApi(user).then((res) => {
      setSchedule(res.data ? res.data.events : []);
    });
  }, [user]);

  const dateCellRender = (value) => {
    // Generate a random color key from the Colors object
    const randomColorKey =
      Object.keys(calendarColors)[
        Math.floor(Math.random() * Object.keys(calendarColors).length)
      ];
    const eventsOnDate = schedule.filter(
      (item) => item.date === value.format("DD/MM/YYYY")
    );

    return (
      <ul
        className="events"
        style={{
          backgroundColor: calendarColors[randomColorKey],
          width: "100%",
        }}
      >
        {eventsOnDate.map((item) => (
          <li
            key={item._id}
            style={{
              height: "70px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Badge
              status="success"
              text={item.event}
              style={{
                color: "white",
                textAlign: "center",
                alignSelf: "center",
                zIndex: "3",
              }}
            />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="content-div" style={{ borderRadius: "30px" }}>
      <Calendar className="calendar" cellRender={dateCellRender} />
    </div>
  );
};
