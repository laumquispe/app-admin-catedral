import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightSearch'
})
export class HighlightSearchPipe implements PipeTransform {

  transform(value: string, search: string): string {
    const valueStr = value + ''; // Ensure numeric values are converted to strings
    if(search.length > 0){
      return valueStr.replace(new RegExp('(?![^&;]+;)(?!<[^<>]*)(' + search + ')(?![^<>]*>)(?![^&;]+;)', 'gi'), '<span class="highlightable">$1</span>');
    }
    return value;
  }

}