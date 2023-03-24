import { Injectable } from '@angular/core';
import { api } from 'src/app/config/axios.config';
import { LocalService } from 'src/app/config/local.service';

@Injectable({
  providedIn: 'root'
})
export class AreasService {
  token?: string;

  constructor(
    private Local: LocalService
  ) { }

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
