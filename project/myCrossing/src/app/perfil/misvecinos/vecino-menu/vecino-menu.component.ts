import { Component, EventEmitter, HostBinding, Input, Output, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Vecino } from 'app/general/interfaces';
import { debounceTime } from "rxjs/operators";
import { IVillager, villagers } from 'animal-crossing';

@Component({
  selector: 'app-vecino-menu',
  templateUrl: './vecino-menu.component.html',
  styleUrls: ['./vecino-menu.component.css']
})
export class VecinoMenuComponent implements OnInit {

  @Input("vecinoMenu") vecino : Vecino;

  @ViewChild("menuVecino") divVecino : ElementRef;
  @ViewChild("menuAmistad") divAmistad : ElementRef;

  @Output() crear = new EventEmitter<Vecino>();
  @Output() borrar = new EventEmitter<Vecino>();
  @Output() actualizarVecino = new EventEmitter<Vecino[]>();
  @Output() actualizarAmistad = new EventEmitter<Vecino>();


  @HostBinding("style.top") y = "0px";
  @HostBinding("style.left") x = "0px";

  vecinoForm : FormGroup;
  amistadForm : FormGroup;
  busqueda = new FormControl("");
  valorFiltrar : string = "";


  constructor(private _builder : FormBuilder) {
    this.vecinoForm = this._builder.group({
      id: ["", Validators.required]
    });

    this.amistadForm = this._builder.group({
      amistad: ["", Validators.required]
    });
  }

  ngOnInit(){
    this.busqueda.valueChanges.pipe(debounceTime(300)).subscribe(value => this.filtrar(value));
  }

  abreMenu(e : MouseEvent, coord : Array<number>, amistad : boolean){
    if(amistad){
      this.amistadForm.patchValue({
        amistad : ""+this.vecino.amistad
      });

      let a : string = this.divAmistad.nativeElement.style.width;
      let width = parseInt(a.split("v", 2)[0]);
      let x = coord[0] - (width / 2) - 2.525;

      this.x = x+"%";
      this.y = coord[1]+1+"%";
      this.divAmistad.nativeElement.style.display = "block";
      e.stopPropagation();

    }else{

      if(this.vecino.vecino_id != '0'){
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
      this.divVecino.nativeElement.style.display = "block";
      e.stopPropagation();
    }

  }

  cierraMenu(amistad : boolean){
    if(amistad == null){
      this.divAmistad.nativeElement.style.display = "none";
      this.divVecino.nativeElement.style.display = "none";
    }else if(amistad){
      this.divAmistad.nativeElement.style.display = "none";
    }else{
      this.divVecino.nativeElement.style.display = "none";
    }

    this.busqueda.setValue("");
  }

  borrarVecino(){
    this.borrar.emit(this.vecino);
    this.cierraMenu(null);
  }

  enviar(value, amistad : boolean){
    if(this.vecino.vecino_id == '0'){
      //viene del create
      this.vecino.vecino_id = value["id"];
      this.crear.emit(this.vecino);
      this.cierraMenu(null);
    }else{
      if (amistad){
        if(this.vecino.amistad != value["amistad"]){
          this.vecino.amistad = value["amistad"];
          this.actualizarAmistad.emit(this.vecino);
          this.cierraMenu(null);
        }
      }else{
        if(this.vecino.vecino_id != value["id"]){

          let oldVecino : Vecino = {
            vecino_id: this.vecino.vecino_id,
            usuario_id : this.vecino.usuario_id,
            amistad : this.vecino.amistad,
            nombre : this.vecino.nombre,
            cumple : null,
            especie : null,
            personalidad : null,
            genero : null,
            imgIcon: null,
            imgPhoto: null
          };
          let array = [oldVecino];
          this.vecino.vecino_id = value["id"];
          this.vecino.amistad = 1;
          array.push(this.vecino);
          this.actualizarVecino.emit(array);
          this.cierraMenu(null);
        }
      }
    }
  }

  filtrar(value){
    this.valorFiltrar = value;
  }
  vecinosArray : IVillager[] = villagers.filter(v => v.name!="");



}
