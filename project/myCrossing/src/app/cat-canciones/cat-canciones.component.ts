import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IItem, items } from 'animal-crossing';
import { ErrorService } from 'app/general/services/error.service';
import { PaginacionService } from 'app/general/services/paginacion.service';
import { VerificationService } from 'app/general/services/verification.service';
import { debounceTime } from 'rxjs/operators';
import { CatCancionService } from './cat-cancion.service';

@Component({
  selector: 'app-cat-canciones',
  templateUrl: './cat-canciones.component.html',
  styleUrls: ['./cat-canciones.component.css']
})
export class CatCancionesComponent implements OnInit {

  listaItems = new Array<IItem>();
  listaUsuario : Array<string>;
  _verif : VerificationService;
  page_number : number = 1;
  max_items : number = 40;
  filtroSrc: String = "";
  num_paginas : Array<number>;
  _pag : PaginacionService;
  botonFiltrar : string = "none";
  nameFilter : string = "";
  busqueda = new FormControl("");
  _catCancion : CatCancionService;
  _error : ErrorService;
  playing: boolean = false;
  cancionActual: IItem = items.filter(i=>i.sourceSheet=="Music")[0];

  constructor(verif : VerificationService, pag : PaginacionService, catCancion : CatCancionService, errorService : ErrorService) {
    this._verif = verif;
    this._pag = pag;
    this._catCancion = catCancion;
    this._error = errorService;
  }

  ngOnInit() {

    let lista: Number[] = [];
    items.filter(i => i.sourceSheet == "Music").forEach(i=>{i.sourceNotes.forEach(s=>{
      if(lista[s]==null){
        lista[s]=1;
      }else{
        lista[s]=lista[s]+1;
      }
    })});

    this._verif.verify().then( async () => {
      if(this._verif.user != null){
        this.listaUsuario = new Array<string>();
        this._catCancion.readCancion().then(async listaUsuario => {
          for(let i = 0; i < listaUsuario.length; i++){
            this.listaUsuario.push(listaUsuario[i]["nombre_cancion"]);
          }

          if(this.botonFiltrar != "none"){
            if(this.botonFiltrar == "obtenido"){
              this.listaItems = await items.filter(i => i.sourceSheet == "Music" && this.listaUsuario.includes(i.name.replace(' ','')));
            }else{
              this.listaItems = await items.filter(i => i.sourceSheet == "Music" && !this.listaUsuario.includes(i.name.replace(' ','')));
            }
          }else{
            this.listaItems = await items.filter(i => i.sourceSheet == "Music");
          }
        }).catch(err => {
          this._error.setNewError(err.message);
          setTimeout(() => {this._error.cleanError()}, 3000)
        });
      }else{
        this.listaItems = await items.filter(i => i.sourceSheet == "Music");
      }

      this.busqueda.valueChanges.pipe(debounceTime(300)).subscribe(value => this.filtrar(value));
      this.num_paginas = this.getPaginas(this.listaItems);
    }).catch(err => {
      this._error.setNewError(err.message);
      setTimeout(() => {this._error.cleanError()}, 3000)
    });
  }
  async sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async escucha(cancion: IItem){
    if(cancion!=this.cancionActual){
      this.cancionActual = cancion;
      await this.sleep(50);
      this.playing=true;
      $("#audio").trigger("play");
    }else{
      if(this.playing){
        this.playing=false;
        $("#audio").trigger("pause");
      }else{
        this.playing=true;
        $("#audio").trigger("play");
      }
    }
  }

  activaFiltroSrc(filtro: String){
    if(this.filtroSrc==filtro){
      this.filtroSrc = "";
    }else{
      this.filtroSrc = filtro;
    }
  }

  getAudio(cancion: IItem): String{
    return this._catCancion.findAudio(cancion.translations.spanish);
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
    return Array.from({length: Math.ceil(lista.length / this.max_items)}, (_, i) => i+1)
  }

  toggleCheck(item : any){
    let nombreCancion : string = item.name.replace(" ", "");
    if(this.listaUsuario.includes(nombreCancion)){
      this._catCancion.borrarCancion(nombreCancion).then(() => {
        this.ngOnInit();
      }).catch(err => {
        this._error.setNewError(err.message);
        setTimeout(() => {this._error.cleanError()}, 3000)
      });
    }else{
      this._catCancion.addCancion(nombreCancion).then(() => {
        this.ngOnInit();
      }).catch(err => {
        this._error.setNewError(err.message);
        setTimeout(() => {this._error.cleanError()}, 3000)
      });
    }
  }

}
