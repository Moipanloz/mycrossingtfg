import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IItem, items } from 'animal-crossing';
import { PaginacionService } from 'app/general/services/paginacion.service';
import { VerificationService } from 'app/general/services/verification.service';
import { CatArteService } from './cat-arte.service';
import { debounceTime } from "rxjs/operators";

@Component({
  selector: 'app-cat-arte',
  templateUrl: './cat-arte.component.html',
  styleUrls: ['./cat-arte.component.css']
})
export class CatArteComponent implements OnInit {

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
  _catarte : CatArteService;
  menuFalsificacion : boolean = false;
  menuReal : string = "";
  menuFalso : string = "";

  constructor(verif : VerificationService, pag : PaginacionService, catarte : CatArteService) {
    this._verif = verif;
    this._pag = pag;
    this._catarte = catarte;
  }

  ngOnInit() {
    this._verif.verify().then( async () => {
      if(this._verif.user != null){
        this.listaUsuario = new Array<string>();
        this._catarte.readArte().then(async listaUsuario => {
          for(let i = 0; i < listaUsuario.length; i++){
            this.listaUsuario.push(listaUsuario[i]["nombre_arte"]);
          }

          if(this.botonFiltrar != "none"){
            if(this.botonFiltrar == "obtenido"){
              this.listaItems = await items.filter(i => i.sourceSheet == "Art" && i.genuine == true && this.listaUsuario.includes(i.name.replace(' ','')));
            }else{
              this.listaItems = await items.filter(i => i.sourceSheet == "Art" && i.genuine == true && !this.listaUsuario.includes(i.name.replace(' ','')));
            }
          }else{
            this.listaItems = await items.filter(i => i.sourceSheet == "Art" &&  i.genuine == true);
          }
        });
      }else{
        this.listaItems = await items.filter(i => i.sourceSheet == "Art" &&  i.genuine == true);
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
    let nombreArte : string = item.name.replace(" ", "");
    if(this.listaUsuario.includes(nombreArte)){
      this._catarte.borrarArte(nombreArte).then(() => {
        this.ngOnInit();
      });
    }else{
      this._catarte.addArte(nombreArte).then(() => {
        this.ngOnInit();
      });
    }
  }

  verFalsificacion(e : MouseEvent, item : any){
    this.menuFalsificacion = !this.menuFalsificacion;
    this.menuReal = items.find(f => f.name == item.name && f.genuine == true).image;
    this.menuFalso = items.find(f => f.name == item.name && f.genuine == false).image;
    e.stopPropagation();
  }

  tieneFalsificacion(item : any){
    let res = false;
    if(items.filter(f => f.name == item.name).length == 2){
      res = true;
    }
    return res;
  }
}
