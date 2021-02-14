import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ColeccionEspecial } from 'app/general/interfaces';
import { VerificationService } from 'app/general/verification.service';

@Injectable({
  providedIn: 'root'
})
export class ColeccionesEspInvService {

  constructor(private http : HttpClient, private verification : VerificationService) { }

  url : string = "http://localhost/coleccionesespinv.php"

  colecciones : string[] = [
    "DIY",
    "Estacional",
    "Estela",
    "Caza",
    "Pesca",
    "Gulliver",
    "Gullivarr",
    "Coti",
    "Soponcio",
    "Copito",
    "Renato",
    "Conga"
  ];

  readCEInv(){
    let parametros = new HttpParams().set("command", "read")
    return this.http.get(this.url, {params: parametros}).toPromise();
  }

  updateCEInv(){
    //TODO
    //llamada a la api para filtrar objetos y actualizar coleccionesespinv
    console.log("hola");

    //esto de abajo es para que funcione el then(), borrar y comprobar que la funcion en nav.ts esta bien
    let parametros = new HttpParams()
    .set("command", "read")
    .set("userId", JSON.stringify(this.verification.user));
    return this.http.get<ColeccionEspecial>(this.url, {params: parametros}).toPromise();

  }

}
