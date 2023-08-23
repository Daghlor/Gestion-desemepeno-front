import { Injectable } from '@angular/core';
import { api } from "src/app/config/axios.config";
import { LocalService } from 'src/app/config/local.service';

// SERVICIO DE OBJETIVOS INDIVIDUALES QUE MANDA SOLICITUDES AL BACK
@Injectable({
  providedIn: 'root'
})
export class IndividualService {
  token?: string;
  constructor(
    private Local: LocalService
  ) { }

  // METODO POST PARA CREAR LOS OBJETIVOS INDIVIDUALES
  Create(body: any){
    this.token = this.Local.findDataLocal('token');
    return api.post(`/individuals/create`, body, {
      headers: {Authorization: "Bearer " + this.token}
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response
    })
  }

  // METODO POST PARA BUSCAR O TRAER TODOS LOS OBJETIVOS INDIVIDUALES
  FindAll(body: any){
    this.token = this.Local.findDataLocal('token');
    return api.post(`/individuals/getAll`, body, {
      headers: {Authorization: "Bearer " + this.token}
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response
    })
  }

  // METODO GET PARA BUSCAR O TRAER UN SOLO OBJETIVO INDIVIDUAL
  FindOne(uuid: string){
    this.token = this.Local.findDataLocal('token');
    return api.get(`/individuals/getOne/${uuid}`, {
      headers: {Authorization: "Bearer " + this.token}
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response
    })
  }

  FindAllByUserId(uuid: string) {
    this.token = this.Local.findDataLocal('token');
    return api.get(`/individuals/FindAllByUserUniqueId/${uuid}`, {
      headers: {Authorization: "Bearer " + this.token}
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response
    })
  }

  // METODO DELETE PARA ELIMINAR LOS OBJETIVOS INDIVIDUALES
  Delete(uuid: string){
    this.token = this.Local.findDataLocal('token');
    return api.delete(`/individuals/delete/${uuid}`,{
      headers: {Authorization: "Bearer " + this.token}
    })
    .then((res)=>res.data)
    .catch((err)=>{
      throw err.response
    })
  }

  UpdateState(uuid: string, body: any) {
    this.token = this.Local.findDataLocal('token');
    return api.put(`/individuals/UpdateState/${uuid}`, body,{
      headers: {Authorization: "Bearer " + this.token}
    })
    .then((res) => res.data)
      .catch((err) => {
      throw err.response
    })
  }

}
