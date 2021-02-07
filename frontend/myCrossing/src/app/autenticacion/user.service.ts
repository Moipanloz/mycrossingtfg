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
    let parametros = new HttpParams().set("userId", JSON.stringify(this.verification.user)).set("command", "read");
    return this.http.get<User>(this.url, {params: parametros}).toPromise();
  }

  async login() : Promise<any>{
    let data = Array();
    let parametros = new HttpParams().set("command", "login");
    data.push(await this.http.get(this.url, {params: parametros}).toPromise());
    return data.reduce((acc, val) => acc.concat(val), []);
  }

  async setKey(key : string) : Promise<any>{
    let parametros = new HttpParams()
    .set("userId", JSON.stringify(this.verification.user))
    .set("command", "setKey")
    .set("key", key);

    return this.http.get(this.url, {params: parametros}).toPromise();
  }

  register(user : any, key : string) : Promise<any>{
    let parametros = new HttpParams().set("command", "register");

    user.verif = key;
    user.clave = this._encription.encript(user.clave);

    return this.http.post(this.url, user, {params: parametros}).toPromise();
  }

  logOut(){
    let userId = this.verification.user;
    this.cookieService.delete('verif');
    this.cookieService.delete('userId');
    let parametros = new HttpParams().set("userId", JSON.stringify(userId)).set("command", "setNull");
    return this.http.get(this.url, {params: parametros}).toPromise();
  }

  updateUser(usuario : User){
    let parametros = new HttpParams()
    .set("userId", JSON.stringify(this.verification.user))
    .set("command", "update");
    return this.http.post(this.url, usuario, {params: parametros, responseType: "blob"}).toPromise();
  }

}
