import { LocalService } from './../config/local.service';
import { Injectable } from '@angular/core';
import { api } from '../config/axios.config';
import { SnackbarService } from '../config/snackbar.service';
import { AuthService } from './auth.service';

// SERVICIO DEL USUARIO QUE SE PUEDE INYECTAR A LOS COMPONENTES
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
  // SE DEFINE VARIABLES CON SERVICIOS ASIGNADOS
  private snack: SnackbarService,
  private auth: AuthService,
  private Local: LocalService
) { }
public userUrl: string = 'user'
  token?: string

  // METODO POST QUE AUTENTIFICA AL USUARIO CON EL LOGIN
  login(body: any){
    return api.post(`auth/login`, body, {}).then((res:any)=>{
      if (res.data) {return res.data}
      else {
        this.snack.viewsnack(res.response.data.msg, 'Error')
        return;
      }
    }).catch((error)=>{throw error})
  }

  // METODO POST DE REGISTRO DE UN USUARIO
  registerEmpleado(body:any){
    this.token != localStorage.getItem('token');
    return api.post(`/public/register`, body,{
      headers: {Authorization: "Bearer" + this.token}
    })
    .then((res)=> res.data.unique_id)
    .catch((err)=>{
      throw err.response
    })
  }

  // METODO POST DE REGISTRO DE UN USUARIO POR EL LADO DEL ADMIN
  registerUserAdmin(body:any){
    this.token != localStorage.getItem('token');
    return api.post(`users/register`, body,{
      headers: {Authorization: "Bearer" + this.token}
    })
    .then((res)=> res.data)
    .catch((err)=>{
      throw err.response
    })
  }

  // METODO POST PARA OBTENER A TODOS LOS USUARIOS
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

  // METODO GET PARA BORRAR A UN USUARIO POR SU UNIQUE_ID
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

  // METODO POST PAR ACTUALIZAR A UN USUARIO POR SU UNIQUE_ID
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

  // METODO GET PARA ENCONTRAR UN SOLO USUARIO POR SU UNIQUE_ID
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

  // METODO POST PARA VERIFICAR EL USUARIO
  verifyUser(body:any){
    this.token != localStorage.getItem('token');
    return api.post(`verify`, body, {
      headers: {Authorization:"Bearer" + this.token}
    })
    .then((res)=> res.data.user)
    .catch((err)=>{
      throw err.response
    })
  }

}
