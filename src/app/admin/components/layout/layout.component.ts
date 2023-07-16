import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalService } from 'src/app/config/local.service';
import { SnackbarService } from 'src/app/config/snackbar.service';
import { UsersService } from 'src/app/admin/services/users.service';
import * as moment from 'moment';
import { AuthService } from '../../services/auth.service';
import { UsersFormComponent } from '../../pages';


// ESTE ES EL TS DE LA PARTDE LOGICA DE LA VISTA LAYOUT
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  // SE DEFINE VARIABLES LOCALES
  title?: string;
  validateTitle?: any = [];
  nameUser?: any = '';
  option?: number;
  photo?: string;
  closeTimeOptions: any;
  permission: any;

  unique_id?: string;
  listEmployments: any = [];
  company_id?: number;

  allEmployments: any = [];
  listRoles: any = [];
  listCompany: any = [];

  changeLogo: boolean = false;
  name?: string;
  lastName?: string;
  identify?: number;
  phone?: number;
  email?: string;
  address?: string;
  city?: string;
  dateBirth?: any;
  employment_id?: number;
  rolesView: any = [];
  uuid?: any;
  userProfile: any;



  constructor(
    // SE DEFINE VARIABLES CON SERVICIOS ASIGNADOS
    private router: Router,
    private Local: LocalService,
    private snack: SnackbarService,
    private userApi: UsersService,
    private authApi: AuthService,
  ) {}

  ngOnInit(): void {
    let userInfo = JSON.parse(this.Local.findDataLocal('info_user'));
    this.nameUser = userInfo.name +' '+ userInfo.lastName;
    this.photo = !userInfo.photo ? 'assets/img/usuarioPNG.png' : userInfo.photo;

  }

  // FUNCION QUE VALIDA PERMISOS CON LOS SERVICIOS LOCALES
  validatePermissions(code: string): Boolean {
    return this.Local.validatePermission(code) ? true : false;
  }

  // FUNCION QUE VALIDA EN TODO EL ARRAY DE PERMISOS DE LOS SERVICIOS LOCALES
  validateArrayPermissions(array: any): Boolean {
    return this.Local.validateArrayPermission(array) ? true : false;
  }

  ngAfterViewInit(): void {
    setInterval(() => {
      this.title = !this.router.url.split('/')[2] ? '¡Bienvenido!' : this.router.url.split('/')[2];
      this.validateTitle = this.title.split('_');
    }, 500);
  }

  routers(url: string){
    this.option = 0;
    this.router.navigateByUrl('/admin'+url);
  }

  redirectForm(url: string){
    this.snack.redirect(url);
  }

  // FUNCION QUE REDIRIGE AL USUARIO A UNA VISTA SEGUN EL NUMERO QUE ESTE EN LA VISTA LAYOUT
  openOptions(n: number){
    if(n === this.option){
      this.option = 0;
    }else{
      this.option = n;
    }

    clearTimeout(this.closeTimeOptions);
    this.closeTimeOptions = setTimeout(() => {
      this.option = 0;
    }, 5000);

  }

  // FUNCION PARA DESLOGEARSE DEL SISTEMA
  async logout(){
    await this.Local.clearAllDataLocal();
    await this.router.navigateByUrl('/');
  }

   getAllList(){
    this.authApi.FindData().then((res:any)=>{
      this.listRoles = res.roles;
      this.listCompany = res.companies;
      this.allEmployments = res.employments;
    })
  }

  findData(){
    this.userApi.FindOne(this.unique_id || '').then((res:any)=>{
      this.listEmployments = [];
      this.company_id = res.data.company_id;

      for (let i = 0; i < this.allEmployments.length; i++) {
        if(this.allEmployments[i].company_id == this.company_id){
          this.listEmployments.push(this.allEmployments[i]);
        }
      }

      this.photo = res.data.photo;
      this.changeLogo = false;
      this.name = res.data.name;
      this.lastName = res.data.lastName;
      this.identify = res.data.identify;
      this.phone = res.data.phone;
      this.email = res.data.email;
      this.address = res.data.address;
      this.city = res.data.city;
      this.dateBirth = new Date( moment( res.data.dateBirth, 'DD/MM/YYYY').format('MM/DD/YYYY') );
      this.employment_id = res.data.employment_id;

      for (let i = 0; i < res.data.roles.length; i++) {
        res.data.roles[i].sync = true;
        res.data.roles[i].delete = false;
        this.rolesView.push(res.data.roles[i]);
      }

    });
  }

goToProfile(): void {

  this.router.navigateByUrl('admin/usuarios/form/' + this.unique_id);
}

  }





