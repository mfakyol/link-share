const sendRequest = (method, endPoint, options = {}, isAuthRequest = false) => {
  if (isAuthRequest) setAuthToken(options);
  if (options.body) formatBody(options);

  return fetch(endPoint, {
    method,
    ...options,
  }).then((response) => {
    if (!response.ok) {
      const responseError = {
        statusText: response.statusText,
        status: response.status,
      };
      throw responseError;
    }
    return response;
  });
};

const setAuthToken = (options = {}) => {
  const token = localStorage.getItem("token");

  if (token) {
    if (!options.headers) {
      options.headers = {};
    }
    options.headers.Authorization = `Token ${token}`;
  }

  return options;
};

const formatBody = (options) => {
  if (!options.body) return;
  if (!(options.body instanceof FormData)) {
    if (!options.headers) options.headers = {};
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(options.body);
  }
};

const _get = (endPoint, options) => {
  return sendRequest("GET", endPoint, options);
};

const _post = (endPoint, options) => {
  return sendRequest("POST", endPoint, options);
};

const _put = (endPoint, options) => {
  return sendRequest("PUT", endPoint, options);
};

const _delete = (endPoint, options) => {
  return sendRequest("DELETE", endPoint, options);
};

const _getWithAuth = (endPoint, options) => {
  return sendRequest("GET", endPoint, options, true);
};
const _postWithAuth = (endPoint, options) => {
  return sendRequest("POST", endPoint, options, true);
};
const _putWithAuth = (endPoint, options) => {
  return sendRequest("PUT", endPoint, options, true);
};
const _deleteWithAuth = (endPoint, options) => {
  return sendRequest("DELETE", endPoint, options, true);
};

const http = {
  get: _get,
  post: _post,
  put: _put,
  delete: _delete,
  getWithAuth: _getWithAuth,
  postWithAuth: _postWithAuth,
  putWithAuth: _putWithAuth,
  deleteWithAuth: _deleteWithAuth,
};

export default http;
