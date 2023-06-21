import "../styles/auth.css";
import "../styles/dashboard.css";
import { Statistic } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import {
  TotalEmployees,
  TotalPresent,
  TotalAbsent,
  TotalTime,
} from "../components/Dashboard/Statistics";

const Dashboard = () => {
  return (
    <div className="content-div">
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "red",
          height: "20%",
        }}
      >
        <div
          style={{
            width: "60%",
            backgroundColor: "blue",
            height: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <TotalEmployees />
          <TotalPresent />
          <TotalAbsent />
        </div>
        <div
          style={{
            width: "40%",
            backgroundColor: "green",
            height: "100%",
            display: "flex",
          }}
        >
          <TotalTime />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
