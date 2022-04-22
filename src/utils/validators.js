// Check whether the email is valid or not
export const isValidEmail = (email) => {
  if (!email) return false;

  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  return email.match(regex) ? true : false;
};

// Check whether the password is valid or not
export const isPasswordValid = (password) => {
  if (!password) return false;

  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#])[A-Za-z\d$@$!%*?&#]{8,}/;

  return password.match(regex) ? true : false;
};

// check if a field contains only alphabets
export const isOnlyTextValid = (text) => {
  if (!text) return false;

  const regex = /^[A-Za-z]+$/;

  return text.match(regex) ? true : false;
};

export const isInputValid = (input) => {
  return input?.trim();
};
