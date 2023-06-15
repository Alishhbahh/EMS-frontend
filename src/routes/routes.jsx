import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Dashboard from "../pages/Dashboard";
import Attendance from "../pages/Attendance";
import ResetPassword from "../pages/Auth/ResetPassword";
import Employees from "../pages/Employees/Employees";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import EmployeeLeaves from "../pages/Leaves/EmployeeLeaves";
import EmployeeDetails from "../pages/Employees/EmployeeDetails";
import RegisterEmployee from "../pages/Employees/RegisterEmployees";
import EmployeeSchedule from "../pages/Schedule/EmployeeSchedule";

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
  { path: "/schedule", element: <EmployeeSchedule /> },
];

export { publicRoutes, privateRoutes };
