import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";
const { Option } = Select;
import { useState } from "react";
import "../../styles/attendance.css";
import { requestLeaveApi } from "../../api/leaves";
import { toast, ToastContainer } from "react-toastify";

export const LeaveForm = ({ onClose, open, user }) => {
  const [type, setType] = useState("");
  const [reason, setReason] = useState("");
  const [selectedDates, setSelectedDates] = useState([null, null]);

  return (
    <Drawer
      title="Request For Leave"
      width={520}
      onClose={onClose}
      open={open}
      bodyStyle={{
        paddingBottom: 80,
      }}
    >
      <Form layout="vertical" hideRequiredMark>
        <Row gutter={16}>
          <Col span={16}>
            <Form.Item
              name="type"
              label="Type"
              placeholder="Please choose the type"
              rules={[
                {
                  required: true,
                  message: "Please choose the type",
                },
              ]}
              onChange={(e) => setType(e.target.value)}
            >
              <Select placeholder="Please choose the type" onChange={setType}>
                <Option value="paid">Paid</Option>
                <Option value="unpaid">Unpaid</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={16}>
            <Form.Item
              name="dateTime"
              label="Start Date - End Date"
              placeholder="Please choose the Dates"
              rules={[
                {
                  required: true,
                  message: "Please choose the Dates",
                },
              ]}
            >
              <DatePicker.RangePicker
                style={{
                  width: "100%",
                }}
                getPopupContainer={(trigger) => trigger.parentElement}
                onChange={(dates) => setSelectedDates(dates)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="reason"
              label="Reason"
              placeholder="please enter your reason"
              rules={[
                {
                  required: true,
                  message: "please enter your reason",
                },
              ]}
              onChange={(e) => setReason(e.target.value)}
            >
              <Input.TextArea rows={4} placeholder="please enter your reason" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <ToastContainer />
      <Space>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={() => {
            const [startDate, endDate] = selectedDates;
            const formattedStartDate = startDate.format("DD/MM/YYYY");
            const formattedEndDate = endDate.format("DD/MM/YYYY");
            requestLeaveApi(
              user.id,
              type,
              reason,
              formattedStartDate,
              formattedEndDate
            ).then((res) => {
              if (res.message) {
                toast.success(res.message);
                onClose();
              } else {
                toast.error(res.error);
              }
            });
          }}
          type="primary"
        >
          Submit
        </Button>
      </Space>
    </Drawer>
  );
};
