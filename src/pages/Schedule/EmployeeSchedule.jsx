import { useEffect, useState } from "react";
import { Calendar, Tooltip, Button, Badge } from "antd";
import "../../styles/schedule.css";
import { PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import { AddScheduleModal } from "../../components/Schedule/AddScheduleModal";
import { useSelector } from "react-redux";
import { getScheduleApi } from "../../api/schedule";
import { toast } from "react-toastify";
import { calendarColors } from "../../styles/colors";

const EmployeeSchedule = () => {
  const user = useSelector((state) => state.user);
  const [schedule, setSchedule] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    moment().format("DD/MM/YYYY")
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getScheduleApi(user.id)
      .then((res) => {
        setSchedule(res.data.events);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, [user.id, open]);

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
    <div className="content-div">
      <Calendar
        className="calendar"
        onSelect={(date) => setSelectedDate(date.format("DD/MM/YYYY"))}
        dateCellRender={dateCellRender}
      />
      <AddScheduleModal
        open={open}
        onClose={() => setOpen(false)}
        selectedDate={selectedDate}
        user={user}
      />
      <Tooltip title="Add Schedule">
        <Button
          className="add-schedule-btn"
          style={{ position: "absolute", top: "15%", left: "62%", zIndex: "2" }}
          icon={<PlusOutlined />}
          type="circle"
          onClick={() => setOpen(true)}
        />
      </Tooltip>
    </div>
  );
};

export default EmployeeSchedule;
