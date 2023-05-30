import "../styles/dashboard.css";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Input, Dropdown, Button } from "antd";
const { Search } = Input;
import { RegistrationForm } from "./RegistrationForm";
import { UserOutlined, UserAddOutlined } from "@ant-design/icons";
import { getEmployeesApi } from "../api/employee";
import InfiniteScroll from "react-infinite-scroll-component";
import { colors } from "../styles/colors";
import { Avatar, Divider, List, Skeleton, Card, Badge } from "antd";

export const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchType, setSearchType] = useState("Everyone");

  const getAllEmployees = () => {
    getEmployeesApi().then((data) => {
      if (data.message) {
        setEmployees(data.message);
      } else {
        toast.error(data.error);
      }
    });
  };

  useEffect(() => {
    getAllEmployees();
  }, []);

  // TODO: add search functionality Later on
  const onSearch = (value) => {
    return console.log(value);
  };

  const handleMenuClick = (e) => {
    setSearchType(e.key);
  };

  const items = [
    {
      label: "Everyone",
      key: "Everyone",
      icon: <UserOutlined />,
    },
    {
      label: "Team Lead",
      key: "Team Lead",
      icon: <UserOutlined />,
    },
    {
      label: "Employees",
      key: "Employees",
      icon: <UserOutlined />,
    },
    {
      label: "HR",
      key: "HR",
      icon: <UserOutlined />,
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const handleForm = (value) => {
    setShowForm(value);
  };

  return (
    <div className="content-div">
      {showForm ? (
        <RegistrationForm setShowForm={handleForm} />
      ) : (
        <>
          <div className="search-div">
            <Search
              placeholder="Search.."
              allowClear
              onSearch={onSearch}
              className="emp-search"
            />
            <Dropdown.Button
              className="type-dropdown"
              overlayStyle={{ maxHeight: "200px" }}
              menu={menuProps}
            >
              {searchType}
            </Dropdown.Button>
            <Button
              className="register-user-button"
              icon={<UserAddOutlined />}
              size={42}
              onClick={() => setShowForm(true)}
            >
              Register Employees
            </Button>
          </div>
          <div className="emp-list-div">
            <InfiniteScroll
              dataLength={employees.length}
              hasMore={employees.length < 50}
              endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
              scrollableTarget="scrollableDiv"
            >
              <List
                grid={{
                  gutter: 16,
                  xs: 1,
                  sm: 2,
                  md: 3,
                  lg: 4,
                  xl: 5,
                  xxl: 3,
                }}
                dataSource={employees}
                renderItem={(item) => (
                  <List.Item>
                    <Card title={item.title} className="emp-card">
                      <div className="emp-card-div">
                        <Avatar size="large" className="emp-avatar">
                          A
                        </Avatar>
                        <h4 className="emp-name">{item.name}</h4>
                        <p
                          className="emp-role"
                          style={{
                            backgroundColor:
                              colors[
                                item.department &&
                                colors[item.department.deptName]
                                  ? item.department.deptName
                                  : "Others"
                              ] || colors["Others"],
                          }}
                        >
                          {item.department ? item.department.deptName : "HR"}
                        </p>
                      </div>
                    </Card>
                  </List.Item>
                )}
              />
            </InfiniteScroll>
          </div>
        </>
      )}
    </div>
  );
};
