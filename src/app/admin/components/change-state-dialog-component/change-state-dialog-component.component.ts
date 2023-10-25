import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ObjectivesStatesService } from '../../services/objectives-states.service';
import { IndividualService } from '../../services/individual.service';

// LOGICA DEL CUADRO DE DIALOGO DE LOS ESTADOS DE LOS OBJETIVOS
@Component({
  selector: 'app-change-state-dialog-component',
  templateUrl: './change-state-dialog-component.component.html',
  styleUrls: ['./change-state-dialog-component.component.scss']
})
export class ChangeStateDialogComponentComponent implements OnInit {
   selectedState: number | null = null;
  states: any[] = [];
  objectiveId: string = '';
  currentState: number | null = null;



constructor(
    public dialogRef: MatDialogRef<ChangeStateDialogComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private objectivesStatesService: ObjectivesStatesService,
    private individualAPI: IndividualService,// Inyecta el servicio aquí
  ) {
    this.loadStates();
}

  ngOnInit(): void {
  this.currentState = this.data.currentState;
  if (!Array.isArray(this.states)) {
    this.states = []; // Inicializa como un array vacío si no lo es
  }
    this.objectiveId = this.data.objectiveId;
  console.log('Unique ID del objetivo individual:', this.objectiveId); // Obtén el ID del objetivo desde los datos
}

// FUNCION PARA CARGAR LOS ESTADOS REGISTRADOS DE TODOS LOS OBJETIVOS INDIVIDUALES
loadStates() {
    this.objectivesStatesService.FindAll({}).then((res: any) => {
      if (res.success) {
        this.states = res.data;
      } else {
        // Maneja el error si es necesario
      }
    }).catch((err) => {
      // Maneja el error si es necesario
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

// FUNCION PARA HACER EL GUARDADO DEL CAMBIO DE ESTADO CUANDO SE LE DA CLICK AL BOTON
onSaveClick(): void {
    console.log('Botón Guardar clickeado');

    if (this.selectedState !== null) {
      console.log('Estado seleccionado:', this.selectedState);
      console.log('ID del objetivo:', this.objectiveId);

      this.individualAPI
        .UpdateState(this.objectiveId, { new_state_id: this.selectedState })
        .then((res: any) => {
          console.log('Respuesta del servicio:', res);

          if (res.res) {
            this.dialogRef.close(true); // Cierra el diálogo con éxito
            console.log('El estado se ha actualizado correctamente.');
          } else {
            console.error('Error al actualizar el estado:', res.message);
            // Puedes manejar errores aquí si es necesario
          }
        })
        .catch((err) => {
          console.error('Error en la llamada al servicio:', err);
          // Puedes manejar errores aquí si es necesario
        });
    } else {
      console.warn('No se ha seleccionado un estado.');
    }
  }
}

// Copyright (c) Engagement
// https://www.engagement.com.co/
// Año: 2023
// Sistema: Gestion de desempeño (GDD)
// Programador: David Tuta
