import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroSuenos'
})
export class FiltroSuenosPipe implements PipeTransform {

  transform(lista: Array<any>, nameFilter : string): Array<any> {
    if(!lista) return lista;
    return lista.filter(a => a.isla.toUpperCase().includes(nameFilter.toUpperCase()));
  }

}
