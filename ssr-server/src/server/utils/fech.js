import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const fetch = () => {
  const fetch = axios.create({
    baseURL: process.env.API_URL,
  });
  return fetch;
};

export default fetch();
