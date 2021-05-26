import { VerificationService } from 'app/general/services/verification.service';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fosil } from 'app/general/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CatFosilService {

  url : string = "https://mycrossing-back.herokuapp.com/catfosiles.php";
  HEADERS = new HttpHeaders()
    .set('Access-Control-Allow-Origin', '*')
    .set('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token')
    .set('Access-Control-Allow-Methods', 'OPTIONS, PUT, DELETE, POST, GET');

  constructor(public verification : VerificationService, public http : HttpClient) { }

  readFosil() : Promise<Fosil[]>{
    let parametros = new HttpParams()
    .set("command", "read")
    .set("verif", this.verification.verifCode)
    .set("userId", JSON.stringify(this.verification.user));

    return this.http.get<Fosil[]>(this.url, {params: parametros, headers: this.HEADERS}).toPromise().catch(err => {throw new Error(err.error.text)});
  }

  borrarFosil(fosil : string){
    let parametros = new HttpParams()
    .set("command", "delete")
    .set("nombreFosil", fosil)
    .set("verif", this.verification.verifCode)
    .set("userId", JSON.stringify(this.verification.user));

    return this.http.get(this.url, {params: parametros, headers: this.HEADERS}).toPromise().catch(err => {throw new Error(err.error.text)});
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

    return this.http.post(this.url, x, {params: parametros, headers: this.HEADERS}).toPromise().catch(err => {throw new Error(err.error.text)});
  }
}
