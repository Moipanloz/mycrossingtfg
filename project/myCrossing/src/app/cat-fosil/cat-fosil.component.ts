import { CatFosilService } from './cat-fosil.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IItem, items } from 'animal-crossing';
import { PaginacionService } from 'app/general/services/paginacion.service';
import { VerificationService } from 'app/general/services/verification.service';
import { debounceTime } from "rxjs/operators";

@Component({
  selector: 'app-cat-fosil',
  templateUrl: './cat-fosil.component.html',
  styleUrls: ['./cat-fosil.component.css']
})
export class CatFosilComponent implements OnInit {

  listaItems = new Array<IItem>();
  listaUsuario : Array<string>;
  _verif : VerificationService;
  page_number : number = 1;
  max_items : number = 40;
  num_paginas : Array<number>;
  _pag : PaginacionService;
  botonFiltrar : string = "none";
  nameFilter : string = "";
  busqueda = new FormControl("");
  _catfosil : CatFosilService;

  constructor(verif : VerificationService, pag : PaginacionService, catfosil : CatFosilService) {
    this._verif = verif;
    this._pag = pag;
    this._catfosil = catfosil;
  }

  ngOnInit() {
    this._verif.verify().then( async () => {
      if(this._verif.user != null){
        this.listaUsuario = new Array<string>();
        this._catfosil.readFosil().then(async listaUsuario => {
          for(let i = 0; i < listaUsuario.length; i++){
            this.listaUsuario.push(listaUsuario[i]["nombre_fosil"]);
          }

          if(this.botonFiltrar != "none"){
            if(this.botonFiltrar == "obtenido"){
              this.listaItems = await items.filter(i => i.sourceSheet == "Fossils" && this.listaUsuario.includes(i.name.replace(' ','')));
            }else{
              this.listaItems = await items.filter(i => i.sourceSheet == "Fossils" && !this.listaUsuario.includes(i.name.replace(' ','')));
            }
          }else{
            this.listaItems = await items.filter(i => i.sourceSheet == "Fossils");
          }
        });
      }else{
        this.listaItems = await items.filter(i => i.sourceSheet == "Fossils");
      }

      this.busqueda.valueChanges.pipe(debounceTime(300)).subscribe(value => this.filtrar(value));
      this.num_paginas = this.getPaginas(this.listaItems);
    });
  }

  getImage(item : IItem, varNum : number){
    let res : string;
    if(item.variations != null){
      res = item.variations[varNum].image;
    }else if(item.image == null || item.image == undefined){
      res = item.storageImage;
    }else{
      res = item.image;
    }
    return res;
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

  getImgVariation(item : IItem, varNum : number){
    let img = this.getImageElement(item);
    img.setAttribute("src", this.getImage(item, varNum));
  }

  getImageElement(item : IItem){
    return document.getElementById(item.name.replace(" ", ""));
  }

  getPaginas(lista : Array<any>){
    return Array.from({length: Math.ceil(lista.length / this.max_items)}, (_, i) => i+1)
  }

  toggleCheck(item : any){
    let nombreFosil : string = item.name.replace(" ", "");
    if(this.listaUsuario.includes(nombreFosil)){
      this._catfosil.borrarFosil(nombreFosil).then(() => {
        this.ngOnInit();
      });
    }else{
      this._catfosil.addFosil(nombreFosil).then(() => {
        this.ngOnInit();
      });
    }
  }

}
