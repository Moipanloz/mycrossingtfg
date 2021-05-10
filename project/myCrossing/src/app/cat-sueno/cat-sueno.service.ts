import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sueno } from 'app/general/interfaces';
import { VerificationService } from 'app/general/services/verification.service';

@Injectable({
  providedIn: 'root'
})
export class CatSuenoService {

  url : string = "http://localhost/php/catsuenos.php";

  constructor(public verification : VerificationService, public http : HttpClient) { }

  readMiSueno() : Promise<Sueno>{
    let parametros = new HttpParams()
    .set("command", "readMine")
    .set("verif", this.verification.verifCode)
    .set("userId", JSON.stringify(this.verification.user));

    return this.http.get<Sueno>(this.url, {params: parametros}).toPromise().catch(err => {throw new Error(err.error.text)});
  }

  readSuenos() : Promise<Sueno[]>{
    let parametros = new HttpParams()
    .set("command", "read")

    return this.http.get<Sueno[]>(this.url, {params: parametros}).toPromise().catch(err => {throw new Error(err.error.text)});
  }

  borrarSueno(sueno : string){
    let parametros = new HttpParams()
    .set("command", "delete")
    .set("codigoSueno", sueno)
    .set("verif", this.verification.verifCode)
    .set("userId", JSON.stringify(this.verification.user));

    return this.http.get(this.url, {params: parametros}).toPromise().catch(err => {throw new Error(err.error.text)});
  }

  guardaSueno(codigoSueno: string, fotosSeleccionadas: string[], nuevo: boolean){
    let parametros = new HttpParams()
    .set("command", nuevo?"create":"update")
    .set("verif", this.verification.verifCode)
    .set("userId", JSON.stringify(this.verification.user));
    let sueno : Sueno = {
      codigo_sueno: codigoSueno,
      usuario_id: this.verification.user,
      foto1: fotosSeleccionadas[0],
      foto2: null,
      foto3: null,
      foto_seleccionada: null,
      likes: null,
      nombre: null,
      nombre_isla: null
    }
    if(fotosSeleccionadas.length==3){
      sueno.foto2 = fotosSeleccionadas[1];
      sueno.foto3 = fotosSeleccionadas[2];
    }else if(fotosSeleccionadas.length==2){
      sueno.foto2 = fotosSeleccionadas[1];
    }
    return this.http.post(this.url, sueno, {params: parametros}).toPromise().catch(err => {throw new Error(err.error.text)});
  }

  guardaSuenoEntidad(sueno: Sueno, nuevo: boolean){
    let parametros = new HttpParams()
    .set("command", nuevo?"create":"update")
    .set("verif", this.verification.verifCode)
    .set("userId", JSON.stringify(this.verification.user));
    return this.http.post(this.url, sueno, {params: parametros}).toPromise().catch(err => {throw new Error(err.error.text)});
  }
}
