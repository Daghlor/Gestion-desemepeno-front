import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

// ESTE ES EL TS DONDE SE VALDIA QUE MENSAJE DEBE MOSTRAR SEGUN LA VALIDACION QUE HAGA O PROCESO QUE SE ESTE HACIENDO
@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {
  getIcon!: string;
  message!: string;
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  ngOnInit() {
    this.getIcon = this.data.snackType.toLowerCase();
    this.message = this.data.message;
  }



}
