import { Pipe, PipeTransform } from '@angular/core';
import { EndModel } from './models/end-model';

@Pipe({
  name: 'endscore',
  standalone: true
})
export class EndscorePipe implements PipeTransform {

  transform(value: EndModel, ...args: unknown[]): number {
    let score = 0; 
    if (value) {
      value.arrows.forEach(s => score += (s || 0));
    }
    return score;
  }

}
