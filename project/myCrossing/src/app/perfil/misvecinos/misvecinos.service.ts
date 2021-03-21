import { CookieService } from 'ngx-cookie-service';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Vecino } from 'app/general/interfaces';
import { VerificationService } from 'app/general/services/verification.service';

@Injectable({
  providedIn: 'root'
})

export class MisvecinosService {

  verification : VerificationService;
  cookieService : CookieService;
  url : string = "http://localhost/php/misvecinos.php";

  constructor(verification : VerificationService, private http : HttpClient) {
    this.verification = verification;
  }

  readMisVecinos() : Promise<Vecino[]>{
    let parametros = new HttpParams()
    .set("command", "read")
    .set("verif", this.verification.verifCode)
    .set("userId", JSON.stringify(this.verification.user));

    return this.http.get<Vecino[]>(this.url, {params : parametros, withCredentials : true}).toPromise().catch(err => {throw new Error(err.error.text)});
  }

  crearVecino(vecino : Vecino): Promise<any>{
    let parametros = new HttpParams()
    .set("command", "create")
    .set("verif", this.verification.verifCode)
    .set("userId", JSON.stringify(this.verification.user));

    return this.http.post(this.url, vecino, {params : parametros, withCredentials : true}).toPromise().catch(err => {throw new Error(err.error.text)});
  }

  actualizarVecino(oldVecino : Vecino, newVecino : Vecino){
    let parametros = new HttpParams()
    .set("command", "updateVecino")
    .set("verif", this.verification.verifCode)
    .set("oldVecinoId", JSON.stringify(oldVecino.vecino_id))
    .set("userId", JSON.stringify(this.verification.user));

    return this.http.put(this.url, newVecino, {params : parametros, withCredentials : true}).toPromise().catch(err => {throw new Error(err.error.text)});
  }

  actualizarAmistadVecino(vecino : Vecino){
    let parametros = new HttpParams()
    .set("command", "updateAmistad")
    .set("verif", this.verification.verifCode)
    .set("userId", JSON.stringify(this.verification.user));

    return this.http.put(this.url, vecino, {params : parametros, withCredentials : true}).toPromise().catch(err => {throw new Error(err.error.text)});
  }

  borrarVecino(vecino : Vecino){
    let parametros = new HttpParams()
    .set("command", "delete")
    .set("verif", this.verification.verifCode)
    .set("vecinoId", JSON.stringify(vecino.vecino_id))
    .set("userId", JSON.stringify(this.verification.user));

    return this.http.delete(this.url, {params : parametros, withCredentials : true}).toPromise().catch(err => {throw new Error(err.error.text)});
  }

}
