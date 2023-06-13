import { Button, Modal } from "antd";

export const DetailsModal = ({ open, onClose, record }) => {
  const handleOk = () => {
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };
  return (
    <Modal
      title="Basic Modal"
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      okButtonProps={{ disabled: false }}
      cancelButtonProps={{ disabled: false }}
    >
      <p>{record.type}</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <Button type="primary">Approve</Button>
        <Button type="primary">Reject</Button>
    </Modal>
  );
};
