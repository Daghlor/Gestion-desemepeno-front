import { Component, OnInit } from '@angular/core';
import { CompaniesService } from 'src/app/admin/services/companies.service';
import { SnackbarService } from 'src/app/config/snackbar.service';

@Component({
  selector: 'app-companies-form',
  templateUrl: './companies-form.component.html',
  styleUrls: ['./companies-form.component.scss']
})
export class CompaniesFormComponent implements OnInit {
logo?: string = 'assets/img/companies.png';
changeLogo: boolean = false;
nit?: string;
businessName?: string;
description?: string;
mission?: string;
vision?: string;
phone?: number;
email?: string;
address?: string;
city?: string;
listColors?: any = [];

initialTab: number = 1;
currentTab: number = 1;
optionsTabs: any = [{
  code: 1,
  name: 'Información',
  show: true,
  disabled: false,
  icon: 'store',
},{
  code: 2,
  name: 'Configuración',
  show: true,
  disabled: false,
  icon: 'settings',
}]


  constructor(
    private companiesApi: CompaniesService,
    private snack: SnackbarService
  ) { }

  ngOnInit(): void {
    this.optionsTabs.lenght
  }

  changePhoto(photo: any){

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
      console.log(res);
      
    })
  }


}
