import { Input } from "antd";
import { Button, Modal } from "antd";
import "../../styles/schedule.css";

export const AddScheduleModal = ({ open, onClose, selectedDate, user }) => {
  return (
    <Modal
      title="Add Schedule"
      open={open}
      onCancel={onClose}
      className="add-schedule-modal"
    >
      <div className="schedule-div">
        <h3 className="schedule-date">Date: {selectedDate}</h3>
        <h6 className="schedule-text"> Schedule:</h6>
        <Input className="schedule-text" placeholder="Enter Schedule" />
        <div className="schedule-btns">
          <Button className="approve-btn">Add</Button>
          <Button className="reject-btn">Cancel</Button>
        </div>
      </div>
    </Modal>
  );
};
