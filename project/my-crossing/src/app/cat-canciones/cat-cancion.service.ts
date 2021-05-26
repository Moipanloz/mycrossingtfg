import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IItem, items } from 'animal-crossing';
import { Cancion } from 'app/general/interfaces';
import { VerificationService } from 'app/general/services/verification.service';

@Injectable({
  providedIn: 'root'
})
export class CatCancionService {
  url : string = "https://mycrossing-back.herokuapp.com/catcanciones.php";
  totalCanciones: IItem[] = items.filter(i=>i.sourceSheet=="Music");
  HEADERS = new HttpHeaders()
    .set('Access-Control-Allow-Origin', '*')
    .set('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token')
    .set('Access-Control-Allow-Methods', 'OPTIONS, PUT, DELETE, POST, GET');

  constructor(public verification : VerificationService, public http : HttpClient) { }

  readCancion() : Promise<Cancion[]>{
    let parametros = new HttpParams()
    .set("command", "read")
    .set("verif", this.verification.verifCode)
    .set("userId", JSON.stringify(this.verification.user));

    return this.http.get<Cancion[]>(this.url, {params: parametros, headers: this.HEADERS}).toPromise().catch(err => {throw new Error(err.error.text)});
  }

  findAudio(cancion: string): String {
    let res: string = "https://acnhapi.com/v1/music/";
    let i: number = 1;
    let canciones: String[] = ["Agente Totakeke","Tota-aloha"
      ,"Ciudad animal","Tota-pop","Tota-café","Tota-camarada","Tota-D.J.-Total","Al volante"
      ,"Despedida","Forestal y tal","Llanero Tota","Mírame a los ojos","Te quiero","Tota-imperio"
      ,"Tota-banda sonora","Tota-aria","Tota-balada","Tota-bazar","Feliz en tu día","Tota-blues"
      ,"Tota-bossa nova","Tota-calipso","Tota-alcazaba","Tota-góspel","Tota-andina","Tota-country"
      ,"Tota-gánster","Tota-drum&bass","Tota-réquiem","Tota-disco","Tota-old-jazz","Tota-solo","Tota-romanza"
      ,"Tota-flamenco","Tota-folk","Tota-fusión","Tota-groove","Tota-gumbo","Tota-house","Mi isla, mi hogar"
      ,"Tota-jazz","Tota-shamisen","Tota-lamento","Tota-amor","Tota-nana","Tota-mambo","Tota-maratón"
      ,"Tota-marcha","Tota-mariachi","Tota-metal","Tota-milonga","Tota-bolero","Tota-marajá","Tota-desfile"
      ,"Tota-ragtime","Tota-parada","Tota-reggae","Tota-rock","Tota-rockabilly","Tota-safari","Tota-salsa"
      ,"Tota-samba","Tota-ska","Tota-sonata","Tota-canción","Tota-soul","Tota-estepa","Paseíto"
      ,"Tota-swing","Tota-electrónica","Tota-tango","Tota-tecno","Tota-vals","Tota-Oeste","Rey Tota"
      ,"Tota-celta","Tota 2001","Totalerileriló","Míster Totakeke","Mi hogar","Napolitana","Solo yo"
      ,"Sopesando","Tota-total","Tota-lenta","Canción minimalista","Capullos en flor","Pastelito seco"
      ,"Colina arriba","Tota-surf","Tota-funk","Hasta el final","Anteayer","Vagabundo","Nuevo horizonte"];
      if(canciones.includes(cancion)){
        res+=(canciones.indexOf(cancion)+1);
      }else{
        res="No hay audio";
      }
    return res;
  }

  borrarCancion(cancion : string){
    let parametros = new HttpParams()
    .set("command", "delete")
    .set("nombreCancion", cancion)
    .set("verif", this.verification.verifCode)
    .set("userId", JSON.stringify(this.verification.user));

    return this.http.get(this.url, {params: parametros, headers: this.HEADERS}).toPromise().catch(err => {throw new Error(err.error.text)});
  }

  addCancion(cancion : string){
    let parametros = new HttpParams()
    .set("command", "create")
    .set("verif", this.verification.verifCode)
    .set("userId", JSON.stringify(this.verification.user));

    let x : Cancion = {
      nombre_cancion: cancion,
      usuario_id: this.verification.user
    }

    return this.http.post(this.url, x, {params: parametros, headers: this.HEADERS}).toPromise().catch(err => {throw new Error(err.error.text)});
  }
}
