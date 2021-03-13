import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IItem, items } from 'animal-crossing';
import { PaginacionService } from 'app/general/services/paginacion.service';
import { VerificationService } from 'app/general/services/verification.service';
import { debounceTime } from "rxjs/operators";

@Component({
  selector: 'app-cat-mueble',
  templateUrl: './cat-mueble.component.html',
  styleUrls: ['./cat-mueble.component.css']
})
export class CatMuebleComponent implements OnInit {

  listaItems = new Array<IItem>();
  _verif : VerificationService;
  page_number : number = 1;
  max_items : number = 40;
  num_paginas : Array<number>;
  _pag : PaginacionService;
  botonFiltrar : string = "none";
  tiposMueble : Map<string, string> = new Map([
    ["Miscellaneous","Misc."],
    ["Housewares","Muebles"],
    ["Photos","Fotos"],
    ["Posters","Posters"],
    ["Rugs","Alfombras"],
    ["Fencing","Vallas"],
    ["Floors","Suelos"],
    ["Wall-mounted","Muebles de pared"],
    ["Wallpaper","Papel de pared"]
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
        this.listaItems = await items.filter(i => i.sourceSheet == "Miscellaneous" || i.sourceSheet == "Housewares" ||
        i.sourceSheet == "Photos" || i.sourceSheet == "Posters" || i.sourceSheet == "Rugs" || i.sourceSheet == "Fencing" ||
        i.sourceSheet == "Floors" || i.sourceSheet == "Wall-mounted" || i.sourceSheet == "Wallpaper");
      }else{
        this.listaItems = await items.filter(i => i.sourceSheet == this.botonFiltrar);
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

}
