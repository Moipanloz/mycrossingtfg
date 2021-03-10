import { MisvecinosService } from './misvecinos.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Vecino } from '../../general/interfaces';
import { VecinoMenuComponent } from './vecino-menu/vecino-menu.component';
import { VerificationService } from 'app/general/verification.service';
import { ApiService } from 'app/general/api.service';
import { IVillager, villagers } from 'animal-crossing';

@Component({
  selector: 'app-misvecinos',
  templateUrl: './misvecinos.component.html',
  styleUrls: ['./misvecinos.component.css']
})
export class MisvecinosComponent implements OnInit {

  data = [];
  length : number;
  verification : VerificationService;
  cookieService: CookieService;
  porcentajeMode : boolean = false;
  porcentajes : number[] = [];
  exclude : boolean[] = [];
  vecinoMenu : Vecino = {
    nombre: "",
    vecino_id: '0',
    usuario_id: 0,
    amistad: 1,
    cumple : null,
    especie : null,
    personalidad : null,
    genero : null,
    imgIcon: null,
    imgPhoto: null
  };
  vecinoShow : Vecino = {
    nombre: "",
    vecino_id: '0',
    usuario_id: 0,
    amistad: 1,
    cumple : null,
    especie : null,
    personalidad : null,
    genero : null,
    imgIcon: null,
    imgPhoto: null
  };

  @ViewChild("show") show : ElementRef;
  @ViewChild(VecinoMenuComponent) menu : VecinoMenuComponent;

  constructor(
    private _misvecinos : MisvecinosService,
    verification : VerificationService,
    private _api : ApiService,
    cookieService : CookieService){

    this.cookieService = cookieService;
    this.verification = verification;
   }

  ngOnInit(){
    this.verification.verify().then(() => {
      this._misvecinos.readMisVecinos().subscribe(async data => {
        this.length = 10 - data.length;
        this.data = [];

        for(let ex = 0; ex < data.length; ex++){
          this.exclude.push(false);
        }

        for(let i = 0; i < this.length; i++){
          data.push(null);
        }

        let aux:Vecino = null;
        let aux2 : IVillager[];
        let aux3 : String[] = [];
        let aux4 : Set<String>;
        aux2=villagers.filter(v => v.name!='');
        for(let vecino of aux2){
          aux3.push(vecino.personality);
        }
        aux4 = new Set(aux3);
        console.log(aux4);
        for(let raw of data ){
          if(raw!=null){
            aux2 = villagers.filter(v => v.uniqueEntryId==raw.vecino_id);
            aux = {nombre: aux2[0].translations.spanish, vecino_id: raw.vecino_id, usuario_id: raw.usuario_id, amistad: raw.amistad,
              cumple: new Date(aux2[0].birthday),imgIcon: aux2[0].iconImage, imgPhoto: aux2[0].photoImage, personalidad: aux2[0].personality, especie: aux2[0].species, genero: aux2[0].gender};
            let fecha = new Date(aux2[0].birthday);
          }else{
            aux=null;
          }
          this.data.push(aux);
          aux2=null;
        }

        this.show.nativeElement.style.visibility = "hidden";
      }, error => console.error(error));
    });
  }

  toggleVecino(vecino : Vecino) {
    if(vecino != null){
      this.vecinoShow = vecino;
      this.show.nativeElement.style.visibility = "visible";
    }
  }

  crearVecino(vecino : Vecino){
    this._misvecinos.crearVecino(vecino).then(() => {
      this.ngOnInit();
    });
  }

  actualizaVecino(array : Vecino[]){
    this._misvecinos.actualizarVecino(array[0], array[1]).then(() => {
      this.ngOnInit();
    });
  }

  mesToString(value){
    let fecha : Date = new Date(value);
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    return fecha.getDate() + " de " + meses[fecha.getMonth()];
  }

  actualizaAmistadVecino(vecino : Vecino){
    this._misvecinos.actualizarAmistadVecino(vecino).then(() => {
      this.ngOnInit();
    });
  }

  borraVecino(vecino : Vecino){
    this._misvecinos.borrarVecino(vecino).then(() => {
      this.ngOnInit();
    });
  }

