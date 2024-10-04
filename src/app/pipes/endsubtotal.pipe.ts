import { Pipe, PipeTransform } from '@angular/core';
import { EndModel } from '../models/end-model';

@Pipe({
  name: 'endsubtotal',
  standalone: true
})
export class EndsubtotalPipe implements PipeTransform {

  transform(value: EndModel[], ends: number, ...args: unknown[]): number {
    let score = 0;     
    if (value) {
      while (ends >= 1) {
        value[ends - 1].arrows.forEach(s => score += (s || 0));
        ends--;
      }
    }
    return score;
  }

}
