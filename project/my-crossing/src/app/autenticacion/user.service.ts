import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../general/interfaces';
import { VerificationService } from 'app/general/services/verification.service';
import { PlatformLocation } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  data = [];
  verification : VerificationService;
  cookieService : CookieService;
  url : string;


  constructor(platformLocation: PlatformLocation, verification: VerificationService, private http: HttpClient, cookieService : CookieService) {
      this.verification = verification;
      this.cookieService = cookieService;
      this.url = platformLocation.hostname.includes("localhost")?"http://localhost/":"https://mycrossing.epizy.com/";
      this.url = this.url + "authentication.php";
    }

  readUser() : Promise<User> {
    let parametros = new HttpParams()
    .set("userId", JSON.stringify(this.verification.user))
    .set("verif", this.verification.verifCode)
    .set("command", "read");

    return this.http.get<User>(this.url, {params: parametros}).toPromise().catch(err => {throw new Error(err.error.text)});
  }

  login(user : any, key : string) : Promise<User>{
    let parametros = new HttpParams()
    .set("command", "login");

    user.key = key;

    return this.http.post<User>(this.url, user, {params: parametros}).toPromise().catch(err => {throw new Error(err.error.text)});
  }

  register(user : any, key : string) : Promise<any>{
    let parametros = new HttpParams().set("command", "register");

    user.verif = key;

    return this.http.post(this.url, user, {params: parametros}).toPromise().catch(err => {throw new Error(err.error.text)});
  }

  logOut(){
    let userId = this.verification.user;

    let parametros = new HttpParams()
    .set("userId", JSON.stringify(userId))
    .set("verif", this.verification.verifCode)
    .set("command", "logout");
    return this.http.get(this.url, {params: parametros, responseType: "text"}).toPromise().catch(err => {throw new Error(err.error.text)});
  }

  updateUser(usuario : User){
    let parametros = new HttpParams()
    .set("userId", JSON.stringify(this.verification.user))
    .set("verif", this.verification.verifCode)
    .set("command", "update");
    return this.http.post(this.url, usuario, {params: parametros}).toPromise().catch(err => {throw new Error(err.error.text)});
  }

}
