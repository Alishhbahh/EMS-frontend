import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { privateRoutes, publicRoutes } from '../src//routes/routes';
import 'antd/dist/reset.css';
import "react-toastify/dist/ReactToastify.css";

// npm run dev

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("user", user);


  return (
    <>
     <div>
      <Router>
        <Routes>
          {publicRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
          <Route
            path="/"
            element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
          />
          {privateRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Router>
    </div>
    </>
  )
}

export default App
