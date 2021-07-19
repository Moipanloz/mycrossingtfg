import { VerificationService } from 'app/general/services/verification.service';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fosil } from 'app/general/interfaces';
import { PlatformLocation } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CatFosilService {

  url : string;


  constructor(pl: PlatformLocation, public verification : VerificationService, public http : HttpClient) {
    this.url = pl.hostname.includes("localhost")?"http://localhost/":"http://mycrossing.epizy.com/";
    this.url = this.url + "catfosiles.php";
  }

  readFosil() : Promise<Fosil[]>{
    let parametros = new HttpParams()
    .set("command", "read")
    .set("verif", this.verification.verifCode)
    .set("userId", JSON.stringify(this.verification.user));

    return this.http.get<Fosil[]>(this.url, {params: parametros}).toPromise().catch(err => {throw new Error(err.error.text)});
  }

  borrarFosil(fosil : string){
    let parametros = new HttpParams()
    .set("command", "delete")
    .set("nombreFosil", fosil)
    .set("verif", this.verification.verifCode)
    .set("userId", JSON.stringify(this.verification.user));

    return this.http.get(this.url, {params: parametros}).toPromise().catch(err => {throw new Error(err.error.text)});
  }

  addFosil(fosil : string){
    let parametros = new HttpParams()
    .set("command", "create")
    .set("verif", this.verification.verifCode)
    .set("userId", JSON.stringify(this.verification.user));

    let x : Fosil = {
      nombre_fosil: fosil,
      usuario_id: this.verification.user
    }

    return this.http.post(this.url, x, {params: parametros}).toPromise().catch(err => {throw new Error(err.error.text)});
  }
}
