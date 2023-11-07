function isValidEmail(email: string) {
  if (email.length === 0) return { isvalid: false, error: "email_required" };

  const reEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (reEmail.test(email.toString())) return { isValid: true, error: "" };
  return { isValid: false, error: "email_not_valid" };
}

function validatePassword(password: string) {
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSpecial = /[@$!%*?&.,_]/.test(password);

  let isValid = true;

  if (!hasLowercase) isValid = false;
  else if (!hasUppercase) isValid = false;
  else if (!hasDigit) isValid = false;
  else if (!hasSpecial) isValid = false;
  return { isValid, error: !isValid ? "password_not_valid" : "" };
}

const validateService = {
  isValidEmail,
  validatePassword,
};

export default validateService;
