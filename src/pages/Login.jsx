import { useEffect } from "react";

const Login = () => {
    useEffect (() => {
        console.log("Login page");
    }, []);

    return (
        <div>
        <h1>Login Page</h1>
        </div>
    );
    }

export default Login;