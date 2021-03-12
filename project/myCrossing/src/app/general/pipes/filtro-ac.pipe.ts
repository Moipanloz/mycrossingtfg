import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroAc'
})
export class FiltroAcPipe implements PipeTransform {

  transform(lista: Array<any>, nameFilter : string): Array<any> {
    if(!lista) return lista;
    return lista.filter(a => a.translations.spanish.toUpperCase().includes(nameFilter.toUpperCase()));
  }

}
