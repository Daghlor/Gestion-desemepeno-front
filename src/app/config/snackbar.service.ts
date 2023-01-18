import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../admin/pages';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

constructor(
  public snack: MatSnackBar
) { }


public viewsnack(message: any, action: any, duration?: any) {
  this.snack.openFromComponent(SnackbarComponent, {
    duration: duration || 3000,
    horizontalPosition: 'right',
    panelClass: ['snackbar'],
    //verticalPosition: 'top',
    data: { message: message, snackType: action}
  });
}



}
