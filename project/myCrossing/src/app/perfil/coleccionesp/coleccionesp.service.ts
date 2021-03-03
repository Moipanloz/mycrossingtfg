import { VerificationService } from 'app/general/verification.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ColeccionEspecial } from 'app/general/interfaces';
import { ItemsCEService } from './itemsce.service';

@Injectable({
  providedIn: 'root'
})
export class ColeccionespService {

  constructor(private http : HttpClient, private verification : VerificationService, private _ceinv : ItemsCEService) { }

  url : string = "http://localhost/php/coleccionesespeciales.php"

  colecciones : Map<string, string[]> = new Map([
    ["DIY",["pipo"]],
    ["Estacional",["pipo"]],
    ["Estela",["Celeste"]],
    ["Caza",["Flick"]],
    ["Pesca",["C.J."]],
    ["Gulliver",["Gulliver"]],
    ["Al y Paca",["Cyrus","Reese"]],
    ["Pascal",["Pascal"]],
    ["Gullivarrr",["Gullivarrr"]],
    ["Coti",["Zipper","Egg bottle","Egg balloon","Collecting earth eggs","Learning all egg outfit DIYs","Collecting leaf eggs",
  "Collecting sky eggs","Collecting stone eggs","Collecting water eggs","Collecting wood eggs"]],
    ["Soponcio",["Jack"]],
    ["Guindo",["Cozy Turkey Day DIY","Franklin"]],
    ["Copito",["Snowboy"]],
    ["Renato",["Jingle","Check Toy Day stockings the day after Toy Day"]],
    ["Conga",["Pavé"]],
    ["Dodo",["Dodo Airlines"]],
    ["Mama",["Mom"]],
    ["Cumple",["Birthday"]]
  ]);

  readCE() : Promise<any[]>{
    let parametros = new HttpParams()
    .set("command", "read")
    .set("verif", this.verification.verifCode)
    .set("userId", JSON.stringify(this.verification.user));

    return this.http.get<any[]>(this.url, {params: parametros}).toPromise();
  }

  borrarItemCE(item : string){
    let parametros = new HttpParams()
    .set("command", "delete")
    .set("itemName", item)
    .set("verif", this.verification.verifCode)
    .set("userId", JSON.stringify(this.verification.user));

    return this.http.delete(this.url, {params: parametros, responseType: "blob"}).toPromise();
  }

  addItemCE(item : string){
    let parametros = new HttpParams()
    .set("command", "create")
    .set("verif", this.verification.verifCode)
    .set("userId", JSON.stringify(this.verification.user));

    let x : ColeccionEspecial = {
      item_name: item,
      item_source: "TODO",//TODOOOOOOOOOOOO
      usuario_id: this.verification.user
    }

    return this.http.post(this.url, x, {params: parametros, responseType: "blob"}).toPromise();
  }
}
