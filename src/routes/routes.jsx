import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";

const publicRoutes = [
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "reset-password/:resetToken", element: <ResetPassword /> },
];

const privateRoutes = [{ path: "/dashboard", element: <Dashboard /> }];

export { publicRoutes, privateRoutes };
