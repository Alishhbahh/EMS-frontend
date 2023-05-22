import {useState} from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const user=  useSelector((state) => state.user);
    const [count, setCount] = useState(0)
    console.log("user in dashboard", user)

    return (
        <>
        <div>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </>
    )
}

export default Dashboard;