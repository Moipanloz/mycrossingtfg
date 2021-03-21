import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'traducirCm'
})
export class TraducirCmPipe implements PipeTransform {

  transform(value: string): string {
    if(!value)  return value;
    let result : string = null;
    if(value[0]=="All day") return "Todo el día";
    switch(value){
      case "XX-Large":
        result="Gigante";
        break;
      case "Small":
        result="Pequeña";
        break;
      case "Large":
        result="Grande";
        break;
      case "Medium":
        result="Mediana";
        break;
      case "X-Small":
        result="Diminuta";
        break;
      case "X-Large":
        result="Muy grande";
        break;
      case "X-Large w/Fin":
        result="Muy grande con aleta";
        break;
      case "Long":
        result="Alargada";
        break;
      case "All day":
        result="Todo el día";
        break;
      default:
        result=value;
    }
    return result;
  }

}
