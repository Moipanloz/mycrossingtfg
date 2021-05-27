import { Tarea } from '../../../general/interfaces';
import { Component, EventEmitter, Input, Output, HostBinding, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tarea-menu',
  templateUrl: './tarea-menu.component.html',
  styleUrls: ['./tarea-menu.component.css']
})
export class TareaMenuComponent {

  iconoForm : FormGroup;
  iconos : Array<string> = ["bolsa-bayas","caña-pesca","diy","fosil","hierbajos","hoja","nabo","pascal",
            "piedra","regalo","receta-en-botella","red-caza","movil","fragmento-estrella","ropa","regadera"];

  @HostBinding("style.top") y = "0px";
  @HostBinding("style.left") x = "0px";
  @HostBinding("style.display") display = "none";

  @ViewChild("menuDiv") div : ElementRef;

  @Input("menu") tarea : Tarea

  @Output() borrar = new EventEmitter<Tarea>();
  @Output() actualizar = new EventEmitter<Tarea>();

  constructor(private _builder : FormBuilder) {
    this.iconoForm = this._builder.group({
      icono: ["", Validators.required]
    });
   }

  borrarTarea(tarea : Tarea){
    this.borrar.emit(tarea);
    this.display = "none";
  }

  abreMenu(e : MouseEvent, coord : Array<number>){
    this.iconoForm.patchValue({
      icono : ""+this.tarea.imagen_url
    });

    let a : string = this.div.nativeElement.style.width;
    let width = parseInt(a.split("v", 2)[0]);
    // Pos = pos boton - mitad menu + mitad boton
    // Se le suma 1.6 porque es la mitad (+-) de lo que ocupa el boton
    // Mucho lio cogerlo del padre y enviarlo
    let x = coord[0] - (width / 2) + 1.6;

    this.x = x +"%";
    // Se le suma 1% de margen
    this.y = coord[1] + 1 +"%";
    this.display = "block";
    e.stopPropagation();
  }

  cierraMenu(){
    this.display = "none";
  }

  enviar(value){
    // Solo actualiza si el valor es distinto al que ya tiene
    if(this.tarea.imagen_url != value["icono"]){
      this.tarea.imagen_url = value["icono"];
      this.actualizar.emit(this.tarea);
    }
  }

}
