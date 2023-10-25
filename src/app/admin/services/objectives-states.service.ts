import { Injectable } from '@angular/core';
import { api } from "src/app/config/axios.config";
import { LocalService } from 'src/app/config/local.service';

// SERVICIO DE ESTADOS DE OBJETIVOS QUE MANDA SOLICITUDES AL BACK
@Injectable({
  providedIn: 'root'
})
export class ObjectivesStatesService {
token?: string;
  constructor(
    private Local: LocalService
  ) { }

  // METODO POST PARA BUSCAR TODOS LOS OBJETIVOS CON LO ESTADOS
  FindAll(body: any){
    this.token = this.Local.findDataLocal('token');
    return api.post(`/stateObjectives/index`, body, {
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
