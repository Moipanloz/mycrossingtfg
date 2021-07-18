import { PlatformLocation } from '@angular/common';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ComunicacionService } from './comunicacion.service';

@Injectable({ providedIn: 'root' })
export class VerificationService {
  logged: boolean = false;
  user: number = null;
  verified: boolean = false;
  cookieService: CookieService;
  nombre : string = "";
  hemisferio : string = "";
  verifCode : string = "";
  _comunication : ComunicacionService;
  url;

  constructor(platformLocation: PlatformLocation, cookieService: CookieService, private http: HttpClient, comunication : ComunicacionService){
    this.cookieService = cookieService;
    this._comunication=comunication;
    this.url = platformLocation.hostname.includes("localhost")?"http://localhost/":"https://mycrossing.epizy.com/";
    this.url = this.url + "authentication.php";
  }

  async verify() {
    this._comunication.activar=false;
    this._comunication.activarNabos=false;
    if(this.cookieService.check("verif") && this.cookieService.check("userId")){
      let userId:number = +this.cookieService.get("userId");
      let parametros = new HttpParams()
        .set("userId", JSON.stringify(userId))
        .set("verif", this.cookieService.get("verif"))
        .set("command", "getKey");

      let datos = await this.http.get(this.url, {params: parametros}).toPromise().catch(err => {throw new Error(err.error.text)});
      let verif = datos[0]['verification'];
      if(JSON.stringify(datos).includes("Error")){
        this.logged = false;
        this.user = null;
      }else{
        if(verif == this.cookieService.get("verif")){
          this.logged = true;
          this.user = userId;
          this.nombre = datos[0]["nombre"];
          this.hemisferio = datos[0]["hemisferio"];
          this.verifCode = datos[0]["verification"];
        }else{
          this.logged = false;
          this.user = null;
        }
      }
    }else{
      this.logged = false;
      this.user = null;
    }
    this.verified = true;
  }

  makeRandomKey(){
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 10; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  async verifyIfNotVerified(){
    if(!this.verified){
      await this.verify().catch(err => {throw new Error(err.error.text)});
    }
  }

}

