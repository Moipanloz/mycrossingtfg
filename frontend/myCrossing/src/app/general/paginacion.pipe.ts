import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paginacion'
})
export class PaginacionPipe implements PipeTransform {

  transform(array: any[], page_number: number): any[] {
    if(!array.length) return [];
    page_number = page_number || 1;
    --page_number;
    //Hay 16 items por pagina
    return array.slice(page_number * 16, (page_number + 1) * 16);
  }

}
