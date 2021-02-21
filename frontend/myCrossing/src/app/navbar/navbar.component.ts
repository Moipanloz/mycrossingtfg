import { UserService } from 'app/autenticacion/user.service';
import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { VerificationService } from 'app/general/verification.service';
import { ItemsCEService } from 'app/perfil/coleccionesp/itemsce.service';

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
  _ceinv : ItemsCEService;

  constructor(cookieService: CookieService, verification: VerificationService,
     private router: Router, _user : UserService, _ceinv : ItemsCEService) {
    this.cookieService = cookieService;
    this.verification = verification;
    this._user = _user;
    this._ceinv = _ceinv;
  }


  ngOnInit(){
    this.verification.verify();
  }

  logOut(){
    this._user.logOut().then(data => {
      if(!data.includes("Error:")){
        this.cookieService.delete('verif');
        this.cookieService.delete('userId');
        this.verification.logged = false;
        this.verification.user = null;
        this.verification.nombre = "";
        this.menu = false;
        this.router.navigate([""]);
      }else{
        alert("Hubo un error al cerrar la sesión");
      }

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
    this._ceinv.updateItemsCE().then(() => {
      alert("Actualizado el inventario de colecciones");
      this.router.navigate[""];
    });
  }
}
