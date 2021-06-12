import { PlatformLocation } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CriaturaMarina } from 'app/general/interfaces';
import { VerificationService } from 'app/general/services/verification.service';

@Injectable({
  providedIn: 'root'
})
export class CriaturasMarinasService {

  url : string;


  constructor(pl: PlatformLocation, public verification : VerificationService, public http : HttpClient) {
    this.url = pl.hostname.includes("localhost")?"http://localhost/":"https://mycrossing-back.herokuapp.com/";
    this.url = this.url + "catcriaturasmarinas.php";
  }

  readcm(){
    let parametros = new HttpParams()
    .set("command", "read")
    .set("verif", this.verification.verifCode)
    .set("userId", JSON.stringify(this.verification.user));

    return this.http.get<any[]>(this.url, {params: parametros}).toPromise();
  }

  borrarcm(criatura : string){
    let parametros = new HttpParams()
    .set("command", "delete")
    .set("nombreCriatura", criatura)
    .set("verif", this.verification.verifCode)
    .set("userId", JSON.stringify(this.verification.user));

    return this.http.get(this.url, {params: parametros, responseType: "blob"}).toPromise();
  }

  addcm(criatura : string){
    let parametros = new HttpParams()
    .set("command", "create")
    .set("verif", this.verification.verifCode)
    .set("userId", JSON.stringify(this.verification.user));

    let x : CriaturaMarina = {
      nombre_criatura: criatura,
      usuario_id: this.verification.user
    }

    return this.http.post(this.url, x, {params: parametros, responseType: "blob"}).toPromise();
  }
}
