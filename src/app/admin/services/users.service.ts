import { Injectable } from '@angular/core';
import { api } from "src/app/config/axios.config";
import { LocalService } from 'src/app/config/local.service';

// SERVICIO DE USUARIOS QUE MANDA SOLICITUDES AL BACK
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  token?: string;

  constructor(
    private Local: LocalService
  ) { }

  // METODO POST PARA CREAR UN USUARIO
  Create(body: any){
    this.token = this.Local.findDataLocal('token');
    return api.post(`/users/register`, body, {
      headers: {Authorization: "Bearer " + this.token}
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response
    })
  }

  // METODO POST PARA BUSCAR O TRAER TODOS LOS USUARIOS
  FindAll(body: any){
    this.token = this.Local.findDataLocal('token');
    return api.post(`/users/getAll`, body, {
      headers: {Authorization: "Bearer " + this.token}
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response
    })
  }

  // METODO GET PARA BUSCAR O TRAER UN SOLO USUARIO
  FindOne(uuid: string){
    this.token = this.Local.findDataLocal('token');
    return api.get(`/users/getOne/${uuid}`, {
      headers: {Authorization: "Bearer " + this.token}
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response
    })
  }

  // METODO PUT PARA ACTUALIZAR UN USUARIO
  Update(uuid: string, body: any){
    this.token = this.Local.findDataLocal('token');
    return api.put(`/users/update/${uuid}`, body, {
      headers: {Authorization: "Bearer " + this.token}
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response
    })
  }

  // METODO DELETE PARA ELIMINAR UN USUARIO
  Delete(uuid: string){
    this.token = this.Local.findDataLocal('token');
    return api.delete(`/users/delete/${uuid}`, {
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
