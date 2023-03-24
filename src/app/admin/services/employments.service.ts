import { LocalService } from 'src/app/config/local.service';
import { Injectable } from '@angular/core';
import { api } from 'src/app/config/axios.config';

@Injectable({
  providedIn: 'root'
})
export class EmploymentsService {
  token?: string;

  constructor(
    private Local: LocalService
  ) { }

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

  FindAll(body: any){
    this.token = this.Local.findDataLocal('token');
    return api.post(`/employment/getAll`, body, {
      headers: {Authorization: "Bearer " + this.token}
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response
    })
  }

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

  Delete(uuid: string){
    this.token = this.Local.findDataLocal('token');
    return api.delete(`/employment/delete/${uuid}`,{
      headers:{Authorization: "Bearer " + this.token}
    })
    .then((res) => res.data)
    .catch((err)=>{
      throw err.response
    })
  }
}
