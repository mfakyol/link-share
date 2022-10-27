import http from "./http.service";

const signup = (endPoint, email, password) => {
  return http.post("/api/signup", { endPoint, email, password });
};

const login = (email, password) => {
  return http.post("/api/login", { email, password });
};

export const authService = {
  signup,
  login,
};
