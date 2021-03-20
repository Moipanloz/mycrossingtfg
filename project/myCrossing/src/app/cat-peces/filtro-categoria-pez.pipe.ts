import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroCategoriaPez'
})
export class FiltroCategoriaPezPipe implements PipeTransform {

  transform(lista: Array<any>, whereFilter : string, shadowFilter : string): Array<any> {
    if(!lista)  return lista;
    let result : any[] = [];
    if(whereFilter=="" && shadowFilter=="")  return lista;
    if(whereFilter!=""){
      if(whereFilter=="River"){
        let list : string[] = ["River", "River (clifftop)", "River (mouth)"];
        result = lista.filter(a => list.includes(a.whereHow));
      }else if(whereFilter=="Sea"){
        let list2 : string[] = ["Sea", "Sea (rainy days)"];
        result = lista.filter(a => list2.includes(a.whereHow));
      }else{
        result = lista.filter(a => a.whereHow==whereFilter);
      }
    }else{
      result=lista;
    }
    if(shadowFilter!=""){
      result = result.filter(a => a.shadow==shadowFilter);
    }
    return result;
  }

}
