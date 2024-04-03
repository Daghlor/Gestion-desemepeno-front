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
  plans_id?: number;
  listStrategics: any = [];
  points: number = 0;

  startDate: Date = new Date();
endDate: Date = new Date();

  constructor(
    // SE DEFINE VARIBLAES CON SERVICIOS ASIGNADOS
    private authApi: AuthService,
    private router: Router,
    private snack: SnackbarService,
    private Local: LocalService,
    private individualAPI: IndividualService,
  ) { }

  ngOnInit(): void {
    this.points = JSON.parse(this.Local.findDataLocal('points'));
    this.findList();
  }


  findList(){
    this.authApi.FindData().then((res:any)=>{
      this.listStrategics = res.strategics;
    });
  }

  changeStrategics(){
    this.plans_id = this.listStrategics.find((data: any) => data.id === this.strategic_id).plans_id;
  }

  formatDate(date: Date): string {
    const isoString = date.toISOString(); // Obtener la fecha en formato ISO
    return isoString.substring(0, 10); // Obtener solo la parte de la fecha (YYYY-MM-DD)
}

  // FUNCION QUE VERIFICA LOS CAMPOS Y GUARDA EL OBJETIVO INDIVIDUAL
  async saveData() {
    let totalPoint = JSON.parse(this.Local.findDataLocal('points')) - this.weight;

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
    if(totalPoint < 0){
      return this.snack.viewsnack(`El Peso es Superior al Puntaje Disponible (${totalPoint})`, 'ERROR');
    }




    const data = {
      title: this.title,
      strategic_id: this.strategic_id,
      weight: this.weight,
      objetive: this.objetive,
      plans_id: this.plans_id,
      start_date: this.formatDate(this.startDate), // Formatear la fecha de inicio
      end_date: this.formatDate(this.endDate),
    }

    this.individualAPI.Create(data).then((res: any) => {
      this.Local.createDataLocal('points', JSON.stringify(totalPoint));
      this.snack.viewsnack(res.data.msg, 'success');
      this.router.navigate(['admin/objetivos_individuales']);
    });
  }

}

// Copyright (c) Engagement
// https://www.engagement.com.co/
// Año: 2023
// Sistema: Gestion de desempeño (GDD)
// Programador: David Tuta
