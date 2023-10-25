// ESTA ES LA LOGICA DEL CUADRO DE CONFIRMACION GLOBAL
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {
  // SE DEFINE VARIABLES LOCALES
  type: any;
  info: any;

  constructor(
    // SE DEFINE EL CUADRO EMERGENTE Y QUE SEA INYECTABLE
    public dialogRef: MatDialogRef<ConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { }

  ngOnInit(): void {}

  // FUNCION QUE CUANDO DE CLICK CONFIRMA TODO Y SE CIERRA
  confirms(res:any) {
    this.dialogRef.close(res);
  }

}

// Copyright (c) Engagement
// https://www.engagement.com.co/
// Año: 2023
// Sistema: Gestion de desempeño (GDD)
// Programador: David Tuta
