import  Login  from "../pages/Login";
import  Register  from "../pages/Register";
import Dashboard  from "../pages/Dashboard";

const publicRoutes = [
    { path: "/login", element: <Login/> },
    { path: "/register", element: <Register/> },
];

const privateRoutes = [
    { path: "/dashboard", element: <Dashboard/> },
];



export { publicRoutes, privateRoutes };
