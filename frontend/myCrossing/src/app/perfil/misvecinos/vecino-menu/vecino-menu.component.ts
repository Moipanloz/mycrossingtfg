import { Component, EventEmitter, HostBinding, Input, Output, OnInit, ElementRef, ViewChild } from '@angular/core';
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

  @ViewChild("menuVecino.nativeElement.style.visibility") divVecino = "hidden";
  @ViewChild("menuAmistad.nativeElement.style.visibility") divAmistad = "hidden";


  @Output() crear = new EventEmitter<Vecino>();
  @Output() borrar = new EventEmitter<Vecino>();
  @Output() actualizar = new EventEmitter<Vecino[]>();

  @HostBinding("style.top") y = "0px";
  @HostBinding("style.left") x = "0px";

  vecinoForm : FormGroup;
  busqueda = new FormControl("");
  valorFiltrar : string = "";


  constructor(private _builder : FormBuilder) {
    this.vecinoForm = this._builder.group({
      id: ["", Validators.required]
    });
  }

  ngOnInit(){
    this.busqueda.valueChanges.pipe(debounceTime(300)).subscribe(value => this.filtrar(value));
  }

  abreMenu(e : MouseEvent, coord : Array<number>){
    if(target = imagen){
      if(this.vecino.vecino_id != 0){
        this.vecinoForm.patchValue({
          id : ""+this.vecino.vecino_id
        });
      }else{
        this.vecinoForm.patchValue({
          id : "1"
        });
      }

      let a : string = this.divVecino.nativeElement.style.width;
      let width = parseInt(a.split("v", 2)[0]);
      let x = coord[0] - (width / 2) + 3.5;

      this.x = x+"%";
      this.y = coord[1]+1+"%";
      this.visibility = "visible";
      e.stopPropagation();
    }else if (target = boton amistad){

    }

  }

  cierraMenu(){
    this.visibility = "hidden";
  }

  borrarVecino(){
    this.borrar.emit(this.vecino);
  }

  enviar(value){
    if(this.vecino.vecino_id != value["id"]){
      let crear : boolean;
      let oldVecino : Vecino = {
        vecino_id: this.vecino.vecino_id,
        usuario_id : this.vecino.usuario_id,
        amistad : this.vecino.amistad,
        nombre : this.vecino.nombre
      };
      let array = [oldVecino];

      if(this.vecino.vecino_id == 0){
        //viene del create
        crear = true;
      }else{
        crear = false;
      }

      this.vecino.vecino_id = value["id"];
      array.push(this.vecino);

      if(crear){
        this.crear.emit(this.vecino);
      }else{
        this.actualizar.emit(array);
      }
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
  },{
    nombre: "Test20",
    vecino_id: 20,
    usuario_id: 0,
    amistad: 6
  },{
    nombre: "Test21",
    vecino_id: 21,
    usuario_id: 0,
    amistad: 6
  },{
    nombre: "Test22",
    vecino_id: 22,
    usuario_id: 0,
    amistad: 6
  },{
    nombre: "Test23",
    vecino_id: 23,
    usuario_id: 0,
    amistad: 6
  },{
    nombre: "Test24",
    vecino_id: 24,
    usuario_id: 0,
    amistad: 6
  }]



}
