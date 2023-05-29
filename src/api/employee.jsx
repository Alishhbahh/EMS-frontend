import axios from "axios";

export const getEmployeesApi = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/emp/getemployees"
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getDepartmentsApi = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/emp/getdepts");
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
