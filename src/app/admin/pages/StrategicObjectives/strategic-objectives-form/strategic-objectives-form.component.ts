import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StrategicsService } from 'src/app/admin/services/strategics.service';
import { SnackbarService } from 'src/app/config/snackbar.service';
import { AuthService } from 'src/app/admin/services/auth.service';
import { LocalService } from 'src/app/config/local.service';

// ESTE ES EL .TS DONDE ESTA LA PARTE LOGICA DE LA VISTA FORMULARIOS DE OBJETIVOS ESTRATEGICOS
@Component({
  selector: 'app-strategic-objectives-form',
  templateUrl: './strategic-objectives-form.component.html',
  styleUrls: ['./strategic-objectives-form.component.scss']
})
export class StrategicObjectivesFormComponent implements OnInit {
  // SE DEFINE VARIABLES LOCALES
  title?: string;
  company_id?: number;
  plan_id?: number;
  areas_id?: number;
  mission?: string;
  vision?: string;

  allAreas: any = [];
  allPlans: any = [];
  listAreas: any = [];
  listCompany: any = [];
  listPlans: any = [];
  validateAllPermission: boolean = false;

  constructor(
    // SE DEFINE VARIABLES CON SERVICIOS ASIGNADOS
    private authApi: AuthService,
    private strategicAPI: StrategicsService,
    private router: Router,
    private snack: SnackbarService,
    private Local: LocalService,
  ) { }

  ngOnInit(): void {
    this.validatePermissions('get_all_data');
    this.getAllList();
  }

  getAllList(){
    this.authApi.FindData().then((res:any)=>{
      this.allAreas = res.areas;
      this.listCompany = res.companies;
      this.allPlans = res.plans;
    })
  }

  // FUNCION PARA VALIDAR LOS PEMISOS SI ES O NO ES ADMIN
	validatePermissions(code: string): Boolean {
		this.validateAllPermission = this.Local.validatePermission(code) ? true : false;
		return this.validateAllPermission;
	}

  changeCompany(){
    this.listAreas = [];
    this.listPlans = [];
    this.areas_id = 0;
    this.plan_id = 0;

    for (let i = 0; i < this.allAreas.length; i++) {
      if(this.allAreas[i].company_id == this.company_id){
        this.listAreas.push(this.allAreas[i]);
      }
    }

    for (let i = 0; i < this.allPlans.length; i++) {
      if(this.allPlans[i].company_id == this.company_id){
        this.listPlans.push(this.allPlans[i]);
      }
    }
  }

  // FUNCION QUE VERIFICA LOS CAMPOS Y GUARDA EN LA BASE DE DATOS
  async saveData(){
    if(!this.title){
      return this.snack.viewsnack('Hace Falta el Titulo', 'ERROR');
    }
    if(!this.company_id){
      return this.snack.viewsnack('Hace Falta la Empresa', 'ERROR');
    }
    if(!this.areas_id){
      return this.snack.viewsnack('Hace Falta la Área', 'ERROR');
    }
    if(!this.mission){
      return this.snack.viewsnack('Hace Falta la Misión', 'ERROR');
    }
    if(!this.vision){
      return this.snack.viewsnack('Hace Falta la Visión', 'ERROR');
    }

    const data = {
      title: this.title,
      mission: this.mission,
      vision: this.vision,
      company_id: this.company_id,
      areas_id: this.areas_id,
      plans_id: this.plan_id,
    }

    this.strategicAPI.Create(data).then((res:any)=>{
      this.snack.viewsnack(res.data.msg, 'success');
      this.router.navigate(['admin/objetivos_estrategicos']);
    });
  }
}
