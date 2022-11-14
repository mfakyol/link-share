import { apiUrl } from "config";
import http from "./http.service";

const signup = (endPoint, email, password) => {
  return http.post(`${apiUrl}/signup`, { endPoint, email, password });
};

const login = (email, password) => {
  return http.post(`${apiUrl}/login`, { email, password });
};

export const authService = {
  signup,
  login,
};
