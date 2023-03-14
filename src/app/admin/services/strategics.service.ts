import { Injectable } from '@angular/core';
import { api } from "src/app/config/axios.config";
import { LocalService } from 'src/app/config/local.service';

@Injectable({
  providedIn: 'root'
})
export class StrategicsService {
  token?: string;

  constructor(
    private Local: LocalService
  ) {}

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
