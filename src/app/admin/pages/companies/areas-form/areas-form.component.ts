import { CompaniesService } from './../../../services/companies.service';
import { AreasService } from './../../../services/areas.service';
import { Component, OnInit } from '@angular/core';
import { SnackbarService } from 'src/app/config/snackbar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalService } from 'src/app/config/local.service';

@Component({
  selector: 'app-areas-form',
  templateUrl: './areas-form.component.html',
  styleUrls: ['./areas-form.component.scss']
})
export class AreasFormComponent implements OnInit {
  description?: string;
  unique_id?: string;
  titleButton: string = 'Registrar Area';
  listAreas?: any = [];
  id?: number;
  businessName?: string;
  currentTab: number = 1;
  listCompany?: any = [];
  listEmpresa?: any = [];

  constructor(
    private AreasApi: AreasService,
    private snack: SnackbarService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private Local: LocalService,
    private companiesApi: CompaniesService
  ) { }

  ngOnInit(): void {
    this.findData();
  }

  findData(){
    this.companiesApi.FindOne(this.unique_id || '').then((res:any)=>{
      this.id = res.data.id;
      this.businessName = res.data.businessName;
      this.description = res.data.description;

      for (let i = 0; i < res.data.company.length; i++) {
        res.data.company[i].update = false;
        res.data.company[i].sync = true;
        res.data.company[i].delete = false;
        res.data.company[i].create = false;
      }

      this.listCompany = res.data.company;

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


  addCompany(){
    if(!this.validateCompany()){
      return;
    }
    this.listCompany.unshift({
      id: null,
      unique_id: null,
      businessName: '',
    });
  }

  validateCompany(){
    let result = true;

    for (let i = 0; i < this.listCompany.length; i++) {
      if(!this.listCompany[i].description){
        this.snack.viewsnack('Hace falta la descripción de un cargo', 'error');
        result = false;
      }
    }

    return result;
  }


  addEmpresa(){

    console.log(this.id);

    let info_user = JSON.parse(this.Local.findDataLocal('info_user'));
    this.listEmpresa.unshift({
      id: null,
      unique_id: null,
      businessName:'',
      company_id: null,
      nameUser: info_user.name + ' ' + info_user.lastName,
      user_id: info_user.id,
      state_id: 1,
      update: false,
      create: true,
      sync: false,
      delete: false
    });
  }







}
