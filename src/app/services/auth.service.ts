import { Injectable } from '@angular/core';

// ESTE SERVICIO AUTH DE ANGULAR ES ENCARGADA DE ASIGNAR EL TOKEN Y GUARDARLO
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  isLogged() {
    return 'Bearer '+localStorage.getItem('token');
  }
}
