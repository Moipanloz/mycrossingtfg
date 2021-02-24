import { LowerCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
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
          if(this.isEmpty(data[0]['last_update'])){
            let hoy = new Date();
            this.visitas.setFecha(hoy.getTime().toString());
          }else{
            let lastUpdate=new Date(Number(data[0]['last_update']));
            let hoy = new Date();
            if(this.dayOfWeek(hoy)<this.dayOfWeek(lastUpdate) || (hoy.getTime()-lastUpdate.getTime()) / (1000 * 3600 * 24)>7){
              this.visitas.updateVisitas(this.lpr,this.mpr,this.xpr,this.jpr,this.vpr,
                this.spr,this.dpr,null,null,null,null,null,'Totakeke','Juliana');
                this.visitas.setFecha(hoy.getTime().toString());
            }
          }
        }
      },error => console.error(error));
    });
  }
  dayOfWeek(date: Date):number {
    var options = {  weekday: 'short'};
    let dia = date.toLocaleTimeString('en-us', options).substr(0,3);
    switch(dia){
      case 'Mon':
        return 1;
      case 'Tue':
        return 2;
      case 'Wed':
        return 3;
      case 'Thu':
        return 4;
      case 'Fri':
        return 5;
      case 'Sat':
        return 6;
      case 'Sun':
        return 7;
      default:
        return 0;
    }

  }
  vacio(event: any, datos:string){
    if(this.hide==false){
      this.hide=true;
      this.modificando=null;
    }else{
      this.hide=false;
      this.modificando=datos;
      this.setAllTrue();
      let conjunto = this.creaConjunto()
      if(conjunto.size<10){
        let iterator=conjunto.values();
        for(let j=0;j<conjunto.size;j++){
          this.negar(iterator.next().value);
        }
      }
      if(datos.substr(2,1)=='r'){
        if(!this.isEmpty(this.lpr)){
          this.negar(this.lpr);
        }
        if(!this.isEmpty(this.mpr)){
          this.negar(this.mpr);
        }
        if(!this.isEmpty(this.xpr)){
          this.negar(this.xpr);
        }
        if(!this.isEmpty(this.jpr)){
          this.negar(this.jpr);
        }
        if(!this.isEmpty(this.vpr)){
          this.negar(this.vpr);
        }
      }else{
        if(!this.isEmpty(this.lpa)){
          this.negar(this.lpa);
        }
        if(!this.isEmpty(this.mpa)){
          this.negar(this.mpa);
        }
        if(!this.isEmpty(this.xpa)){
          this.negar(this.xpa);
        }
        if(!this.isEmpty(this.jpa)){
          this.negar(this.jpa);
        }
        if(!this.isEmpty(this.vpa)){
          this.negar(this.vpa);
        }
      }
      let aux= this.getValor(datos);
      if(!this.isEmpty(aux)){
        this.aceptar(aux);
      }
    }
  }
  getValor(value: string):string{
    switch(value){
      case 'lpa':
        return this.lpa;
      case 'mpa':
        return this.mpa;
      case 'xpa':
        return this.xpa;
      case 'jpa':
        return this.jpa;
      case 'vpa':
        return this.vpa;
      case 'lpr':
        return this.lpr;
      case 'mpr':
        return this.mpr;
      case 'xpr':
        return this.xpr;
      case 'jpr':
        return this.jpr;
      case 'vpr':
        return this.vpr;
      default:
        return "Valor erroneo";
    }
  }
  negar(value: string):void {
    value = value.toLowerCase();
    switch(value){
      case 'pili':
        this.pili=false;
        break;
      case 'alcatifa':
        this.alcatifa=false;
        break;
      case 'betunio':
        this.betunio=false;
        break;
      case 'tili':
        this.tili=false;
        break;
      case 'gandulio':
        this.gandulio=false;
        break;
      case 'fauno':
        this.fauno=false;
        break;
      case 'kamilo':
        this.kamilo=false;
        break;
      case 'cj':
        this.cj=false;
        break;
      case 'gulliver':
        this.gulliver=false;
        break;
      case 'gullivarrr':
        this.gullivarrr=false;
        break;
      case 'ladino':
        this.ladino=false;
        break;
      case 'pascal':
        this.pascal=false;
        break;
      case 'buh':
        this.buh=false;
        break;
      case 'estela':
        this.estela=false;
        break;
      default:
        break;
    }
  }
  aceptar(value: string):void {
    value = value.toLowerCase();
    console.log(value);
    switch(value){
      case 'pili':
        this.pili=true;
        break;
      case 'alcatifa':
        this.alcatifa=true;
        break;
      case 'betunio':
        this.betunio=true;
        break;
      case 'tili':
        this.tili=true;
        break;
      case 'gandulio':
        this.gandulio=true;
        break;
      case 'fauno':
        this.fauno=true;
        break;
      case 'kamilo':
        this.kamilo=true;
        break;
      case 'cj':
        this.cj=true;
        break;
      case 'gulliver':
        this.gulliver=true;
        break;
      case 'gullivarrr':
        this.gullivarrr=true;
        break;
      case 'ladino':
        this.ladino=true;
        break;
      case 'pascal':
        this.pascal=true;
        break;
      case 'buh':
        this.buh=true;
        break;
      case 'estela':
        this.estela=true;
        break;
      default:
        break;
    }
  }
  creaConjunto() :Set<string>{
    let conjunto=new Set<string>();
    let random=0;
    if(this.isEmpty(this.lpa)){
      conjunto.add(random.toString());
      random++;
    }else{
      conjunto.add(this.lpa);
    }
    if(this.isEmpty(this.mpa)){
      conjunto.add(random.toString());
      random++;
    }else{
      conjunto.add(this.mpa);
    }
    if(this.isEmpty(this.xpa)){
      conjunto.add(random.toString());
      random++;
    }else{
      conjunto.add(this.xpa);
    }
    if(this.isEmpty(this.jpa)){
      conjunto.add(random.toString());
      random++;
    }else{
      conjunto.add(this.jpa);
    }
    if(this.isEmpty(this.vpa)){
      conjunto.add(random.toString());
      random++;
    }else{
      conjunto.add(this.vpa);
    }
    if(this.isEmpty(this.lpr)){
      conjunto.add(random.toString());
      random++;
    }else{
      conjunto.add(this.lpr);
    }
    if(this.isEmpty(this.mpr)){
      conjunto.add(random.toString());
      random++;
    }else{
      conjunto.add(this.mpr);
    }
    if(this.isEmpty(this.xpr)){
      conjunto.add(random.toString());
      random++;
    }else{
      conjunto.add(this.xpr);
    }
    if(this.isEmpty(this.jpr)){
      conjunto.add(random.toString());
      random++;
    }else{
      conjunto.add(this.jpr);
    }
    if(this.isEmpty(this.vpr)){
      conjunto.add(random.toString());
      random++;
    }else{
      conjunto.add(this.vpr);
    }
    return conjunto;
  }
  setAllTrue(): void {
    this.pili=true;
    this.alcatifa=true;
    this.betunio=true;
    this.tili=true;
    this.gandulio=true;
    this.fauno=true;
    this.kamilo=true;
    this.cj=true;
    this.gulliver=true;
    this.gullivarrr=true;
    this.ladino=true;
    this.pascal=true;
    this.buh=true;
    this.estela=true;
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
      this.avisar("Guardado con éxito", 3);
    }else{
      this.avisar("Ha ocurrido un error", 4);
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
