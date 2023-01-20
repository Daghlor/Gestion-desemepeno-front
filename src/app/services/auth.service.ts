import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  isLogged() {
    return 'Bearer '+localStorage.getItem('token');
  }

  

}
