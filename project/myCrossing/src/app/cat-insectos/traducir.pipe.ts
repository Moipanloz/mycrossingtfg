import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'traducir'
})
export class TraducirPipe implements PipeTransform {

  transform(value: string): string {
    if(!value)  return value;
    let result : string = null;
    switch(value){
      case "Any weather":
        result="Cualquier clima";
        break;
      case "Any except rain":
        result="Cualquier clima menos lluvia";
        break;
      case "Rain only":
        result="Solo durante lluvia";
        break;
      case "On trees (any kind)":
        result="Sobre árboles (cualquier tipo)";
        break;
      case "Flying near flowers":
        result="Volando cerca de flores";
        break;
      case "On rotten turnips or candy":
        result="Sobre nabos podridos o chuches";
        break;
      case "Shaking trees (hardwood or cedar only)":
        result="Sacudiendo arboles (hardwood o cedar)";
        break;
      case "Flying near water":
        result="Volando cerca del agua";
        break;
      case "On the ground":
        result="En el suelo";
        break;
      case "On palm trees":
        result="Sobre palmeras";
        break;
      case "On hardwood/cedar trees":
        result="Sobre árboles hardwood o cedar";
        break;
      case "From hitting rocks":
        result="Golpeando rocas";
        break;
      case "On tree stumps":
        result="Sobre tocones";
        break;
      case "Flying":
        result="Volando";
        break;
      case "On rivers/ponds":
        result="Sobre ríos o estanques";
        break;
      case "Pushing snowballs":
        result="Empujando bolas de nieve";
        break;
      case "On villagers":
        result="Sobre aldeanos";
        break;
      case "Flying near trash (boots, tires, cans, used fountain fireworks) or rotten turnips":
        result="Volando cerca de basura o nabos podridos";
        break;
      case "Disguised on shoreline":
        result="Camuflado a la orilla del mar";
        break;
      case "On flowers":
        result="Sobre flores";
        break;
      case "Underground (dig where noise is loudest)":
        result="Bajo tierra (cava donde más se escuche)";
        break;
      case "Flying near light sources":
        result="Volando cerca de luces";
        break;
      case "On white flowers":
        result="Sobre flores blancas";
        break;
      case "Flying near blue/purple/black flowers":
        result="Volando cerca de flores azules, moradas o negras";
        break;
      case "On rocks/bushes":
        result="Sobre rocas o arbustos";
        break;
      case "Disguised under trees":
        result="Camuflado bajo árboles";
        break;
      case "Shaking trees":
        result="Sacudiendo árboles";
        break;
      case "On beach rocks":
        result="Sobre rocas en la playa";
        break;
      default:
        result="value";
    }
    return result;
  }

}
