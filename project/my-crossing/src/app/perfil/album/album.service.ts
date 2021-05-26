import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Foto } from 'app/general/interfaces';
import { VerificationService } from 'app/general/services/verification.service';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  verification:VerificationService;
  url : string = "https://mycrossing-back.herokuapp.com/album.php";
  HEADERS = new HttpHeaders()
    .set('Access-Control-Allow-Origin', '*')
    .set('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token')
    .set('Access-Control-Allow-Methods', 'OPTIONS, PUT, DELETE, POST, GET');
  constructor(private http : HttpClient, verification : VerificationService) {
    this.verification = verification;
  }
  async  agregaFoto(url: String) : Promise<string>{
    let foto: Foto = {usuario_id: this.verification.user, url_image: url}
    let parametros = new HttpParams()
      .set("command", "create")
      .set("verif", this.verification.verifCode);
    return this.http.put<string>(this.url, foto, {params: parametros, headers: this.HEADERS}).toPromise();
  }
  async  eliminaFoto(url: String) : Promise<string>{
    let foto: Foto = {usuario_id: this.verification.user, url_image: url}
    let parametros = new HttpParams()
      .set("command", "delete")
      .set("verif", this.verification.verifCode);
    return this.http.put<string>(this.url, foto, {params: parametros, headers: this.HEADERS}).toPromise();
  }
  async  leeFotos() : Promise<string[]>{
    let parametros = new HttpParams()
      .set("command", "read")
      .set("verif", this.verification.verifCode)
      .set("userId", this.verification.user.toString());
    return this.http.get<string[]>(this.url, {params: parametros, headers: this.HEADERS}).toPromise();
  }
}
