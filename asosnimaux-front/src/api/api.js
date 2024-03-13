// Constants
import { APP_ROUTES } from "../constants/route.const.js"

// ******************** POST ********************
const postRequest = async (url, body = {}, token) => {
  const config = {
    method: "POST",
    body: body instanceof FormData ? body : JSON.stringify(body),
    headers: body instanceof FormData ? {} : { "Content-type": "application/json; charset=UTF-8" }
  }

  if (token) config.headers.Authorization = token;

  return await request(url, config);
}
// ******************** END POST ********************

// ******************** GET ********************
const getRequest = async (url, token) => {
  const config = {
    method: "GET",
    headers: { "Content-type": "application/json; charset=UTF-8" }
  }

  if (token) config.headers.Authorization = token;

  const response = await request(url, config);

  return response;
}
// ******************** END GET ********************

// ******************** PUT ********************
const putRequest = async (url, body = {}, token) => {
  const config = {
    method: "PUT",
    body: JSON.stringify(body),
    headers: { "Content-type": "application/json; charset=UTF-8" }
  }

  if (token) config.headers.Authorization = token;

  return await request(url, config)
}
// ******************** END PUT ********************

// ******************** DELETE ********************
const deleteRequest = async (url, token) => {
  const config = {
    method: "DELETE",
    headers: { "Content-type": "application/json; charset=UTF-8" }
  }

  if (token) config.headers.Authorization = token;

  return await request(url, config);
}
// ******************** END DELETE ********************

// Base request
const request = async (url, config) => {
  let result = [];
  let error = null;
  let status = -1;

  try {
    const response = await fetch(`${APP_ROUTES.API_URL}${url}`, config);
    status = response.status;
    result = await response.json();
    if (status >= 400) throw new Error(`Error ${status}: ${result?.message}`);
  }
  catch (err) {
    error = err.message;
  }
  finally {
    return { result, error, status };
  }
}

export { getRequest, postRequest, putRequest, deleteRequest };