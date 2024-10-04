import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'createarray',
  standalone: true
})
export class CreatearrayPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): number[] {
    const result: number[] = [];
    for (let i = 0; i < value; i++) {
      result.push(i + 1);
    }
    return result;
  }

}
