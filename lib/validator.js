const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const validateEmail = (email) => {
  if (!email) return "Please enter email address.";
  if (!emailRegex.test(email)) return "Email not valid.";
  return null;
};

const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.,]).{8,32}$/;

export const validatePassword = (password) => {
  if (!password) return "Please enter password.";
  if (!passwordRegex.test(password))
    return "Password must be between 8 and 32 characters, contains at least one uppercase, lowercase and special character.";
  return null;
};

export const validateUrl = (url) => {
  const urlRegex =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
  if (!url) return "Please enter url.";
  if (!urlRegex.test(url)) return "Invalid url.";
  return null;
};

export const validateLinkTitle = (linkTitle="") => {
  if (!linkTitle.trim()) return "Please enter title.";
  return null;
};
