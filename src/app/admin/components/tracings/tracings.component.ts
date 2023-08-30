import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

// ESTE ES EL TS DONDE ESTA LA PARTE LOGICA DE LA VISTA CUADRO DE DIALOGO DE COMENTARIO DE SEGUIMIENTO
@Component({
  selector: 'app-tracings',
  templateUrl: './tracings.component.html',
  styleUrls: ['./tracings.component.scss']
})
export class TracingsComponent implements OnInit {
  // SE DEFINE VARIABLE
  comment: string = '';
  weight: number = 0;

  constructor(
    // SE INYECTA LIBRERIA DE MATDIALOG O CUADROS DE DIALOGO
    public dialogRef: MatDialogRef<TracingsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.comment = '';
    this.weight = 0;
  }

  // FUNCION QUE OBTINE EL COMENTARIO Y LO GUARDA
  closeModal(): void {
    this.comment = '';
    this.weight = 0;
    this.dialogRef.close();
  }

}
