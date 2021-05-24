import { VerificationService } from 'app/general/services/verification.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ColeccionEspecial } from 'app/general/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ColeccionespService {

  constructor(private http : HttpClient, private verification : VerificationService) { }

  url : string = "http://localhost/php/coleccionesespeciales.php"

  colecciones : Map<string, string[]> = new Map([
    ["DIY",new Array<any>()],
    ["Estacional",["young spring bamboo","cherry-blossom petals","summer shells","acorns and pine cones","maple leaves","mushrooms","snowflakes","ornaments"]],
    ["Estela",["Celeste"]],
    ["Kamilo",["Flick"]],
    ["CJ",["C.J."]],
    ["Gulliver",["Gulliver"]],
    ["Boda",["Cyrus","Reese","Wedding Season"]],
    ["Pascal",["Pascal"]],
    ["Gullivarrr",["Gullivarrr"]],
    ["Coti",["Zipper","Egg bottle","Egg balloon","Collecting earth eggs","Learning all egg outfit DIYs","Collecting leaf eggs",
  "Collecting sky eggs","Collecting stone eggs","Collecting water eggs","Collecting wood eggs","Bunny Day"]],
    ["Soponcio",["Jack","Halloween"]],
    ["Guindo",["Cozy Turkey Day DIY","Franklin","Turkey Day"]],
    ["Copito",["Snowboy"]],
    ["Renato",["Jingle","Check Toy Day stockings the day after Toy Day"]],
    ["Conga",["Pavé","Festivale"]],
    ["Dodo",["Dodo Airlines"]],
    ["Mama",["Mom"]],
    ["Cumple",["Birthday"]]
  ]);

  readCE() : Promise<any[]>{
    let parametros = new HttpParams()
    .set("command", "read")
    .set("verif", this.verification.verifCode)
    .set("userId", JSON.stringify(this.verification.user));

    return this.http.get<any[]>(this.url, {params: parametros}).toPromise().catch(err => {throw new Error(err.error.text)});
  }

  borrarItemCE(item : string){
    let parametros = new HttpParams()
    .set("command", "delete")
    .set("itemName", item)
    .set("verif", this.verification.verifCode)
    .set("userId", JSON.stringify(this.verification.user));

    return this.http.get(this.url, {params: parametros}).toPromise().catch(err => {throw new Error(err.error.text)});
  }

  addItemCE(item : any,source : string){
    let parametros = new HttpParams()
    .set("command", "create")
    .set("verif", this.verification.verifCode)
    .set("userId", JSON.stringify(this.verification.user));

    let x : ColeccionEspecial = {
      item_name: item.name,
      item_source: source,
      usuario_id: this.verification.user
    }

    return this.http.post(this.url, x, {params: parametros}).toPromise().catch(err => {throw new Error(err.error.text)});
  }
}
