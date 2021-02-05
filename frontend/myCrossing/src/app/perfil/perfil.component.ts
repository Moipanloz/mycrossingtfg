import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Verification } from '../app.component';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'app/interfaces';
import { UserService } from 'app/autenticacion/user.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})

export class PerfilComponent implements OnInit {

  verification : Verification;
  cookieService: CookieService;
  http: HttpClient;
  _user : UserService;
  modoEdicion : boolean = false;
  userForm : FormGroup;

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
    private _builder : FormBuilder,
    _user: UserService,
    http: HttpClient) {
      this.verification = verification;
      this.cookieService = cookieService;
      this.http = http;
      this._user = _user;
      this.userForm = this._builder.group({
        nombre : [this.usuario.nombre, this.notBlankValidator]
      });
    }

    @ViewChild("hemisferio") hemisferio : ElementRef;
    @ViewChild("fruta") fruta : ElementRef;
    @ViewChild("zodiaco") zodiaco : ElementRef;

  async ngOnInit(){
    this.verification.verify().then(() => {
      this._user.readUser().then(usuario => {
        this.usuario = usuario[0];

        if(this.usuario.hemisferio == "SUR"){
          this.hemisferio.nativeElement.src = "../../assets/images/hemisferio-sur.png";
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

        switch(this.signoZodiaco(this.usuario.cumpleanyos)){
          case "Aries":
            this.zodiaco.nativeElement.src = "../../assets/images/aries.png";
            break;

          case "Tauro":
            this.zodiaco.nativeElement.src = "../../assets/images/tauro.png";
            break;

          case "Geminis":
            this.zodiaco.nativeElement.src = "../../assets/images/geminis.png";
            break;

          case "Cáncer":
            this.zodiaco.nativeElement.src = "../../assets/images/cancer.png";
            break;

          case "Leo":
            this.zodiaco.nativeElement.src = "../../assets/images/leo.png";
            break;

          case "Libra":
            this.zodiaco.nativeElement.src = "../../assets/images/libra.png";
            break;

          case "Virgo":
            this.zodiaco.nativeElement.src = "../../assets/images/virgo.png";
            break;

          case "Escorpio":
            this.zodiaco.nativeElement.src = "../../assets/images/escorpio.png";
            break;

          case "Sagitario":
            this.zodiaco.nativeElement.src = "../../assets/images/sagitario.png";
            break;

          case "Capricornio":
            this.zodiaco.nativeElement.src = "../../assets/images/capricornio.png";
            break;

          case "Acuario":
            this.zodiaco.nativeElement.src = "../../assets/images/acuario.png";
            break;

          case "Piscis":
            this.zodiaco.nativeElement.src = "../../assets/images/piscis.png";
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

  toggleEdicion(){
    this.modoEdicion = !this.modoEdicion;
  }

  notBlankValidator(control : FormControl){
    const isBlank = (control.value || "").trim().length === 0;
    const isValid = !isBlank;
    return isValid ? null : {'blank': true};
  }

  enviar(){

  }
}


