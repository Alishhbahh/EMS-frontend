import "../styles/auth.css";
import { Layout } from "antd";
import "../styles/dashboard.css";
import { useState } from "react";
const { Header, Content } = Layout;
import { colors } from "../styles/colors";
import { useSelector } from "react-redux";
import { Avatar } from "../components/Avatar";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";

export const LayoutWrapper = ({ children }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Layout style={{ minHeight: "100%" }}>
        <Sidebar
          user={user}
          collapsed={!hovered}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
        <Layout style={{ paddingLeft: hovered ? "250px" : "80px" }}>
          <Header
            style={{
              background: colors.darkprimary,
              display: "flex",
              alignItems: "center",
            }}
          >
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
              background: colors.darkprimary,
              minHeight: "calc(100vh - 64px)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};