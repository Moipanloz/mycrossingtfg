import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Foto } from 'app/general/interfaces';
import { VerificationService } from 'app/general/services/verification.service';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  verification:VerificationService;
  url : string = "http://localhost/album.php";
  constructor(private http : HttpClient, verification : VerificationService) {
    this.verification = verification;
  }
  async  agregaFoto(url: String) : Promise<string>{
    let foto: Foto = {usuario_id: this.verification.user, url_image: url}
    let parametros = new HttpParams()
      .set("command", "create")
      .set("verif", this.verification.verifCode);
    return this.http.put<string>(this.url, foto, {params: parametros}).toPromise();
  }
  async  eliminaFoto(url: String) : Promise<string>{
    let foto: Foto = {usuario_id: this.verification.user, url_image: url}
    let parametros = new HttpParams()
      .set("command", "delete")
      .set("verif", this.verification.verifCode);
    return this.http.put<string>(this.url, foto, {params: parametros}).toPromise();
  }
  async  leeFotos() : Promise<string[]>{
    let parametros = new HttpParams()
      .set("command", "read")
      .set("verif", this.verification.verifCode)
      .set("userId", this.verification.user.toString());
    return this.http.get<string[]>(this.url, {params: parametros}).toPromise();
  }
}
