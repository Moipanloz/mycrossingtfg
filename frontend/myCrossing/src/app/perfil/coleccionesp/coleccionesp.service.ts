import { VerificationService } from 'app/general/verification.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ColeccionEspecial, ItemCE } from 'app/general/interfaces';
import { ItemsCEService } from './itemsce.service';

@Injectable({
  providedIn: 'root'
})
export class ColeccionespService {

  constructor(private http : HttpClient, private verification : VerificationService, private _ceinv : ItemsCEService) { }

  url : string = "http://localhost/coleccionesespeciales.php"

  readCE() : Promise<ItemCE[]>{
    let parametros = new HttpParams()
    .set("command", "read")
    .set("verif", this.verification.verifCode)
    .set("userId", JSON.stringify(this.verification.user));

    return this.http.get<ItemCE[]>(this.url, {params: parametros}).toPromise();
  }

  borrarItemCE(item : string){
    let parametros = new HttpParams()
    .set("command", "delete")
    .set("itemId", item)
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
      itemce_id: item,
      usuario_id: this.verification.user
    }

    return this.http.post(this.url, x, {params: parametros, responseType: "blob"}).toPromise();
  }
}
