import { Observable } from 'rxjs';
import { Tarea } from '../../general/interfaces';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VerificationService } from 'app/general/services/verification.service';

@Injectable({
  providedIn: 'root'
})

export class TareasService {

  verification : VerificationService;
  url : string = "http://localhost/php/tarea.php";

  constructor(private http : HttpClient, verification : VerificationService) {
    this.verification = verification;
  }

  readTareas() : Observable<Tarea[]>{
    let parametros = new HttpParams()
      .set("command", "read")
      .set("verif", this.verification.verifCode)
      .set("userId", JSON.stringify(this.verification.user));

    return this.http.get<Tarea[]>(this.url, {params: parametros, withCredentials : true});
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

    return this.http.post(this.url, tarea, {params: parametros, withCredentials : true, responseType : "blob"}).toPromise();
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

    // responseType: blob hace que si el responseType que devolvia no es el que estaba seteado,
    // devuelve un objeto Blob con los datos
    return this.http.put(this.url, tarea, {params: parametros, withCredentials : true, responseType : "blob"}).toPromise();
  }

  borrarTarea(tarea){
    let parametros = new HttpParams()
    .set("command", "delete")
    .set("tareaId", tarea.id)
    .set("verif", this.verification.verifCode)
    .set("userId", JSON.stringify(this.verification.user));

    // Se usa post ya que en el .php se obtiene los datos del input, ya que
    // no hay implementado end-points tipo "tareas/1" debido a que la estructura
    // de la pagina no esta pensada de dicha forma
    return this.http.delete(this.url, {params: parametros, withCredentials : true, responseType : "blob"}).toPromise();
  }


}
