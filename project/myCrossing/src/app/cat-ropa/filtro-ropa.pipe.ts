import { Pipe, PipeTransform } from '@angular/core';
import { IItem } from 'animal-crossing';

@Pipe({
  name: 'filtroRopa'
})
export class FiltroRopaPipe implements PipeTransform {

  transform(lista: Array<IItem>, nameFilter : string): Array<IItem> {
    if(!lista) return lista;
    return lista.filter(ropa => ropa.translations.spanish.toUpperCase().includes(nameFilter.toUpperCase()));
  }

}
