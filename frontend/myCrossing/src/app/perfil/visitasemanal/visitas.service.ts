import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Visita } from 'app/general/interfaces';
import { VerificationService } from 'app/general/verification.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisitasService {
  verification:VerificationService;
  url : string = "http://localhost/visita.php";
  constructor(private http : HttpClient, verification : VerificationService) {
    this.verification = verification;
  }

  readVisitas() : Observable<Visita[]>{
    let parametros = new HttpParams()
      .set("command", "read")
      .set("verif", this.verification.verifCode)
      .set("userId", JSON.stringify(this.verification.user));

    return this.http.get<Visita[]>(this.url, {params: parametros});
  }

  async updateVisitas(lpa:string, mpa:string, xpa:string, jpa:string, vpa:string, spa:string, dpa:string,
     lpr:string, mpr:string, xpr:string, jpr:string, vpr:string, spr:string, dpr:string) : Promise<string>{
    let parametros = new HttpParams()
      .set("command", "update")
      .set("verif", this.verification.verifCode)
      .set("userId", JSON.stringify(this.verification.user));
    let visita:Visita = {usuario_id:null,lpa:lpa,mpa:mpa,xpa:xpa,jpa:jpa,vpa:vpa,spa:spa,dpa:dpa,lpr:lpr,mpr:mpr,xpr:xpr,jpr:jpr,vpr:vpr,spr:spr,dpr:dpr,last_update:null};
    return this.http.put<string>(this.url, visita, {params: parametros}).toPromise();
  }
  async createVisita() : Promise<void>{
    let parametros = new HttpParams()
      .set("command", "create")
      .set("verif", this.verification.verifCode)
      .set("userId", JSON.stringify(this.verification.user));
    console.log("Creando");
    console.log(await this.http.put<string>(this.url, null, {params: parametros}).toPromise());
  }
  setFecha(fecha: string):Promise<string> {
    let parametros = new HttpParams()
      .set("command", "set_fecha")
      .set("verif", this.verification.verifCode)
      .set("userId", JSON.stringify(this.verification.user));
    let visita:Visita = {usuario_id:null,lpa:null,mpa:null,xpa:null,jpa:null,vpa:null,spa:null,dpa:null,lpr:null,mpr:null,xpr:null,jpr:null,vpr:null,spr:null,dpr:null,last_update:fecha};
    return this.http.put<string>(this.url, visita, {params: parametros}).toPromise();
  }
}
