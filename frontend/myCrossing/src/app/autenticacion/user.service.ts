import { CookieService } from 'ngx-cookie-service';
import { EncriptionService } from './encription.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../general/interfaces';
import { VerificationService } from 'app/general/verification.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  data = [];
  verification : VerificationService;
  cookieService : CookieService;
  url : string = "http://localhost/authentication.php";
  constructor(verification: VerificationService, private http: HttpClient,
    private _encription : EncriptionService, cookieService : CookieService) {
      this.verification = verification;
      this.cookieService = cookieService;
    }

  readUser() : Promise<User> {
    let parametros = new HttpParams()
    .set("userId", JSON.stringify(this.verification.user))
    .set("verif", this.verification.verifCode)
    .set("command", "read");

    return this.http.get<User>(this.url, {params: parametros}).toPromise();
  }

  login(user : any, key : string) : Promise<User>{
    let parametros = new HttpParams()
    .set("command", "login");

    user.key = key;

    return this.http.post<User>(this.url, user, {params: parametros}).toPromise();
  }

  register(user : any, key : string) : Promise<any>{
    let parametros = new HttpParams().set("command", "register");

    user.verif = key;

    return this.http.post(this.url, user, {params: parametros}).toPromise();
  }

  logOut(){
    let userId = this.verification.user;

    let parametros = new HttpParams()
    .set("userId", JSON.stringify(userId))
    .set("verif", this.verification.verifCode)
    .set("command", "logout");

    this.cookieService.delete('verif');
    this.cookieService.delete('userId');

    return this.http.get(this.url, {params: parametros}).toPromise();
  }

  updateUser(usuario : User){
    let parametros = new HttpParams()
    .set("userId", JSON.stringify(this.verification.user))
    .set("verif", this.verification.verifCode)
    .set("command", "update");
    return this.http.post(this.url, usuario, {params: parametros, responseType: "blob"}).toPromise();
  }

}
