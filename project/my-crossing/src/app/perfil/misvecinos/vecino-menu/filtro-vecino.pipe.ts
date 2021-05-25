import { Pipe, PipeTransform } from '@angular/core';
import { Villager } from 'animal-crossing/lib/types/Villager';

@Pipe({
  name: 'filtroVecino'
})
export class FiltroVecinoPipe implements PipeTransform {

  transform(value: Villager[], texto : string): any[] {
    if(!value) return value;

    return value.filter(vecino => vecino.translations.spanish.toUpperCase().includes(texto.toUpperCase()));
    // Para global cambiar el vecino_id por concatenacion o algo
    // Cambiar mas adelante para que pille
  }


}
