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
