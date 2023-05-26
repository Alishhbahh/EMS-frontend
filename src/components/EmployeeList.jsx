import axios from "axios";
import "../styles/dashboard.css";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Input, Dropdown, Button } from "antd";
const { Search } = Input;
import { RegistrationForm } from "./RegistrationForm";
import { UserOutlined, UserAddOutlined } from "@ant-design/icons";

export const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchType, setSearchType] = useState("Everyone");

  const getAllEmployees = () => {
    axios
      .get("http://localhost:8080/api/emp/getemployees")
      .then((response) => {
        setEmployees(response.data.message);
      })
      .catch(() => {
        toast.error("Error fetching employees");
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
        </>
      )}
    </div>
  );
};
