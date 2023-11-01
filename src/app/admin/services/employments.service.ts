import { LocalService } from 'src/app/config/local.service';
import { Injectable } from '@angular/core';
import { api } from 'src/app/config/axios.config';

// SERVICIO DE CARGOS QUE MANDA SOLICITUDES AL BACK
@Injectable({
  providedIn: 'root'
})
export class EmploymentsService {
  token?: string;

  constructor(
    private Local: LocalService
  ) { }

  // METODO POST PARA CREAR UN CARGO
  Create (body: any){
    this.token = this.Local.findDataLocal('token');
    return api.post(`/employment/create`, body, {
      headers:{Authorization:"Bearer"+this.token}
    })
    .then((res) => res.data)
    .catch((err) =>{
      throw err.response
    })
  }

  // METODO POST PARA BUSCAR O TRAER LOS CARGOS
  FindAll(body: any){
    this.token = this.Local.findDataLocal('token');
    return api.post(`/employment/getAll`, body, {
      headers:{Authorization: 'Bearer' + this.token}
    })
    .then((res)=> res.data)
    .catch((err)=>{
      throw err.response
    })
  }

  // METODO GET PARA BUSCAR O TRAER UN SOLO CARGO
  FinOne(uuid: string){
    this.token = this.Local.findDataLocal('token');
    return api.get(`/employment/getOne/${uuid}`,{
      headers:{Authorization: "Bearer"+this.token}
    })
    .then((res)=>res.data)
    .catch((err) =>{
      throw err.response
    })
  }

  // METODO PUT PARA ACTUALIZAR UN CARGO
  Update(uuid: string,body:any){
    this.token = this.Local.findDataLocal('token');
    return api.put(`/employment/update/${uuid}`, body, {
      headers: {Authorization:"Bearer"+this.token}
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response
    })
  }

  // METODO DELETE PARA ELIMINAR UN CARGO
 Delete(uuid: string){
  this.token = this.Local.findDataLocal('token');
  return api.delete(`/employment/delete/${uuid}`,{
    headers: {Authorization: "Bearer" + this.token}
  })
  .then((res)=> res.data)
  .catch((err)=>{
    throw err.response
  })
 }
}

// Copyright (c) Engagement
// https://www.engagement.com.co/
// Año: 2023
// Sistema: Gestion de desempeño (GDD)
// Programador: David Tuta
