export const validateEmail = (mail) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/;
  if (mail.match(emailPattern)) return true;
  else return false;
};

export const validatePassword = (password) => {
  return password.length > 6 && password.length < 12;
};

export const validateUsername = (username) => {
  return username.length > 2 && username.length < 12;
};

export const validateLoginForm = ({ email, password }) => {
  const isMailValid = validateEmail(email);
  const isPasswordValid = validatePassword(password);
  return isMailValid && isPasswordValid;
};

export const validateRegisterForm = ({ email, password, name }) => {
  const isMailValid = validateEmail(email);
  const isPasswordValid = validatePassword(password);
  const isUsernameValid = validateUsername(name);
  return isMailValid && isPasswordValid && isUsernameValid;
};
