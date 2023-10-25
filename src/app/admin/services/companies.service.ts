import { Injectable } from '@angular/core';
import { api } from "src/app/config/axios.config";
import { LocalService } from 'src/app/config/local.service';

// SERVICIO DE EMPRESAS QUE MANDA SOLICITUDES AL BACK
@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  token?: string;

  constructor(
    private Local: LocalService
  ) {}

  // METODO POST PARA CREAR UNA EMPRESA
  Create(body: any){
    this.token = this.Local.findDataLocal('token');
    return api.post(`/company/create`, body, {
      headers: {Authorization: "Bearer " + this.token}
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response
    })
  }

  // METODO POST PARA TRAER O BUSCAR LAS EMPRESAS
  FindAll(body: any){
    this.token = this.Local.findDataLocal('token');
    return api.post(`/company/getAll`, body, {
      headers: {Authorization: "Bearer " + this.token}
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response
    })
  }

  // METOD GET PARA BUSCAR O TRAER UNA SOLA EMPRESA
  FindOne(uuid: string){
    this.token = this.Local.findDataLocal('token');
    return api.get(`/company/getOne/${uuid}`, {
      headers: {Authorization: "Bearer " + this.token}
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response
    })
  }

  // METODO PUT PARA ACTUALIZAR UNA EMPRESA
  Update(uuid: string, body: any){
    this.token = this.Local.findDataLocal('token');
    return api.put(`/company/update/${uuid}`, body, {
      headers: {Authorization: "Bearer " + this.token}
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response
    })
  }

  // METODO DELETE PARA ELIMINAR UNA EMPRESA
  Delete(uuid: string){
    this.token = this.Local.findDataLocal('token');
    return api.delete(`/company/delete/${uuid}`, {
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
