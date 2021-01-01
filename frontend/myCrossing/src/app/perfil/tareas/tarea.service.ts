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
    console.log("servicio read");

    let parametros = new HttpParams()
      .set("command", "read")
      .set("userId", JSON.stringify(this.verification.user));

    console.log("parametros setted");
    return this.http.get<Tarea[]>(this.url, {params: parametros, withCredentials : true});
  }

  async updateTarea(tarea : Tarea){
    //Le cambio el estado a la tarea
    tarea.hecha = !tarea.hecha;

    let parametros = new HttpParams()
      .set("command", "update")
      .set("userId", JSON.stringify(this.verification.user));

    return this.http.post(this.url, tarea, {params: parametros}).toPromise();

  //may need this headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
  }

}
