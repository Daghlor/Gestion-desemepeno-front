import { Injectable } from '@angular/core';
import { LocalService } from '../config/local.service';
import { api } from "src/app/config/axios.config";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  token?: string

  constructor(
    private Local: LocalService
  ) { }

  Create(body: any){
    this.token = this.Local.findDataLocal('token');
    return api.post(`/public/register`, body,{
      headers: {Authorization: "Bearer"+ this.token}
    })
    .then((res) => res.data)
    .catch((err) =>{
      throw err.response
    })
  }
}
