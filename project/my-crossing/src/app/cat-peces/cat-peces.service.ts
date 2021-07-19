import { VerificationService } from 'app/general/services/verification.service';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pez } from 'app/general/interfaces';
import { PlatformLocation } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CatPecesService {

  url : string;


  constructor(pl:PlatformLocation, public verification : VerificationService, public http : HttpClient) {
    this.url = pl.hostname.includes("localhost")?"http://localhost/":"https://mycrossing-back.herokuapp.com/";
    this.url = this.url + "catpeces.php";
  }

  readPez(){
    let parametros = new HttpParams()
    .set("command", "read")
    .set("verif", this.verification.verifCode)
    .set("userId", JSON.stringify(this.verification.user));

    return this.http.get<any[]>(this.url, {params: parametros}).toPromise();
  }

  borrarPez(criatura : string){
    let parametros = new HttpParams()
    .set("command", "delete")
    .set("nombreCriatura", criatura)
    .set("verif", this.verification.verifCode)
    .set("userId", JSON.stringify(this.verification.user));

    return this.http.get(this.url, {params: parametros, responseType: "blob"}).toPromise();
  }

  addPez(criatura : string){
    let parametros = new HttpParams()
    .set("command", "create")
    .set("verif", this.verification.verifCode)
    .set("userId", JSON.stringify(this.verification.user));

    let x : Pez = {
      nombre_criatura: criatura,
      usuario_id: this.verification.user
    }

    return this.http.post(this.url, x, {params: parametros, responseType: "blob"}).toPromise();
  }
}
