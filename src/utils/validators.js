export const emailValidator = (email) => {
  const re = /\S+@\S+\.\S+/;
  if (!email) return "Email can't be empty.";
  if (!re.test(email)) return "Plaese enter a valid email address.";
  return "";
};

export const nameValidator = (name) => {
  if (!name) return "Name can't be empty.";
  return "";
};

export const joiningValidator = (date) => {
  if (!date) return "Date is required";
  return "";
};

export const deptValidator = (dept) => {
  if (!dept) return "Department Name is required";
  return "";
};

export const passwordValidator = (password) => {
  if (!password) return "Password can't be empty.";
  if (password.length < 6)
    return "Password must be at least 6 characters long.";
  return "";
};

export const phoneValidator = (phone) => {
  // regex for phone number validation 03328113984
  const re = /^03[0-9]{9}$/;
  if (!phone) return "Phone Number can't be empty.";
  if (!re.test(phone)) return "Please enter a valid phone number.";
  return "";
};
