import { Card, Statistic } from "antd";
import { calendarColors } from "../../styles/colors";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import "../../styles/dashboard.css";
export const TotalEmployees = () => {
  return (
    <Card className="atdc-stats" bordered={false}>
      <Statistic
        title="Total Employees"
        value={11.28}
        precision={2}
        valueStyle={{ color: calendarColors.pastelMint }}
        prefix={<ArrowUpOutlined />}
        suffix="%"
      />
    </Card>
  );
};

export const TotalPresent = () => {
  return (
    <Card className="atdc-stats" bordered={false}>
      <Statistic
        title="Total Present"
        value={9.3}
        precision={2}
        valueStyle={{ color: calendarColors.pastelYellow }}
        prefix={<ArrowUpOutlined />}
        suffix="%"
      />
    </Card>
  );
};

export const TotalAbsent = () => {
  return (
    <Card className="atdc-stats" bordered={false}>
      <Statistic
        title="Total Absent"
        value={-0.23}
        precision={2}
        valueStyle={{ color: calendarColors.pastelPink }}
        prefix={<ArrowDownOutlined />}
        suffix="%"
      />
    </Card>
  );
};

export const TotalTime = () => {
  return (
    <Card bordered={false} style={{ width: "90%" }}>
      <Statistic
        title="Total Time"
        value={9.3}
        precision={2}
        valueStyle={{ color: "#3f8600" }}
        prefix={<ArrowUpOutlined />}
        suffix="%"
      />
    </Card>
  );
};

export const DonughtChart = () => {
  var data = {
    datasets: [
      {
        data: [3, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        backgroundColor: [
          "#336699",
          "#99CCFF",
          "#999933",
          "#666699",
          "#CC9933",
          "#006666",
          "#3399FF",
          "#993300",
          "#CCCC99",
          "#666666",
          "#FFFFFF",
          "#FFFFFF",
          "#FFFFFF",
        ],
        display: true,
        borderColor: "#D1D6DC",
      },
    ],
  };
  return (
    <Doughnut
      data={data}
      width={100}
      height={100}
      options={{
        maintainAspectRatio: false,
        cutoutPercentage: 80,
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
        },
      }}
    />
  );
};
