import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrackingService } from 'src/app/admin/services/tracking.service';
import { SnackbarService } from 'src/app/config/snackbar.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { TracingsComponent } from "src/app/admin/components/tracings/tracings.component";
import * as moment from 'moment';

// ESTE ES EL .TS DONDE ESTA LA PARTE LOGICA DE LA VISTA FORMULARIO DE SEGUIMIENTO
@Component({
  selector: 'app-tracking-form',
  templateUrl: './tracking-form.component.html',
  styleUrls: ['./tracking-form.component.scss']
})
export class TrackingFormComponent implements OnInit {
  // SE DEFINE VARIABLES LOCALES
  params: any;
  unique_id?: string;
  listObjetives: any = [];
  userData: any = {
    name: ''
  };

  constructor(
    // SE DEFINE VARIABLES CON SERVICIOS ASIGNADOS
    private trackingAPI: TrackingService,
    private snack: SnackbarService,
    private activeRouter: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.params = this.activeRouter.snapshot.params;
    this.unique_id = this.params.uuid;
    this.findData();
  }

  // FUNCION PARA BUSCAR UN SOLO SEGUIMIENTO
  findData(){
    this.listObjetives = [];
    this.trackingAPI.FindOne(this.unique_id || '').then((res:any)=>{
      for (let i = 0; i < res.data.length; i++) {
        for (let o = 0; o < res.data[i].tracing.length; o++) {
          res.data[i].tracing[o].created_at = moment(res.data[i].tracing[o].created_at).format('YYYY/MM/DD HH:mm:ss');
        }
      }

      this.userData = res.user;
      this.listObjetives = res.data;
    });
  }

  // FUNCION QUE ABRE UN MODAL QUE VERIFICA LOS CAMPOS Y LOS GUARDA
  openModalTracing(item: any){
    console.log(item);

    const dialogRef = this.dialog.open(TracingsComponent, {
      width: '600px',
      data: item,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result){
        this.snack.viewsnack('Hace falta el comentario', 'error');
        return;
      }else{
        const body = {
          individual_id: item.id,
          comment: result,
          plans_id: item.plans_id,
        }
        this.trackingAPI.Create(body)
        .then((res) => {
          this.snack.viewsnack(res.data.msg, 'success');
          this.findData();
        })
        .catch((error) => {
          console.error('Error al realizar la solicitud POST:', error);
            // Aquí puedes mostrar un mensaje de error al usuario si lo deseas
        });

      }
    });
  }
}
