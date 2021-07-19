import { Observable } from 'rxjs';
import { Tarea } from '../../general/interfaces';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VerificationService } from 'app/general/services/verification.service';
import { PlatformLocation } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class TareasService {

  verification : VerificationService;
  url : string;


  constructor(pl: PlatformLocation, private http : HttpClient, verification : VerificationService) {
    this.verification = verification;
    this.url = pl.hostname.includes("localhost")?"http://localhost/":"https://mycrossing.herokuapp.com/api/";
    this.url = this.url + "tarea.php";
  }

  readTareas() : Promise<Tarea[]>{
    let parametros = new HttpParams()
      .set("command", "read")
      .set("verif", this.verification.verifCode)
      .set("userId", JSON.stringify(this.verification.user));

    return this.http.get<Tarea[]>(this.url, {params: parametros}).toPromise().catch(err => {throw new Error(err.error.text)});
  }

  crearTarea(){
    let parametros = new HttpParams()
      .set("command", "create")
      .set("verif", this.verification.verifCode)
      .set("userId", JSON.stringify(this.verification.user));

    let tarea = {
        id: "",
        usuario_id: this.verification.user,
        hecha: 0,
        imagen_url: "hoja"
      };

    return this.http.post(this.url, tarea, {params: parametros}).toPromise().catch(err => {throw new Error(err.error.text)});
  }

  async actualizaTarea(tarea : Tarea){
    // La BBDD y PHP tratan los boolean como 0 y 1, la primera tarea que recibe
    // tiene valor de 0 o 1, pero angular lo detecta como false o true, aun asi
    // hay que pasarlo de valor numerico a boolean o si no el primer click no
    // funcionara, ya que angular pasara de 0 a false (click1) y luego de false
    // a true (click2)
    let parametros = new HttpParams()
      .set("command", "update")
      .set("verif", this.verification.verifCode)
      .set("userId", JSON.stringify(this.verification.user));

    return this.http.put(this.url, tarea, {params: parametros}).toPromise().catch(err => {throw new Error(err.error.text)});
  }

  borrarTarea(tarea){
    let parametros = new HttpParams()
    .set("command", "delete")
    .set("tareaId", tarea.id)
    .set("verif", this.verification.verifCode)
    .set("userId", JSON.stringify(this.verification.user));

    return this.http.get(this.url, {params: parametros}).toPromise().catch(err => {throw new Error(err.error.text)});
  }


}
