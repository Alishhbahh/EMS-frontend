import "../styles/dashboard.css";
import { UserOutlined, UserAddOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Input, Dropdown, Button } from "antd";
const { Search } = Input;
import { Avatar } from "./Avatar";
import { useSelector } from "react-redux";
import axios from "axios";
import { RegistrationForm } from "./RegistrationForm";
import { toast } from "react-toastify";

export const EmployeeList = ({ user, navigate }) => {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
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

  function onSearch(value) {
    return console.log(value);
  }
  const collapse = useSelector((state) => state.collapse);
  const [searchType, setSearchType] = useState("Everyone");

  const handleButtonClick = (e) => {
    console.log("click left button", e);
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
    <div className="right-div" style={{ left: !collapse ? "100px" : "300px" }}>
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
              onClick={handleButtonClick}
            >
              {searchType}
            </Dropdown.Button>

            <Avatar user={user} navigate={navigate} />
          </div>
          <div className="bottom-div">
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
