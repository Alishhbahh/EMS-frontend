import { Input } from "antd";
import { useState } from "react";
import { Button, Modal } from "antd";
import "../../styles/schedule.css";
import { addScheduleApi } from "../../api/schedule";
import { toast, ToastContainer } from "react-toastify";

export const AddScheduleModal = ({ open, onClose, selectedDate, user }) => {
  const [event, setEvent] = useState("");

  const handleAddSchedule = () => {
    addScheduleApi(user.id, event, selectedDate)
      .then((data) => {
        if (data.message) {
          toast.success(data.message);
          onClose();
        } else {
          toast.error(data.error);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <Modal
      title="Add Schedule"
      open={open}
      onCancel={onClose}
      className="add-schedule-modal"
    >
      <ToastContainer />
      <div className="schedule-div">
        <h3 className="schedule-date">Date: {selectedDate}</h3>
        <h6 className="schedule-text"> Schedule:</h6>
        <Input
          className="schedule-text"
          value={event}
          placeholder="Enter Schedule"
          onChange={(e) => setEvent(e.target.value)}
        />
        <div className="schedule-btns">
          <Button className="approve-btn" onClick={handleAddSchedule}>
            Add
          </Button>
          <Button className="reject-btn">Cancel</Button>
        </div>
      </div>
    </Modal>
  );
};
