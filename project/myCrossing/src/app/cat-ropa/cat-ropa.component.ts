import { PaginacionService } from './../general/services/paginacion.service';
import { VerificationService } from './../general/services/verification.service';
import { IItem, items } from 'animal-crossing';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from "rxjs/operators";

@Component({
  selector: 'app-cat-ropa',
  templateUrl: './cat-ropa.component.html',
  styleUrls: ['./cat-ropa.component.css']
})
export class CatRopaComponent implements OnInit {

  listaItems = new Array<IItem>();
  _verif : VerificationService;
  page_number : number = 1;
  max_items : number = 40;
  num_paginas : Array<number>;
  _pag : PaginacionService;
  botonFiltrar : string = "none";
  tiposPrenda : Map<string, string> = new Map([
    ["Headwear","Cabeza"],
    ["Accessories","Accesorios"],
    ["Tops","Partes arriba"],
    ["Bottoms","Partes abajo"],
    ["Dress-Up","Vestidos"],
    ["Socks","Calcetines"],
    ["Shoes","Zapatos"],
    ["Bags","Mochilas"],
    ["Umbrellas","Paraguas"],
    ["Clothing Other","Otros"]
  ]);
  nameFilter : string = "";
  busqueda = new FormControl("");

  constructor(verif : VerificationService, pag : PaginacionService) {
    this._verif = verif;
    this._pag = pag;
  }

  ngOnInit() {
    this._verif.verify().then( async () => {
      if(this.botonFiltrar == "none"){
        this.listaItems = await items.filter(i => i.sourceSheet == "Accessories" || i.sourceSheet == "Tops" ||
        i.sourceSheet == "Headwear" || i.sourceSheet == "Socks" || i.sourceSheet == "Dress-Up" || i.sourceSheet == "Bags" ||
        i.sourceSheet == "Shoes" || i.sourceSheet == "Umbrellas" || i.sourceSheet == "Bottoms" || i.sourceSheet == "Clothing Other");
      }else{
        this.listaItems = await items.filter(i => i.sourceSheet == this.botonFiltrar);
      }
      this.busqueda.valueChanges.pipe(debounceTime(300)).subscribe(value => this.filtrar(value));

      this.num_paginas = this.getPaginas(this.listaItems);
    });
  }

  getImage(item : IItem, varNum : number){
    let res : string;
    if(item.variations == null){
      res = item.storageImage;
    }else{
      res = item.variations[varNum].storageImage;
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
}
