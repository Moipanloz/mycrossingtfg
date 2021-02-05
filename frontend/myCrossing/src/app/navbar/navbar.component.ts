import { UserService } from 'app/autenticacion/user.service';
import { Component } from '@angular/core';
import { Verification } from '../app.component';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{
  verification: Verification;
  cookieService: CookieService;
  _user : UserService;
  constructor(cookieService: CookieService, verification: Verification,
     private http: HttpClient, private router: Router, _user : UserService) {
    this.cookieService = cookieService;
    this.verification = verification;
    this._user = _user;
  }

  logOut(){
    this._user.logOut().then(() => {
      this.verification.logged = false;
      this.verification.user = null;
      this.router.navigate([""]);
    });
  }
}
