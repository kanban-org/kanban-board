import axios from "axios";

import { API_BASE_URL } from "./baseUrl";

export const makeRequest = async (method, url, data = null, params = null) => {
  const config = {
    method,
    url: `${API_BASE_URL}${url}`,
    data,
    params,
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const get = async (url, params = null) => {
  return makeRequest("get", url, null, params);
};

export const post = async (url, data) => {
  return makeRequest("post", url, data);
};

export const remove = async (url) => {
  return makeRequest("delete", url);
};
