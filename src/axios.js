import axios from 'axios';

const success = (res) => res;

const error = (err) => {
  const { status } = err.response;
  if (status === 404 || status === 403) {
    console.log('ERRO - PASSANDO!');
  }
  return Promise.reject(err);
};

axios.interceptors.response.use(success, error);
