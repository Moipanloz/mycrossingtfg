import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ICreature, creatures } from 'animal-crossing';
import { CriaturasMarinasService } from 'app/cat-criaturas-marinas/criaturas-marinas.service';
import { ComunicacionService } from 'app/general/services/comunicacion.service';
import { PaginacionService } from 'app/general/services/paginacion.service';
import { VerificationService } from 'app/general/services/verification.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-cat-caza-criaturas-marinas',
  templateUrl: './cat-caza-criaturas-marinas.component.html',
  styleUrls: ['./cat-caza-criaturas-marinas.component.css']
})
export class CatCazaCriaturasMarinasComponent implements OnInit {

  @HostListener("window:scroll")
  onScroll(){
    this.hide=true;
  }

  listaCreatures = new Array<ICreature>();
  shownCreature : ICreature = creatures.filter(i => i.sourceSheet == "Fish")[0];
  hide : Boolean = true;
  isNorth : Boolean = true;
  filtrando : Boolean = false;
  filtroAcShadow : string="";
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
  _comunicacion : ComunicacionService;
  hora = new FormControl((new Date).getHours());
  mes = new FormControl((new Date).getMonth()+1);

  constructor(verif : VerificationService, pag : PaginacionService, catcm : CriaturasMarinasService, comunicacion : ComunicacionService) {
    this._verif = verif;
    this._pag = pag;
    this._catcm = catcm;
    this._comunicacion = comunicacion;
  }

  ngOnInit() {
    if(this._comunicacion["hora"]!=null && this._comunicacion["hora"]!=""){
      this.hora.setValue(this._comunicacion["hora"]);
    }
    if(this._comunicacion["mes"]!=null && this._comunicacion["hora"]!=null){
      this.mes.setValue(this._comunicacion["mes"]);
    }
    this._comunicacion.eliminaDato("activo");
    this._comunicacion.datos.push("activo");
    this.filtrando=this._comunicacion.buscaDato("filtrando")!=null;
    this.botonFiltrar=(this._comunicacion.buscaDato("obtenido")!=null)?"obtenido":((this._comunicacion.buscaDato("falta")!=null)?"falta":"none");
    this._verif.verify().then( async () => {
      if(this._verif.user != null){
        this.isNorth = this._verif.hemisferio=="NORTE";
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
      this.hora.valueChanges.pipe(debounceTime(300)).subscribe(value =>{this._comunicacion.datos["hora"]=this.hora.value});
      this.hora.valueChanges.pipe(debounceTime(300)).subscribe(value =>{this._comunicacion.datos["mes"]=this.mes.value});
      this.num_paginas = this.getPaginas(this.listaCreatures);
    });
    this.filtrando=this._comunicacion.buscaDato("filtrando")!=null;
    this._comunicacion.activar=true;
  }
  
  toggleFiltrando(){
    this.filtrando=!this.filtrando;
    if(this.filtrando){
      this._comunicacion.datos.push("filtrando")
    }else{
      this._comunicacion.eliminaDato("filtrando");
    }
  }
  toggleHemisphere(){
    this.isNorth=!this.isNorth;
    this.page_number=1;
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
