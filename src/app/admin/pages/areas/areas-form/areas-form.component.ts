import { AreasService } from '../../../services/areas.service';
import { Component, OnInit, ViewChild} from '@angular/core';
import { SnackbarService } from 'src/app/config/snackbar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalService } from 'src/app/config/local.service';
import {MatAccordion} from '@angular/material/expansion';
import { AuthService } from 'src/app/admin/services/auth.service';

// ESTE ES EL .TS DE FORMULARIO DE VISTAS DONDE ESTA LA PARTE LOGICA
@Component({
  selector: 'app-areas-form',
  templateUrl: './areas-form.component.html',
  styleUrls: ['./areas-form.component.scss']
})
export class AreasFormComponent implements OnInit {
  // SE DEFINE VARIABLES LOCALES
  @ViewChild(MatAccordion) accordion?: MatAccordion;
  description?: string;
  company_id?: string;
  titleButton: string = 'Registrar Area';
  listAreas?: any = [];
  id?: number;
  businessName?: string;
  currentTab: number = 1;
  listEmpresa?: any = [];

  params: any;
  listCompany: any = [];
  unique_id?: string;
  employment_id?: number;
  listEmployments: any = [];
  allEmployments: any = [];

  constructor(
    // SE DEFINE VARIABLES CON SERVICIOS ASIGNADOS
    private AreasApi: AreasService,
    private snack: SnackbarService,
    private router: Router,
    private authApi: AuthService,
    private activeRouter: ActivatedRoute,
    private Local: LocalService,
  ) { }

  async ngOnInit(){
    await this.getAllList();

    this.params = this.activeRouter.snapshot.params;
    this.unique_id = this.params.uuid;

    if (this.unique_id){
      this.titleButton = 'Actualizar';
      await this.findData();
    }
  }


  getAllList(){
    this.authApi.FindData().then((res:any)=>{
      this.listCompany = res.companies;
    })
  }


  AddCompany(){
    this.listEmployments = [];
    this.employment_id = 0;

    for (let i = 0; i < this.allEmployments.length; i++) {
      if(this.allEmployments[i].company_id == this.company_id){
        this.listEmployments.push(this.allEmployments[i]);
      }
    }
  }

  // FUNCION PARA BUSCAR UNA AREA
  findData(){
    this.AreasApi.FindOne(this.unique_id || '').then((res:any)=>{
      this.listEmployments = [];
      this.company_id = res.data.company_id;

      for (let i = 0; i < this.allEmployments.length; i++) {
        if(this.allEmployments[i].company_id == this.company_id){
          this.listEmployments.push(this.allEmployments[i]);
        }
      }

      this.description = res.data.description;
      this.company_id = res.data.company_id;
    });
  }

  // FUNCION PARA AGREGAR UN AREA
  addArea(){
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

  // FUNCION PARA ELIMINAR UN AREA
  deleteAreas(index: number){
    this.listAreas.splice(index, 1);
  }

  // FUNCION QUE VALIDA SI LA AREA YA EXISTE
  validateAreas(){
    let result = true;
    for (let i = 0; i < this.listAreas.length; i++) {

      if(!this.listAreas[i].vision){
        this.snack.viewsnack('Hace falta la descripcion del area', 'error');
        result = false;
      }
    }

    return result;
  }

  // FUNCION QUE VERIFICA LOS CAMPOS Y REGISTRA EN LA BASE DE DATOS
 async guardar(){
  if(!this.description){
    return this.snack.viewsnack("La descripcion es obligatoria", 'Error');
  }
  if(!this.company_id){
    return this.snack.viewsnack("Hace falta la empresa", 'Error');
  }

  const body ={
    description: this.description,
    company_id: this.company_id
  }

if(!this.unique_id){
  this.AreasApi.Create(body).then((res:any) =>{
    this.snack.viewsnack('Se guardo el area correctamente','Success');
    this.router.navigateByUrl("admin/areas")
  }).catch((err)=>{
    console.log(err);
  })
 }else{
  this.AreasApi.Update(this.unique_id,{
    description: this.description,
    company_id: this.company_id
  }).then((res:any)=>{
    this.snack.viewsnack('Se actualizo el area correctamente', 'Success');
    this.router.navigateByUrl("admin/areas")
  })
 }
}
}
