import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paginacion'
})
export class PaginacionPipe implements PipeTransform {

  transform(array: any[], page_number: number, max_items : number): any[] {
    if(!array.length) return [];
    page_number = page_number || 1;
    --page_number;
    return array.slice(page_number * max_items, (page_number + 1) * max_items);
  }

}
