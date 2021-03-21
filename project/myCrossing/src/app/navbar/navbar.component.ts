import { ErrorService } from './../general/services/error.service';
import { UserService } from 'app/autenticacion/user.service';
import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { VerificationService } from 'app/general/services/verification.service';

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
  _error : ErrorService;

  constructor(cookieService: CookieService, verification: VerificationService,
     private router: Router, _user : UserService, errorService : ErrorService) {
    this.cookieService = cookieService;
    this.verification = verification;
    this._user = _user;
    this._error = errorService;
  }

  ngOnInit(){
    this.verification.verify().then().catch(err => {
      this._error.setNewError(err.message);
      setTimeout(() => {this._error.cleanError()}, 3000)
    });
  }

  logOut(){
    this._user.logOut().then(() => {
      this.cookieService.delete('verif');
      this.cookieService.delete('userId');
      this.verification.logged = false;
      this.verification.user = null;
      this.verification.nombre = "";
      this.menu = false;
      this.router.navigate([""]);
    }).catch(err => {
      this._error.setNewError(err.message);
      setTimeout(() => {this._error.cleanError()}, 3000)
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
}
