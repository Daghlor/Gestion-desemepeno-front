import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrackingService } from 'src/app/admin/services/tracking.service';
import { SnackbarService } from 'src/app/config/snackbar.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { TracingsComponent } from "src/app/admin/components/tracings/tracings.component";
import * as moment from 'moment';
import { IndividualService } from 'src/app/admin/services/individual.service';
import { ChangeStateDialogComponentComponent } from '../..';

@Component({
  selector: 'app-my-collaborators',
  templateUrl: './my-collaborators.component.html',
  styleUrls: ['./my-collaborators.component.scss']
})
export class MyCollaboratorsComponent implements OnInit {
  // SE DEFINE VARIABLES LOCALES
  hasApprovedObjectives(): boolean {
    if (!this.listObjetives || this.listObjetives.length === 0) {
      return false;
    }
    for (let i = 0; i < this.listObjetives.length; i++) {
      if (this.listObjetives[i].state === 'Aprobado') {
        return true;
      }
    }
    return false;
  }
  params: any;
  unique_id?: string;
  states: { id: number, description: string }[] = [];
  state: string = '';
  selectedState: string | null = null;
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
    public dialog: MatDialog,
    private individualAPI: IndividualService,
  ) { }

  ngOnInit(): void {
    this.params = this.activeRouter.snapshot.params;
    this.unique_id = this.params.uuid;
    this.findData();
    this.getAllStates();
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

  // FUNCION QUE ABRE UN DIALOG QUE VERIFICA LOS CAMPOS Y LOS GUARDA
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

  getAllStates() {
  this.individualAPI.GetAllStates().then((res: any) => {
    // Mapear los datos del servidor para que coincidan con el formato esperado
    this.states = res.data.map((state: any) => ({
      id: state.id,
      description: state.description
    }));
  }).catch((err: any) => {
    console.error('Error al obtener los estados:', err);
  });
  }

  // Ajusta la función openStateDialog para pasar el unique_id del objetivo individual
openStateDialog(uniqueId: string): void {
  // Obtener el estado actual del objetivo individual usando el servicio individualAPI.FindOne
  this.individualAPI.FindOne(uniqueId).then((individualData: any) => {
    const currentState = individualData.data.state_id;

    // Abre el diálogo para cambiar el estado y pasa el uniqueId como parte de los datos
    const dialogRef = this.dialog.open(ChangeStateDialogComponentComponent, {
      width: '250px',
      data: { objectiveId: uniqueId, currentState: currentState }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snack.viewsnack('Estado cambiado correctamente', 'Success');
        this.findData(); // Actualiza los datos después de cambiar el estado
      }
    });
  }).catch((err: any) => {
    console.error('Error al obtener el objetivo individual:', err);
  });
}

 updateState(objectiveId: string, newStateId: number): void {
    // Crear el cuerpo de la solicitud con el nuevo estado
    const body = {
      state_id: newStateId
    };

    // Llamar al método UpdateState del servicio individualAPI
    this.individualAPI.UpdateState(objectiveId, body)
      .then((res: any) => {
        // Manejar la respuesta si es necesario
        console.log('Estado actualizado correctamente:', res);

        // Puedes volver a cargar los datos si es necesario
        this.findData();
      })
      .catch((err: any) => {
        // Manejar errores si es necesario
        console.error('Error al actualizar el estado:', err);
      });
 }

 selectedStateChange() {
  this.findData(); // Llama a la función para filtrar los datos cuando se cambia el estado seleccionado
}

  //  redirectForm(url: string){
  //   this.snack.redirect(url);
  // }

  redirectForm(url: string) {
    console.log('Redireccionando a la vista de colaboradores...');
  // Verifica si user tiene un ID
  if (this.userData && this.userData.id) {
    // Llama al servicio FindAllByHierarchy con el ID del usuario
    this.individualAPI.FindAllByHierarchy(this.userData.id, {}/*body si es necesario*/)
      .then((result) => {
        // Manejar el resultado si es necesario
      })
      .catch((error) => {
        // Manejar el error si es necesario
      });
  } else {
    // Maneja el caso en que user no tenga un ID
    console.error('El usuario no tiene un ID definido.');
  }
  }

  goToTrackinsg(): void {
        this.router.navigateByUrl('admin/mis_seguimientos/' + this.unique_id);
    }

}
