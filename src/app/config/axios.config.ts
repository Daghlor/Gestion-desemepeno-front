import axios from 'axios';
import { environment } from 'src/environments/environment';

const api = axios.create({
  baseURL: `${environment.apiUrl}/`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log('Aqui se muestra el error:', error);
    return error;
  }
);

export { api };