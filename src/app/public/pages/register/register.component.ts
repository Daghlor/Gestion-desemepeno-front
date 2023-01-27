import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from 'src/app/config/snackbar.service';
import { UsersService } from 'src/app/services/users.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
//import * as bcrypt from 'bcryptjs';

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
  user?: string;
  address?: string;
  city?: string;
  listRoles: any = [];
  rol!: number;
  columns?:number;
  titleButton!: string;
  photoPerfil!: string;
  messageTxt!: string;
  photoSync: boolean = true;
  total: any;
  pageSize: number = 10;
  readonlyInputs!: boolean;
  deviceInfo = null;
  dataSource = new MatTableDataSource();
  length: any;
  actualPage: any = 1;
  filterColumn!: string;
  filterType!: string;
  disableButton: boolean = false;
  pageSizeOptions: number[] = [10, 15, 20, 25];
  columnas = [{
    columDef: 'name',
    header: 'Nombres',
    width: '18%',
    sort: true,
    type: 'text',
    cell:(element:any) => `${element.name}`,
  },{
    columnDef : 'lastName',
    header: 'apellidos',
    width : '12%',
    sort: true,
    type:'text',
    cell: (element:any)=> `${element.lastName}`,
  },{
    colummnDef:'identify',
    header:'Identificacion',
    width: '12%',
    sort: true,
    type: 'text',
    cell:(element:any)=> `${element.identify}`,
  },{
    columnDef: 'phone',
    header:'Telefono',
    width:'10%',
    sort: true,
    type: 'text',
    cell: (element:any) => `${element.phone}`,
  },{
    columDef: 'email',
    header: 'Email',
    width:'12%',
    sort: true,
    type: 'text',
    cell: (element:any)=> `${element.email}`,
  },{
    columDef: 'address',
    header:'Direccion',
    width:'12%',
    sort: true,
    type: 'text',
    cell: (element:any)=> `${element.addres}`,
  },{
    columDef: 'city',
    header: 'Ciudad',
    width: '10%',
    sort: true,
    type: 'text',
    cell:(element:any)=>`${element.city}`,
  },{
    columDef: 'dateBirth',
    header: 'Fecha de nacimiento',
    width: '10%',
    sort: true,
    type: "text",
    cell: (element:any)=>`${element.dateBirth}`,
  }
  ]
  constructor(
    private UsersAPI: UsersService,
    private snack: SnackbarService,
    private router: Router,
    private routerActive: ActivatedRoute,
    private deviceService: DeviceDetectorService
  ) { }

  ngOnInit(): void {
    this.deviceInfo != this.deviceService.getDeviceInfo();

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

    const body: any = {
      name: this.name,
      lastName: this.lastName,
      identify: this.identify,
      email: this.email,
      password: !this.password,
      dateBirth: moment(this.dateBirth).format('YYYY-MM-DD'),
      address: this.address,
      city: this.city,
      phone: this.phone,
      //codigo: bcrypt.hashSync(code, 10),
      view: code,
    }

    this.UsersAPI.registerEmpleado(body).then((res:any)=>{
      this.snack.viewsnack('Se registro correctamente','Success');
      this.router.navigateByUrl('/src/app/public/pages/login/login.component.html')
    }).catch((err)=>{
      console.log(err);
    })

    body.info = JSON.stringify(body)
    body.device = this.deviceInfo
    body.infoDate = {
      date: moment().format('YYYY-MM-DD'),
      time: moment().format('HH:mm:ss'),
    }
    body.img = this.photoPerfil != 'assets/img/usuarioPNG.png' && !this.photoSync ? this.photoPerfil : null

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
