import { Component, EventEmitter, HostBinding, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Vecino } from 'app/interfaces';

@Component({
  selector: 'app-vecino-menu',
  templateUrl: './vecino-menu.component.html',
  styleUrls: ['./vecino-menu.component.css']
})
export class VecinoMenuComponent implements OnInit {

  @Input("vecinoMenu") vecino : Vecino;

  @Output() crear = new EventEmitter<Vecino>();

  @HostBinding("style.top") y = "0px";
  @HostBinding("style.left") x = "0px";
  @HostBinding("style.visibility") visibility = "hidden";

  vecinoForm : FormGroup;
  busqueda = new FormControl("");
  busquedaEmitter = new EventEmitter<string>(); // Cambiarlo a string cuando se implemente API

  constructor(private _builder : FormBuilder) {
    this.vecinoForm = this._builder.group({
      id: ["1", Validators.required]
    });
  }

  ngOnInit(){
    this.busqueda.valueChanges.subscribe(value => this.busquedaEmitter.emit(value));
  }

  abreMenu(e : MouseEvent, coord : Array<number>){
    this.visibility = "visible";
    //TODO ABAJO
    this.x = coord[0]+"%";
    this.y = coord[1]+"%";
    e.stopPropagation();
  }

  cierraMenu(){
    this.visibility = "hidden";
  }

  borrarVecino(vecino : Vecino){

  }

  enviar(value){
    if(this.vecino.vecino_id != value["id"]){
      this.vecino.vecino_id = value["id"];
      // OUTPUT EVENTO AQUI
    }
  }

  handleSearch(value : string){
    console.log(value);
  }

}
