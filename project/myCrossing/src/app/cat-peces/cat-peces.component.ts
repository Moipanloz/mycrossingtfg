import { CatPecesService } from './cat-peces.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ICreature, creatures } from 'animal-crossing';
import { PaginacionService } from 'app/general/services/paginacion.service';
import { VerificationService } from 'app/general/services/verification.service';
import { debounceTime } from "rxjs/operators";

@Component({
  selector: 'app-cat-peces',
  templateUrl: './cat-peces.component.html',
  styleUrls: ['./cat-peces.component.css']
})
export class CatPecesComponent implements OnInit {

  listaCreatures = new Array<ICreature>();
  shownCreature : ICreature = creatures.filter(i => i.sourceSheet == "Fish")[0];
  hide : Boolean = true;
  isNorth : Boolean = true;
  filtrando : Boolean = false;
  filtroAcShadow : string="";
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
  _catpez : CatPecesService;

  constructor(verif : VerificationService, pag : PaginacionService, catpez : CatPecesService) {
    this._verif = verif;
    this._pag = pag;
    this._catpez = catpez;
  }

  ngOnInit() {
    this._verif.verify().then( async () => {
      let list : number[] = [];
      await creatures.filter(i => i.sourceSheet == "Fish").forEach(f => {if(!list[f.shadow]){list[f.shadow]=1;}else{list[f.shadow]=list[f.shadow]+1;}});
      console.log(list);
      if(this._verif.user != null){
        this.listaUsuario = new Array<string>();
        this._catpez.readPez().then(async listaUsuario => {
          for(let i = 0; i < listaUsuario.length; i++){
            this.listaUsuario.push(listaUsuario[i]["nombre_criatura"]);
          }

          if(this.botonFiltrar != "none"){
            if(this.botonFiltrar == "obtenido"){
              this.listaCreatures = await creatures.filter(i => i.sourceSheet == "Fish" && this.listaUsuario.includes(i.translations.spanish.replace(' ','')));
            }else{
              this.listaCreatures = await creatures.filter(i => i.sourceSheet == "Fish" && !this.listaUsuario.includes(i.translations.spanish.replace(' ','')));
            }
          }else{
            this.listaCreatures = await creatures.filter(i => i.sourceSheet == "Fish");
          }
        });
      }else{
        this.listaCreatures = await creatures.filter(i => i.sourceSheet == "Fish");
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
  filtraShadow(filtro : string){
    this.page_number=1;
    if(this.filtroAcShadow==filtro){
      this.filtroAcShadow="";
    }else{
      this.filtroAcShadow=filtro;
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
      this._catpez.borrarPez(nombreCriatura).then(() => {
        this.ngOnInit();
      });
    }else{
      this._catpez.addPez(nombreCriatura).then(() => {
        this.ngOnInit();
      });
    }
  }

}
