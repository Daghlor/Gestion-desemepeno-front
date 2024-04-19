import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TrainingActionsService } from '../../services/training-actions.service';

interface State {
  id: number;
  description: string;
}

@Component({
  selector: 'app-change-training-state-dialog',
  templateUrl: './change-training-state-dialog.component.html',
  styleUrls: ['./change-training-state-dialog.component.scss']
})
export class ChangeTrainingStateDialogComponent implements OnInit {
  selectedState: number | null = null;
  states: any[] = [];
  trainingId: string = '';
  currentState: number | null = null;

  constructor(
    public dialogRef: MatDialogRef<ChangeTrainingStateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private trainingActionsService: TrainingActionsService,
  ) {}

  ngOnInit(): void {
    this.trainingId = this.data.trainingId;
    this.currentState = this.data.currentState;
    this.loadStates();
  }

  loadStates(): void {
  this.trainingActionsService.FindAllStates({})
    .then((res: any) => {
      if (res.res) {
        this.states = res.data;
      } else {
        const errorMessage = res.message || 'Error desconocido al cargar los estados';
        this.handleError('Error al cargar los estados:', errorMessage);
      }
    })
    .catch((err: any) => {
      this.handleError('Error al cargar los estados:', err);
    });
}



  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
  if (this.selectedState !== null) {
    // Crea el cuerpo de la solicitud con el nuevo estado
    const body = {
      state_id: this.selectedState // Cambiado a state_id en lugar de new_state_id
    };

    // Llama al método Update del servicio trainingActionsService con el unique_id de la acción y el cuerpo de la solicitud
    this.trainingActionsService.Update(this.trainingId, body)
      .then((res: any) => {
        if (res.res) {
          this.dialogRef.close(true); // Cierra el diálogo con éxito
        } else {
          this.handleError('Error al actualizar el estado:', res.message);
        }
      })
      .catch((err: any) => {
        this.handleError('Error en la llamada al servicio:', err);
      });
  } else {
    console.warn('No se ha seleccionado un estado.');
  }
}


  private handleError(message: string, error: any): void {
    console.error(message, error);
    // Aquí podrías mostrar un mensaje de error al usuario
  }
}
