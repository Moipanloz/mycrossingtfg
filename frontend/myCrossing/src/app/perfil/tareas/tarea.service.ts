import { Observable } from 'rxjs';
import { Tarea } from './../../interfaces';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Verification } from 'app/app.component';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  verification : Verification;
  url : string = "http://localhost/tarea.php";

  constructor(private http : HttpClient, verification : Verification) {
    this.verification = verification;
  }

  readTareas() : Observable<Tarea[]>{

    let parametros = new HttpParams()
      .set("command", "read")
      .set("userId", JSON.stringify(this.verification.user));

    return this.http.get<Tarea[]>(this.url, {params: parametros, withCredentials : true});
  }

  async updateTarea(tarea : Tarea){
    // La BBDD y PHP tratan los boolean como 0 y 1, la primera tarea que recibe
    // tiene valor de 0 o 1, pero angular lo detecta como false o true, aun asi
    // hay que pasarlo de valor numerico a boolean o si no el primer click no
    // funcionara, ya que angular pasara de 0 a false (click1) y luego de false
    // a true (click2)

    // Le cambio el estado a la tarea, no se puede hacer con "tarea.hecha = !tarea.hecha"
    // porque si no ocurre lo mencionado arriba

    if(tarea.hecha == false){
      tarea.hecha = true;
    }else{
      tarea.hecha = false;
    }

    let parametros = new HttpParams()
      .set("command", "update")
      .set("userId", JSON.stringify(this.verification.user));

    return this.http.post(this.url, tarea, {params: parametros, withCredentials : true, responseType : "blob"}).toPromise();
    // responseType: blob ni idea de que es pero hacer que funcione
  }

}
