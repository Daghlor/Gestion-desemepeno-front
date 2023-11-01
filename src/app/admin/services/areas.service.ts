import { Injectable } from '@angular/core';
import { api } from 'src/app/config/axios.config';
import { LocalService } from 'src/app/config/local.service';

// SERVICIO DE AREAS QUE MANDA SOLICITUDES AL BACK
@Injectable({
  providedIn: 'root'
})
export class AreasService {
  token?: string;

  constructor(
    private Local: LocalService
  ) { }

  // METODO POST PARA CREAR AREA
  Create(body: any){
    this.token = this.Local.findDataLocal('token');
    return api.post(`/area/create`, body, {
      headers: {Authorization: "Bearer " + this.token}
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response
    })
  }

  // METODO POST PARA BUSCAR O TRAER LAS AREAS
  FindAll(body: any){
    this.token = this.Local.findDataLocal('token');
    return api.post(`/area/getAll`, body, {
      headers: {Authorization: "Bearer " + this.token}
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response
    })
  }

  // METODO GET PARA BUSCAR UNA SOLA AREA
  FindOne(uuid: string){
    this.token = this.Local.findDataLocal('token');
    return api.get(`/area/getOne/${uuid}`, {
      headers: {Authorization: "Bearer " + this.token}
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response
    })
  }

  // METODO PUT PARA ACTUALIZAR UNA AREA
  Update(uuid: string, body: any){
    this.token = this.Local.findDataLocal('token');
    return api.put(`/area/update/${uuid}`, body, {
      headers: {Authorization: "Bearer " + this.token}
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response
    })
  }

  // METODO DELETE PARA ELIMINAR UNA AREA
  Delete(uuid: string){
    this.token = this.Local.findDataLocal('token');
    return api.delete(`/area/delete/${uuid}`, {
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
