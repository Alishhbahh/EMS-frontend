import { Table } from "antd";
import { useEffect, useState } from "react";
import { getEmployeeLeavesApi } from "../../api/leaves";
import { colors } from "../../styles/colors";

export const EmpLeavesList = ({ user }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getEmployeeLeavesApi(user.id).then((res) => {
      setData(res.data);
    });
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
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      style={{
        background: "#080808",
        alignItems: "center",
        marginLeft: "25px",
        paddingLeft: "15px",
      }}
    />
  );
};
