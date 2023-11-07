export function isValidEmail(email: string) {
  const reEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reEmail.test(email.toString());
}

export function isValidUsername(username: string) {
  return typeof username === 'string';
}

export function isValidHexColor(color: string) {
  return /^#[0-9A-F]{6}[0-9a-f]{0,2}$/i.test(color);
}
