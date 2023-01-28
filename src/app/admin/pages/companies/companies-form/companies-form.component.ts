import { Component, OnInit } from '@angular/core';

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


  constructor() { }

  ngOnInit(): void {
    this.optionsTabs.lenght
  }

  changePhoto(photo: any){

  }

}
