import { Injectable } from '@angular/core';
import { api } from "src/app/config/axios.config";
import { LocalService } from 'src/app/config/local.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  token?: string;

  constructor(
    private Local: LocalService
  ) { }

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
