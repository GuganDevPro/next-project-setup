export const emailValidation = (event) => {
  const char = event.key;
  const validChars = /^[a-zA-Z0-9-.@]+$/;
  if (!validChars.test(char))
    event.preventDefault();
};

export const numOnly = (input) => {
  const regex = /^\d+$/;
  if (!regex.test(input.key))
    input.preventDefault();
};

export const numAndChar = (event) => {
  const regex = /^[a-zA-Z0-9]+$/;
  if (!regex.test(event.key))
    event.preventDefault();
};

export const charOnly = (event) => {
  const regex = /^[a-zA-Z]+$/;
  if (!regex.test(event.key))
    event.preventDefault();
};

export const minutesToSeconds = (minutes) => {
  return minutes * 60;
};

export const minutesToMilliseconds = (minutes) => {
  return minutes * 60 * 1000;
};