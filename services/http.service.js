const sendRequest = (method, endPoint, options) => {
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

const http = {
  get: _get,
  post: _post,
  put: _put,
  delete: _delete,
};

export default http;
