import { Injectable } from '@angular/core';
import { api } from 'src/app/config/axios.config';
import { LocalService } from 'src/app/config/local.service';

// SERVICIO DE ACCIONES DE FORMACION QUE MANDA SOLICITUDES AL BACK
@Injectable({
  providedIn: 'root'
})
export class TrainingActionsService {
  token?: string;
  constructor(
    private Local: LocalService
  ) { }

  // METODO POST PARA CREAR UNA ACCION DE FORMACION
  Create(body: any) {
    this.token = this.Local.findDataLocal('token');
    return api.post(`/training/create`, body, {
      headers: { Authorization: "Bearer" + this.token }
    })
      .then((res) => res.data)
      .catch((err) => {
        throw err.response
      })
  }

  // METODO POST PARA TRAER TODAS LAS ACCIONES DE FORMACION
  FindAll(body: any) {
    this.token = this.Local.findDataLocal('token');
    return api.post(`/training/getAll`, body, {
      headers: { Authorization: "Bearer " + this.token }
    })
      .then((res) => res.data)
      .catch((err) => {
        throw err.response
      })
  }

  // METODO GET PARA ENCONTRARA TODOAS LAS ACCIONES DE FORMACION DE UN USUARIO POR SU UNIQUE_ID
  FindAllByUserId(uuid: string) {
    this.token = this.Local.findDataLocal('token');
    return api.get(`/training/FindAllByUserUniqueId/${uuid}`, {
      headers: {Authorization: "Bearer " + this.token}
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response
    })
  }

  // METODO PUT PARA ACTUALIZAR UNA ACCION DE FORMACION
  Update(uuid: string, body: any) {
    this.token = this.Local.findDataLocal('token');
    return api.put(`/training/update/${uuid}`, body, {
      headers: {Authorization: "Bearer " + this.token}
    })
      .then((res) => res.data)
      .catch((err) => {
      throw err.response
    })
  }

  // METODO DELETE PARA ELIMINAR UNA ACCION DE FORMACION
  Delete(uuid: string) {
    this.token = this.Local.findDataLocal('token');
    return api.delete(`/training/delete/${uuid}`, {
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
