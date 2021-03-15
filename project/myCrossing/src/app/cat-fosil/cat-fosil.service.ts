import { VerificationService } from 'app/general/services/verification.service';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fosil } from 'app/general/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CatFosilService {

  url : string = "http://localhost/php/catfosiles.php";

  constructor(public verification : VerificationService, public http : HttpClient) { }

  readFosil(){
    let parametros = new HttpParams()
    .set("command", "read")
    .set("verif", this.verification.verifCode)
    .set("userId", JSON.stringify(this.verification.user));

    return this.http.get<any[]>(this.url, {params: parametros}).toPromise();
  }

  borrarFosil(fosil : string){
    let parametros = new HttpParams()
    .set("command", "delete")
    .set("nombreFosil", fosil)
    .set("verif", this.verification.verifCode)
    .set("userId", JSON.stringify(this.verification.user));

    return this.http.get(this.url, {params: parametros, responseType: "blob"}).toPromise();
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

    return this.http.post(this.url, x, {params: parametros, responseType: "blob"}).toPromise();
  }
}
