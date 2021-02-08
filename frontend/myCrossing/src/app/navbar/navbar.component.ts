import { UserService } from 'app/autenticacion/user.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { VerificationService } from 'app/general/verification.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  verification: VerificationService;
  cookieService: CookieService;
  menu : boolean = false;
  _user : UserService;
  nombre : string = "";

  constructor(cookieService: CookieService, verification: VerificationService,
     private http: HttpClient, private router: Router, _user : UserService) {
    this.cookieService = cookieService;
    this.verification = verification;
    this._user = _user;
  }

  ngOnInit(){
    console.log("pionche wat");
    this.verification.verify().then(() => {
      this._user.readUser().then(data => {
        this.nombre = data[0]["nombre"];
      });
    });
  }

  logOut(){
    this._user.logOut().then(() => {
      this.verification.logged = false;
      this.verification.user = null;
      this.menu = false;
      this.router.navigate([""]);
    });
  }

  toggleMenu(){
    this.menu = !this.menu;
    console.log("toggle");
  }

  cierraMenu(){
    console.log("cierro");
    if(this.menu){
      this.menu = false;
    }

  }
}
