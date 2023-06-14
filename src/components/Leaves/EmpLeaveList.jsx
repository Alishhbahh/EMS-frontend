import { Table } from "antd";
import { useEffect, useState } from "react";
import { colors } from "../../styles/colors";
import { DetailsModal } from "./DetailsModal";
import { getEmployeeLeavesApi, getLeavesApi } from "../../api/leaves";

export const EmpLeavesList = ({ user }) => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [record, setRecord] = useState({});

  useEffect(() => {
    if (user.role === "Employee") {
      getEmployeeLeavesApi(user.id).then((res) => {
        setData(res.data);
      });
    } else if (user.role === "HR") {
      getLeavesApi().then((res) => {
        setData(res.data);
      });
    }
  }, []);

  const dataSource = data.map((item) => ({
    ...item,
    key: item._id, // Assuming 'id' is the unique identifier for each item
  }));

  const columns = [
    {
      title: "Leave Type",
      dataIndex: "type",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
    },
    {
      title: "HR Response",
      dataIndex: "hrApproval",
      filters: [
        {
          text: "Approved",
          value: "Approved",
        },
        {
          text: "Pending",
          value: "Pending",
        },
        {
          text: "Rejected",
          value: "Rejected",
        },
      ],
      onFilter: (value, record) => record.hrApproval.indexOf(value) === 0,
      render: (text, record) => (
        <span
          className="hrApproval"
          style={{ backgroundColor: colors[record.hrApproval] }}
        >
          {record.hrApproval}
        </span>
      ),
    },
    {
      title: "Team Lead Response",
      dataIndex: "teamLeadApproval",
      render: (text, record) => (
        <span
          className="hrApproval"
          style={{ backgroundColor: colors[record.teamLeadApproval] }}
        >
          {record.teamLeadApproval}
        </span>
      ),
      filters: [
        {
          text: "Approved",
          value: "Approved",
        },
        {
          text: "Pending",
          value: "Pending",
        },
        {
          text: "Rejected",
          value: "Rejected",
        },
      ],
      onFilter: (value, record) => record.teamLeadApproval.indexOf(value) === 0,
    },
  ];
  const HRcolumns = [
    {
      title: "Employee Name",
      dataIndex: "user",
      render: (text, record) => record.user.name,
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
    },
    {
      title: "HR Response",
      dataIndex: "hrApproval",
      filters: [
        {
          text: "Approved",
          value: "Approved",
        },
        {
          text: "Pending",
          value: "Pending",
        },
        {
          text: "Rejected",
          value: "Rejected",
        },
      ],
      onFilter: (value, record) => record.hrApproval.indexOf(value) === 0,
      render: (text, record) => (
        <span
          className="hrApproval"
          style={{ backgroundColor: colors[record.hrApproval] }}
        >
          {record.hrApproval}
        </span>
      ),
    },
    {
      title: "Team Lead Response",
      dataIndex: "teamLeadApproval",
      render: (text, record) => (
        <span
          className="hrApproval"
          style={{ backgroundColor: colors[record.teamLeadApproval] }}
        >
          {record.teamLeadApproval}
        </span>
      ),
      filters: [
        {
          text: "Approved",
          value: "Approved",
        },
        {
          text: "Pending",
          value: "Pending",
        },
        {
          text: "Rejected",
          value: "Rejected",
        },
      ],
      onFilter: (value, record) => record.teamLeadApproval.indexOf(value) === 0,
    },
  ];

  return (
    <>
      <DetailsModal
        open={open}
        onClose={() => setOpen(false)}
        record={record}
        userr={user}
      />
      <Table
        columns={user.role === "HR" ? HRcolumns : columns}
        pagination={{
          pageSize: 10, // Set a higher pageSize value
        }}
        onRow={(record) => ({
          onClick: () => {
            setRecord(record);
            setOpen(true);
          },
        })}
        dataSource={dataSource}
        style={{
          background: "#080808",
          alignItems: "center",
          marginLeft: "22px",
          paddingLeft: "15px",
          marginRight: "22px",
        }}
      />
    </>
  );
};
