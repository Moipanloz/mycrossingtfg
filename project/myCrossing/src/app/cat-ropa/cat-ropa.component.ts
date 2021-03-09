import { PaginacionService } from './../general/paginacion.service';
import { VerificationService } from './../general/verification.service';
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
  num_paginas : Array<number> = new Array<number>()//Array(this.listaItems.length / this.max_items).fill().map((x,i) => i)//TODO ROUND PIPE
  _pag : PaginacionService;

  nameFilter : string = "";
  busqueda = new FormControl("");

  constructor(verif : VerificationService, pag : PaginacionService) {
    this._verif = verif;
    this._pag = pag;
  }

  ngOnInit() {
    this._verif.verify().then( async () => {
      this.listaItems = await items.filter(i => i.sourceSheet == "Accessories" || i.sourceSheet == "Tops" ||
      i.sourceSheet == "Headwear" || i.sourceSheet == "Socks" || i.sourceSheet == "Dress-Up" || i.sourceSheet == "Bags" ||
      i.sourceSheet == "Shoes" || i.sourceSheet == "Umbrellas" || i.sourceSheet == "Bottoms" || i.sourceSheet == "Clothing Other");

      this.busqueda.valueChanges.pipe(debounceTime(300)).subscribe(value => this.filtrar(value));
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
  }

}
