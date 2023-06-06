import moment from "moment";
import "../../styles/auth.css";
import { List, Card } from "antd";
import "../../styles/dashboard.css";
import { colors } from "../../styles/colors";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import { useState, useEffect } from "react";
import { getAttedanceApi } from "../../api/attendance";

import { useSelector, useDispatch } from "react-redux";
import { setSelectedMonth } from "../../redux/actions";

export const AttendanceHistory = ({ user }) => {
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toLocaleString("default", { month: "long" })
  );
  const [attendance, setAttendance] = useState([]);
  const handleMonthSelection = (e) => {
    setSelectedMonth(e.key);
  };

  const getAttendanceHistory = () => {
    const formattedMonth = new Date(
      selectedMonth + " 1, 2000"
    ).toLocaleDateString("en-GB", { month: "2-digit" });
    getAttedanceApi(user.id, formattedMonth).then((data) => {
      if (data.message) {
        setAttendance(data.message);
      } else {
        console.log(data);
      }
    });
  };

  useEffect(() => {
    getAttendanceHistory();
  }, [selectedMonth]);

  const items = [
    {
      label: "January",
      key: "January",
    },
    {
      label: "February",
      key: "February",
    },
    {
      label: "March",
      key: "March",
    },
    {
      label: "April",
      key: "April",
    },
    {
      label: "May",
      key: "May",
    },
    {
      label: "June",
      key: "June",
    },
    {
      label: "July",
      key: "July",
    },
    {
      label: "August",
      key: "August",
    },
    {
      label: "September",
      key: "September",
    },
    {
      label: "October",
      key: "October",
    },
    {
      label: "November",
      key: "November",
    },
    {
      label: "December",
      key: "December",
    },
  ];

  const menuProps = {
    items,
    onClick: handleMonthSelection,
  };

  const getStatus = (clockInTime) => {
    if (!clockInTime) {
      return "Absent";
    }
    const clockIn = moment(clockInTime, "hh:mm:ss a");
    const lateTime = moment("09:00:00 am", "hh:mm:ss a");
    return clockIn.isAfter(lateTime) ? "Late" : "OnTime";
  };
  return (
    <>
      <div className="atdc-history-title-div">
        <div className="vertical-line"></div>
        <h6 className="atdc-history-title">History</h6>
        <Dropdown.Button
          className="type-dropdown"
          overlayStyle={{ maxHeight: "200px" }}
          menu={menuProps}
        >
          {selectedMonth}
        </Dropdown.Button>
      </div>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 3,
          xl: 4,
          xxl: 3,
        }}
        dataSource={attendance}
        style={{
          display: "flex",
          flex: 1,
          borderRadius: "30px",
          overflow: "auto",
          width: "100%",
          padding: "10px",
        }}
        renderItem={(item) => (
          <List.Item
            style={{
              minWidth: "100%",
              margin: "10px",
              display: "flex",
              flex: "1",
            }}
          >
            <Card
              title={item.title}
              className="history-card"
              style={{
                height: "140px",
                width: "100%",
              }}
            >
              <div className="history-date-div">
                <h3 className="history-date">
                  <ClockCircleOutlined
                    style={{ color: "white", marginRight: "10px" }}
                  />
                  {moment(item.date, "DD/MM/YYYY").format("D MMMM YYYY")}
                </h3>
                <h5
                  style={{
                    color: "white",
                    backgroundColor: colors[getStatus(item.clockInTime)],
                    padding: "3px",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    borderRadius: "20px",
                  }}
                >
                  {getStatus(item.clockInTime)}
                </h5>
              </div>
              <div className="history-time-div">
                <div>
                  <h5>Check In Time</h5>
                  <h4>
                    {moment(item.clockInTime, "hh:mm:ss a").format("hh:mm a")}
                  </h4>
                </div>
                <div>
                  <h5>Check Out Time</h5>
                  <h4>
                    {item.clockOutTime
                      ? moment(item.clockOutTime, "hh:mm:ss a").format(
                          "hh:mm a"
                        )
                      : "-"}
                  </h4>
                </div>
              </div>
            </Card>
          </List.Item>
        )}
      />
    </>
  );
};
