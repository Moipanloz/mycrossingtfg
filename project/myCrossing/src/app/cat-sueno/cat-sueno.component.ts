import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IItem, items } from 'animal-crossing';
import { CatSuenoService } from 'app/cat-sueno/cat-sueno.service';
import { Sueno } from 'app/general/interfaces';
import { ErrorService } from 'app/general/services/error.service';
import { PaginacionService } from 'app/general/services/paginacion.service';
import { VerificationService } from 'app/general/services/verification.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-cat-sueno',
  templateUrl: './cat-sueno.component.html',
  styleUrls: ['./cat-sueno.component.css']
})
export class CatSuenoComponent implements OnInit {

  listaItems = new Array<Sueno>();
  suenoUsuario : Sueno;
  _verif : VerificationService;
  page_number : number = 1;
  max_items : number = 40;
  num_paginas : Array<number>;
  _pag : PaginacionService;
  busqueda = new FormControl("");
  _catsueno : CatSuenoService;
  _error : ErrorService;
  nameFilter: string="";

  constructor(verif : VerificationService, pag : PaginacionService, catsueno : CatSuenoService, errorService : ErrorService) {
    this._verif = verif;
    this._pag = pag;
    this._catsueno = catsueno;
    this._error = errorService;
  }

  ngOnInit() {
    this._verif.verify().then( async () => {
      this._catsueno.readSuenos().then(suenos=>{
        this.listaItems = suenos;
        this.listaItems.map(sueno => {
          sueno.foto_seleccionada=0;
          sueno.likes=0;
        });
        this.num_paginas = this.getPaginas(this.listaItems);
        console.log(this.listaItems);
      });
      if(this._verif.user != null){
        this._catsueno.readMiSueno().then(async suenoUsuario => {
          this.suenoUsuario = suenoUsuario;
        }).catch(err => {
          this._error.setNewError(err.message);
          setTimeout(() => {this._error.cleanError()}, 3000)
        });
      }
    }).catch(err => {
      this._error.setNewError(err.message);
      setTimeout(() => {this._error.cleanError()}, 3000)
    });
    this.busqueda.valueChanges.pipe(debounceTime(300)).subscribe(value => this.filtrar(value));
  }
  
  eligeFoto(item: Sueno): string{
    switch(item.foto_seleccionada){
      case 0:
        return item.foto1;
      case 1:
        return item.foto2;
      case 2:
        return item.foto3;
      default:
        return "error";
    }
  }

  filtrar(value){
    this.nameFilter = value;
    this.page_number = 1;
  }

  getImage(sueno : Sueno, sube : boolean){
    if(sueno!=null){
      if(sube){
        if(this.getLenght(sueno)-1==sueno.foto_seleccionada){
          sueno.foto_seleccionada=0;
        }else{
          sueno.foto_seleccionada+=1;
        }
      }else{
        if(sueno.foto_seleccionada==0){
          sueno.foto_seleccionada=this.getLenght(sueno)-1;
        }else{
          sueno.foto_seleccionada-=1;
        }
      }
    }
  }
  getLenght(sueno: Sueno):number{
    let res: number;
    if(sueno.foto2==null || sueno.foto2==""){
      res=1;
    }else if(sueno.foto3==null || sueno.foto3==""){
      res=2;
    }else{
      res=3;
    }
    return res;
  }

  getImageElement(item : IItem){
    return document.getElementById(item.name.replace(" ", ""));
  }

  getPaginas(lista : Array<any>){
    return Array.from({length: Math.ceil(lista.length / this.max_items)}, (_, i) => i+1)
  }

}
