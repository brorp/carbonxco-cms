import axios from 'axios';

const BASE_URL = 'https://2b25-2001-448a-300e-3b19-691f-8a3b-864d-fc9d.ngrok-free.app';
const VERSIONING = '/api/v1';
const API_URL = BASE_URL + VERSIONING;
const createAPI = (baseURL = API_URL, config = {}) => {
  const axiosInstance = axios.create({
    baseURL,
    withCredentials: false,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': true,
    },
    ...config,
  });

  return axiosInstance;
};

const VIPApi = createAPI();

export default VIPApi;
