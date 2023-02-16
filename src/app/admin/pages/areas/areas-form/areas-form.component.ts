import { AreasService } from '../../../services/areas.service';
import { Component, OnInit, ViewChild} from '@angular/core';
import { SnackbarService } from 'src/app/config/snackbar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalService } from 'src/app/config/local.service';
import {MatAccordion} from '@angular/material/expansion';

@Component({
  selector: 'app-areas-form',
  templateUrl: './areas-form.component.html',
  styleUrls: ['./areas-form.component.scss']
})
export class AreasFormComponent implements OnInit {
  @ViewChild(MatAccordion) accordion?: MatAccordion;
  description?: string;
  company_id?: string;
  titleButton: string = 'Registrar Area';
  listAreas?: any = [];
  id?: number;
  businessName?: string;
  currentTab: number = 1;
  listEmpresa?: any = [];

  constructor(
    private AreasApi: AreasService,
    private snack: SnackbarService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private Local: LocalService,
  ) { }

  ngOnInit(): void {
  }

  addEmpresa(){
    if(!this.validateAreas()){
      return;
    }

    this.listEmpresa.unshift({
      id: null,
      update: false,
      create: true,
      sync: false,
      delete: false
    });
  }

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

  deleteAreas(index: number){
    this.listAreas.splice(index, 1);
  }

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

 guardar(){
  if(!this.description){
    return this.snack.viewsnack("La descripcion es obligatoria", 'Error');
  }

  const body ={
    description: this.description,
  }

  this.AreasApi.Create(body).then((res:any) =>{
    this.snack.viewsnack('Se guardo el area correctamente','Succes');
    this.router.navigateByUrl("/areas")
  }).catch((err)=>{
    console.log(err);
  })
 }
}
