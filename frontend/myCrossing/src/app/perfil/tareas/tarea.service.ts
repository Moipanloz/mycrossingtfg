import { Observable } from 'rxjs';
import { Tarea } from '../../interfaces';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Verification } from 'app/app.component';

@Injectable({
  providedIn: 'root'
})

export class TareasService {

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

  crearTarea(){
    console.log("dentro del create servicio");
    let parametros = new HttpParams()
      .set("command", "create")
      .set("userId", JSON.stringify(this.verification.user));

    console.log("parametros setted");

    let tarea = {
        id: "",
        usuario_id: this.verification.user,
        hecha: 0,
        imagen_url: "TODO"
      };

    console.log("new tarea before post");
    console.log(tarea);

    return this.http.post(this.url, tarea, {params: parametros, withCredentials : true, responseType : "blob"}).toPromise();
  }

  async actualizaTarea(tarea : Tarea){
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

    return this.http.put(this.url, tarea, {params: parametros, withCredentials : true, responseType : "blob"}).toPromise();
    // responseType: blob hace que si el responseType que devolvia no es el que estaba seteado,
    // devuelve un objeto Blob con los datos
  }

  borrarTarea(tarea){
    let parametros = new HttpParams()
    .set("command", "delete")
    .set("userId", JSON.stringify(this.verification.user));

    // Se usa post ya que en el .php se obtiene los datos del input, ya que
    // no hay implementado end-points tipo "tareas/1" debido a que la estructura
    // de la pagina no esta pensada de dicha forma
    return this.http.post(this.url, tarea, {params: parametros, withCredentials : true, responseType : "blob"}).toPromise();
  }


}
