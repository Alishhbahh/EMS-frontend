import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { privateRoutes, publicRoutes } from "../src//routes/routes";
import "antd/dist/reset.css";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { LayoutWrapper } from "./components/LayoutWrapper";

function App() {
  const user = useSelector((state) => state.user);

  return (
    <>
      <div>
        <Router>
          <LayoutWrapper>
            <Routes>
              {publicRoutes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
              <Route
                path="/"
                element={
                  <Navigate to={user ? "/dashboard" : "/login"} replace />
                }
              />
              {privateRoutes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Routes>
          </LayoutWrapper>
        </Router>
      </div>
    </>
  );
}

export default App;
