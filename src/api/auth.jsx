import axios from "axios";

export const loginApi = async (email, password) => {
  try {
    const response = await axios.post("http://localhost:8080/api/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const registerApi = async (
  name,
  email,
  password,
  contactNumber,
  joiningDate
) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/auth/register",
      {
        name,
        email,
        password,
        contactNumber,
        joiningDate,
        role: "HR",
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const forgotPasswordApi = async (email) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/auth/forgotpass",
      {
        email,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const resetPasswordApi = async (resetToken, password) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/api/auth/resetpass/${resetToken}`,
      {
        newPassword: password,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const registerEmployeeApi = async (
  name,
  email,
  password,
  contactNumber,
  joiningDate,
  dept,
  checked
) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/auth/register",
      {
        name,
        email,
        password,
        contactNumber,
        joiningDate,
        role: checked,
        department: dept,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
