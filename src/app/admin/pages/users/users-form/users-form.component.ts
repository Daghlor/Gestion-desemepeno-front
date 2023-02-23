import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/admin/services/auth.service';
import { UsersService } from 'src/app/admin/services/users.service';
import { LocalService } from 'src/app/config/local.service';
import { SnackbarService } from 'src/app/config/snackbar.service';
import * as moment from 'moment';
@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss']
})
export class UsersFormComponent implements OnInit {
  titleButton: string = 'Registrar';
  photo?: string;
  name?: string;
  lastName?: string;
  identify?: number;
  phone?: number;
  email?: string;
  password?: string;
  passwordVerify?: string;
  address?: string;
  city?: string;
  dateBirth?: any;
  employment_id?: number;
  company_id?: number;
  role_id?: number;
  rolesView: any = [];

  listRoles: any = [];
  listCompany: any = [];
  listEmployments: any = [];
  allEmployments: any = [];

  params: any;
  unique_id?: string;
  changeLogo: boolean = false;

  typePasswordVerify: string = 'password';
  showPasswordVerify: boolean = false;
  iconPasswordVerify: string = 'visibility';
  typePassword: string = 'password';
  showPassword: boolean = false;
  iconPassword: string = 'visibility';

  constructor(
    private authApi: AuthService,
    private userApi: UsersService,
    private snack: SnackbarService,
    private activeRouter: ActivatedRoute,
    private router: Router,
    private Local: LocalService
  ) { }

  async ngOnInit() {
    await this.getAllList();

    this.params = this.activeRouter.snapshot.params;
    this.unique_id = this.params.uuid;

    if(this.unique_id){
      this.titleButton = 'Actualizar';
      await this.findData();
    }
  }

  async changePhoto(photo: any){
    const file: File = photo.files[0];
    
    if(!file){
      return  this.snack.viewsnack('No ha seleccionado ninguna imagen', 'Error')
    }
    const reader = new FileReader();

    await reader.addEventListener('load', async (event: any) => {
      this.photo = event.target.result
      this.changeLogo = true;
    });

    await reader.readAsDataURL(file);
  }

  deleteRoles(index: number){
    console.log(this.rolesView[index]);
    
    if(this.rolesView[index].sync){
      this.rolesView[index].delete = true;
    }else{
      this.rolesView.splice(index, 1);
    }
  }

  getAllList(){
    this.authApi.FindData().then((res:any)=>{
      this.listRoles = res.roles;
      this.listCompany = res.companies;
      this.allEmployments = res.employments;
    })
  }

  async addRoles(){
    let data: any = this.role_id;
    for (let i = 0; i < this.rolesView.length; i++) {
      if(this.rolesView[i].id == data.id){
        this.role_id = 0;
        await this.snack.viewsnack('Ese rol ya esta asociado al usuario', 'error');
        return;
      }
    }

    data.sync = false;
    data.delete = false;
    this.rolesView.push(this.role_id);
    this.role_id = 0;
  }

  changeCompany(){
    this.listEmployments = [];
    this.employment_id = 0;
 
    for (let i = 0; i < this.allEmployments.length; i++) {
      if(this.allEmployments[i].company_id == this.company_id){
        this.listEmployments.push(this.allEmployments[i]);
      }
    }
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

  async saveData(){
    if(!this.name){
      return this.snack.viewsnack('Hace Falta los Nombres', 'ERROR');
    }
    if(!this.lastName){
      return this.snack.viewsnack('Hace Falta los Apellidos', 'ERROR');
    }
    if(!this.identify){
      return this.snack.viewsnack('Hace Falta la Identificación', 'ERROR');
    }
    if(!this.dateBirth){
      return this.snack.viewsnack('Hace Falta la Fecha de Nacimiento', 'ERROR');
    }
    if(!this.email){
      return this.snack.viewsnack('Hace Falta el email', 'ERROR');
    }
    if(this.email){
      let emailValidate;
      await this.snack.validateEmail(this.email).then((res:boolean)=>{
        emailValidate = res;
      });

      if(!emailValidate){
        return this.snack.viewsnack('El email de un usuario tiene un formato inválido', 'error');
      }
    }
    if(!this.phone){
      return this.snack.viewsnack('Hace Falta el Teléfono', 'ERROR');
    }
    if(!this.address){
      return this.snack.viewsnack('Hace Falta la Dirección', 'ERROR');
    }
    if(!this.company_id){
      return this.snack.viewsnack('Hace Falta la Empresa', 'ERROR');
    }
    if(!this.employment_id){
      return this.snack.viewsnack('Hace Falta el Cargo', 'ERROR');
    }
    if(this.rolesView.length == 0){
      return this.snack.viewsnack('Hace Falta Asignarle Roles', 'ERROR');
    }


    if(!this.unique_id){
      this.userApi.Create({
        photo: this.changeLogo ? this.photo : "",
        name: this.name,
        lastName: this.lastName,
        identify: this.identify,
        dateBirth: moment(this.dateBirth).format('DD/MM/YYYY'),
        phone: this.phone,
        email: this.email,
        address: this.address,
        city: this.city,
        roles: this.rolesView,
        employment_id: this.employment_id,
        company_id: this.company_id
      }).then((res:any)=>{
        if(!res.res){
          this.snack.viewsnack(res.data, 'error');
        }else{
          this.snack.viewsnack(res.data.msg, 'success');
          this.router.navigate(['admin/usuarios']);
        } 
      })
    }else{
      this.userApi.Update(this.unique_id, {
        photo: this.changeLogo ? this.photo : "",
        name: this.name,
        lastName: this.lastName,
        identify: this.identify,
        dateBirth: moment(this.dateBirth).format('DD/MM/YYYY'),
        phone: this.phone,
        email: this.email,
        address: this.address,
        city: this.city,
        roles: this.rolesView,
        employment_id: this.employment_id,
        company_id: this.company_id
      }).then((res:any)=>{
        if(!res.res){
          this.snack.viewsnack(res.data, 'error');
        }else{
          this.snack.viewsnack(res.data, 'success');
          this.router.navigate(['admin/usuarios']);
        } 
      })
    }
    


  }



}
