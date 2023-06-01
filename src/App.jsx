import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "antd/dist/reset.css";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { LayoutWrapper } from "./components/Layout/LayoutWrapper";
import { privateRoutes, publicRoutes } from "../src//routes/routes";

function App() {
  const user = useSelector((state) => state.user);

  return (
    <>
      <div>
        <Router>
          <Routes>
            {publicRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={
                  route.layout === null ? (
                    route.element
                  ) : (
                    <LayoutWrapper>{route.element}</LayoutWrapper>
                  )
                }
              />
            ))}
            <Route
              path="/"
              element={<Navigate to={user ? "/dashboard" : "/login"} replace />}
            />
            {privateRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={<LayoutWrapper>{route.element}</LayoutWrapper>}
              />
            ))}
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
