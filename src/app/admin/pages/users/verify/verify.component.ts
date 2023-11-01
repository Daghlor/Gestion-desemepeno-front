import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/config/snackbar.service';
import { VerifyService } from './../../../services/verify.service';
import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { NgForm } from '@angular/forms';

// ESTA ES LA LOGICA DEL COMPONENTE DE VERIFICACION
@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss'],
})
export class VerifyComponent implements OnInit {
  // SE DEFINE VARIABLES
  @ViewChildren('inputs') inputs!: QueryList<ElementRef<HTMLInputElement>>;
  @ViewChild('submitBtn') submitBtn!: ElementRef<HTMLInputElement>;
  @ViewChild('verifyForm') verifyForm!: NgForm;
  num1: any;
  num2: any;
  num3: any;
  num4: any;
  num5: any;
  num6: any;
  option?: number;
  unique_id?: string;

  // SE INYECTAN LOS SERVICIOS NECESARIOS
  constructor(
    private verifyAPI: VerifyService,
    private snack: SnackbarService,
    private router: Router
  ) {}

  ngOnInit() {

  }

  // FUNCION QUE VALIDA LOS CAMPOS DE LOS NUMEROS Y QUE NO HAYA ESPACIOS
  validateNumbers(number: any): any {
    let validate = /^[0-9]+$/;

    switch (number) {
      case 1:
        if (!this.num1.match(validate)) {
          return (this.num1 = null);
        }
        document.getElementById('input2')?.focus();
        break;

      case 2:
        if (!this.num2.match(validate)) {
          return (this.num2 = null);
        }
        document.getElementById('input3')?.focus();
        break;

      case 3:
        if (!this.num3.match(validate)) {
          return (this.num3 = null);
        }
        document.getElementById('input4')?.focus();
        break;

      case 4:
        if (!this.num5.match(validate)) {
          return (this.num5 = null);
        }
        document.getElementById('input5')?.focus();
        break;

      case 5:
        if (!this.num5.match(validate)) {
          return (this.num5 = null);
        }
        document.getElementById('input6')?.focus();
        break;

      case 6:
        if (!this.num6.match(validate)) {
          return (this.num6 = null);
        }
        break;

      default:
        break;
    }
  }

  // FUNCION QUE GUARDA Y VALIDA LOS NUMEROS CON LAS BASE DE DATOS
  saveVerify() {
    if (!this.num1) {
      return this.snack.viewsnack('Falta #1', 'Error');
    }
    if (!this.num2) {
      return this.snack.viewsnack('Falta #2', 'Error');
    }
    if (!this.num3) {
      return this.snack.viewsnack('Falta #3', 'Error');
    }
    if (!this.num4) {
      return this.snack.viewsnack('Falta #4', 'Error');
    }
    if (!this.num5) {
      return this.snack.viewsnack('Falta #5', 'Error');
    }
    if (!this.num6) {
      return this.snack.viewsnack('Falta #6', 'Error');
    }

    const code =
      this.num1 + this.num2 + this.num3 + this.num4 + this.num5 + this.num6;

    this.verifyAPI
      .Create({
        code,
        info: code,
      })
      .then((res: any) => {
        if (!res.data) {
          this.num1 = null;
          this.num2 = null;
          this.num3 = null;
          this.num4 = null;
          this.num5 = null;
          this.num6 = null;
          return this.snack.viewsnack(
            'El codigo es incorrecto o invalido',
            'Error'
          );
        } else {
          this.snack.viewsnack('Usuario verificado correctamente', 'Success');
          localStorage.setItem('verify', 'true');
          this.router.navigateByUrl('admin/usuarios/form/' + this.unique_id + '/perfil');
        }
      });
  }

  routers(url: string) {
    this.option = 0;
    this.router.navigateByUrl('/admin' + url);
  }

  // FUNCION PARA QUE SE PUEDA COPIAR Y PEGAR EL CODIGO EN LOS CAMPOS
  pasteCode(event: ClipboardEvent): void {
    const pastedText = event.clipboardData?.getData('text');
    if (pastedText) {
      const numbers = pastedText.match(/\d/g);
      if (numbers && numbers.length === 6) {
        this.num1 = numbers[0];
        this.num2 = numbers[1];
        this.num3 = numbers[2];
        this.num4 = numbers[3];
        this.num5 = numbers[4];
        this.num6 = numbers[5];
      }
    }
  }
}

// Copyright (c) Engagement
// https://www.engagement.com.co/
// Año: 2023
// Sistema: Gestion de desempeño (GDD)
// Programador: David Tuta
