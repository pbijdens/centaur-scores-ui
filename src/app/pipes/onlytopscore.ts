import { Pipe, PipeTransform } from '@angular/core';
import { PersonalBestListEntryModel } from '../models/personal-lest-list-entry-model';

@Pipe({
  name: 'onlytopscore',
  standalone: true
})
export class OnlyTopScorePipe implements PipeTransform {

  transform(value: PersonalBestListEntryModel[], ...args: unknown[]): PersonalBestListEntryModel[] {
    const result: PersonalBestListEntryModel[] = [];
    for (let v of value) {
      if (result.length == 0) result.push(v);
      else if (result[0].score === v.score) result.push(v);
      else break;
    }
    return result;
  }

}
