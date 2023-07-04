import "../styles/auth.css";
import "../styles/dashboard.css";
import { Statistic, Card } from "antd";
import {
  TotalEmployees,
  TotalPresent,
  TotalAbsent,
} from "../components/Dashboard/Statistics";
import { useSelector } from "react-redux";
import { ViewSchedule } from "../components/Schedule/ViewSchedule";
import reminder from "../../src/assets/reminder.png";

const Dashboard = () => {
  const user = useSelector((state) => state.selectedUser);
  console.log(user);

  return (
    <div className="content-div">
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          height: "20%",
        }}
      >
        <div
          style={{
            width: "80%",
            height: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: "50px",
          }}
        >
          <TotalEmployees />
          <TotalPresent />
          <TotalAbsent />
        </div>
        <div
          style={{
            width: "20%",
            height: "190%",
            display: "flex",
          }}
        >
          <svg viewBox="0 0 190 180" xmlns="http://www.w3.org/2000/svg">
            <linearGradient id="grad" x2="1" y2="1">
              <stop offset="10%" stopColor="#b987f3" />
              <stop offset="50%" stopColor="#5bd4ec" />
              <stop offset="100%" stopColor="#eecea3" />
            </linearGradient>
            <path
              fill="url(#grad)"
              d="M45.3,-74.3C55.9,-63.8,59.5,-46.3,66.4,-30.5C73.3,-14.7,83.4,-0.6,81.5,11.6C79.6,23.9,65.6,34.3,53.3,43.4C41.1,52.5,30.5,60.3,18.9,63.1C7.3,65.9,-5.4,63.7,-19.8,61.9C-34.2,60.2,-50.3,58.9,-57.7,50.1C-65.2,41.4,-64,25.2,-67.4,9C-70.9,-7.2,-78.9,-23.5,-76,-36.7C-73,-49.9,-59,-60,-44.6,-68.7C-30.1,-77.4,-15,-84.6,1.2,-86.5C17.4,-88.3,34.8,-84.8,45.3,-74.3Z"
              transform="translate(100 100)"
            />
            <circle cx="100" cy="90" r="55" fill="#262626" />

            <text
              x="50%"
              y="50%"
              fill="white"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={20}
            >
              50%
            </text>
          </svg>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          height: "80%",
          marginTop: "110px",
          backgroundColor: "red",
          flexDirection: "row",
        }}
      >
        <Card bordered={false} className="reminder-card">
          <img src={reminder}></img>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
