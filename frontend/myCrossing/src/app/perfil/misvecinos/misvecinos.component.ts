import { MisvecinosService } from './misvecinos.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Verification } from 'app/app.component';
import { CookieService } from 'ngx-cookie-service';
import { Vecino } from './../../interfaces';
import { VecinoMenuComponent } from './vecino-menu/vecino-menu.component';

@Component({
  selector: 'app-misvecinos',
  templateUrl: './misvecinos.component.html',
  styleUrls: ['./misvecinos.component.css']
})
export class MisvecinosComponent implements OnInit {

  data = [];
  length : number;
  verification : Verification;
  cookieService: CookieService;
  porcentaje : boolean = false;
  exclude : boolean[] = [];
  vecinoMenu : Vecino = {
    nombre: "",
    vecino_id: 0,
    usuario_id: 0,
    amistad: 1
  };
  vecinoShow : Vecino = {
    nombre: "",
    vecino_id: 0,
    usuario_id: 0,
    amistad: 1
  };

  @ViewChild("show") show : ElementRef;
  @ViewChild(VecinoMenuComponent) menu : VecinoMenuComponent;

  constructor(
    private _misvecinos : MisvecinosService,
    verification : Verification,
    cookieService : CookieService){

    this.cookieService = cookieService;
    this.verification = verification;
   }

  ngOnInit(){
    this.verification.verify().then(() => {
      this._misvecinos.readMisVecinos().subscribe(data => {
        this.length = 10 - data.length;

        for(let ex = 0; ex < data.length; ex++){
          this.exclude.push(false);
        }

        for(let i = 0; i < this.length; i++){
          data.push(null);
        }

        this.data = [];
        this.data.push(data);
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
      if(this.vecinoMenu != null && this.vecinoMenu.vecino_id == vecino.vecino_id && this.menu.divAmistad.nativeElement.style.visibility == "visible"){
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
          vecino_id: 0,
          usuario_id: 0,
          amistad: 1
        }

        setTimeout(() => {
          this.menu.abreMenu(event, coord, amistad);
        }, 100);

      }else{
        // El vecino ya existe
        if(this.vecinoMenu != null && this.vecinoMenu.vecino_id == vecino.vecino_id && this.menu.divVecino.nativeElement.style.visibility == "visible"){
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
    this.porcentaje = !this.porcentaje;
  }


  // ================================= MOVE OUT =============================================

  toggleExclude(index : number){
    this.exclude[index] = !this.exclude[index];
  }

  checkColor(index : number){
    if(this.exclude[index]){
      return "red";
    }else{
      return "green";
    }
  }

  calculaPorcentaje(){
    let amistad : number[] = [];
    let i : number = 1;
    let porcentaje : number;

    for(let vecino of this.data[0]){
      if(vecino != null){
        amistad.push(vecino.amistad);
      }
    }

    for(let a of amistad){
      if(a != amistad[i]){
        break;
      }else{
        i++;
      }
    }

    if(i == amistad.length){
      porcentaje = 100 / amistad.length;
    }else{
      //calcular ponderaciones
    }

    return porcentaje;

  }

}
