import { Injectable } from '@angular/core';
import { api } from "src/app/config/axios.config";
import { LocalService } from 'src/app/config/local.service';

// SERVICIO ACCIONES DE RETROALIMENTACION QUE MANDA SOLICITUDES AL BACK
@Injectable({
  providedIn: 'root'
})
export class FeedbackActionsService {
  token?: string;
  constructor(
    private Local: LocalService
  ) { }

  // METODO POST QUE CREA UNA ACCION DE RETROALIMENTACION
  Create(body: any) {
    this.token = this.Local.findDataLocal('token');
    return api.post(`/feedback/create`, body, {
      headers:{ Authorization: "Bearer " + this.token }
    })
      .then((res) => res.data)
      .catch((err) => {
      throw err.response
    })
  }

  // METODO POST PARA BUSCAR TODAS LAS ACCIONES DE RETROALIMENTACION
  FindAll(body: any) {
    this.token = this.Local.findDataLocal('token');
    return api.post(`/feedback/getAll`, body, {
      headers:{Authorization: "Bearer " + this.token}
    })
    .then((res) => res.data)
      .catch((err) => {
      throw err.response
    })
  }

  // METODO GET PARA BUSCAR UNA ACCION POR EL UNIQUE_ID
  FindAllByUserId(uuid: string) {
    this.token = this.Local.findDataLocal('token');
    return api.get(`/feedback/FindAllByUserUniqueId/${uuid}`, {
      headers: {Authorization: "Bearer " + this.token}
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response
    })
  }

  // METODO PUT PARA ACTUALIZAR UNA ACCION DE RETROALIMENTACION
  Update(uuid: string, body: any) {
    this.token = this.Local.findDataLocal('token');
    return api.put(`/feedback/update/${uuid}`, body, {
      headers: {Authorization: "Bearer " + this.token}
    })
      .then((res) => res.data)
      .catch((err) => {
      throw err.response
    })
  }

  // METODO DELETE PARA ELIMINAR UNA ACCION DE RETROALIMENTACION
  Delete(uuid: string) {
    this.token = this.Local.findDataLocal('token');
    return api.delete(`/feedback/delete/${uuid}`, {
      headers: {Authorization: "Bearer " + this.token}
    })
      .then((res) => res.data)
      .catch((err) => {
      throw err.response
    })
  }

  FindAllStates(body: any){
    this.token = this.Local.findDataLocal('token');
    return api.post(`/feedback/states`, body, {
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
