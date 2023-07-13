import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/admin/services/auth.service';
import { IndividualService } from 'src/app/admin/services/individual.service';
import { LocalService } from 'src/app/config/local.service';
import { SnackbarService } from 'src/app/config/snackbar.service';

// ESTE ES EL .TS DONDE ESTA LA PARTE LOGICA DE LA VISTA FORMULARIOS DE OBEJTIVOS INDIVIDUALES
@Component({
  selector: 'app-individuales-objectives-form',
  templateUrl: './individuales-objectives-form.component.html',
  styleUrls: ['./individuales-objectives-form.component.scss']
})
export class IndividualesObjectivesFormComponent implements OnInit {
  // SE DEFINE VARIABLES LOCALES
  title?: string;
  weight: number = 0;
  strategic_id?: number;
  objetive?: string;
  listStrategics: any = [];
  points: number = 0;

  constructor(
    // SE DEFINE VARIBLAES CON SERVICIOS ASIGNADOS
    private authApi: AuthService,
    private router: Router,
    private snack: SnackbarService,
    private Local: LocalService,
    private individualAPI: IndividualService,
  ) { }

  ngOnInit(): void {

    this.findList();
  }


  findList(){
    this.authApi.FindData().then((res:any)=>{
      this.listStrategics = res.strategics;
    });
  }

  // FUNCION QUE VERIFICA LOS CAMPOS Y GUARDA EL OBJETIVO INDIVIDUAL
  async saveData(){

    if(!this.title){
      return this.snack.viewsnack('Hace Falta el Titulo', 'ERROR');
    }
    if(!this.strategic_id){
      return this.snack.viewsnack('Hace Falta el Objetivo Estratégico', 'ERROR');
    }
    if(!this.weight){
      return this.snack.viewsnack('Hace Falta el Puntaje', 'ERROR');
    }
    if(!this.objetive){
      return this.snack.viewsnack('Hace Falta el Objetivo', 'ERROR');
    }



    const data = {
      title: this.title,
      strategic_id: this.strategic_id,
      weight: this.weight,
      objetive: this.objetive
    }

    this.individualAPI.Create(data).then((res:any)=>{
      this.snack.viewsnack(res.data.msg, 'success');
      this.router.navigate(['admin/objetivos_individuales']);
    });
  }

}
