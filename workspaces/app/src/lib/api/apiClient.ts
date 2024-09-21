import axios from 'axios';

const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: process.env['API_URL'] || '/',
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 60000,
    maxBodyLength: Infinity,
    maxContentLength: Infinity,
  });

  return instance;
};

export const apiClient = createAxiosInstance();
