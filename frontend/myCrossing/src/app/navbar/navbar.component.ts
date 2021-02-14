import { UserService } from 'app/autenticacion/user.service';
import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { VerificationService } from 'app/general/verification.service';
import { ColeccionesEspInvService } from 'app/perfil/coleccionesp/coleccionesespinv.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {
  verification: VerificationService;
  cookieService: CookieService;
  menu : boolean = false;
  _user : UserService;
  _ceinv : ColeccionesEspInvService;

  constructor(cookieService: CookieService, verification: VerificationService,
     private router: Router, _user : UserService, _ceinv : ColeccionesEspInvService) {
    this.cookieService = cookieService;
    this.verification = verification;
    this._user = _user;
    this._ceinv = _ceinv;
  }


  ngOnInit(){
    this.verification.verify();
  }

  logOut(){
    this._user.logOut().then(() => {
      this.verification.logged = false;
      this.verification.user = null;
      this.verification.nombre = "";
      this.menu = false;
      this.router.navigate([""]);
    });
  }

  toggleMenu(){
    this.menu = !this.menu;
  }

  cierraMenu(){
    if(this.menu){
      this.menu = false;
    }
  }

  updateCEInv(){
    this._ceinv.updateCEInv().then(() => {
      alert("Actualizado el inventario de colecciones");
      this.router.navigate[""];
    });
  }
}
