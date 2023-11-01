import { Injectable } from '@angular/core';
import { api } from "src/app/config/axios.config";
import { LocalService } from 'src/app/config/local.service';
import { from } from 'rxjs';

// SERVICIO DE SEGUIMIENTOS QUE MANDA SOLICITUDES AL BACK
@Injectable({
  providedIn: 'root'
})
export class TrackingService {
  token?: string;

  constructor(
    private Local: LocalService
  ) { }

  // METODO POST PARA CREAR UN SEGUIMIENTO
  Create(body: any){
    this.token = this.Local.findDataLocal('token');
    return api.post(`/tracing/create`, body, {
      headers: {Authorization: "Bearer " + this.token}
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response
    })
  }

  // METODO POST PARA BUSCAR O TRAER TODOS LOS SEGUIMIENTOS
  FindAll(body: any){
    this.token = this.Local.findDataLocal('token');
    return api.post(`/tracing/getAll`, body, {
      headers: {Authorization: "Bearer " + this.token}
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response
    })
  }

  // METODO POST PARA BUSCAR O TRAER LOS USUARIOS RELACIONADO AL SEGUIMIENTO
  FindAllUser(body: any){
    this.token = this.Local.findDataLocal('token');
    return api.post(`/tracing/getAll/users`, body, {
      headers: {Authorization: "Bearer " + this.token}
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response
    })
  }

  // METODO GET PARA BUSCAR O TRAER UN SOLO SEGUIMIENTO
  FindOne(uuid: string){
    this.token = this.Local.findDataLocal('token');
    return api.get(`/tracing/getOne/${uuid}`, {
      headers: {Authorization: "Bearer " + this.token}
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response
    })
  }

  // METODO PUT PARA AGREGAR COMENTARIO DE SEGUIMIENTO DEL EMPLEADO
  addEmployComment(uuid: string, body: any){
    this.token = this.Local.findDataLocal('token');
    return api.put(`/tracing/addEmployeeComment/${uuid}`, body, {
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
