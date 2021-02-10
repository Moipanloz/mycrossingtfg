import { VerificationService } from 'app/general/verification.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ColeccionEspecial } from 'app/general/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ColeccionespService {

  constructor(private http : HttpClient, private verification : VerificationService) { }

  url : string = "http://localhost/coleccionesespeciales.php"

  //id number o string?
  createCE(){
    let parametros = new HttpParams()
    .set("command", "create")
    .set("userId", JSON.stringify(this.verification.user));

    let ce : ColeccionEspecial = {
      usuario_id: this.verification.user,
      listaItems: []
    }

    return this.http.post(this.url, ce, {params: parametros});
  }

  readCE(){}

  //id number o string?
  updateCE(id : any, lista : any[]){
    let parametros = new HttpParams()
    .set("command", "update")
    .set("userId", JSON.stringify(this.verification.user));

    let ce : ColeccionEspecial = {
      usuario_id: this.verification.user,
      listaItems: lista
    }

    if(ce.listaItems.includes(id)){
      ce.listaItems.splice(ce.listaItems.indexOf(id), 1);
    }else{
      ce.listaItems.push(id);
      ce.listaItems.sort();
    }

    return this.http.post(this.url, ce, {params: parametros, responseType: "blob"}).toPromise();
  }
}
