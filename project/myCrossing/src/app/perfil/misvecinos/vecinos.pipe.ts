import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vecinos'
})
export class VecinosPipe implements PipeTransform {

  transform(value: string): string {
    let res:string;
    switch(value){
      case 'Male':
        res='Masculino';
        break;
      case 'Female':
        res='Femenino';
        break;
      case 'Bird':
        res='Pájaro';
        break;
      case 'Squirrel':
        res='Ardilla';
        break;
      case 'Pig':
        res='Cerdo';
        break;
      case 'Gorilla':
        res='Gorila';
        break;
      case 'Alligator':
        res='Cocodrilo';
        break;
      case 'Koala':
        res='Koala';
        break;
      case 'Eagle':
        res='Águila';
        break;
      case 'Anteater':
        res='Oso hormiguero';
        break;
      case 'Bull':
        res='Toro';
        break;
      case 'Mouse':
        res='Ratón';
        break;
      case 'Cat':
        res='Gato';
        break;
      case 'Horse':
        res='Caballo';
        break;
      case 'Kangaroo':
        res='Canguro';
        break;
      case 'Wolf':
        res='Lobo';
        break;
      case 'Penguin':
        res='Pingüino';
        break;
      case 'Chicken':
        res='Pollo';
        break;
      case 'Elephant':
        res='Elefante';
        break;
      case 'Sheep':
        res='Oveja';
        break;
      case 'Deer':
        res='Ciervo';
        break;
      case 'Tiger':
        res='Tigre';
        break;
      case 'Cub':
        res='Osito';
        break;
      case 'Dog':
        res='Perro';
        break;
      case 'Bear':
        res='Oso';
        break;
      case 'Hippo':
        res='Hipopótamo';
        break;
      case 'Duck':
        res='Pato';
        break;
      case 'Goat':
        res='Cabra';
        break;
      case 'Ostrich':
        res='Avestrúz';
        break;
      case 'Rabbit':
        res='Conejo';
        break;
      case 'Lion':
        res='León';
        break;
      case 'Frog':
        res='Rana';
        break;
      case 'Monkey':
        res='Mono';
        break;
      case 'Rhino':
        res='Rinoceronte';
        break;
      case 'Octopus':
        res='Pulpo';
        break;
      case 'Cow':
        res='Vaca';
        break;
      case 'Cranky':
        res='Malhumorado';
        break;
      case 'Peppy':
        res='Vivaracha';
        break;
      case 'Big Sister':
        res='Hermana mayor';
        break;
      case 'Lazy':
        res='Perezoso';
        break;
      case 'Normal':
        res='Dulce';
        break;
      case 'Snooty':
        res='Presumida';
        break;
      case 'Jock':
        res='Deportista';
        break;
      case 'Smug':
        res='Altanero';
        break;
      default:
        res=value;
    }
    return res;
  }

}
