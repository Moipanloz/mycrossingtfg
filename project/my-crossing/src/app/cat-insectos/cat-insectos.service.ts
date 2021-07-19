import { VerificationService } from 'app/general/services/verification.service';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bicho } from 'app/general/interfaces';
import { PlatformLocation } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CatInsectosService {

  url : string;

  verification: VerificationService;
  constructor(pl: PlatformLocation, private http : HttpClient, _verification : VerificationService) {
    this.verification = _verification;
    this.url = pl.hostname.includes("localhost")?"http://localhost/":"http://mycrossing.epizy.com/";
    this.url = this.url + "catbichos.php";
  }

  readBicho(){
    let parametros = new HttpParams()
    .set("command", "read")
    .set("verif", this.verification.verifCode)
    .set("userId", JSON.stringify(this.verification.user));

    return this.http.get<any[]>(this.url, {params: parametros}).toPromise();
  }

  borrarBicho(criatura : string){
    let parametros = new HttpParams()
    .set("command", "delete")
    .set("nombreCriatura", criatura)
    .set("verif", this.verification.verifCode)
    .set("userId", JSON.stringify(this.verification.user));

    return this.http.get(this.url, {params: parametros, responseType: "blob"}).toPromise();
  }

  addBicho(criatura : string){
    let parametros = new HttpParams()
    .set("command", "create")
    .set("verif", this.verification.verifCode)
    .set("userId", JSON.stringify(this.verification.user));

    let x : Bicho = {
      nombre_criatura: criatura,
      usuario_id: this.verification.user
    }

    return this.http.post(this.url, x, {params: parametros, responseType: "blob"}).toPromise();
  }
}
