import "../styles/auth.css";
import { Layout } from "antd";
import "../styles/dashboard.css";
import { useState } from "react";
const { Header, Content } = Layout;
import { useSelector } from "react-redux";
import { Avatar } from "../components/Avatar";
import { Sidebar } from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { darkprimary } from "../styles/colors";
import { EmployeeList } from "../components/EmployeeList";
import { MenuOutlined } from "@ant-design/icons";

const Dashboard = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const user = useSelector((state) => state.user);
  const selectedItem = useSelector((state) => state.navItem); // this is the selected item in the sidebar

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  let displayedComponent = "dashboard";

  if (selectedItem === "employees") {
    displayedComponent = <EmployeeList />;
  }

  return (
    <div style={{ width: "100%", height: "100vh", backgroundColor: "purple" }}>
      <Layout style={{ minHeight: "100%" }}>
        <Sidebar
          user={user}
          collapsed={collapsed}
          onCollapse={toggleCollapsed}
        />
        <Layout>
          <Header
            style={{
              background: darkprimary,
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              onClick={toggleCollapsed}
              style={{
                fontSize: 18,
                cursor: "pointer",
                marginRight: 16,
              }}
            >
              <MenuOutlined style={{ color: "white" }} />
            </div>
            <div style={{ flex: 1 }}>
              <Avatar
                user={user}
                navigate={navigate}
                size="large"
                className="user-avatar"
              />
            </div>
          </Header>
          <Content
            style={{
              padding: 24,
              background: darkprimary,
              minHeight: "calc(100vh - 64px)",
            }}
          >
            {displayedComponent}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default Dashboard;
