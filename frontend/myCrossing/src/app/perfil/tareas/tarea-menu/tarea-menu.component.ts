import { Tarea } from './../../../interfaces';
import { Component, EventEmitter, Input, Output, HostBinding, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-tarea-menu',
  templateUrl: './tarea-menu.component.html',
  styleUrls: ['./tarea-menu.component.css']
})
export class TareaMenuComponent {

  @HostBinding("style.top") y = "0px";
  @HostBinding("style.left") x = "0px";
  @HostBinding("style.visibility") visibility = "hidden";

  @ViewChild("menuDiv") div : ElementRef;

  @Input("menu") tarea : Tarea

  @Output() borrar = new EventEmitter<Tarea>();

  borrarTarea(tarea : Tarea){
    this.borrar.emit(tarea);
    this.visibility = "hidden";
  }

  abreMenu(e : MouseEvent, coord : Array<number>){
    let a : string = this.div.nativeElement.style.width;
    let width = parseInt(a.split("v", 2)[0]);
    // Pos = pos boton - mitad menu + mitad boton
    // Se le suma 1.6 porque es la mitad (+-) de lo que ocupa el boton
    // Mucho lio cogerlo del padre y enviarlo
    let x = coord[0] - (width / 2) + 1.6;

    this.x = x +"%";
    // Se le suma 1% de margen
    this.y = coord[1] + 1 +"%";
    this.visibility = "visible";
    e.stopPropagation();
  }

  cierraMenu(){
    this.visibility = "hidden";
  }

  constructor() { }

}
