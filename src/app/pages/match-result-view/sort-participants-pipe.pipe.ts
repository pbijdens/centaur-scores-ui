import { Pipe, PipeTransform } from '@angular/core';
import { ParticipantModel } from '../../models/participant-model';

@Pipe({
  name: 'sortParticipantsPipe',
  standalone: true
})
export class SortParticipantsPipePipe implements PipeTransform {
  // sortOrder can be n or s for name and score
  transform(value: Array<ParticipantModel>, sortOrder: string, ...args: unknown[]): Array<ParticipantModel> {
    if (sortOrder === 'n') {
      return value.sort((a, b) => `${a.name}`.localeCompare(`${b.name}`));
    } else if (sortOrder === 's') {
      return value.sort((a, b) => (1 * b.score) - (1 * a.score));
    }
    else {
      return value.sort((a, b) => `${a.name}`.localeCompare(`${b.name}`));
    }
    return value;
  }

}
