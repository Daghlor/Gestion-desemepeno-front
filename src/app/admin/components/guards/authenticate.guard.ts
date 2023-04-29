import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalService } from 'src/app/config/local.service';
import { SnackbarService } from 'src/app/config/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateGuard implements CanActivate {
  constructor(
    private router: Router,
    private snack: SnackbarService,
    private local: LocalService,
  ){ }

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!localStorage.getItem('token')){
      this.snack.viewsnack('Debe iniciar sesion', 'Error');
      return this.router.navigateByUrl('/login');
    }
    if(!JSON.parse(this.local.findDataLocal('verify'))){
      this.snack.viewsnack('Debe verificarse','Error');
      return this.router.navigateByUrl('/verificacion');
    }
    return true;
  }

}
