import { useState } from "react";
import { Calendar, Tooltip, Button } from "antd";
import "../../styles/schedule.css";
import { PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import { AddScheduleModal } from "../../components/Schedule/AddScheduleModal";
import { useSelector } from "react-redux";

const EmployeeSchedule = () => {
  const user = useSelector((state) => state.user);
  const [selectedDate, setSelectedDate] = useState(
    moment().format("DD/MM/YYYY")
  );
  const [open, setOpen] = useState(false);

  return (
    <div className="content-div">
      <Calendar
        className="calendar"
        onSelect={(date) => setSelectedDate(date.format("DD/MM/YYYY"))}
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
