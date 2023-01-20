import { Injectable } from '@angular/core';
import { api } from '../config/axios.config';
import { SnackbarService } from '../config/snackbar.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

constructor(
  private snack: SnackbarService,
  private auth: AuthService
) { }
public userUrl: string = 'user'
  token!: string;

  login(body: any){
    return api.post(`auth/login`, body, {}).then((res:any)=>{
      if (res.data) {return res.data}
      else {
        this.snack.viewsnack(res.response.data.msg, 'Error')
        return;
      }
    }).catch((error)=>{throw error})

  }
  registerUser(body:any){
    this.token != localStorage.getItem('token');
    return api.post(`/public/register`, body,{
      headers: {Authorization: "Bearer" + this.token}
    })
    .then((res)=> res.data)
    .catch((err)=>{
      throw err.response
    })
  }
  getAllUsers(body: any){
    this.token != localStorage.getItem('token');
    return api.post(`/users/getAll`, body, {
      headers: {Authorization: "Bearer " + this.token}
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response
    })
  }

  deleteUser(unique_id:any){
    this.token != localStorage.getItem('token');
    return api.get(`delete/${unique_id}`, {
      headers: {Authorization: "Bearer " + this.token}
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response
    })
  }

  updateUser(unique_id:any){
    this.token != localStorage.getItem('token');
    return api.post(`/users/update/${unique_id}`,{
      headers: {Authorization: "Bearer" + this.token}
    })
    .then((res)=> res.data)
    .catch((err)=>{
      throw err.response
    })
  }

  findOne(unique_id:any){
    this.token != localStorage.getItem('token');
    return api.get(`getOne/${unique_id}`,{
      headers: {Authorization: "Bearer" + this.token}
    })
    .then((res)=> res.data)
    .catch((err)=>{
      throw err.response
    })
  }

}
