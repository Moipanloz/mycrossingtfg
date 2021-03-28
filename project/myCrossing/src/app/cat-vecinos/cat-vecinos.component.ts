import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IVillager, villagers } from 'animal-crossing';
import { PaginacionService } from 'app/general/services/paginacion.service';
import { VerificationService } from 'app/general/services/verification.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-cat-vecinos',
  templateUrl: './cat-vecinos.component.html',
  styleUrls: ['./cat-vecinos.component.css']
})
export class CatVecinosComponent implements OnInit {

  listaVillagers = new Array<IVillager>();
  shownVillager : IVillager = villagers.filter(i => i.sourceSheet != null)[0];
  hide : Boolean = true;
  filtroAcGen : String = "";
  filtrando : Boolean = false;
  listaUsuario : Array<string>;
  _verif : VerificationService;
  page_number : number = 1;
  max_items : number = 40;
  num_paginas : Array<number>;
  _pag : PaginacionService;
  botonFiltrar : string = "none";
  nameFilter : string = "";
  busqueda = new FormControl("");
  personality = new FormControl("Todos");
  specie = new FormControl("Todos");

  constructor(verif : VerificationService, pag : PaginacionService) {
    this._verif = verif;
    this._pag = pag;
  }

  @HostListener("window:scroll")
  onScroll(){
    this.hide = true;
  }

  ngOnInit() {
    this._verif.verify().then( async () => {
      this.listaVillagers = await villagers.filter(i => i.sourceSheet != null);
      console.log(this.listaVillagers[0]);
      this.busqueda.valueChanges.pipe(debounceTime(300)).subscribe(value => this.filtrar(value));
      this.num_paginas = this.getPaginas(this.listaVillagers);
    });
  }
  filtraGen(genero : string){
    if(this.filtroAcGen==genero){
      this.filtroAcGen="";
    }else{
      this.filtroAcGen = genero;
    }
  }

  mostrar(villager:IVillager){
    this.shownVillager=villager;
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

}
