const { Search } = Input;
import "../../styles/auth.css";
import "../../styles/dashboard.css";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { colors } from "../../styles/colors";
import { useNavigate } from "react-router-dom";
import { getEmployeesApi } from "../../api/employee";
import { setSelectedUser } from "../../redux/actions";
import InfiniteScroll from "react-infinite-scroll-component";
import { UserOutlined, UserAddOutlined } from "@ant-design/icons";
import { Input, Dropdown, Button, Avatar, Divider, List, Card } from "antd";

const Employees = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchType, setSearchType] = useState("Everyone");

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

  return (
    <div className="content-div">
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
            onClick={() => navigate("/registeremployee")}
          >
            Register Employee
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
                      navigate(`/employee/${item._id}`);
                    }}
                  >
                    <div className="emp-card-div">
                      <Avatar size="large" className="emp-avatar">
                        {item.name ? item.name[0].toUpperCase() : null}
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
    </div>
  );
};

export default Employees;
