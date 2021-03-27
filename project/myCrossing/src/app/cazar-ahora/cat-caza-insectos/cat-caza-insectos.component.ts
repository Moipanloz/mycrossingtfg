import { CatInsectosService } from '../../cat-insectos/cat-insectos.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ICreature, creatures } from 'animal-crossing';
import { PaginacionService } from 'app/general/services/paginacion.service';
import { VerificationService } from 'app/general/services/verification.service';
import { debounceTime } from "rxjs/operators";
import { ComunicacionService } from 'app/general/services/comunicacion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cat-caza-insectos',
  templateUrl: './cat-caza-insectos.component.html',
  styleUrls: ['./cat-caza-insectos.component.css']
})
export class CatCazaInsectosComponent implements OnInit {

  @HostListener("window:scroll")
  onScroll(){
    this.hide=true;
    this.isNorth = this.HEMISFERIO=="NORTE";
  }

  HEMISFERIO : string = "";
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

  constructor(private router : Router, verif : VerificationService, pag : PaginacionService, catbicho : CatInsectosService, comunicacion : ComunicacionService) {
    this._verif = verif;
    this._pag = pag;
    this._catbicho = catbicho;
    this._comunicacion = comunicacion;
  }

  ngOnInit() {
    let aux = this._comunicacion.buscaDato("hora");
    if(aux!=null){
      this.hora.setValue(Number.parseInt(aux.substring(5,aux.length-1)));
      this._comunicacion.eliminaDato("hora");
    }
    aux = this._comunicacion.buscaDato("mes");
    if(aux!=null){
      this.mes.setValue(Number.parseInt(aux.substring(4,aux.length-1)));
      this._comunicacion.eliminaDato("mes");
    }
    this.filtrando=this._comunicacion.buscaDato("filtrando")!=null;
    this.botonFiltrar=(this._comunicacion.buscaDato("obtenido")!=null)?"obtenido":((this._comunicacion.buscaDato("falta")!=null)?"falta":"none");
    this._verif.verify().then( async () => {
      if(this._verif.user != null){
        this.HEMISFERIO = this._verif.hemisferio;
        this.isNorth = this.HEMISFERIO == "NORTE";
        this.checkMesesYHora();        this.listaUsuario = new Array<string>();
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
      this.hora.valueChanges.pipe(debounceTime(150)).subscribe(v=>{if(v<0){this.hora.setValue(23)}else if(v>23){this.hora.setValue(0)}});
      this.num_paginas = this.getPaginas(this.listaCreatures);
    });
    this.filtrando=this._comunicacion.buscaDato("filtrando")!=null;
  }
  cambiaSer(ser : string){
    if(ser!="insectos"){
      this._comunicacion.datos.push("hora(" + this.hora.value + ")");
      this._comunicacion.datos.push("mes(" + this.mes.value + ")");
    }
    switch(ser){
      case "insectos":
        break;
      case "peces":
        this.router.navigate(['/cat-caza-peces']);
        break;
      case "criaturasMarinas":
        this.router.navigate(['/cat-caza-criaturas-marinas']);
        break;
    }
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

  volverFechaActual(){
    let date = new Date();
    this.mes.setValue(date.getMonth()+1);
    this.hora.setValue(date.getHours());
    this.page_number=1;
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

  mostrar(e : MouseEvent, creature:ICreature){
    this.shownCreature=creature;
    this.isNorth = this.HEMISFERIO == "NORTE";
    this.checkMesesYHora();
    this.hide=false;
    e.stopPropagation();
  }

  filtrar(value){
    this.nameFilter = value;
    this.page_number = 1;
  }

  cierraMenu(){
    if(!this.hide){
      this.hide = true;
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
