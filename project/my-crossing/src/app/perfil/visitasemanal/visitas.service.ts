import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Visita } from 'app/general/interfaces';
import { VerificationService } from 'app/general/services/verification.service';

@Injectable({
  providedIn: 'root'
})
export class VisitasService {
  verification:VerificationService;
  url : string = "https://mycrossing-back.herokuapp.com/visita.php";
  HEADERS = new HttpHeaders()
    .set('Access-Control-Allow-Origin', '*')
    .set('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token')
    .set('Access-Control-Allow-Methods', 'OPTIONS, PUT, DELETE, POST, GET');

  constructor(private http : HttpClient, verification : VerificationService) {
    this.verification = verification;
  }

  async readVisitas() : Promise<Visita[]>{
    let parametros = new HttpParams()
      .set("command", "read")
      .set("verif", this.verification.verifCode)
      .set("userId", JSON.stringify(this.verification.user));
    return this.http.get<Visita[]>(this.url, {params: parametros, headers: this.HEADERS}).toPromise().catch(err => {throw new Error(err.error.text)});
  }

  async updateVisitas(lpa:string, mpa:string, xpa:string, jpa:string, vpa:string,
     lpr:string, mpr:string, xpr:string, jpr:string, vpr:string, estela:boolean) : Promise<string>{
    let parametros = new HttpParams()
      .set("command", "update")
      .set("verif", this.verification.verifCode)
      .set("userId", JSON.stringify(this.verification.user));
    let visita:Visita = {usuario_id:null,estela:estela,lpa:lpa,mpa:mpa,xpa:xpa,jpa:jpa,vpa:vpa,lpr:lpr,mpr:mpr,xpr:xpr,jpr:jpr,vpr:vpr,last_update:null};
    return this.http.put<string>(this.url, visita, {params: parametros, headers: this.HEADERS}).toPromise().catch(err => {throw new Error(err.error.text)});
  }
  async createVisita() : Promise<void>{
    let parametros = new HttpParams()
      .set("command", "create")
      .set("verif", this.verification.verifCode)
      .set("userId", JSON.stringify(this.verification.user));
    this.http.put<string>(this.url, null, {params: parametros, headers: this.HEADERS}).toPromise().catch(err => {throw new Error(err.error.text)});
  }
  setFecha(fecha: string):Promise<string> {
    let parametros = new HttpParams()
      .set("command", "set_fecha")
      .set("verif", this.verification.verifCode)
      .set("userId", JSON.stringify(this.verification.user));
    let visita:Visita = {usuario_id:null,estela:null,lpa:null,mpa:null,xpa:null,jpa:null,vpa:null,lpr:null,mpr:null,xpr:null,jpr:null,vpr:null,last_update:fecha};
    return this.http.put<string>(this.url, visita, {params: parametros, headers: this.HEADERS}).toPromise().catch(err => {throw new Error(err.error.text)});
  }
}
