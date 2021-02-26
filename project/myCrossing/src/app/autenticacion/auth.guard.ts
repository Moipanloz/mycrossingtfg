import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { VerificationService } from 'app/general/verification.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  global : VerificationService;

  constructor( appConstant : VerificationService, private router : Router){
    this.global = appConstant;

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      let result : boolean = true;

      if (route.url[0].path == "perfil"){
        this.global.verify().then(() => {
          if (!this.global.logged){
            this.router.navigate(["/inicia-sesion"]);
            alert("No has iniciado sesión");
            result = false;
          }
        }).catch((mssg) => {console.log(mssg)});
      }else if (route.url[0].path == "inicia-sesion" || route.url[0].path == "registro"){
        this.global.verify().then(() => {
          if (this.global.logged){
            this.router.navigate([""]);
            alert("Cierra tu sesión primero");
            result = false;
          }
        }).catch((mssg) => {console.log(mssg)});
      }

      return result;
  }

}
