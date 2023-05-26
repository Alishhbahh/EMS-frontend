import axios from "axios";
import "../styles/dashboard.css";
import { Avatar } from "./Avatar";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Input, Dropdown, Button } from "antd";
const { Search } = Input;
import { RegistrationForm } from "./RegistrationForm";
import { UserOutlined, UserAddOutlined } from "@ant-design/icons";

export const EmployeeList = ({ user, navigate }) => {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const collapse = useSelector((state) => state.collapse);
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
