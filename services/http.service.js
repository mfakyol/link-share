const sendRequest = (method, endPoint, options = {}) => {
  const { headers = {}, ...rest } = options;

  return fetch(endPoint, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...rest,
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

const _get = (endPoint, options) => {
  return sendRequest("GET", endPoint, options);
};

const _post = (endPoint, body, options) => {
  return sendRequest("POST", endPoint, { ...options, body: JSON.stringify(body) });
};

const _put = (endPoint, body, options) => {
  return sendRequest("PUT", endPoint, { ...options, body });
};

const _delete = (endPoint, body, options) => {
  return sendRequest("DELETE", endPoint, { ...options, body });
};

const _getWithAuth = (endPoint, options) => {
  return _get(endPoint, setAuthToken(options));
};
const _postWithAuth = (endPoint, body, options) => {
  return _post(endPoint, body, setAuthToken(options));
};
const _putWithAuth = (endPoint, body, options) => {
  return _put(endPoint, body, setAuthToken(options));
};
const _deleteWithAuth = (endPoint, body, options) => {
  return _delete(endPoint, body, setAuthToken(options));
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
