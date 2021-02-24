import { Component, OnInit } from '@angular/core';
import { VerificationService } from 'app/general/verification.service';
import { CookieService } from 'ngx-cookie-service';
import { VisitasService } from './visitas.service';

@Component({
  selector: 'app-visitasemanal',
  templateUrl: './visitasemanal.component.html',
  styleUrls: ['./visitasemanal.component.css']
})
export class VisitasemanalComponent implements OnInit {

  verification: VerificationService;
  cookieService: CookieService;
  constructor(
    verification : VerificationService,
    cookieService: CookieService,
    private visitas : VisitasService){

    this.verification = verification;
    this.cookieService = cookieService;
  }
  hide :boolean = true;
  modificando:string;
  modificado:boolean=false;
  avisando:boolean=false;
  aviso="No deberias ver esto";

  totakeke=false;
  juliana=false;
  pili=true;
  alcatifa=true;
  betunio=true;
  tili=true;
  gandulio=true;
  fauno=true;
  kamilo=true;
  cj=true;
  gulliver=true;
  gullivarrr=true;
  ladino=true;
  pascal=true;
  buh=true;
  estela=true;

  lpa = null;
  mpa = null;
  xpa = null;
  jpa = null;
  vpa = null;
  spa = 'Totakeke';
  dpa = 'Juliana';

  lpr = null;
  mpr = null;
  xpr = null;
  jpr = null;
  vpr = null;
  spr = 'Totakeke';
  dpr = 'Juliana';
  ngOnInit(): void {
    let datos = [];
    let repetir=false;
    this.verification.verify().then(() => {
      this.visitas.readVisitas().subscribe(data => {
        if(data.toString()=="No hubo resultados"){
          this.visitas.createVisita();
        }else{
          this.lpa=data[0]['lpa'];
          this.mpa=data[0]['mpa'];
          this.xpa=data[0]['xpa'];
          this.jpa=data[0]['jpa'];
          this.vpa=data[0]['vpa'];
          this.spa=data[0]['spa'];
          this.dpa=data[0]['dpa'];
          this.lpr=data[0]['lpr'];
          this.mpr=data[0]['mpr'];
          this.xpr=data[0]['xpr'];
          this.jpr=data[0]['jpr'];
          this.vpr=data[0]['vpr'];
          this.spr=data[0]['spr'];
          this.dpr=data[0]['dpr'];
        }
      },error => console.error(error));
    });
  }
  vacio(event: any, datos:string){
    if(this.hide==false){
      this.hide=true;
      this.modificando=null;
    }else{
      this.hide=false;
      this.modificando=datos;
    }
  }
  agrega(visitante:string, valido:boolean){
    if(valido){
      this.modificado=true;
      this.hide=true;
      switch(this.modificando){
        case 'lpa':
          this.lpa=visitante;
          break;
        case 'mpa':
          this.mpa=visitante;
          break;
        case 'xpa':
          this.xpa=visitante;
          break;
        case 'jpa':
          this.jpa=visitante;
          break;
        case 'vpa':
          this.vpa=visitante;
          break;
        case 'spa':
          this.spa=visitante;
          break;
        case 'dpa':
          this.dpa=visitante;
          break;
        case 'lpr':
          this.lpr=visitante;
          break;
        case 'mpr':
          this.mpr=visitante;
          break;
        case 'xpr':
          this.xpr=visitante;
          break;
        case 'jpr':
          this.jpr=visitante;
          break;
        case 'vpr':
          this.vpr=visitante;
          break;
        case 'spr':
          this.spr=visitante;
          break;
        case 'dpr':
          this.dpr=visitante;
          break;
        default:
          console.log("Algo ha ido mal, no se reconoce el dia: " + this.modificando);
      }
      this.modificando=null;
    }
  }
  async guardar(){
    if(!this.modificado){
      return;
    }
    let result=await this.visitas.updateVisitas(this.lpa,this.mpa,this.xpa,this.jpa,this.vpa,this.spa,this.dpa,
      this.lpr,this.mpr,this.xpr,this.jpr,this.vpr,this.spr,this.dpr);
    if(result="Exito"){
      this.avisar("Guardado con éxito", 5);
    }else{
      this.avisar("Ha ocurrido un error", 5);
    }
  }
  isEmpty(str) {
    return (!str || 0 === str.length);
  }
  async avisar(mensaje:string, tiempo:number):Promise<void>{
    if(this.avisando=true){
      this.avisando=false;
      await this.sleep(200);
    }
    this.aviso=mensaje;
    this.avisando=true;
    await this.sleep(tiempo*1000);
    this.avisando=false;
    this.aviso="";
  }
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
