import { Pipe, PipeTransform } from '@angular/core';
import { Sueno } from 'app/general/interfaces';

@Pipe({
  name: 'filtroLikes'
})
export class FiltroLikesPipe implements PipeTransform {

  transform(lista: Array<Sueno>, filtroLikes : boolean, misLikes: String[]): Array<any> {
    if(!lista || !filtroLikes) return lista;
    return lista.filter(s=> misLikes.includes(s.codigo_sueno));
  }

}
