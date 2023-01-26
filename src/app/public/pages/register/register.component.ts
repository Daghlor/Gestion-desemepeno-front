import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from 'src/app/config/snackbar.service';
import { UsersService } from 'src/app/services/users.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  internationalNumberFormat: any = new Intl.NumberFormat('en-US')
  nombres!: string;
  apellidos!: string;
  identificacion!: number;
  email!: string;
  password!: string;
  varifyPassord!: string;
  nacimiento: any;
  telefono!: number;
  typePass: string = 'password';
  typePass1: string = 'password';
  validateUrl!: number;
  user!: string;
  direccion!: string;
  ciudad!: string;
  columns!: number;
  listRoles: any = [];
  rol!: number;
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
    columnDef: 'sal_id',
    header: 'Codigo',
    width: '5%',
    sort: true,
    type: 'text',
    cell: (element: any) => `${element.sal_id}`,
  },{
    columnDef: 'prod_nombre',
    header: 'Producto',
    width: '20%',
    sort: true,
    type: 'text',
    cell: (element: any) => `${element.prod_nombre}`,
  },{
    columnDef: 'sal_fecha',
    header: 'Fecha',
    width: '10%',
    sort: true,
    type: 'text',
    cell: (element: any) => `${element.sal_fecha}`,
  },{
    columnDef: 'sal_cantidad',
    header: 'Cantidad',
    width: '5%',
    sort: true,
    type: 'text',
    cell: (element: any) => `${element.sal_cantidad}`,
  },{
    columnDef: 'sal_precio',
    header: 'Precio de compra',
    width: '10%',
    sort: true,
    type: 'text',
    cell: (element: any) => `$ ${this.internationalNumberFormat.format(element.sal_precio)}`,
  },{
    columnDef: 'sal_total',
    header: 'Total',
    width: '10%',
    sort: false,
    type: 'text',
    cell: (element: any) => `$ ${this.internationalNumberFormat.format(element.sal_total)}`,
  }
];
  constructor(
    private UsersAPI: UsersService,
    private snack: SnackbarService,
    private router: Router,
    private routerActive: ActivatedRoute,
    private deviceService: DeviceDetectorService
  ) { }

  ngOnInit(): void {
    this.deviceInfo != this.deviceService.getDeviceInfo();

    if(this.router.url == '/usuarios/create'){
      this.validateUrl = 1;
      this.titleButton = 'Registrar usuario'
      this.user = 'Nuevo Usuario'
      this.columns = 3;
      this.readonlyInputs = false;
      this.photoPerfil = 'assets/img/usuarioPNG'
      this.messageTxt = 'Creando usuario, por favor espere';
     //this.allRoles();
    }
    else if (this.router.url == '/usuarios/editar/'+this.routerActive.snapshot.params["id"]){
      this.snack.viewsnack('Buscando Informacion del usuario', 'Loading', 1500)
      this.validateUrl = 3;
      this.titleButton = 'Actualizar'
      this.user = "Informacion del usuario";
      this.columns = 3;
      this.readonlyInputs = false;
      this.messageTxt = 'Actualizando usuario, por favor espere';
      //this.allRoles();
      this.getByUniqueid(this.routerActive.snapshot.params["id"]);
      this.readonlyInputs = true;
    }
    else if(this.router.url=='/miperfil'){
      this.snack.viewsnack('Buscando Informacion del usuario','Loading',1500)
      this.validateUrl=3;
      this.titleButton = 'Actualizar'
      this.user='Mi Perfil'
      this.columns = 3;
      this.messageTxt = 'Actualizando usuario, por favor espere';
      //this.allRoles();
      //this.getByUniqueid(JSON.parse(localStorage.getItem('userInfo')).getByUniqueid);
      this.readonlyInputs = true;
    }
    else{
      this.validateUrl = 2;
      this.titleButton = 'Registrarse'
      this.user = 'Nuevo Empleado';
      this.columns = 4;
      this.photoPerfil = 'assets/img/usuarioPNG.png'
      this.messageTxt = 'Registrando usuario, por favor espere';
      this.readonlyInputs = false;
    }
  }
  getByUniqueid(ide:any){
    this.UsersAPI.findOne(ide).then((res:any)=>{
      this.nombres = res.data.name;
      this.apellidos = res.data.lastName;
      this.identificacion = res.data.identify;
      this.telefono = res.data.phone;
      this.email = res.data.email;
      this.direccion = res.data.address;
      this.ciudad = res.data.city; //@ts-ignore
      this.nacimiento = new Date (moment(res.data.dateBirth));
    })
  }

  guardar(){
    let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    let diff = moment().diff(this.nacimiento, 'years');

    if(!this.nombres){
      return this.snack.viewsnack('Los nombres son obligatorios', 'Error');
    }
    if(!this.apellidos){
      return this.snack.viewsnack('Los apellidos son obligatorios', 'Error');
    }
    if(!this.identificacion){
      return this.snack.viewsnack('El numero de identificación es obligatorio', 'Error');
    }
    if(String(this.identificacion).length < 6){
      return this.snack.viewsnack('El numero de identificación es muy corto', 'Error')
    }
    if(!this.email){
      return this.snack.viewsnack('El email es obligatorio', 'Error');
    }
    if(!emailRegex.test(this.email)){
      return this.snack.viewsnack('El formato del email es invalido', 'Error');
    }
    if(this.validateUrl !=3){
      if(!this.password){
        return this.snack.viewsnack('la contraseña es obligatoria', 'Error');
      }
    }
    if(this.password){
      if(!this.varifyPassord){
        return this.snack.viewsnack('La verificacion de contraseña es obligatoria','Error');
      }
      if(this.password.length < 8){
        return this.snack.viewsnack('La contraseña debe tener minimo 8 caracteres','Error');
      }
      if(this.varifyPassord.length < 8){
        return this.snack.viewsnack('La verificacion de contraseña debe tener minimo 8 caracteres','Error');
      }
      if(this.password != this.varifyPassord){
        return this.snack.viewsnack('La verificacion debe ser igual a la contraseña','Error');
      }
    }
    if(!this.nacimiento){
      return this.snack.viewsnack('La fecha de nacimiento es obligatoria','Error');
    }
    if(diff < 18){
      return this.snack.viewsnack('Deber ser mayor de 18 años','Error');
    }
    if(!this.telefono){
      return this.snack.viewsnack('El numero de telefono es obligatorio', 'Error');
    }
    if(!this.direccion){
      return this.snack.viewsnack('La direccion es obligatoria','Error');
    }
    if(!this.ciudad){
      return this.snack.viewsnack('La ciudad es obligatoria', 'Error');
    }
    if(String(this.telefono).length !=10){
      return this.snack.viewsnack('El numero de telefono debe tener 10 digitos','Error');
    }
    this.disableButton = true;
    this.snack.viewsnack(this.messageTxt, 'Loading', 5000);
    let code = String(Math.floor(Math.random() * (999999 - 111111)) + 111111);

    const body: any = {
      nombres: this.nombres,
      apellidos: this.apellidos,
      identificacion: this.identificacion,
      email: this.email,
      password: !this.password ? null : bcrypt.hashSync(this.password,10),
      nacimiento: moment(this.nacimiento).format('YYYY-MM-DD'),
      direccion: this.direccion,
      ciudad: this.ciudad,
      telefono: this.telefono,
      codigo: bcrypt.hashSync(code, 10),
      view: code,
    }

    body.info = JSON.stringify(body)
    body.device = this.deviceInfo
    body.infoDate = {
      date: moment().format('YYYY-MM-DD'),
      time: moment().format('HH:mm:ss'),
    }
    body.img = this.photoPerfil != 'assets/img/usuarioPNG.png' && !this.photoSync ? this.photoPerfil : null

    if(this.validateUrl == 1){

      this.UsersAPI.registerUserAdmin(body).then((res:any)=>{
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
        console.log(res.data, this.validateUrl);
        if(!res.create){
          this.snack.viewsnack(res.data, 'Error');
        }else{
          this.snack.viewsnack(res.data, 'Success');
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
    }
  }


}
