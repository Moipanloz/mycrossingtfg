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



  readItemsCE(){
    let parametros = new HttpParams().set("command", "read")
    return this.http.get(this.url, {params: parametros}).toPromise();
  }

//Borrar abajo

  // updateItemsCE(){
  //   let currentInv : Map<string, Array<any>>;

  //   //Se obtienen los objetos que disponemos actualmente en ItemsCE y se clasifican por source
  //   this.readItemsCE().then(requestData => {
  //     for(let c = 0; c < this.colecciones.length; c++){
  //       currentInv.set(requestData[c]['source'], requestData[c]["GROUP_CONCAT(id)"].split(","));
  //     }

  //     this._api.readAllItems().then(apiData => {
  //       // Cuando escribí este código, solo Dios y yo sabíamos como funcionaba.
  //       // Ahora solo lo sabe Dios.
  //       // Lo siento.

  //       //TODO FILTRAR POR SOURCE (probs rehacer?)

  //       //OPCIONES:
  //       // 1.Hardcodear en itemsce -> No se puede actualizar mediante API, habria que hacerlo a mano en la DB
  //       //                            DIY y estaciones si habria que filtrar por API y hha-series o whatev
  //       // 2.Seguir filtrando pero ademas recorrer ropa y misc y tal (no viable)
  //       for(let c = 0; c < this.colecciones.length; c++){ //hace falta este for?
  //         for(let x = 0; x < 3; x++){
  //           let keysApi = Object.keys(apiData[x]);

  //           for(let p = 0; p < keysApi.length; p++){
  //             let source =  apiData[x][keysApi[p]][0]["source"];
  //             let col = "";

  //             switch(source){
  //               case "DIY"://distinto
  //                 col = "DIY";
  //                 break;
  //               case "Estacional"://distinto
  //                 col = "Estacional";
  //                 break;
  //               case "Estela": //como es DIY, source=Craftin || filtrar por "hha-series":"stars"?
  //                 col = "Estela";
  //                 break;
  //               case "Flick": //tambien coge las estatuas de insectos? si, filtrar por source y "source-detail":"" (si tiene valor son estatuas)
  //                 col = "Caza";
  //                 break;
  //               case "C.J.":
  //                 col = "Pesca";
  //                 break;
  //               case "Gulliver":
  //                 col = "Gulliver";
  //                 break;
  //               case "Gullivarrr":
  //                 col = "Gullivarrr";
  //                 break;
  //               case "Coti":
  //                 col = "Coti";
  //                 break;
  //               case "Soponcio":
  //                 col = "Soponcio";
  //                 break;
  //               case "Copito":
  //                 col = "Copito";
  //                 break;
  //               case "Renato":
  //                 col = "Renato";
  //                 break;
  //               case "Conga":
  //                 col = "Conga";
  //                 break;
  //               default:
  //                 break;
  //             }

  //             //Si el objeto que esta mirando de la API no esta en el inventario actual, entonces se añade a la nueva lista para update
  //             if(!currentInv.get(col).includes(apiData[x][keysApi[p]][0]['file-name'])){
  //               currentInv.get(col).push(apiData[x][keysApi[p]][0]['file-name']);
  //             }
  //           }
  //         }
  //       }

  //       //Una vez con las listas de objetos nuevos, insertamos todos los valores nuevos en la tabla ItemsCE
  //       let parametros = new HttpParams()
  //       .set("command", "update")
  //       .set("verif", this.verification.verifCode)
  //       .set("userId", JSON.stringify(this.verification.user));
  //       return this.http.put(this.url, currentInv, {params : parametros, responseType : "blob"}).toPromise();
  //     });
  //   });
  // }

}

