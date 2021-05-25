import { CriaturasMarinasService } from './criaturas-marinas.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ICreature, creatures } from 'animal-crossing';
import { PaginacionService } from 'app/general/services/paginacion.service';
import { VerificationService } from 'app/general/services/verification.service';
import { debounceTime } from "rxjs/operators";

@Component({
  selector: 'app-cat-criaturas-marinas',
  templateUrl: './cat-criaturas-marinas.component.html',
  styleUrls: ['./cat-criaturas-marinas.component.css']
})
export class CatCriaturasMarinasComponent implements OnInit {

  HEMISFERIO : string = "";
  listaCreatures = new Array<ICreature>();
  shownCreature : ICreature = creatures.filter(i => i.sourceSheet == "Fish")[0];
  hide : Boolean = true;
  isNorth : Boolean = true;
  filtrando : Boolean = false;
  filtroAcShadow : string="";
  filtroAcVelocidad : string="";
  listaUsuario : Array<string>;
  _verif : VerificationService;
  page_number : number = 1;
  max_items : number = 40;
  num_paginas : Array<number>;
  _pag : PaginacionService;
  botonFiltrar : string = "none";
  nameFilter : string = "";
  busqueda = new FormControl("");
  _catcm : CriaturasMarinasService;
  shownCreatureMeses : number[] = new Array<number>();
  shownCreatureHoras : string[] = new Array<string>();
  meses : Map<number, string> = new Map([
    [1,"Enero"],
    [2,"Febrero"],
    [3,"Marzo"],
    [4,"Abril"],
    [5,"Mayo"],
    [6,"Junio"],
    [7,"Julio"],
    [8,"Agosto"],
    [9,"Septiembre"],
    [10,"Octubre"],
    [11,"Noviembre"],
    [12,"Diciembre"]
  ]);

  constructor(verif : VerificationService, pag : PaginacionService, catcm : CriaturasMarinasService) {
    this._verif = verif;
    this._pag = pag;
    this._catcm = catcm;
  }

  @HostListener("window:scroll")
  onScroll(){
    this.hide = true;
    this.isNorth = this.HEMISFERIO=="NORTE";
  }

  ngOnInit() {
    this._verif.verify().then( async () => {
      if(this._verif.user != null){
        this.HEMISFERIO = this._verif.hemisferio;
        this.isNorth = this.HEMISFERIO == "NORTE";
        this.checkMesesYHora();
        this.listaUsuario = new Array<string>();
        this._catcm.readcm().then(async listaUsuario => {
          for(let i = 0; i < listaUsuario.length; i++){
            this.listaUsuario.push(listaUsuario[i]["nombre_criatura"]);
          }

          if(this.botonFiltrar != "none"){
            if(this.botonFiltrar == "obtenido"){
              this.listaCreatures = await creatures.filter(i => i.sourceSheet == "Sea Creatures" && this.listaUsuario.includes(i.translations.spanish.replace(' ','')));
            }else{
              this.listaCreatures = await creatures.filter(i => i.sourceSheet == "Sea Creatures" && !this.listaUsuario.includes(i.translations.spanish.replace(' ','')));
            }
          }else{
            this.listaCreatures = await creatures.filter(i => i.sourceSheet == "Sea Creatures");
          }
        });
      }else{
        this.listaCreatures = await creatures.filter(i => i.sourceSheet == "Sea Creatures");
      }
      this.busqueda.valueChanges.pipe(debounceTime(300)).subscribe(value => this.filtrar(value));
      this.num_paginas = this.getPaginas(this.listaCreatures);
    });
  }

  filtraShadow(filtro : string){
    this.page_number=1;
    if(this.filtroAcShadow==filtro){
      this.filtroAcShadow="";
    }else{
      this.filtroAcShadow=filtro;
    }
  }

  filtraVelocidad(filtro : string){
    this.page_number=1;
    if(this.filtroAcVelocidad==filtro){
      this.filtroAcVelocidad="";
    }else{
      this.filtroAcVelocidad=filtro;
    }
  }

  cambiaHemisferio(){
    this.isNorth = !this.isNorth;
    this.checkMesesYHora();
  }

  checkMesesYHora(){
    if(this.isNorth){
      this.shownCreatureHoras = this.shownCreature.hemispheres.north.time;
      this.shownCreatureMeses = this.shownCreature.hemispheres.north.monthsArray;
    }else{
      this.shownCreatureHoras = this.shownCreature.hemispheres.south.time;
      this.shownCreatureMeses = this.shownCreature.hemispheres.south.monthsArray;
    }
  }

  mostrar(e : MouseEvent, creature:ICreature){
    this.shownCreature=creature;
    this.isNorth = this.HEMISFERIO == "NORTE";
    this.checkMesesYHora();
    this.hide=false;
    e.stopPropagation();
  }

  cierraMenu(){
    if(!this.hide){
      this.hide = true;
    }
  }

  filtrar(value){
    this.nameFilter = value;
    this.page_number = 1;
  }

  activaFiltro(key : string){
    if(this.botonFiltrar == key){
      this.botonFiltrar = "none"
    }else{
      this.botonFiltrar = key
    }
    this.page_number = 1;
    this.nameFilter = "";
    this.busqueda.setValue("");
    this.ngOnInit();
  }

  getPaginas(lista : Array<any>){
    return Array.from({length: Math.ceil(lista.length / this.max_items)}, (_, i) => i+1);
  }

  toggleCheck(criatura : ICreature){
    let nombreCriatura : string = criatura.translations.spanish.replace(" ", "");
    if(this.listaUsuario.includes(nombreCriatura)){
      this._catcm.borrarcm(nombreCriatura).then(() => {
        this.ngOnInit();
      });
    }else{
      this._catcm.addcm(nombreCriatura).then(() => {
        this.ngOnInit();
      });
    }
  }

}