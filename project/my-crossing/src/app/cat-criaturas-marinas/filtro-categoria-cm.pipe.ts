import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroCategoriaCm'
})
export class FiltroCategoriaCmPipe implements PipeTransform {

  transform(lista: Array<any>, shadowFilter : string, speedFilter : string): Array<any> {
    if(!lista)  return lista;
    let result : any[] = [];
    if(shadowFilter == "" && speedFilter == "") return lista;
    if(shadowFilter!="" && speedFilter!=""){
      result = lista.filter(a => a.shadow==shadowFilter && a.movementSpeed==speedFilter);
    }else if(shadowFilter != ""){
      result = lista.filter(a => a.shadow==shadowFilter);
    }else{
      result = lista.filter(a => a.movementSpeed==speedFilter);
    }
    return result;
  }

}
