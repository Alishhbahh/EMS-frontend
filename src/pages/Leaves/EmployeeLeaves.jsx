import "../../styles/dashboard.css";
import "../../styles/leaves.css";

import { useSelector } from "react-redux";

import { EmpLeavesList } from "../../components/Leaves/EmpLeaveList";

const EmployeeLeaves = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className="content-div">
      <EmpLeavesList user={user} />
    </div>
  );
};

export default EmployeeLeaves;
