import { Pipe, PipeTransform } from '@angular/core';
import { GroupInfo } from '../models/group-info';
import { CompetitionModel } from '../models/competition-model';

@Pipe({
  name: 'getCompetitionName',
  standalone: true
})
export class GetCompetitionNamePipe implements PipeTransform {

  transform(value: number, competitions: CompetitionModel[], ...args: unknown[]): string {
    const result =  (competitions || []).find(x => x.id === value);
    return result?.name || 'Onbekend';
  }

}
