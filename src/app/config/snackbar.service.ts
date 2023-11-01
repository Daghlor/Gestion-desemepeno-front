import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SnackbarComponent } from '../admin/pages';

// ESTE ES EL SERVICIO DEL SNACKBAR PARA QUE SEA APLICABLE O INYECTABLE A TODOS LOS COMPONENTES DEL SISTEMA
@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

constructor(
  public snack: MatSnackBar,
  private router: Router,
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

  public redirect(url: string, params?: any) {
    this.router.navigate([url]);
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

// Copyright (c) Engagement
// https://www.engagement.com.co/
// Año: 2023
// Sistema: Gestion de desempeño (GDD)
// Programador: David Tuta
