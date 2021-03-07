import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'round'
})
export class RoundPipe implements PipeTransform {

  transform(number: number, metodo: string): unknown {
    if(!number) return 0;
    let res : number = 0;
    if(metodo == "techo"){
      res = Math.ceil(number);
    }else if(metodo == "suelo"){
      res = Math.floor(number);
    }
    return res;
  }

}
