import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Arte } from 'app/general/interfaces';
import { VerificationService } from 'app/general/services/verification.service';

@Injectable({
  providedIn: 'root'
})
export class CatArteService {
  url : string = "https://mycrossing-back.herokuapp.com/catarte.php";

  constructor(public verification : VerificationService, public http : HttpClient) { }

  readArte(){
    let parametros = new HttpParams()
    .set("command", "read")
    .set("verif", this.verification.verifCode)
    .set("userId", JSON.stringify(this.verification.user));

    return this.http.get<any[]>(this.url, {params: parametros}).toPromise().catch(err => {throw new Error(err.error.text)});
  }

  borrarArte(arte : string){
    let parametros = new HttpParams()
    .set("command", "delete")
    .set("nombreArte", arte)
    .set("verif", this.verification.verifCode)
    .set("userId", JSON.stringify(this.verification.user));

    return this.http.get(this.url, {params: parametros}).toPromise().catch(err => {throw new Error(err.error.text)});
  }

  addArte(arte : string){
    let parametros = new HttpParams()
    .set("command", "create")
    .set("verif", this.verification.verifCode)
    .set("userId", JSON.stringify(this.verification.user));

    let x : Arte = {
      nombre_arte: arte,
      usuario_id: this.verification.user
    }

    return this.http.post(this.url, x, {params: parametros}).toPromise().catch(err => {throw new Error(err.error.text)});
  }
}
