import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-select-ruleset-group',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './select-ruleset-group.component.html',
  styleUrl: './select-ruleset-group.component.less'
})
export class SelectRulesetGroupComponent implements OnInit, OnChanges {
  @Input() currentGroup?: string;
  @Output() groupSelected = new EventEmitter<string>();
  rulesetGroups: Array<any> = [];
  selectedGroup: any;

  constructor(public apiService: ApiService) {}

  ngOnChanges(changes: SimpleChanges): void {
      if (changes['currentGroup'] && this.rulesetGroups) {
        this.selectedGroup = this.rulesetGroups.find(x => x.groupName === changes['currentGroup'].currentValue);
      }
  }

  async ngOnInit(): Promise<void> {
    this.rulesetGroups = [];
    const rulesets = await this.apiService.getRulesets();
    (rulesets || []).forEach(x => {
      if (!this.rulesetGroups.find(y => y.groupName === x.groupName)) this.rulesetGroups.push({groupName: x.groupName});
    });
    this.selectedGroup = this.rulesetGroups.find(x => x.groupName === this.currentGroup);
  }

  async rulsetChanged(event: any, value: any) {
    this.groupSelected.emit(this.selectedGroup?.groupName || '');
  }
}
