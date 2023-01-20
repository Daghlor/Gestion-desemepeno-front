import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from 'src/app/config/snackbar.service';
import { UsersService } from 'src/app/services/users.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { MatTableDataSource } from '@angular/material/table';

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
  pais: string = 'Colombia';
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
    //this.deviceInfo= this.deviceService.getDeviceInfo();

    if(this.router.url == '/usuarios/create'){
      this.validateUrl = 1;
      this.titleButton = 'Registrar usuario'
      this.user = 'Nuevo Usuario'
      this.columns = 3;
      this.readonlyInputs = false;
      this.photoPerfil = 'assets/img/usuarioPNG'
      this.messageTxt = 'Creando usuario, por favor espere';
     // this.allRoles();
    }
  }

}
