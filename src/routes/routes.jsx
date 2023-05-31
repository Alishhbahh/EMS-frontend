import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import Employees from "../pages/Employees/Employees";
import RegisterEmployee from "../pages/Employees/RegisterEmployees";
import EmployeeDetails from "../pages/Employees/EmployeeDetails";

const publicRoutes = [
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "reset-password/:resetToken", element: <ResetPassword /> },
];

const privateRoutes = [
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/employees", element: <Employees /> },
  { path: "/employee/:id", element: <EmployeeDetails /> },
  { path: "/registeremployee", element: <RegisterEmployee /> },
];

export { publicRoutes, privateRoutes };
