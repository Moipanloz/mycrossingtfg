import { ApiService } from './../../general/api.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ColeccionEspecial } from 'app/general/interfaces';
import { VerificationService } from 'app/general/verification.service';

@Injectable({
  providedIn: 'root'
})
export class ItemsCEService {

  constructor(private http : HttpClient, private verification : VerificationService, private _api : ApiService) { }

  url : string = "http://localhost/php/itemsce.php"

  colecciones : string[] = [
    "DIY",
    "Estacional",
    "Estela",
    "Caza",
    "Pesca",
    "Gulliver",
    "Gullivarrr",
    "Coti",
    "Soponcio",
    "Copito",
    "Renato",
    "Conga"
  ];

  readItemsCE(){
    let parametros = new HttpParams().set("command", "read")
    return this.http.get(this.url, {params: parametros}).toPromise();
  }


  updateItemsCE(){
    let currentInv : Map<string, Array<any>>;

    //Se obtienen los objetos que disponemos actualmente en ItemsCE y se clasifican por source
    this.readItemsCE().then(requestData => {
      for(let c = 0; c < this.colecciones.length; c++){
        currentInv.set(requestData[c]['source'], requestData[c]["GROUP_CONCAT(id)"].split(","));
      }

      this._api.readAllItems().then(apiData => {
        // Cuando escribí este código, solo Dios y yo sabíamos como funcionaba.
        // Ahora solo lo sabe Dios.
        // Lo siento.

        //TODO FILTRAR POR SOURCE (probs rehacer?)
        for(let c = 0; c < this.colecciones.length; c++){
          for(let x = 0; x < 3; x++){
            for(let p = 0; p < Object.keys(apiData[x]).length; p++){
              //Si el objeto que esta mirando de la API no esta en el inventario actual, entonces se añade a la nueva lista para update
              if(!currentInv.get(Object.keys(currentInv)[c]).includes(apiData[x][Object.keys(apiData[x])[p]][0]['file-name'])){
                currentInv.get(Object.keys(currentInv)[c]).push(apiData[x][Object.keys(apiData[x])[p]][0]['file-name']);
              }
            }
          }
        }

        //Una vez con las listas de objetos nuevos, insertamos todos los valores nuevos en la tabla ItemsCE
        let parametros = new HttpParams()
        .set("command", "update")
        .set("verif", this.verification.verifCode)
        .set("userId", JSON.stringify(this.verification.user));
        return this.http.put(this.url, currentInv, {params : parametros, responseType : "blob"}).toPromise();
      });
    });
  }

}

