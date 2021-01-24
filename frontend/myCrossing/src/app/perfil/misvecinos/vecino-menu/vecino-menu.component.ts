import { Component, EventEmitter, HostBinding, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Vecino } from 'app/interfaces';
import { debounceTime } from "rxjs/operators";

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
  valorFiltrar : string = "";

  constructor(private _builder : FormBuilder) {
    // if(this.vecino.vecino_id == 0){
      this.vecinoForm = this._builder.group({
        id: [1, Validators.required]
      });
    // }else{
    //   this.vecinoForm = this._builder.group({
    //     id: [2, Validators.required]
    //   });
    // }

  }

  ngOnInit(){
    this.busqueda.valueChanges.pipe(debounceTime(300)).subscribe(value => this.filtrar(value));
  }

  abreMenu(e : MouseEvent, coord : Array<number>){
    this.visibility = "visible";
    console.log("menu abierto");
    console.log(this.vecino);

    //TODO ABAJO
    this.x = coord[0]+"%";
    this.y = coord[1]+"%";
    e.stopPropagation();
    //console.log(this.vecino);
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

  filtrar(value){
    this.valorFiltrar = value;
  }

// ==================================== ESTO ES SIMULANDO LA LISTA PARA PODER FILTRAR ==========================
//         BORRAR CUANDO ESTE LA API

  testArray : Vecino[] = [{
    nombre: "Rocio",
    vecino_id: 1,
    usuario_id: 0,
    amistad: 2
  },{
    nombre: "Rocinante",
    vecino_id: 2,
    usuario_id: 0,
    amistad: 4
  },{
    nombre: "Aurora",
    vecino_id: 3,
    usuario_id: 0,
    amistad: 6
  },{
    nombre: "Bobi",
    vecino_id: 13,
    usuario_id: 0,
    amistad: 6
  }]



}
