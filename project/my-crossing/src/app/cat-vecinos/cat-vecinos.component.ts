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
  hide : boolean = true;
  filtroAcGen : string = "";
  filtroAcPersonalidad : string = "";
  filtrando : boolean = false;
  listaUsuario : Array<string>;
  _verif : VerificationService;
  page_number : number = 1;
  max_items : number = 40;
  num_paginas : Array<number>;
  _pag : PaginacionService;
  botonFiltrar : string = "none";
  nameFilter : string = "";
  busqueda = new FormControl("");
  specie = new FormControl("Todos");

  constructor(verif : VerificationService, pag : PaginacionService) {
    this._verif = verif;
    this._pag = pag;
  }

  @HostListener("window:scroll")
  onScroll(){
    this.hide = true;
  }

  async ngOnInit() {
    this._verif.verify();
    this.listaVillagers = await villagers.filter(i => i.sourceSheet != null);
    this.busqueda.valueChanges.pipe(debounceTime(300)).subscribe(value => this.filtrar(value));
    this.specie.valueChanges.subscribe(() => {
      this.page_number = 1;
    })
    this.num_paginas = this.getPaginas(this.listaVillagers);
  }
  filtraGen(genero : string){
    if(this.filtroAcGen==genero){
      this.filtroAcGen="";
    }else{
      this.filtroAcGen = genero;
    }
    this.page_number = 1;
  }

  filtraPersonalidad(personalidad : string){
    if(this.filtroAcPersonalidad==personalidad){
      this.filtroAcPersonalidad="";
    }else{
      this.filtroAcPersonalidad = personalidad;
    }
    this.page_number = 1;
  }

  mesToString(value){
    let fecha : string[] = value.split("/");
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    return fecha[1] + " de " + meses[fecha[0]];
  }

  mostrar(e : MouseEvent, villager:IVillager){
    this.shownVillager=villager;
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

}
