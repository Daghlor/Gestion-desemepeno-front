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


  public viewsnack(message: string, action: string, duration?: number) {
    this.snack.openFromComponent(SnackbarComponent, {
      duration: duration || 3000,
      horizontalPosition: 'right',
      panelClass: ['snackbar'],
      //verticalPosition: 'top',
      data: { message: message, snackType: action}
    });
  }

  public async validateEmail(email: string) {
    let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    let result = true;
    if(!emailRegex.test(email)){
      result = false;
    }

    return result;
  }



}
