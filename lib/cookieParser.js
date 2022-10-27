export const cookieParser = (cookie = "") => {
  const cookies = {};
  cookie.split(';').forEach((cookie) => {
    const parts = cookie.split('=');
    cookies[parts.shift().trim()] = decodeURI(parts.join('='));
  }
  );
  return cookies;
}
