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
login(body: any){
  return api.post(`auth/login`, body, {}).then((res:any)=>{
    if (res.data) {return res.data} 
    else {
      this.snack.viewsnack(res.response.data.msg, 'Error')
      return;
    }
  }).catch((error)=>{throw error})
}
}
