import { CatInsectosService } from '../../cat-insectos/cat-insectos.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ICreature, creatures } from 'animal-crossing';
import { PaginacionService } from 'app/general/services/paginacion.service';
import { VerificationService } from 'app/general/services/verification.service';
import { debounceTime } from "rxjs/operators";
import { ComunicacionService } from 'app/general/services/comunicacion.service';

@Component({
  selector: 'app-cat-caza-insectos',
  templateUrl: './cat-caza-insectos.component.html',
  styleUrls: ['./cat-caza-insectos.component.css']
})
export class CatCazaInsectosComponent implements OnInit {

  @HostListener("window:scroll")
  onScroll(){
    this.hide=true;
  }

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
  hora = new FormControl((new Date).getHours());
  mes = new FormControl((new Date).getMonth()+1);
  hola = this.mes.value
  _catbicho : CatInsectosService;
  _comunicacion : ComunicacionService;

  constructor(verif : VerificationService, pag : PaginacionService, catbicho : CatInsectosService, comunicacion : ComunicacionService) {
    this._verif = verif;
    this._pag = pag;
    this._catbicho = catbicho;
    this._comunicacion = comunicacion;
  }

  ngOnInit() {
    if(this._comunicacion["hora"]!=null && this._comunicacion["hora"]!=""){
      this.hora.setValue(this._comunicacion["hora"]);
    }
    if(this._comunicacion["mes"]!=null && this._comunicacion["hora"]!=null){
      this.mes.setValue(this._comunicacion["mes"]);
    }
    this.filtrando=this._comunicacion.buscaDato("filtrando")!=null;
    this.botonFiltrar=(this._comunicacion.buscaDato("obtenido")!=null)?"obtenido":((this._comunicacion.buscaDato("falta")!=null)?"falta":"none");
    this._verif.verify().then( async () => {
      if(this._verif.user != null){
        this.isNorth = this._verif.hemisferio=="NORTE";
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
      this.hora.valueChanges.pipe(debounceTime(300)).subscribe(value =>{this._comunicacion.datos["hora"]=this.hora.value});
      this.hora.valueChanges.pipe(debounceTime(300)).subscribe(value =>{this._comunicacion.datos["mes"]=this.mes.value});
      this.num_paginas = this.getPaginas(this.listaCreatures);
    });
    this.filtrando=this._comunicacion.buscaDato("filtrando")!=null;
  }
  toggleFiltrando(){
    this.filtrando=!this.filtrando;
    if(this.filtrando){
      this._comunicacion.datos.push("filtrando")
    }else{
      this._comunicacion.eliminaDato("filtrando");
    }
  }
  filtraWhe(filtro : string){
    this.page_number=1;
    if(this.filtroAcWhe==filtro){
      this.filtroAcWhe="";
    }else{
      this.filtroAcWhe=filtro;
    }
  }
  toggleHemisphere(){
    this.isNorth=!this.isNorth;
    this.page_number=1;
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
      this._comunicacion.eliminaDato(key);
    }else{
      this._comunicacion.eliminaDato(this.botonFiltrar);
      this._comunicacion.datos.push(key);
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
