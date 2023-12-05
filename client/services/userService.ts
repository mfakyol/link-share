import { apiUrl } from "@/config";
import httpService from "./httpService";

async function isUsernameExist(username: string) {
  try {
    const response = await httpService.get(`${apiUrl}/user/isUsernameExist?username=${username}`);
    if (response.ok) {
      const data = await response.json();
      if (!data.status) return { status: false, message: data.message };
      return data;
    } else return { status: false, message: "unknown_error" };
  } catch (error) {
    return { status: false, message: "unknown_error" };
  }
}

async function isEmailExist(email: string) {
  try {
    const response = await httpService.get(`${apiUrl}/user/isEmailExist?email=${email}`);
    if (response.ok) {
      const data = await response.json();
      if (!data.status) return { status: false, message: data.message };
      return data;
    } else return { status: false, message: "unknown_error" };
  } catch (error) {
    return { status: false, message: "unknown_error" };
  }
}

async function register({ username, email, password }: { username: string; email: string; password: string }) {
  try {
    const response = await httpService.postWithAuth(`${apiUrl}/user/register`, {
      username,
      email,
      password,
    });
    if (response.ok) {
      const data = await response.json();
      if (!data.status) return { status: false, message: data.message };
      return { status: true };
    } else return { status: false, message: "unknown_error" };
  } catch (error) {
    return { status: false, message: "unknown_error" };
  }
}

async function login({ username, password }: { username: string; password: string }) {
  try {
    const response = await httpService.postWithAuth(`${apiUrl}/user/login`, {
      username,
      password,
    });

    if (response.ok) {
      const data = await response.json();
      if (!data.status) return { status: false, message: data.message };
      return data;
    } else return { status: false, message: "unknown_error" };
  } catch (error) {
    return { status: false, message: "unknown_error" };
  }
}
async function logout() {
  try {
    const response = await httpService.postWithAuth(`${apiUrl}/user/logout`);

    if (response.ok) {
      const data = await response.json();
      if (!data.status) return { status: false, message: data.message };
      return data as { status: boolean };
    } else return { status: false, message: "unknown_error" };
  } catch (error) {
    return { status: false, message: "unknown_error" };
  }
}

type GetAccountData = { status: false; message: string } | { status: true; data: AccounData };

async function getAccountData(): Promise<GetAccountData> {
  try {
    const response = await httpService.getWithAuth(`${apiUrl}/user/accountData`);

    if (response.ok) {
      const data = await response.json();
      if (!data.status) return { status: false, message: data.message };
      return data as { status: true; data: AccounData };
    } else return { status: false, message: "unknown_error" };
  } catch (error) {
    return { status: false, message: "unknown_error" };
  }
}

const userService = {
  isUsernameExist,
  isEmailExist,
  register,
  login,
  logout,
  getAccountData,
};

export default userService;
