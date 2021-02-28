import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ColeccionEspecial } from 'app/general/interfaces';
import { VerificationService } from 'app/general/verification.service';

@Injectable({
  providedIn: 'root'
})
export class ItemsCEService {

  constructor(private http : HttpClient, private verification : VerificationService) { }

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
    //TODO
    console.log("hola");

    /*

    //Se obtienen los objetos que disponemos actualmente en ItemsCE y se clasifican por source

    this.readItemsCE().then(requestData => {
      let currentListaDIY : Array<any>;
      let currentListaEstela : Array<any>;
      .
      .
      .
      let data : ItemCE[];

      for(let i = 0; i < requestData.length; i++){
        data.push(requestData[i]["id"].split(","));
        //TODO
      }


    });


    //Se hace una llamada a la API y clasificamos los objetos que queremos por source

    let newListaDIY : Array<any>;
    let newListaEstela : Array<any>;
    .
    .
    .

    for(cada  item){
      switch item.source{
        case DIY:
          newListaDIY.push(item);
          break;
        case Estela:
          newListaEstela.push(item);
          break;
          .
          .
          .
          etc
      }
    }

    //comparamos las dos listas, y todos los items de la API que ya tengamos los eliminamos de la nueva lista

    for(let item of newListaDIY){
      if(currentListaDIY.contains(item)){
        currentListaDIY.splice(currentListaDIY.indexOf(item), 1)
      }
    }

     for(let item of newListaEstela){
      if(currentListaEstela.contains(item)){
        currentListaEstela.splice(currentListaEstela.indexOf(item), 1)
      }
    }
    .
    .
    .

    //Una vez con las listas de objetos nuevos, insertamos todos los valores nuevos en la tabla ItemsCE



    */


    //esto de abajo es para que funcione el then(), borrar y comprobar que la funcion en nav.ts esta bien
    let parametros = new HttpParams()
    .set("command", "read")
    .set("userId", JSON.stringify(this.verification.user));
    return this.http.get<ColeccionEspecial>(this.url, {params: parametros}).toPromise();
  }

}

