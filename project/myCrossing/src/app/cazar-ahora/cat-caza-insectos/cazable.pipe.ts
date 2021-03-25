import { Pipe, PipeTransform } from '@angular/core';
import { ICreature } from 'animal-crossing';

@Pipe({
  name: 'cazable'
})
export class CazablePipe implements PipeTransform {

  transform(lista: Array<ICreature>, isNorth:boolean, mes:number, hora:number): Array<any> {
    if(!lista)  return lista;
    let list2 : ICreature[] = [];
    lista.forEach(c=>{
      if(isNorth){
        if(mes < 1 || mes > 13 || c.hemispheres.north.monthsArray.includes(mes)){
          if(hora < 0 || hora > 23 || c.hemispheres.north.timeArray.includes(hora)){
            list2.push(c);
          }
        }
      }else{
        if(mes < 1 || mes > 13 || c.hemispheres.south.monthsArray.includes(mes)){
          if(hora < 0 || hora > 23 || c.hemispheres.south.timeArray.includes(hora)){
            list2.push(c);
          }
        }
      }
    })
  return list2;
  }

}

