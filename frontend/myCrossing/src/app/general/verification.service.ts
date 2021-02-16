import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class VerificationService {
  logged: boolean = false;
  user: number = null;
  verified: boolean = false;
  cookieService: CookieService;
  nombre : string = "";
  verifCode : string = "";

  constructor(cookieService: CookieService, private http: HttpClient){
    this.cookieService = cookieService;
  }

  async verify() {
    if(this.cookieService.check("verif") && this.cookieService.check("userId")){
      let userId:number = +this.cookieService.get("userId");
      let parametros = new HttpParams().set("userId", JSON.stringify(userId)).set("command", "getKey");
      let datos = await this.http.get("http://localhost/authentication.php", {params: parametros}).toPromise();
      let verif = datos[0]['verification'];
      if(JSON.stringify(datos)=="[\"Error\"]"){
        this.logged = false;
        this.user = null;
      }else{
        if(verif == this.cookieService.get("verif")){
          this.logged = true;
          this.user = userId;
          this.nombre = datos[0]["nombre"];
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
      await this.verify();
    }
  }

}

