import axios from "axios";

export const clockInApi = async (id, date, clockInTime) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/api/attendance/clockin/${id}`,
      {
        date,
        clockInTime,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const clockOutApi = async (id, date, clockOutTime) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/attendance/clockout/${id}`,
      {
        date,
        clockOutTime,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAttendanceApi = async (id, month) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/api/attendance/attendance/${id}`,
      {
        month,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getCurrentAttendanceApi = async (date, id) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/api/attendance/currentAttendance/${id}`,
      {
        date,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
