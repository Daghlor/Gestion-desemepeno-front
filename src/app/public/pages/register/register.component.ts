import { LocalService } from 'src/app/config/local.service';
import { RegisterService } from './../../../services/register.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from 'src/app/config/snackbar.service';
import * as moment from 'moment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  name?: string;
  lastName?: string;
  identify?: number;
  email?: string;
  password?: string;
  varifyPassord?: string;
  dateBirth?: any;
  phone?: number;
  typePass: string = 'password';
  typePass1: string = 'password';
  validateUrl?: number;
  address?: string;
  city?: string;
  columns?:number;
  titleButton!: string;
  photoPerfil!: string;
  messageTxt!: string;
  photoSync: boolean = true;
  showPass: boolean = false;
  iconPass: string = 'visibility';
  disableButton: boolean = false;

  constructor(
    private registerAPI: RegisterService,
    private snack: SnackbarService,
    private router: Router,
    private routerActive: ActivatedRoute,
    private Local: LocalService
  ) { }

  ngOnInit(): void {
    this.photoPerfil = 'assets/img/R.png'
  }

  async changePhoto(imageInput:any){
    const file: File = imageInput.files[0];

    if(!file){
      return this.snack.viewsnack('No ha seleccionado ninguna imagen','Error')
    }
    const reader = new FileReader();

    await reader.addEventListener('load', async (event:any)=>{
      this.photoPerfil = event.target.result
      this.photoSync = false;
    });

    await reader.readAsDataURL(file);
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

  passVisible1(){
    this.showPass = !this.showPass;
    if(this.showPass){
      this.typePass1 = 'text';
      this.iconPass = 'visibility_off';
    }else{
      this.typePass1 = 'password';
      this.iconPass = 'visibility';
    }
  }

  guardar(){
    let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    let diff = moment().diff(this.dateBirth, 'years');

    if(!this.name){
      return this.snack.viewsnack('Los nombres son obligatorios', 'Error');
    }
    if(!this.lastName){
      return this.snack.viewsnack('Los apellidos son obligatorios', 'Error');
    }
    if(!this.identify){
      return this.snack.viewsnack('El numero de identificación es obligatorio', 'Error');
    }
    if(!this.email){
      return this.snack.viewsnack('El email es obligatorio', 'Error');
    }
    if(!emailRegex.test(this.email)){
      return this.snack.viewsnack('El formato del email es invalido', 'Error');
    }
    if(!this.password){
      return this.snack.viewsnack('Falta ingresar la contraseña', 'Error');
    }
    if(!this.dateBirth){
      return this.snack.viewsnack('La fecha de nacimiento es obligatoria','Error');
    }
    if(diff < 18){
      return this.snack.viewsnack('Deber ser mayor de 18 años','Error');
    }
    if(!this.phone){
      return this.snack.viewsnack('El numero de telefono es obligatorio', 'Error');
    }
    if(!this.address){
      return this.snack.viewsnack('La direccion es obligatoria','Error');
    }
    if(!this.city){
      return this.snack.viewsnack('La ciudad es obligatoria', 'Error');
    }
    if(String(this.phone).length !=10){
      return this.snack.viewsnack('El numero de telefono debe tener 10 digitos','Error');
    }
    this.disableButton = true;
    this.snack.viewsnack(this.messageTxt, 'Loading', 5000);
    let code = String(Math.floor(Math.random() * (999999 - 111111)) + 111111);
    this.router.navigateByUrl('login');


    this.registerAPI.Create({
      name: this.name,
      lastName: this.lastName,
      identify: this.identify,
      email: this.email,
      password: this.password,
      dateBirth: moment(this.dateBirth).format('YYYY-MM-DD'),
      address: this.address,
      city:this.city,
      phone:this.phone
    }).then((res:any)=>{
      console.log(res);
      this.snack.viewsnack('Se registro correctamente','Success');
    })


    /*const body: any = {
      name: this.name,
      lastName: this.lastName,
      identify: this.identify,
      email: this.email,
      password: !this.password,
      dateBirth: moment(this.dateBirth).format('YYYY-MM-DD'),
      address: this.address,
      city: this.city,
      phone: this.phone,
      view: code,
    }*/

    /*this.registerAPI.Create(body).then((res:any)=>{
      this.snack.viewsnack('Se registro correctamente','Success');
      this.router.navigateByUrl('/src/app/public/pages/login/login.component.html')
    }).catch((err)=>{
      console.log(err);
    })
    body.info = JSON.stringify(body)
    body.infoDate = {
      date: moment().format('YYYY-MM-DD'),
      time: moment().format('HH:mm:ss'),
    }
    body.UrlImg = this.photoPerfil != 'assets/img/R.png' && !this.photoSync ? this.photoPerfil : null*/

    if(this.validateUrl == 1){

      /*this.UsersAPI.registerUserAdmin(body).then((res:any)=>{
        console.log(res.data, this.validateUrl);

        if(!res.create){
          this.snack.viewsnack(res.data, 'Error');
        }else{
          this.snack.viewsnack(res.data, 'Success');
          this.router.navigateByUrl('/usuarios');
        }
      })
    }

    if(this.validateUrl == 2){
      this.UsersAPI.registerEmpleado(body).then((res:any)=>{
        console.log(res.data.user, this.validateUrl);
        if(!res.create){
          this.snack.viewsnack(res.data.user, 'Error');
        }else{
          this.snack.viewsnack(res.data.user, 'Success');
          this.router.navigateByUrl('/login');
        }
      })
    }

    if(this.validateUrl ==3){
      this.UsersAPI.updateUser(body).then((res:any)=>{
        this.password != null;
        this.varifyPassord != null;
        this.photoSync = true;
        this.snack.viewsnack('Se actualizo la informacion del usuario', 'Success')
      })
    }*/
  }
  }

}
