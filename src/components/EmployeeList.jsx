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
import { Avatar, Divider, List, Card } from "antd";
import { useDispatch } from "react-redux";
import { EmployeeInfo } from "./EmployeeInfo";
import { setSelectedUser } from "../redux/actions";

export const EmployeeList = () => {
  const dispatch = useDispatch();
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchType, setSearchType] = useState("Everyone");
  const [showInfo, setShowInfo] = useState(false);

  const getAllEmployees = () => {
    getEmployeesApi().then((data) => {
      if (data.message) {
        setEmployees(data.message);
        setFilteredEmployees(data.message);
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
    if (value) {
      const filtered = employees.filter((emp) => {
        return emp.name.toLowerCase().includes(value.toLowerCase());
      });
      setFilteredEmployees(filtered);
    } else {
      setFilteredEmployees(employees);
    }
  };

  useEffect(() => {
    handleMenuClick({ key: searchType });
  }, [searchType]);

  const handleMenuClick = (e) => {
    setSearchType(e.key);
    if (searchType === "HR") {
      const filtered = employees.filter((emp) => {
        return emp.role === "HR";
      });
      setFilteredEmployees(filtered);
    } else if (searchType === "Team Lead") {
      const filtered = employees.filter((emp) => {
        return emp.role === "Team Lead";
      });
      setFilteredEmployees(filtered);
    } else if (searchType === "Employees") {
      const filtered = employees.filter((emp) => {
        return emp.role === "Employee";
      });
      setFilteredEmployees(filtered);
    } else {
      setFilteredEmployees(employees);
    }
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
      ) : showInfo ? (
        <EmployeeInfo />
      ) : (
        <>
          <div className="search-div">
            <Search
              placeholder="Search.."
              allowClear
              onChange={(e) => onSearch(e.target.value)}
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
              dataLength={filteredEmployees.length}
              hasMore={filteredEmployees.length < 50}
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
                dataSource={filteredEmployees}
                renderItem={(item) => (
                  <List.Item>
                    <Card
                      title={item.title}
                      className="emp-card"
                      onClick={() => {
                        dispatch(setSelectedUser(item));
                        setShowInfo(true);
                      }}
                    >
                      <div className="emp-card-div">
                        <Avatar size="large" className="emp-avatar">
                          {item.name ? item.name[0] : null}
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
