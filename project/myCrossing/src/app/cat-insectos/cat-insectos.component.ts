import { CatInsectosService } from './cat-insectos.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ICreature, creatures } from 'animal-crossing';
import { PaginacionService } from 'app/general/services/paginacion.service';
import { VerificationService } from 'app/general/services/verification.service';
import { debounceTime } from "rxjs/operators";

@Component({
  selector: 'app-cat-insectos',
  templateUrl: './cat-insectos.component.html',
  styleUrls: ['./cat-insectos.component.css']
})
export class CatInsectosComponent implements OnInit {

  listaCreatures = new Array<ICreature>();
  shownCreature : ICreature = creatures.filter(i => i.sourceSheet == "Insects")[0];
  hide : Boolean = true;
  isNorth : Boolean = true;
  filtrando : Boolean = false;
  filtroAcWe : string="";
  filtroAcWhe : string="";
  listaUsuario : Array<string>;
  _verif : VerificationService;
  page_number : number = 1;
  max_items : number = 40;
  num_paginas : Array<number>;
  _pag : PaginacionService;
  botonFiltrar : string = "none";
  nameFilter : string = "";
  busqueda = new FormControl("");
  _catbicho : CatInsectosService;

  constructor(verif : VerificationService, pag : PaginacionService, catbicho : CatInsectosService) {
    this._verif = verif;
    this._pag = pag;
    this._catbicho = catbicho;
  }

  ngOnInit() {
    this._verif.verify().then( async () => {
      if(this._verif.user != null){
        this.listaUsuario = new Array<string>();
        this._catbicho.readBicho().then(async listaUsuario => {
          for(let i = 0; i < listaUsuario.length; i++){
            this.listaUsuario.push(listaUsuario[i]["nombre_criatura"]);
          }

          if(this.botonFiltrar != "none"){
            if(this.botonFiltrar == "obtenido"){
              this.listaCreatures = await creatures.filter(i => i.sourceSheet == "Insects" && this.listaUsuario.includes(i.translations.spanish.replace(' ','')));
            }else{
              this.listaCreatures = await creatures.filter(i => i.sourceSheet == "Insects" && !this.listaUsuario.includes(i.translations.spanish.replace(' ','')));
            }
          }else{
            this.listaCreatures = await creatures.filter(i => i.sourceSheet == "Insects");
          }
        });
      }else{
        this.listaCreatures = await creatures.filter(i => i.sourceSheet == "Insects");
      }
      this.busqueda.valueChanges.pipe(debounceTime(300)).subscribe(value => this.filtrar(value));
      this.num_paginas = this.getPaginas(this.listaCreatures);
    });
  }
  filtraWhe(filtro : string){
    this.page_number=1;
    if(this.filtroAcWhe==filtro){
      this.filtroAcWhe="";
    }else{
      this.filtroAcWhe=filtro;
    }
  }
  filtraWe(filtro : string){
    this.page_number=1;
    if(this.filtroAcWe==filtro){
      this.filtroAcWe="";
    }else{
      this.filtroAcWe=filtro;
    }
  }
  mostrar(creature:ICreature){
    this.shownCreature=creature;
    this.hide=false;
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
      this._catbicho.borrarBicho(nombreCriatura).then(() => {
        this.ngOnInit();
      });
    }else{
      this._catbicho.addBicho(nombreCriatura).then(() => {
        this.ngOnInit();
      });
    }
  }

}
