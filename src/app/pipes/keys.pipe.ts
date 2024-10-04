import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keys',
  standalone: true
})
export class KeysPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): string[] {
    let keys = [];
    for (let key in value) {
      keys.push(key);
    }
    return keys;
    }

}
