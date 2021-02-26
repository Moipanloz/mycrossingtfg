import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroVecino'
})
export class FiltroVecinoPipe implements PipeTransform {

  transform(value: any[], texto : string): any[] {
    if(!value) return value;

    return value.filter(vecino => vecino.nombre.toUpperCase().includes(texto.toUpperCase()));
    // Para global cambiar el vecino_id por concatenacion o algo
    // Cambiar mas adelante para que pille
  }


}
