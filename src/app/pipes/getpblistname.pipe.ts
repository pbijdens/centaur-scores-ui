import { Pipe, PipeTransform } from '@angular/core';
import { PersonalBestListModel } from '../models/personal-best-list-model';

@Pipe({
  name: 'getPbListName',
  standalone: true
})
export class GetPbListName implements PipeTransform {

  transform(value: number, groups: PersonalBestListModel[], ...args: unknown[]): string {
    const result =  (groups || []).find(x => x.id === value);
    return result?.name || 'Onbekend';
  }

}
