import React from "react";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";

export const TotalEmployees = () => {
  return (
    <Card bordered={false} style={{ width: "30%" }}>
      <Statistic
        title="Total Employees"
        value={11.28}
        precision={2}
        valueStyle={{ color: "#3f8600" }}
        prefix={<ArrowUpOutlined />}
        suffix="%"
      />
    </Card>
  );
};

export const TotalPresent = () => {
  return (
    <Card bordered={false} style={{ width: "30%" }}>
      <Statistic
        title="Total Present"
        value={9.3}
        precision={2}
        valueStyle={{ color: "#3f8600" }}
        prefix={<ArrowUpOutlined />}
        suffix="%"
      />
    </Card>
  );
};

export const TotalAbsent = () => {
  return (
    <Card bordered={false} style={{ width: "30%" }}>
      <Statistic
        title="Total Absent"
        value={-0.23}
        precision={2}
        valueStyle={{ color: "#cf1322" }}
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
