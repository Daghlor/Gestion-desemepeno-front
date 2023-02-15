import { Component, OnInit } from '@angular/core';
import { CompaniesService } from 'src/app/admin/services/companies.service';
import { SnackbarService } from 'src/app/config/snackbar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalService } from 'src/app/config/local.service';
@Component({
  selector: 'app-companies-form',
  templateUrl: './companies-form.component.html',
  styleUrls: ['./companies-form.component.scss']
})
export class CompaniesFormComponent implements OnInit {
logo?: string = 'assets/img/companies.png';
titleButton: string = 'Registrar';
validateTime: any;
panelStrategics?: number;
params: any;
changeLogo: boolean = false;
id?: number;
unique_id?: string;
nit?: string;
businessName?: string;
description?: string;
mission?: string;
vision?: string;
phone?: number;
email?: string;
address?: string;
city?: string;
state: string = 'Activo';
listColors?: any = [];
listStrategics?: any = [];
listEmployments?: any = [];
listAreas?: any = [];
initialTab: number = 1;
currentTab: number = 1;
optionsTabs: any = [{
  code: 1,
  name: 'Información',
  show: true,
  disabled: false,
},{
  code: 2,
  name: 'Configuración',
  show: true,
  disabled: false,
}]


  constructor(
    private companiesApi: CompaniesService,
    private snack: SnackbarService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private Local: LocalService
  ) { }

  ngOnInit(): void {
    this.params = this.activeRouter.snapshot.params;
    this.unique_id = this.params.uuid;

    if(this.unique_id){
      this.titleButton = 'Actualizar';
      this.optionsTabs.push({
        code: 3,
        name: 'Objetivos Estratégicos',
        show: true,
        disabled: false,
      },{
        code: 4,
        name: 'Empleados',
        show: true,
        disabled: false,
      },{
        code: 5,
        name: 'Cargos',
        show: true,
        disabled: false,
      },{
        code: 6,
        name: 'Áreas',
        show: true,
        disabled: false,
      });
      this.findData();
    }
  }


  changePhoto(photo: any){

  }

  validateInput(text: string, type: number){
    clearTimeout(this.validateTime);
    this.validateTime = setTimeout(() => {
      switch (type) {
        case 1:
          for (let i = 0; i < this.listStrategics.length; i++) {
            if(this.listStrategics[i].title == text && i != 0){
              this.listStrategics[0].title = '';
              this.snack.viewsnack('Existen dos o mas objetivos con el mismo titulo', 'error');
              break;
            }
          }
        break;
        case 2:
          for (let i = 0; i < this.listEmployments.length; i++) {
            if(this.listEmployments[i].description == text && i != 0){
              this.listEmployments[0].description = '';
              this.snack.viewsnack('Existen dos o mas cargos con la misma descripción', 'error');
              break;
            }
          }
        break;
        case 3:
          for (let i = 0; i < this.listAreas.length; i++) {
            if(text === this.listAreas[i].description && i != 0){
              this.listAreas[0].description = '';
              this.snack.viewsnack('Existen dos o mas áreas con la misma descripción', 'error');
              break;
            }
          }
        break;

        default:
        break;
      }
    }, 500);
  }

  findData(){
    this.companiesApi.FindOne(this.unique_id || '').then((res:any)=>{
      this.nit = res.data.nit;
      this.id = res.data.id;
      this.businessName = res.data.businessName;
      this.description = res.data.description;
      this.mission = res.data.mission;
      this.vision = res.data.vision;
      this.phone = res.data.phone;
      this.email = res.data.email;
      this.address = res.data.address;
      this.city = res.data.city;
      this.state = res.data.state;

      for (let i = 0; i < res.data.strategics.length; i++) {
        res.data.strategics[i].update = false;
        res.data.strategics[i].sync = true;
        res.data.strategics[i].delete = false;
        res.data.strategics[i].create = false;
      }

      for (let i = 0; i < res.data.employments.length; i++) {
        res.data.employments[i].update = false;
        res.data.employments[i].sync = true;
        res.data.employments[i].delete = false;
        res.data.employments[i].create = false;
      }

      for (let i = 0; i < res.data.areas.length; i++) {
        res.data.areas[i].update = false;
        res.data.areas[i].sync = true;
        res.data.areas[i].delete = false;
        res.data.areas[i].create = false;
      }

      this.listStrategics = res.data.strategics;
      this.listEmployments = res.data.employments;
      this.listAreas = res.data.areas;
    });
  }

  addAreas(){
    if(!this.validateAreas()){
      return;
    }

    this.listAreas.unshift({
      id: null,
      unique_id: null,
      description: '',
      company_id: this.id,
      update: false,
      create: true,
      sync: false,
      delete: false
    });
  }

