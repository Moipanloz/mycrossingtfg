import { Tarea } from './../../../interfaces';
import { Component, EventEmitter, Input, Output, HostBinding } from '@angular/core';

@Component({
  selector: 'app-tarea-menu',
  templateUrl: './tarea-menu.component.html',
  styleUrls: ['./tarea-menu.component.css']
})
export class TareaMenuComponent {

  @HostBinding("style.top") y = "0px";
  @HostBinding("style.left") x = "0px";
  @HostBinding("style.visibility") visibility = "hidden";

  @Input("menu") tarea : Tarea

  @Output() borrar = new EventEmitter<Tarea>();

  borrarTarea(tarea : Tarea){
    this.borrar.emit(tarea);
  }

  abreMenu(e : MouseEvent, coord : Array<number>){
    this.x = coord[0]+"px";
    this.y = coord[1]+"px";
    this.visibility = "visible";
    e.stopPropagation();
  }

  cierraMenu(){
    this.visibility = "hidden";
  }

  constructor() { }

}
