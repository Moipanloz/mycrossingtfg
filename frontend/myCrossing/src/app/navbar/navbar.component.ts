import { Component } from '@angular/core';
import { Verification } from '../app.component';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{
  verification: Verification;
  cookieService: CookieService;
  constructor(cookieService: CookieService, verification: Verification, private http: HttpClient) {
    this.cookieService = cookieService;
    this.verification = verification;
  }

  logOut(){
    let userId = this.verification.user;
    this.cookieService.delete('verif');
    this.cookieService.delete('userId');
    let parametros = new HttpParams().set("userId", JSON.stringify(userId)).set("command", "setNull");
    this.http.get("http://localhost/authentication.php", {params: parametros}).toPromise();
    this.verification.logged = false;
    this.verification.user = null;
  }
}
