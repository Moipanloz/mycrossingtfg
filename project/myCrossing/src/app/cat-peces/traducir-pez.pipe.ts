import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'traducirPez'
})
export class TraducirPezPipe implements PipeTransform {

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
      case "Sea":
        result="Mar";
        break;
      case "River":
        result="Río";
        break;
      case "Pier":
        result="Muelle";
        break;
      case "Pond":
        result="Estanque";
        break;
      case "River (clifftop)":
        result="Río (alto)";
        break;
      case "Sea (rainy days)":
        result="Mar (días de lluvia)";
        break;
      case "River (mouth)":
        result="Río (desembocadura)";
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
