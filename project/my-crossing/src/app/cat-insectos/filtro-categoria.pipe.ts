import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroCategoria'
})
export class FiltroCategoriaPipe implements PipeTransform {

  transform(lista: Array<any>, whereFilter : string, weatherFilter : string): Array<any> {
    if(!lista)  return lista;
    let result : any[] = [];
    if(whereFilter=="" && weatherFilter=="")  return lista;
    if(whereFilter!=""){
      if(whereFilter=="Other"){
        let list : string[] = ["On trees (any kind)", "On palm trees", "On the ground", "Flying near water"
          , "On tree stumps", "Flying", "On rivers/ponds", "On flowers", "On hardwood/cedar trees", "Flying near flowers"];
        result = lista.filter(a => !list.includes(a.whereHow));
      }else{
        result = lista.filter(a => a.whereHow==whereFilter);
      }
    }else{
      result=lista;
    }
    if(weatherFilter!=""){
      result = result.filter(a => a.weather==weatherFilter);
    }
    return result;
  }

}
