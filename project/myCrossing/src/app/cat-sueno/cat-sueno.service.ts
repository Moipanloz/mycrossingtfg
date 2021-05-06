import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sueno } from 'app/general/interfaces';
import { VerificationService } from 'app/general/services/verification.service';

@Injectable({
  providedIn: 'root'
})
export class CatSuenoService {

  url : string = "http://localhost/php/catsuenos.php";

  constructor(public verification : VerificationService, public http : HttpClient) { }

  readMiSueno() : Promise<Sueno>{
    let parametros = new HttpParams()
    .set("command", "readMine")
    .set("verif", this.verification.verifCode)
    .set("userId", JSON.stringify(this.verification.user));

    return this.http.get<Sueno>(this.url, {params: parametros}).toPromise().catch(err => {throw new Error(err.error.text)});
  }

  readSuenos() : Promise<Sueno[]>{
    let parametros = new HttpParams()
    .set("command", "read")

    return this.http.get<Sueno[]>(this.url, {params: parametros}).toPromise().catch(err => {throw new Error(err.error.text)});
  }

  borrarSueno(sueno : string){
    let parametros = new HttpParams()
    .set("command", "delete")
    .set("nombreSueno", sueno)
    .set("verif", this.verification.verifCode)
    .set("userId", JSON.stringify(this.verification.user));

    return this.http.get(this.url, {params: parametros}).toPromise().catch(err => {throw new Error(err.error.text)});
  }
/*
  addSueno(sueno : string){
    let parametros = new HttpParams()
    .set("command", "create")
    .set("verif", this.verification.verifCode)
    .set("userId", JSON.stringify(this.verification.user));

    let x : Sueno = {
      nombre_sueno: sueno,
      usuario_id: this.verification.user
    }

    return this.http.post(this.url, x, {params: parametros}).toPromise().catch(err => {throw new Error(err.error.text)});
  }*/
}
