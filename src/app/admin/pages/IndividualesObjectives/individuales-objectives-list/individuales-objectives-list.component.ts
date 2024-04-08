import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IndividualService } from 'src/app/admin/services/individual.service';
import { LocalService } from 'src/app/config/local.service';
import { SnackbarService } from 'src/app/config/snackbar.service';

// ESTE ES EL .TS DONDE ESTA LA PARTE LOGICA DE LA VISTA LISTA DE OBEJTIVOS INDIVIDUALES
@Component({
  selector: 'app-individuales-objectives-list',
  templateUrl: './individuales-objectives-list.component.html',
  styleUrls: ['./individuales-objectives-list.component.scss']
})
export class IndividualesObjectivesListComponent implements OnInit {
  // SE DEFINE VARIABLES LOCALES
  orderColumn?: string;
  orderType?: string;
  actualPage: number = 1;
  pageSize: number = 10;
  pageSizeOptions: number[] = [10, 15, 20, 25, 50];
  listObjetives: any = [];
  points: number = 0;
  unique_id?: string;

  constructor(
    // SE DEFINE VARIABLES CON SERVICIOS ASIGNADOS
    private individualAPI: IndividualService,
    private snack: SnackbarService,
    private Local: LocalService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.points = JSON.parse(this.Local.findDataLocal('points'));
    this.findData();
    const userInfo = JSON.parse(this.Local.findDataLocal('info_user'));
    this.unique_id = userInfo.unique_id;
  }

  // FUNCION QUE BUSCA TODOS LOS OBJETIVOS INDIVIDUALES Y LOS PONE EN UNA LISTA ORGANIZADA
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

    this.individualAPI.FindAll(paginate).then((res:any)=>{
      this.listObjetives = res.data.objetives;
    });
  }

  redirectForm(url: string){
    this.snack.redirect(url);
  }

  async updatePoints() {
    this.points = JSON.parse(this.Local.findDataLocal('points'));
  }

  updateObjective(item: any) {
    const body = {
      title: item.title,
      weight: item.weight,
      objetive: item.objetive,
      start_date: item.start_date,
      end_date: item.end_date
    };

    this.individualAPI.Update(item.unique_id, body).then((res: any) => {
      this.snack.viewsnack(res.data, 'success');
      // Puedes actualizar la lista después de la actualización si es necesario
      // this.findData();
    }).catch((err: any) => {
      this.snack.viewsnack(err.message, 'error');
    });
  }

  // FUNCION QUE ELIMINA LOS OBJETIVOS INDIVIDUALES
  delete(index: number){
    this.individualAPI.Delete(this.listObjetives[index].unique_id).then((res:any)=>{
      this.snack.viewsnack(res.data, 'success');
      this.findData();
    })
  }

  routers(url: string) {
        this.router.navigateByUrl('/admin' + url);
    }

  goToTrackinsg(): void {
        this.router.navigateByUrl('admin/mis_seguimientos/' + this.unique_id);
    }
}

// Copyright (c) Engagement
// https://www.engagement.com.co/
// Año: 2023
// Sistema: Gestion de desempeño (GDD)
// Programador: David Tuta
