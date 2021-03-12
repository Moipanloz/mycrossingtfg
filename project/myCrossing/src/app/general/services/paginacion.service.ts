import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginacionService {

  constructor() { }

  pagAlante(pag_number : number, max_items : number, lista : Array<any>) : number{
    pag_number * max_items < lista.length ? ++pag_number : "";
    return pag_number;
  }

  pagAtras(pag_number : number) : number{
    pag_number > 1 ? --pag_number : "";
    return pag_number;
  }

  checkSigPagFiltrado(){

  }

}
