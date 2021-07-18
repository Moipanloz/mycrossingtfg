import { PlatformLocation } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Visita } from 'app/general/interfaces';
import { VerificationService } from 'app/general/services/verification.service';

@Injectable({
  providedIn: 'root'
})
export class VisitasService {
  verification:VerificationService;
  url : string;


  constructor(pl: PlatformLocation, private http : HttpClient, verification : VerificationService) {
    this.verification = verification;
    this.url = pl.hostname.includes("localhost")?"http://localhost/":"https://mycrossing.epizy.com/";
    this.url = this.url + "visita.php";
  }

  async readVisitas() : Promise<Visita[]>{
    let parametros = new HttpParams()
      .set("command", "read")
      .set("verif", this.verification.verifCode)
      .set("userId", JSON.stringify(this.verification.user));
    return this.http.get<Visita[]>(this.url, {params: parametros}).toPromise().catch(err => {throw new Error(err.error.text)});
  }

  async updateVisitas(lpa:string, mpa:string, xpa:string, jpa:string, vpa:string,
     lpr:string, mpr:string, xpr:string, jpr:string, vpr:string, estela:boolean) : Promise<string>{
    let parametros = new HttpParams()
      .set("command", "update")
      .set("verif", this.verification.verifCode)
      .set("userId", JSON.stringify(this.verification.user));
      if(estela){
        estela=true;
      }else{
        estela=false;
      }
    let visita = {usuario_id:JSON.stringify(this.verification.user),estela:estela,lpa:lpa,mpa:mpa,xpa:xpa,jpa:jpa,vpa:vpa,lpr:lpr,mpr:mpr,xpr:xpr,jpr:jpr,vpr:vpr,last_update:null};
    return this.http.put<string>(this.url, visita, {params: parametros}).toPromise().catch(err => {throw new Error(err.error.text)});
  }
  async createVisita() : Promise<void>{
    let parametros = new HttpParams()
      .set("command", "create")
      .set("verif", this.verification.verifCode)
      .set("userId", JSON.stringify(this.verification.user));
    this.http.put<string>(this.url, null, {params: parametros}).toPromise().catch(err => {throw new Error(err.error.text)});
  }
  setFecha(fecha: string):Promise<string> {
    let parametros = new HttpParams()
      .set("command", "set_fecha")
      .set("verif", this.verification.verifCode)
      .set("userId", JSON.stringify(this.verification.user));
    let visita:Visita = {usuario_id:JSON.stringify(this.verification.user),estela:null,lpa:null,mpa:null,xpa:null,jpa:null,vpa:null,lpr:null,mpr:null,xpr:null,jpr:null,vpr:null,last_update:fecha};
    return this.http.put<string>(this.url, visita, {params: parametros}).toPromise().catch(err => {throw new Error(err.error.text)});
  }
}
