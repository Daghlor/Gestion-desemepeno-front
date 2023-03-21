import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { LocalService } from 'src/app/config/local.service';
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
typePass: string = 'password';
showPass: boolean = false;
iconPass: string = 'visibility';

  constructor(
    private userAPI: UsersService,
    private snack: SnackbarService,
    private router: Router,
    private Local: LocalService
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
    };

    this.userAPI.login(datos).then(async (res:any)=>{
      if(res.loged){
        await this.Local.createDataLocal('expired', res.expired);
        await this.Local.createDataLocal('info_user', JSON.stringify(res.data.user));
        await this.Local.createDataLocal('info_company', JSON.stringify(res.data.company));
        await this.Local.createDataLocal('info_roles', JSON.stringify(res.data.roles));
        await this.Local.createDataLocal('token', res.token);
        await this.Local.createDataLocal('points', JSON.stringify(res.data.user.points));
        this.snack.viewsnack(res.msg, 'Success');

        if(res.data.user.verify == 0){
          await this.Local.createDataLocal('verify', 'false');
          this.router.navigateByUrl('/admin/verificacion');
        }else{
          await this.Local.createDataLocal('verify', 'true');
          this.router.navigateByUrl('/admin');
        }
      }
      else{
        return this.snack.viewsnack(res.msg,'Error');
      }
    })

  }

}
