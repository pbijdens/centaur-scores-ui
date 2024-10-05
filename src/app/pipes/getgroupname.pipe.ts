import { Pipe, PipeTransform } from '@angular/core';
import { GroupInfo } from '../models/group-info';

@Pipe({
  name: 'getGroupName',
  standalone: true
})
export class GetGroupNamePipe implements PipeTransform {

  transform(value: string, groups: GroupInfo[], ...args: unknown[]): string {
    const result =  (groups || []).find(x => x.code === value);
    return result?.label || 'Onbekend';
  }

}
