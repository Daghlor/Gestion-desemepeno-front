import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { SnackbarService } from 'src/app/config/snackbar.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
email: string = "";
pass: string = "";
deviceInfo = null;
typePass: string = 'password';
showPass: boolean = false;
iconPass: string = 'visibility';

  constructor(
    private userAPI: UsersService,
    private snack: SnackbarService,
    private router: Router,
  ) { }
  
  ngOnInit(): void {
  }

  passVisible(){
    this.showPass = !this.showPass;
    if(this.showPass){
      this.typePass = 'text';
      this.iconPass = 'visibility_off';
    }else{
      this.typePass = 'password';
      this.iconPass = 'visibility';
    }
  }

  login(){
    let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

  
    if(!this.email){
      return this.snack.viewsnack('Falta ingresar el correo', 'Error');
    }
    if(!this.pass){
      return this.snack.viewsnack('Falta ingresar la contraseña', 'Error');
    }
    if(!emailRegex.test(this.email)){
      return this.snack.viewsnack('El formato del email es invalido', 'Error');
    }

    const datos = {
      email: this.email,
      password: this.pass,
      device: this.deviceInfo,
      infoDate: {
        date: moment().format('YYYY-MM-DD'),
        time: moment().format('HH:mm:ss'),
      }
    };

    this.userAPI.login(datos).then((res:any)=>{
      console.log(res)
      if(res.loged){
        
      }
      else{
        return this.snack.viewsnack(res.msg,'Error');
      }
      /*localStorage.setItem('expired', res.expired);
      localStorage.setItem('userInfo', JSON.stringify(res.data));
      localStorage.setItem('role', JSON.stringify(res.role));
      this.snack.viewsnack(res.msg, 'Success');

      if(res.data.usu_verificacion == 0){
        localStorage.setItem('verify', 'false');
        this.router.navigateByUrl('/verificacion');
      }else{
        localStorage.setItem('verify', 'true');
        this.router.navigateByUrl('/dashboard');
      }*/
    })

  }

}
