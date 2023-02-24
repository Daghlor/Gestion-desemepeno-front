import { AuthService } from 'src/app/admin/services/auth.service';
import { SnackbarService } from 'src/app/config/snackbar.service';
import { EmploymentsService } from './../../../services/employments.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cargos-form',
  templateUrl: './cargos-form.component.html',
  styleUrls: ['./cargos-form.component.scss']
})
export class CargosFormComponent implements OnInit {
  @ViewChild(MatAccordion) accordion?: MatAccordion;
  description?: string;
  unique_id?: string;
  params: any;
  listCompany: any = [];
  titleButton: string = 'Registrar Cargo';
  listEmployments: any = [];
  employment_id?: number;
  allEmployments: any = [];
  company_id?: string;
  listCargos?: any = [];
  id?: number;
  currentTab: number = 1;

  constructor(
    private CargosApi: EmploymentsService,
    private snack: SnackbarService,
    private router: Router,
    private authApi: AuthService,
    private activeRouter: ActivatedRoute,
  ) { }

  async ngOnInit(){
    await this.getAllList();

    this.params = this.activeRouter.snapshot.params;
    this.unique_id = this.params.uuid;

    if(this.unique_id){
      this.titleButton = 'Actualizar';
      await this.findData();
    }
  }

  getAllList(){
    this.authApi.FindData().then((res:any)=>{
      this.listCompany = res.companies
    })
  }

  AddCompany(){
    this.listEmployments = [];
    this.employment_id = 0;

    for (let i = 0; i < this.allEmployments.length; i++){
      if(this.allEmployments[i].company_id == this.company_id){
        this.listEmployments.push(this.allEmployments[i]);
      }
    }
  }

  findData(){
    this.CargosApi.FinOne(this.unique_id || '').then((res:any)=>{
      this.listEmployments = [];
      this.company_id = res.data.company_id;

      for(let i = 0; i < this.allEmployments.length; i++){
        if(this.allEmployments[i].company_id == this.company_id){
          this.listEmployments.push(this.allEmployments[i]);
        }
      }

      this.description = res.data.description;
      this.company_id = res.data.company_id;
    });
  }

  addCargo(){
    if(!this.validateCargos()){
      return;
    }

    this.listCargos.unshift({
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

  deleteCargos(index: number){
  this.listCargos.splice(index, 1);
  }

  validateCargos(){
    let result = true;
    for (let i = 0; i < this.listCargos.length; i++){
      if(!this.listCargos[i].vision){
        this.snack.viewsnack('hace falta la descripcion del cargo','error');
        result = false;
      }
    }
    return result;
  }

  async guardar(){
    if(!this.description){
      return this.snack.viewsnack("la descripcion es obligatoria", 'Error');
    }
    if(!this.company_id){
      return this.snack.viewsnack("Hace falta la empresa", 'Error');
    }

    const body ={
      description: this.description,
      company_id: this.company_id
    }

    this.CargosApi.Create(body).then((res:any)=>{
      this.snack.viewsnack('Se guardo el cargo correctamente', 'Succes');
      this.router.navigateByUrl("/cargos")
    }).catch((err)=>{
      console.log(err);
    })
  }

}
