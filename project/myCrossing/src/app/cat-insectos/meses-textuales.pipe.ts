import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mesesTextuales'
})
export class MesesTextualesPipe implements PipeTransform {

  transform(value: string): string {
    if(!value) return value;
    let lista : string[] = value.toString().split(',');
    let result : string = "";
    for(let mes of lista){
      switch(mes){
        case '1':
          result += 'Enero, ';
          break;
        case '2':
          result += 'Febrero, ';
          break;
        case '3':
          result += 'Marzo, ';
          break;
        case '4':
          result += 'Abril, ';
          break;
        case '5':
          result += 'Mayo, ';
          break;
        case '6':
          result += 'Junio, ';
          break;
        case '7':
          result += 'Julio, ';
          break;
        case '8':
          result += 'Agosto, ';
          break;
        case '9':
          result += 'Septiembre, ';
          break;
        case '10':
          result += 'Octubre, ';
          break;
        case '11':
          result += 'Noviembre, ';
          break;
        case '12':
          result += 'Diciembre, ';
          break;
      }
    }
    return result.substring(0, result.length-2);
  }

}
