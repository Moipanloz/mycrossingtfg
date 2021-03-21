import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroCategoriaCm'
})
export class FiltroCategoriaCmPipe implements PipeTransform {

  transform(lista: Array<any>, shadowFilter : string): Array<any> {
    if(!lista)  return lista;
    let result : any[] = [];
    if(shadowFilter!=""){
      result = lista.filter(a => a.shadow==shadowFilter);
    }else{
      return lista;
    }
    return result;
  }

}
