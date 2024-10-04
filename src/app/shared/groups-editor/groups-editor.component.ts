import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { KeysPipe } from '../../pipes/keys.pipe';
import { GroupInfo } from '../../models/group-info';
import { MatchModel } from '../../models/match-model';

@Component({
  selector: 'app-groups-editor',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, KeysPipe],
  templateUrl: './groups-editor.component.html',
  styleUrl: './groups-editor.component.less'
})
export class GroupsEditorComponent {
    @Input()
    public match?: MatchModel;

    @Input()
    public label?: string = '-';

    @Input()
    public groups: Array<GroupInfo> = [];

    public newCode: string = '';
    public newLabel: string = '';

    public deleteElement(index: number) {
      this.groups.splice(index, 1);
    }

    public addElement() {
      if (this.newCode && this.newLabel) {
        if (!this.groups.find(x => x.code === this.newCode.trim())) {
          this.groups.push(<GroupInfo>{
            id: -1,
            code: this.newCode,
            label: this.newLabel
          });
          this.newCode = '';
          this.newLabel = '';
        }
      }
    }

    public up(index: number) {
      if (index > 0)
        this.groups.splice(index - 1, 0, this.groups.splice(index, 1)[0]);
    }

    public down(index: number) {
      if (index <= this.groups.length -2)
        this.groups.splice(index + 1, 0, this.groups.splice(index, 1)[0]);
    }

    array_move(arr: Array<GroupInfo>, old_index: number, new_index: number) {
      arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
      return arr; // for testing
  };
  
}
