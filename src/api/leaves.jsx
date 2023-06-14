import axios from "axios";

export const requestLeaveApi = async (id, type, reason, startDate, endDate) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/api/leave/requestleave/${id}`,
      {
        type,
        reason,
        startDate,
        endDate,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getEmployeeLeavesApi = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/leave/getempleaves/${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getLeavesApi = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/leave/allleaves"
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const replyLeaveApi = async (id, leaveId, status) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/leave/replyleave/${id}`,
      {
        status,
        leaveId,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
