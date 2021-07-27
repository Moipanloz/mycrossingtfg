import { PlatformLocation } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Foto } from 'app/general/interfaces';
import { VerificationService } from 'app/general/services/verification.service';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  verification:VerificationService;
  url : string;

  constructor(pl: PlatformLocation, private http : HttpClient, verification : VerificationService) {
    this.verification = verification;
    this.url = pl.hostname.includes("localhost")?"http://localhost/":"https://mycrossing.herokuapp.com/api/";
    this.url = this.url + "album.php";
  }
  async  agregaFoto(url: String) : Promise<string>{
    let foto: Foto = {usuario_id: this.verification.user, url_image: url}
    let parametros = new HttpParams()
      .set("command", "create")
      .set("verif", this.verification.verifCode);
    return this.http.post<string>(this.url, foto, {params: parametros}).toPromise();
  }
  async  eliminaFoto(url: String) : Promise<string>{
    let foto: Foto = {usuario_id: this.verification.user, url_image: url}
    let parametros = new HttpParams()
      .set("command", "delete")
      .set("verif", this.verification.verifCode);
    return this.http.post<string>(this.url, foto, {params: parametros}).toPromise();
  }
  async  leeFotos() : Promise<string[]>{
    let parametros = new HttpParams()
      .set("command", "read")
      .set("verif", this.verification.verifCode)
      .set("userId", this.verification.user.toString());
    return this.http.get<string[]>(this.url, {params: parametros}).toPromise();
  }
}
