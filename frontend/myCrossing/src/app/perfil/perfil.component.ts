import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Verification } from '../app.component';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'app/interfaces';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})

export class PerfilComponent implements OnInit {

  verification : Verification;
  cookieService: CookieService;
  http: HttpClient;
  usuario : User = {
    id: 0,
    nombre: "",
    isla: "",
    fruta: "",
    cumpleanyos: new Date(),
    hemisferio: "",
    contrasenya: "",
    email: "",
    verification: "",
    id_switch: 0,
    id_suenyo: 0,
    apodo_aldeano: ""
  };

  constructor(
    verification : Verification,
    cookieService: CookieService,
    http: HttpClient) {
      this.verification = verification;
      this.cookieService = cookieService;
      this.http = http;
    }

    @ViewChild("hemisferio") hemisferio : ElementRef;
    @ViewChild("fruta") fruta : ElementRef;
    @ViewChild("zodiaco") zodiaco : ElementRef;

  async ngOnInit(){
    this.verification.verify().then(() => {
      let parametros = new HttpParams()
      .set("userId", JSON.stringify(this.verification.user))
      .set("command", "read");
      this.http.get<User>("http://localhost/authentication.php", {params : parametros}).toPromise().then(usuario => {
        this.usuario = usuario[0];

        if(this.usuario.hemisferio == "SUR"){
          this.hemisferio.nativeElement.src = "../../assets/images/down.png";
        }

        switch(this.usuario.fruta){
          case "MANZANA":
            this.fruta.nativeElement.src = "../../assets/images/manzana.png";
            break;

          case "PERA":
            this.fruta.nativeElement.src = "../../assets/images/pera.png";
            break;

          case "MELOCOTON":
            this.fruta.nativeElement.src = "../../assets/images/melocoton.png";
            break;

          case "CEREZA":
            this.fruta.nativeElement.src = "../../assets/images/cereza.png";
            break;

          case "NARANJA":
            this.fruta.nativeElement.src = "../../assets/images/naranja.png";
            break;
        }

      });
    });
  }

  mesToString(value){
    let fecha : Date = new Date(value);
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    return fecha.getDate() + " de " + meses[fecha.getMonth()];
  }

  signoZodiaco(value){
    const signos = ['Aries','Tauro','Geminis','Cáncer','Leo','Virgo','Libra','Escorpio','Sagitario','Capricornio','Aquario','Piscis'];
    let i = Number(new Intl.DateTimeFormat('fr-TN-u-ca-persian', {month: 'numeric'}).format(new Date(value))) - 1;
    return signos[i];
  };

}


