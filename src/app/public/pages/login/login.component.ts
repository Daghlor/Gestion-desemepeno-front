import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { LocalService } from 'src/app/config/local.service';
import { SnackbarService } from 'src/app/config/snackbar.service';
import { UsersService } from 'src/app/services/users.service';

// ESTE ES EL .TS DE LOGIN DONDE ESTA TODA LA PARTE LOGICA
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // SE DEFINE VARIABLES LOCALES
email: string = "";
pass: string = "";
typePass: string = 'password';
showPass: boolean = false;
iconPass: string = 'visibility';

  constructor(
    // SE DEFINE VARIABLES CON SERVICIOS ASIGNADOS
    private userAPI: UsersService,
    private snack: SnackbarService,
    private router: Router,
    private Local: LocalService
  ) { }

  ngOnInit(): void {
  }

  // FUNCION PARA MOSTRAR Y OCULTAR LA PASSWORD
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

  // FUNCION QUE VERIFICA SI HAY DATOS Y SI LOS HAY LOS VERIFICA Y LO REDIRECCION A UNA VISTA
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
        await this.Local.createDataLocal('permissions', JSON.stringify(res.data.permissions));
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

// Copyright (c) Engagement
// https://www.engagement.com.co/
// Año: 2023
// Sistema: Gestion de desempeño (GDD)
// Programador: David Tuta
