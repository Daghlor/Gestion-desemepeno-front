import axios from 'axios';
import { environment } from 'src/environments/environment';

// ESTA CONFIG AXIOS ES PARA RECIBIR PARAMETROS DE ENVIROMENT QUE ES DONDE SE ALOJA LA URL DEL BACK PARA LA CONEXION
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

  // Copyright (c) Engagement
// https://www.engagement.com.co/
// Año: 2023
// Sistema: Gestion de desempeño (GDD)
// Programador: David Tuta
