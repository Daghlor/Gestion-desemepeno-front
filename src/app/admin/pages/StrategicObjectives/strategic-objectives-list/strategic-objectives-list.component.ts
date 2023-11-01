import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { StrategicsService } from 'src/app/admin/services/strategics.service';
import { LocalService } from 'src/app/config/local.service';
import { SnackbarService } from 'src/app/config/snackbar.service';

// ESTE ES EL .TS DONDE ESTA LA PARTE LOGICA DE LA VISTA LISTA DE OBJETIVOS ESTRATEGICOS
@Component({
  selector: 'app-strategic-objectives-list',
  templateUrl: './strategic-objectives-list.component.html',
  styleUrls: ['./strategic-objectives-list.component.scss']
})
export class StrategicObjectivesListComponent implements OnInit {
  // SE DEFINE VARIABLES LOCALES
  loading: boolean = false;
  orderColumn?: string;
  orderType?: string;
  actualPage: number = 1;
  pageSize: number = 10;
  pageSizeOptions: number[] = [10, 15, 20, 25, 50];
  listObjetives: any = [];

  constructor(
    // SE DEFINE VARIABLES CON SERVICIOS ASIGNADOS
    private strategicAPI: StrategicsService,
    private router: Router,
    private snack: SnackbarService,
    private Local: LocalService
  ) { }

  ngOnInit(): void {
    this.findData();
  }

  // FUNCION QUE BUSCA TODOS LOS OBEJTIVOS ESTRATEGICOS Y LOS PONE EN UNA LISTA
  findData(){
    let userInfo = JSON.parse(this.Local.findDataLocal('info_user'));

    const paginate = {
      paginate: this.pageSize,
      page: this.actualPage,
      column: this.orderColumn || 'title',
      direction: this.orderType || 'asc',
      search: {
        user_id: userInfo.id,
        company_id: userInfo.employment_id,
        state_id: 1,
        areas_id: null
      }
    }

    this.strategicAPI.FindAll(paginate).then((res:any)=>{
      this.listObjetives = res.data.objetives;
    });
  }

  redirectForm(url: string){
    this.snack.redirect(url);
  }

  // FUNCION PARA ELIMINAR OBJETIVOS ESTRATEGICOS
  delete(index: number){
    this.strategicAPI.Delete(this.listObjetives[index].unique_id).then((res:any)=>{
      this.snack.viewsnack(res.data, 'success');
      this.findData();
    });
  }
}

// Copyright (c) Engagement
// https://www.engagement.com.co/
// Año: 2023
// Sistema: Gestion de desempeño (GDD)
// Programador: David Tuta