  validateAreas(){
    let result = true;

    for (let i = 0; i < this.listAreas.length; i++) {
      if(!this.listAreas[i].description){
        this.snack.viewsnack('Hace falta la descripción de un cargo', 'error');
        result = false;
      }
    }

    return result;
  }

  addEmployment(){
    if(!this.validateEmployment()){
      return;
    }

    this.listEmployments.unshift({
      id: null,
      unique_id: null,
      description: '',
      company_id: this.id,
      update: false,
      create: true,
      sync: false,
      delete: false
    });
  }

  validateEmployment(){
    let result = true;

    for (let i = 0; i < this.listEmployments.length; i++) {
      if(!this.listEmployments[i].description){
        this.snack.viewsnack('Hace falta la descripción de un cargo', 'error');
        result = false;
      }
    }

    return result;
  }



  addObjetive(){
    if(!this.validateObjetives()){
      return;
    }

    console.log(this.id);

    let info_user = JSON.parse(this.Local.findDataLocal('info_user'));
    this.listStrategics.unshift({
      id: null,
      unique_id: null,
      title: '',
      mission: '',
      vision: '',
      totalWeight: null,
      company_id: this.id,
      areas_id: null,
      nameUser: info_user.name + ' ' + info_user.lastName,
      user_id: info_user.id,
      state_id: 1,
      state: 'Activo',
      update: false,
      create: true,
      sync: false,
      delete: false
    });
  }

  validateObjetives(){
    let result = true;
    for (let i = 0; i < this.listStrategics.length; i++) {

      if(!this.listStrategics[i].vision){
        this.snack.viewsnack('Hace falta la visión de un objetivo', 'error');
        result = false;
      }
      if(!this.listStrategics[i].mission){
        this.snack.viewsnack('Hace falta la misión de un objetivo', 'error');
        result = false;
      }
      if(!this.listStrategics[i].totalWeight){
        this.snack.viewsnack('Hace falta el puntaje de un objetivo', 'error');
        result = false;
      }
      if(!this.listStrategics[i].title){
        this.snack.viewsnack('Hace falta el titulo de un objetivo', 'error');
        result = false;
      }

    }

    return result;
  }


  saveData(){
    if(!this.nit){
      return this.snack.viewsnack('Hace Falta NIT', 'ERROR');
    }
    if(!this.nit){
      return this.snack.viewsnack('Hace Falta NIT', 'ERROR');
    }
    if(!this.businessName){
      return this.snack.viewsnack('Hace Falta Razón Social/Nombre', 'ERROR');
    }
    if(!this.description){
      return this.snack.viewsnack('Hace Falta Descripción', 'ERROR');
    }
    if(!this.mission){
      return this.snack.viewsnack('Hace Falta Misión', 'ERROR');
    }
    if(!this.vision){
      return this.snack.viewsnack('Hace Falta Visión', 'ERROR');
    }
    if(!this.phone){
      return this.snack.viewsnack('Hace Falta Telefono de Contacto', 'ERROR');
    }
    if(!this.email){
      return this.snack.viewsnack('Hace Falta Email', 'ERROR');
    }
    if(!this.address){
      return this.snack.viewsnack('Hace Falta Dirección', 'ERROR');
    }
    if(!this.city){
      return this.snack.viewsnack('Hace Falta Ciudad', 'ERROR');
    }
    if(!this.snack.validateEmail(this.email || '')){
      return this.snack.viewsnack('Formato del Email es Inválido', 'error')
    }

    if(this.unique_id){

      this.companiesApi.Update(this.unique_id, {
        logo: this.changeLogo ? this.logo : "",
        nit: this.nit,
        businessName: this.businessName,
        description: this.description,
        mission: this.mission,
        vision: this.vision,
        phone: this.phone,
        email: this.email,
        address: this.address,
        city: this.city,
        colors: this.listColors,
        strategics: this.listStrategics,
        areas: this.listAreas,
        employments: this.listEmployments,
      }).then((res:any) => {
        this.snack.viewsnack(res.data, 'success');
        this.router.navigate(['admin/empresas']);

      })
    }else{
      this.companiesApi.Create({
        logo: this.changeLogo ? this.logo : "",
        nit: this.nit,
        businessName: this.businessName,
        description: this.description,
        mission: this.mission,
        vision: this.vision,
        phone: this.phone,
        email: this.email,
        address: this.address,
        city: this.city,
        colors: this.listColors
      }).then((res:any)=>{
        this.snack.viewsnack(res.data.msg, 'success');
        this.router.navigate(['admin/empresas']);
      });
    }


  }


}
