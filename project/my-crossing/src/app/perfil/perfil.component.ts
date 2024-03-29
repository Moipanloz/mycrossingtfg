import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'app/general/interfaces';
import { UserService } from 'app/autenticacion/user.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { VerificationService } from 'app/general/services/verification.service';
import { ErrorService } from 'app/general/services/error.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})

export class PerfilComponent implements OnInit {

  verification : VerificationService;
  cookieService: CookieService;
  http: HttpClient;
  _user : UserService;
  modoEdicion : boolean = false;
  userForm : FormGroup;
  _error : ErrorService;
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
    id_switch: "",
    apodo_aldeano: ""
  };

  constructor(
    verification : VerificationService,
    cookieService: CookieService,
    private _builder : FormBuilder,
    _user: UserService,
    http: HttpClient,
    errorService : ErrorService) {
    this.verification = verification;
    this.cookieService = cookieService;
    this.http = http;
    this._user = _user;
    this._error = errorService;
    this.userForm = this._builder.group({
      nombre : ["", this.notBlankValidator],
      apodo_aldeano : [""],
      isla: ["", this.notBlankValidator],
      hemisferio : ["", Validators.required],
      fruta : ["", Validators.required],
      cumpleanyos: ["", Validators.required],
      id_switch: [""]
    });
  }

  @ViewChild("hemisferio") hemisferio : ElementRef;
  @ViewChild("fruta") fruta : ElementRef;
  @ViewChild("zodiaco") zodiaco : ElementRef;
  @ViewChild("fondo") fondo : ElementRef;
  @ViewChild("fondoEdit", {static: false}) fondoEdit : ElementRef;
  @ViewChild("botonEdit") botonEdit : ElementRef;

  public ngAfterViewInit(){
    this.fondoRandom();
  }

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
        this.fondoRandom();
      });
    }).catch(err => {
      this._error.setNewError(err.message);
      setTimeout(() => {this._error.cleanError()}, 3000)
    });
  }
  cambiaFruta(frutaa: string){
    this.userForm.patchValue({fruta: frutaa});
  }
  cambiaHemisferio(hemisferioo: string){
    this.userForm.patchValue({hemisferio: hemisferioo});
  }

  fondoRandom(){
    let fondos : string[] = ["bckg-img-cyan", "bckg-img-basico", "bckg-img-coral", "bckg-img-marron", "bckg-img-naranja"];
    let i = Math.floor(Math.random() * 5);

    if(this.fondo.nativeElement.classList.length == 1){
      this.fondo.nativeElement.classList.add(fondos[i]);
    }else{
      for(let x = 0; x < fondos.length; x++){
        if(this.fondo.nativeElement.classList.contains(fondos[x])){
          this.fondo.nativeElement.classList.remove(fondos[x]);
        }
      }
      this.fondo.nativeElement.classList.add(fondos[i]);
    }

    if(this.fondoEdit.nativeElement.classList.length == 1){
      this.fondoEdit.nativeElement.classList.add(fondos[i]);
    }else{
      for(let x = 0; x < fondos.length; x++){
        if(this.fondoEdit.nativeElement.classList.contains(fondos[x])){
          this.fondoEdit.nativeElement.classList.remove(fondos[x]);
        }
      }
      this.fondoEdit.nativeElement.classList.add(fondos[i]);
    }
  }

  mesToString(value){
    let fecha : Date = new Date(value);
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    return fecha.getDate() + " de " + meses[fecha.getMonth()];
  }

  signoZodiaco(value){
    const signos = ['Aries','Tauro','Geminis','Cáncer','Leo','Virgo','Libra','Escorpio','Sagitario','Capricornio','Acuario','Piscis'];
    let i = Number(new Intl.DateTimeFormat('fr-TN-u-ca-persian', {month: 'numeric'}).format(new Date(value))) - 1;
    return signos[i];
  };

  toggleEdicion(){
    //Primero comprueba que lo estas cerrando para que se vuelvan a cargar los iconos
    if(this.modoEdicion){
      this.botonEdit.nativeElement.classList.remove("save");
      this.botonEdit.nativeElement.classList.add("editar-azul");

      this.modoEdicion = !this.modoEdicion;

      this.ngOnInit();

    }else{
      this.botonEdit.nativeElement.classList.add("save");
      this.botonEdit.nativeElement.classList.remove("editar-azul");

      this.modoEdicion = !this.modoEdicion;

      if(this.usuario.apodo_aldeano == null){
        this.usuario.apodo_aldeano = "";
      }

      if(this.usuario.id_switch == null){
        this.usuario.id_switch = "";
      }

      this.userForm.patchValue({
        nombre : ""+this.usuario.nombre,
        apodo_aldeano : ""+this.usuario.apodo_aldeano,
        isla: ""+this.usuario.isla,
        hemisferio : ""+this.usuario.hemisferio,
        fruta : ""+this.usuario.fruta,
        cumpleanyos: ""+this.usuario.cumpleanyos,
        id_switch: ""+this.usuario.id_switch
      });
    }
  }

  notBlankValidator(control : FormControl){
    const isBlank = (control.value || "").trim().length === 0;
    const isValid = !isBlank;
    return isValid ? null : {'blank': true};
  }

  enviar(value : any){
    let userUpdt : User = {
      id : this.verification.user,
      contrasenya: "",
      verification : "",
      email: "",
      nombre : value["nombre"],
      isla : value["isla"],
      fruta : value["fruta"],
      cumpleanyos : value["cumpleanyos"],
      hemisferio : value["hemisferio"],
      id_switch : value["id_switch"],
      apodo_aldeano : value["apodo_aldeano"]
     };

    this._user.updateUser(userUpdt).then(() => {
      this.toggleEdicion();
      this.ngOnInit();
    }).catch(err => {
      this._error.setNewError(err.message);
      setTimeout(() => {this._error.cleanError()}, 3000)
    });
  }
}


