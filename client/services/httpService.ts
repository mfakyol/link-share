const send = async (
  method: RequestInit["method"],
  endPoint: URL | RequestInfo,
  options?: RequestInit,
  data?: Record<string, unknown> | FormData,
  withCookie: boolean = false
) => {
  if (!options) options = {} as RequestInit;
  if (data) {
    if (data instanceof FormData) options.body = data;
    else {
      options.body = JSON.stringify(data);
      options.headers = { ...options.headers, "Content-Type": "application/json" };
    }
  }

  options.method = method;

  if (withCookie) options.credentials = "include";

  const response = await fetch(endPoint, options);

  if (response.status === 401) {
    // // will logout
    // storeDispatch(setIsLogin(false));
  }

  if (response.status === 500) {
    return response;
  }

  return response;
};

class HttpService {
  get = (endPoint: string, options?: RequestInit) => send("GET", endPoint, options);
  post = (endPoint: string, data?: Record<string, unknown> | FormData, options?: RequestInit) => send("POST", endPoint, options, data);
  put = (endPoint: string, data?: Record<string, unknown> | FormData, options?: RequestInit) => send("PUT", endPoint, options, data);
  del = (endPoint: string, options?: RequestInit) => send("DELETE", endPoint, options);

  getWithAuth = (endPoint: string, options?: RequestInit) => send("GET", endPoint, options, undefined, true);
  postWithAuth = (endPoint: string, data?: Record<string, unknown> | FormData, options?: RequestInit) => send("POST", endPoint, options, data, true);
  putWithAuth = (endPoint: string, data?: Record<string, unknown> | FormData, options?: RequestInit) => send("PUT", endPoint, options, data, true);
  delWithAuth = (endPoint: string, options?: RequestInit) => send("DELETE", endPoint, options, undefined, true);
}
const httpService = new HttpService();

export default Object.freeze(httpService);
