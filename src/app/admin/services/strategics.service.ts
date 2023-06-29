import { Injectable } from '@angular/core';
import { api } from "src/app/config/axios.config";
import { LocalService } from 'src/app/config/local.service';

// SERVICIO DE OBJETIVOS ESTRATEGICOS QUE MANDA SOLICITUDES AL BACK
@Injectable({
  providedIn: 'root'
})
export class StrategicsService {
  token?: string;

  constructor(
    private Local: LocalService
  ) {}

  // METODO POST PARA CREAR LOS OBEJTIVOS ESTRATEGICOS
  Create(body: any){
    this.token = this.Local.findDataLocal('token');
    return api.post(`/strategics/create`, body, {
      headers: {Authorization: "Bearer " + this.token}
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response
    })
  }

  // METODO POST PARA BUSCAR O TRAER TODOS LOS OBJETIVOS ESTRATEGICOS
  FindAll(body: any){
    this.token = this.Local.findDataLocal('token');
    return api.post(`/strategics/getAll`, body, {
      headers: {Authorization: "Bearer " + this.token}
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response
    })
  }

  // METODO GET PARA BUSCAR O TRAER UN SOLO OBJETIVO ESTRATEGIC
  FindOne(uuid: string){
    this.token = this.Local.findDataLocal('token');
    return api.get(`/strategics/getOne/${uuid}`, {
      headers: {Authorization: "Bearer " + this.token}
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response
    })
  }

  // METODO DELETE PARA ELIMINAR LOS OBJETIVOS ESTRATEGICOS
  Delete(uuid: string){
    this.token = this.Local.findDataLocal('token');
    return api.delete(`/strategics/delete/${uuid}`, {
      headers: {Authorization: "Bearer " + this.token}
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response
    })
  }
}
