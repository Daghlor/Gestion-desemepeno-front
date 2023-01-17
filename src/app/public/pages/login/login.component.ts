import { Component, OnInit } from '@angular/core';

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

  constructor() { }
  
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
      //return this.settings.viewsnack('Falta ingresar el correo', 'Error');
    }
    if(!this.pass){
      //return this.settings.viewsnack('Falta ingresar la contraseña', 'Error');
    }
    if(!emailRegex.test(this.email)){
      //return this.settings.viewsnack('El formato del email es invalido', 'Error');
    }

    const datos = {
      email: this.email,
      password: this.pass,
    };



  
  }

}