  abreMenu(event, vecino : Vecino, amistad : boolean){
    let coord = this.obtenPosicion(event);
    if(amistad){
      // Se ha hecho click en el boton de amistad
      if(this.vecinoMenu != null && this.vecinoMenu.vecino_id == vecino.vecino_id && this.menu.divAmistad.nativeElement.style.display == "block"){
        // si el vecino ya esta seteado, y ademas coincide con el id que le pasas y el menu se ve
        this.menu.cierraMenu(amistad);
      }else{
        this.vecinoMenu = vecino;
        // Esta feo, pero probando con promises y await no sale
        setTimeout(() => {
          this.menu.abreMenu(event, coord, amistad);
        }, 100);
      }

    }else{

      if(vecino == null){
        // Viene del create
        this.vecinoMenu = {
          nombre: "",
          vecino_id: '0',
          usuario_id: 0,
          amistad: 1,
          cumple : null,
          especie : null,
          personalidad : null,
          genero : null,
          imgIcon: null,
          imgPhoto: null
        }

        setTimeout(() => {
          this.menu.abreMenu(event, coord, amistad);
        }, 100);

      }else{
        // El vecino ya existe
        if(this.vecinoMenu != null && this.vecinoMenu.vecino_id == vecino.vecino_id && this.menu.divVecino.nativeElement.style.display == "block"){
          // si el vecino ya esta seteado, y ademas coincide con el id que le pasas y el menu se ve
          this.menu.cierraMenu(amistad);
        }else{

          this.vecinoMenu = vecino;
          // Hay que meterle delay porque abre el menu antes de que se asigne completamente
          // y no se puede usar await porque se usa al reves, una asignacion ha de esperar a
          // que se termine una funcion, y esto es lo contrario

          // Esta feo, pero probando con promises y await no sale
          setTimeout(() => {
            this.menu.abreMenu(event, coord, amistad);
          }, 100);

        }
      }
    }
  }

  obtenPosicion(event): any[]{
    let x = (event.target.offsetLeft / window.innerWidth) * 100;
    let y = ((event.target.offsetTop + event.target.offsetHeight) / window.innerHeight ) * 100;
    return [x, y];
  }

  cierraMenu(amistad : boolean){
    this.menu.cierraMenu(amistad);
  }

  toggleMoveout(){
    this.porcentajeMode = !this.porcentajeMode;
  }


  // ================================= MOVE OUT =============================================

  toggleExclude(index : number){
    this.exclude[index] = !this.exclude[index];
  }

  checkExclude(index : number){
    if(this.exclude[index]){
      return "url('../../../assets/images/excluido-rojo.png')";
    }else{
      return "url('../../../assets/images/excluido-gris.png')";
    }
  }

  checkPorcentajeVis(){
    if(this.porcentajeMode){
      return "visible";
    }else{
      return "hidden";
    }
  }

  calculaPorcentaje(){
    let amistadCalc : number[] = [];
    let amistadFull : number[] = [];
    let i : number = 0;
    let puntos : number[] = [];
    let porcentajes : number[] = [];

    // Recoge en un array las amistades de los vecinos que tiene el user si no estan excluidos
    // y cuenta el numero de vecinos con amistad 6
    for(let vecino of this.data[0]){
      if(vecino != null){
        if(!this.exclude[this.data[0].indexOf(vecino)]){
          amistadCalc.push(vecino.amistad);
          amistadFull.push(vecino.amistad);
        }else{
          amistadFull.push(null);
        }
      }
    }

    // Comprueba si todos los vecinos tienen la misma amistad
    for(i = 0; i < amistadCalc.length - 1; i++){
      if(amistadCalc[i] != amistadCalc[i+1]){
        break;
      }
    }

    // Si todos tienen la misma amistad, el porcentaje se calcula evenly
    if(i == amistadCalc.length - 1){
      for(let i = 0; i < amistadFull.length; i++){
        if(amistadFull[i] == null){
          porcentajes.push(null);
        }else{
          porcentajes.push(100 / amistadCalc.length);
        }
      }
    // Si no, se calculan los puntos de amistad de cada uno siguiendo el algoritmo
    }else{
      for(let a of amistadFull){
        let puntosAmistad = 0;
        switch(a){
          case 1:
            puntosAmistad = 15;
            break;
          case 2:
            puntosAmistad = 45;
            break;
          case 3:
            puntosAmistad = 80;
            break;
          case 4:
            puntosAmistad = 125;
            break;
          case 5:
            puntosAmistad = 175;
            break;
          case 6:
            puntosAmistad = 200;
            break;
          default:
            puntosAmistad = null;
        }

        let calc : number;
        let nivelSeis : number = 0;
        if(puntosAmistad == 200){
          nivelSeis = 1;
        }

        if(puntosAmistad == null){
          calc = null;
        }else{
          calc = Math.floor(((300 - puntosAmistad) / 10) - nivelSeis);
        }
        puntos.push(calc);
      }

      let suma : number = 0;

      for(let p of puntos){
        if(p != null){
          suma += p;
        }
      }

      for(let p of puntos){
        if(p !=null){
          porcentajes.push((p/suma)*100);
        }else{
          porcentajes.push(null);
        }
      }
    }

    this.porcentajes = porcentajes;
  }
}
