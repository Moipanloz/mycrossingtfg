import { CookieService } from 'ngx-cookie-service';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Vecino } from 'app/general/interfaces';
import { VerificationService } from 'app/general/verification.service';

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

  readMisVecinos() : Observable<Vecino[]>{
    let parametros = new HttpParams()
    .set("command", "read")
    .set("verif", this.verification.verifCode)
    .set("userId", JSON.stringify(this.verification.user));

    return this.http.get<Vecino[]>(this.url, {params : parametros, withCredentials : true});
  }

  crearVecino(vecino : Vecino){
    let parametros = new HttpParams()
    .set("command", "create")
    .set("verif", this.verification.verifCode)
    .set("userId", JSON.stringify(this.verification.user));

    return this.http.post(this.url, vecino, {params : parametros, withCredentials : true, responseType : "blob"}).toPromise();
  }

  actualizarVecino(oldVecino : Vecino, newVecino : Vecino){
    let parametros = new HttpParams()
    .set("command", "updateVecino")
    .set("verif", this.verification.verifCode)
    .set("oldVecinoId", JSON.stringify(oldVecino.vecino_id))
    .set("userId", JSON.stringify(this.verification.user));

    return this.http.put(this.url, newVecino, {params : parametros, withCredentials : true, responseType : "blob"}).toPromise();
  }

  actualizarAmistadVecino(vecino : Vecino){
    let parametros = new HttpParams()
    .set("command", "updateAmistad")
    .set("verif", this.verification.verifCode)
    .set("userId", JSON.stringify(this.verification.user));

    return this.http.put(this.url, vecino, {params : parametros, withCredentials : true, responseType : "blob"}).toPromise();
  }

  borrarVecino(vecino : Vecino){
    let parametros = new HttpParams()
    .set("command", "delete")
    .set("verif", this.verification.verifCode)
    .set("vecinoId", JSON.stringify(vecino.vecino_id))
    .set("userId", JSON.stringify(this.verification.user));

    return this.http.delete(this.url, {params : parametros, withCredentials : true, responseType : "blob"}).toPromise();
  }

}
