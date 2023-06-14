import { Button, Modal } from "antd";
import { replyLeaveApi } from "../../api/leaves";
import { toast, ToastContainer } from "react-toastify";

export const DetailsModal = ({ open, onClose, record, userr }) => {
  const { user } = record;
  const { department } = record;

  const ApproveLeave = () => {
    const leaveId = record._id;

    replyLeaveApi(userr.id, leaveId, "Approved").then((res) =>
      toast.success(res.message)
    );
  };

  const RejectLeave = () => {
    const leaveId = record._id;
    replyLeaveApi(userr.id, leaveId, "Rejected").then(() =>
      toast.success("Leave Rejected Successfully")
    );
  };

  const handleOk = () => {
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };
  const InfoHolder = ({ placeholder }) => {
    return (
      <div className="info-holder">
        <h4>{placeholder}</h4>
      </div>
    );
  };
  return (
    <Modal
      title="Leave Information"
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      okButtonProps={{ disabled: false }}
      cancelButtonProps={{ disabled: false }}
      style={{ width: "650px" }}
    >
      <ToastContainer />
      <div className="leave-info-div">
        <div className="left-div">
          <InfoHolder placeholder="Employee Info" />
          <h4>Name: {user?.name}</h4>
          <h4>Department: {department?.deptName}</h4>
          <InfoHolder placeholder="Response Info" />
          <h4>Lead Response: {record.teamLeadApproval}</h4>
          <h4>HR Response: {record.hrApproval}</h4>
          <InfoHolder placeholder="Leave Info" />
          <h4>Leave Type: {record.type}</h4>
          <h4>Start Date: {record.startDate}</h4>
          <h4>End Date: {record.endDate}</h4>
          <h4>Reason: {record.reason}</h4>
        </div>
      </div>
      <div className="hr-response-btns">
        <Button className="approve-btn" onClick={ApproveLeave}>
          Approve
        </Button>
        <Button className="reject-btn" onClick={RejectLeave}>
          Reject
        </Button>
      </div>
    </Modal>
  );
};
