import { Pipe, PipeTransform } from '@angular/core';
import { IItem } from 'animal-crossing';

@Pipe({
  name: 'filtroSrc'
})
export class FiltroSrcPipe implements PipeTransform {

  transform(lista: Array<IItem>, filtroSrc : string): Array<any> {
    if(!lista || filtroSrc=="")  return lista;
    let result : IItem[] = [];
    filtroSrc = this.traduceFiltro(filtroSrc);
    if(filtroSrc=="other"){
      result = lista.filter(c=>!c.sourceNotes.includes("Possible song K.K. will play when choosing \"A little blue...\" as your mood")
      && !c.sourceNotes.includes("Possible song K.K. will play when choosing \"A little grumpy...\" as your mood")
      && !c.sourceNotes.includes("Possible song K.K. will play when choosing \"I feel good!\" as your mood")
      && !c.sourceNotes.includes("Possible song K.K. will play when choosing \"It's hard to say.\" as your mood")
      && !c.sourceNotes.includes("Possible song K.K. will play when choosing \"Laid-back.\" as your mood"));
    }else{
      result = lista.filter(c=>c.sourceNotes.includes(filtroSrc));
    }
    return result;
  }

  traduceFiltro(filtro: string): string{
    switch(filtro){
      case "blue":
        return "Possible song K.K. will play when choosing \"A little blue...\" as your mood";
      case "grumpy":
        return "Possible song K.K. will play when choosing \"A little grumpy...\" as your mood";
      case "good":
        return "Possible song K.K. will play when choosing \"I feel good!\" as your mood";
      case "hard":
        return "Possible song K.K. will play when choosing \"It's hard to say.\" as your mood";
      case "back":
        return "Possible song K.K. will play when choosing \"Laid-back.\" as your mood";
      default:
        return "other";
    }
  }

}
