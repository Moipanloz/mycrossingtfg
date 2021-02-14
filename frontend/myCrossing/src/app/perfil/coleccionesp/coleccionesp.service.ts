import { ColeccionesEspInvService } from 'app/perfil/coleccionesp/coleccionesespinv.service';
import { VerificationService } from 'app/general/verification.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ColeccionEspecial } from 'app/general/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ColeccionespService {

  constructor(private http : HttpClient, private verification : VerificationService, private _ceinv : ColeccionesEspInvService) { }

  url : string = "http://localhost/coleccionesespeciales.php"

  createCE(){
    let parametros = new HttpParams()
    .set("command", "create")
    .set("userId", JSON.stringify(this.verification.user));

    let ce : ColeccionEspecial = {
      usuario_id: this.verification.user,
      source: null,
      items: this._ceinv.colecciones //aprovecho que va vacio para enviarle las colecciones
    }

    return this.http.post(this.url, ce, {params: parametros, responseType : "blob"}).toPromise();
  }

  readCE() : Promise<ColeccionEspecial>{
    let parametros = new HttpParams()
    .set("command", "read")
    .set("userId", JSON.stringify(this.verification.user));

    return this.http.get<ColeccionEspecial>(this.url, {params: parametros}).toPromise();
  }

  updateCE(id : string, source : string, lista : string[]){
    let parametros = new HttpParams()
    .set("command", "update")
    .set("userId", JSON.stringify(this.verification.user));

    let ce : ColeccionEspecial = {
      usuario_id: this.verification.user,
      source: source,
      items: lista
    }

    if(ce.items.length == 1 && ce.items[0] === ""){
      ce.items.splice(ce.items.indexOf(""), 1);
    }

    if(ce.items.includes(id)){
      ce.items.splice(ce.items.indexOf(id), 1);
    }else{
      ce.items.push(id);
    }

    ce.items.sort();

    return this.http.post(this.url, ce, {params: parametros, responseType: "blob"}).toPromise();
  }
}
