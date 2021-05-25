import { Pipe, PipeTransform } from '@angular/core';
import { IVillager } from 'animal-crossing';

@Pipe({
  name: 'filtraVecinos'
})
export class FiltraVecinosPipe implements PipeTransform {

  transform(lista: Array<IVillager>, personality : string, specie : string, gender : string): Array<any> {
    if(!lista)  return lista;
    if(personality!=null && personality!="" && personality!="Todos"){
      lista = lista.filter(v=>v.personality==personality);
    }
    if(specie!=null && specie!="" && specie!="Todos"){
      lista = lista.filter(v=>v.species==specie);
    }
    if(gender=='m'){
      lista = lista.filter(v=>v.gender=="Male");
    }else if(gender=='f'){
      lista = lista.filter(v=>v.gender=="Female");
    }
    return lista;
  }
}
