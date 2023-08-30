import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TrackingService } from 'src/app/admin/services/tracking.service';
import { SnackbarService } from 'src/app/config/snackbar.service';
import { TracingsComponent, TracingsEmployeComponent } from '../..';
import * as moment from 'moment';
import { LocalService } from 'src/app/config/local.service';

@Component({
  selector: 'app-my-trackings',
  templateUrl: './my-trackings.component.html',
  styleUrls: ['./my-trackings.component.scss']
})
export class MyTrackingsComponent implements OnInit {

  params: any;
  unique_id?: string;
  listObjetives: any = [];
  userData: any = {
    name: ''
  };


  constructor(
    private trackingAPI: TrackingService,
    private snack: SnackbarService,
    private activeRouter: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private Local: LocalService,
  ) { }

  ngOnInit(): void {
    this.params = this.activeRouter.snapshot.params;
    this.unique_id = this.params.uuid;
    this.findData();
    this.userData = this.Local.findDataLocal('usuario_actual');
  }

  findData() {
    this.listObjetives = [];
    this.trackingAPI.FindOne(this.unique_id || '').then((res: any) => {
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


  // En my-trackings.component.ts

 openEmployeeCommentDialog(uniqueId: string) {
  console.log('unique_id de seguimiento:', uniqueId);

  // Verifica que uniqueId tenga un valor válido
  if (!uniqueId) {
    console.error('El uniqueId no es válido.');
    return;
  }

  // Abre el cuadro de diálogo TracingsEmployeComponent para agregar comentarios de empleados
  const dialogRef = this.dialog.open(TracingsEmployeComponent, {
    width: '600px',
    data: { uniqueId: uniqueId },
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // Llama al servicio addEmployComment con el uniqueId y el comentario del empleado
      this.trackingAPI.addEmployComment(uniqueId, { comment_employee: result }) // Pasa el comentario en el cuerpo de la solicitud
        .then((res) => {
          if (res && res.data && res.data.msg) {
            this.snack.viewsnack(res.data.msg, 'success');
            this.findData();
          } else {
            console.error('Respuesta del servidor inesperada:', res);
            // Manejo de errores personalizado si es necesario
            this.snack.viewsnack('Error inesperado en el servidor', 'error');
          }
        })
        .catch((error) => {
          console.error('Error al realizar la solicitud PUT:', error);

          if (error.response && error.response.status === 403) {
            // El usuario no tiene permiso
            this.snack.viewsnack('No tienes permisos para realizar esta acción', 'error');
            // Puedes redirigir al usuario a la página de inicio de sesión u otra página adecuada aquí
          } else if (error.response && error.response.data && error.response.data.msg) {
            // Manejo de otros errores específicos del servidor
            this.snack.viewsnack(error.response.data.msg, 'error');
          } else {
            // Manejo de otros errores inesperados
            this.snack.viewsnack('Error inesperado', 'error');
          }
        });
    }
  });
}


}




