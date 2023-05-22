import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { privateRoutes, publicRoutes } from '../src//routes/routes';
import 'antd/dist/reset.css';
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from 'react';
// import jwt_decode from 'jsonwebtoken';

// npm run dev

function App() {

localStorage.clear();
useEffect(()=>{
  const token= localStorage.getItem('token');
  console.log(token)
 
})

  let token = null;
  const storedToken = localStorage.getItem("token");

  try {
    token = JSON.parse(storedToken);
  } catch (error) {
    console.error("Error parsing token from localStorage:", error);
  }



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
            element={token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
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
