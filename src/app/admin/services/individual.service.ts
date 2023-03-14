import { Injectable } from '@angular/core';
import { api } from "src/app/config/axios.config";
import { LocalService } from 'src/app/config/local.service';

@Injectable({
  providedIn: 'root'
})
export class IndividualService {
  token?: string;

  constructor(
    private Local: LocalService
  ) {}

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

}
