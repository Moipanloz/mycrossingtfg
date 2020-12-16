import { AppConstants } from './../app.component';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  result : boolean;
  global : AppConstants;

  constructor( appConstant : AppConstants, private router : Router){
    this.global = appConstant;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.result = true;
      if (route.url[0].path == "perfil"){
        if(!this.global.logged){
          alert("No has iniciado sesión");
          this.router.navigate(["/inicia-sesion"]);
          this.result = false;
        }
      }else if (route.url[0].path == "inicia-sesion" || route.url[0].path == "registro"){
        if (this.global.logged){
          alert("Primero cierra tu sesión");
          this.router.navigate([""]);
          this.result = false;
        }
      }
      return this.result;
  }

}
