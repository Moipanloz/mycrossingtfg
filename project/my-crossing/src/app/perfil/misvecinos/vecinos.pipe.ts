import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vecinos'
})
export class VecinosPipe implements PipeTransform {

  transform(value: any, categoria: string): string {
    let res:string = value;
    switch(categoria){
      case 'gender':
        res = (value=='Male') ? 'Masculino' : 'Femenino';
        break;
      case 'specie':
        switch(value){
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
        }
        break;
      case 'personality':
        switch(value){
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
        }
        break;
        case 'color':
        case 'style':
          let aux : string[] = [];
          aux.push(traduceLista(value[0], categoria));
          aux.push(traduceLista(value[1], categoria));
          res=aux[0];
          if(aux[0]!=aux[1])  res+=", " + aux[1];
    }
    return res;
  }
}
function traduceLista(value:string, categoria: string){
  let res:string=value;
  if(categoria=='color'){
    switch(value){
      case 'Aqua':
        res='Agua';
        break;
      case 'Beige':
        res='Beige';
        break;
      case 'Black':
        res='Negro';
        break;
      case 'Blue':
        res='Azul';
        break;
      case 'Brown':
        res='Marron';
        break;
      case 'Colorful':
        res='Multicolor';
        break;
      case 'Gray':
        res='Gris';
        break;
      case 'Green':
        res='Verde';
        break;
      case 'Orange':
        res='Naranja';
        break;
      case 'Pink':
        res='Rosa';
        break;
      case 'Purple':
        res='Morado';
        break;
      case 'Red':
        res='Rojo';
        break;
      case 'White':
        res='Blanco';
        break;
      case 'Yellow':
        res='Amarillo';
        break;
    }
  }else{
    switch(value){
      case 'Active':
        res='Deportivo';
        break;
      case 'Cool':
        res='Guay';
        break;
      case 'Cute':
        res='Lindo';
        break;
      case 'Elegant':
        res='Elegante';
        break;
      case 'Gorgeous':
        res='Extravagante';
        break;
      case 'Simple':
        res='Simple';
        break;
    }
  }
  return res;
}