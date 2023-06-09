import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Attendance from "../pages/Attendance";
import ResetPassword from "../pages/ResetPassword";
import Employees from "../pages/Employees/Employees";
import ForgotPassword from "../pages/ForgotPassword";
import EmployeeLeaves from "../pages/Leaves/EmployeeLeaves";
import EmployeeDetails from "../pages/Employees/EmployeeDetails";
import RegisterEmployee from "../pages/Employees/RegisterEmployees";

const publicRoutes = [
  { path: "/login", element: <Login />, layout: null },
  { path: "/register", element: <Register />, layout: null },
  { path: "/forgot-password", element: <ForgotPassword />, layout: null },
  {
    path: "reset-password/:resetToken",
    element: <ResetPassword />,
    layout: null,
  },
];

const privateRoutes = [
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/employees", element: <Employees /> },
  { path: "/employee/:id", element: <EmployeeDetails /> },
  { path: "/registeremployee", element: <RegisterEmployee /> },
  { path: "/attendance", element: <Attendance /> },
  { path: "/leaves", element: <EmployeeLeaves /> },
];

export { publicRoutes, privateRoutes };
