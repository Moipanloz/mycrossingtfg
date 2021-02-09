import { UserService } from 'app/autenticacion/user.service';
import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { VerificationService } from 'app/general/verification.service';

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

  constructor(cookieService: CookieService, verification: VerificationService,
     private router: Router, _user : UserService) {
    this.cookieService = cookieService;
    this.verification = verification;
    this._user = _user;
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
}
