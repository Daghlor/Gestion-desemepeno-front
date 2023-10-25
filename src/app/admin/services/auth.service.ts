import { Injectable } from '@angular/core';
import { api } from "src/app/config/axios.config";
import { LocalService } from 'src/app/config/local.service';

// SERVICIO DE AUTENTIFICACION QUE MANDA SOLICITUDES AL BACK
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token?: string;

  constructor(
    private Local: LocalService
  ) {
  }

  // METODO GET PARA ENCONTRAR LOS DATOS VALIDOS
  FindData(){
    this.token = this.Local.findDataLocal('token');
    return api.get(`/auth/findData`, {
      headers: {Authorization: "Bearer " + this.token}
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response
    })
  }
}

// Copyright (c) Engagement
// https://www.engagement.com.co/
// Año: 2023
// Sistema: Gestion de desempeño (GDD)
// Programador: David Tuta
