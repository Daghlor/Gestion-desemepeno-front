import { Injectable } from '@angular/core';
import { api } from "src/app/config/axios.config";
import { LocalService } from 'src/app/config/local.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token?: string;

  constructor(
    private Local: LocalService
  ) {}

  FindData(){
    this.token = this.Local.findDataLocal('token');
    return api.get(`/auth/findData`, {
      headers: {Authorization: "Bearer " + this.token}
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response
    })
  }
}
