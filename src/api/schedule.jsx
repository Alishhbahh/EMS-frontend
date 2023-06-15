import axios from "axios";

export const addScheduleApi = async (id, event, date) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/api/schedule/addschedule/${id}`,
      {
        event,
        date,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getScheduleApi = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/schedule/schedule/${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
