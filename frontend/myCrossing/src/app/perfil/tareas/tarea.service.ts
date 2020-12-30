import { Tarea } from './../../interfaces';
import { Observable } from 'rxjs';
import { Verification } from './../../app.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  data = [];
  globals : Verification;
  url : String = "http://localhost/TareaService.php";

  constructor(private http : HttpClient, appConstants : Verification) {
    this.globals = appConstants;
  }

  readTareas() : Observable<Tarea[]> {
    return this.http.get<Tarea[]>(this.url+"?action=read&userid="+this.globals.user);
  }

  checkTarea(tarea : Tarea){

    tarea.hecha = !tarea.hecha;

    return this.http.post(
    this.url+"?action=check&hecha="+tarea.hecha+"&id="+tarea.id+"&userid="+this.globals.user,
    tarea,
    { headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}}
    );

  }

}
