import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalService } from 'src/app/config/local.service';
import { SnackbarService } from 'src/app/config/snackbar.service';
import { UsersService } from 'src/app/admin/services/users.service';
import * as moment from 'moment';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
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
    private router: Router,
    private Local: LocalService,
    private snack: SnackbarService,
    private userApi: UsersService,
  ) {}

  ngOnInit(): void {
    let userInfo = JSON.parse(this.Local.findDataLocal('info_user'));
    this.nameUser = userInfo.name +' '+ userInfo.lastName;
    this.photo = !userInfo.photo ? 'assets/img/usuarioPNG.png' : userInfo.photo;

  }

  validatePermissions(code: string): Boolean {
    return this.Local.validatePermission(code) ? true : false;
  }

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

  async logout(){
    await this.Local.clearAllDataLocal();
    await this.router.navigateByUrl('/');
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

    mostrarPerfil() {
      this.userApi.FindOne(this.unique_id||'').then((res:any) => {
        this.userProfile = res.data;
      });
    }

   goToProfile(event:any){ // Reemplaza esto con la forma en que recuperas el Unique ID de tu usuario actual desde tu base de datos
      this.userApi.FindOne(this.unique_id || '').then((res:any)=>{
        this.router.navigate(['admin/usuarios/form/' + event.data.this.unique_id])
      });
    }

    iconsFunction(event: any){
      if(event.icon == 'edit'){
        this.router.navigate(['admin/usuarios/form/' + event.data.unique_id]);
      }
    }

  }





