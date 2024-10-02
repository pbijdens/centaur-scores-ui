import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../api.service';
import { RulesetModel } from '../../models/ruleset-model';

@Component({
  selector: 'app-select-ruleset',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './select-ruleset.component.html',
  styleUrl: './select-ruleset.component.less'
})
export class SelectRulesetComponent {
  @Input() currentCode?: string;
  @Input() group?: string;
  @Output() rulesetSelected = new EventEmitter<string>();
  rulesets: Array<any> = [];
  selected?: RulesetModel;

  constructor(public apiService: ApiService) {}

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (changes['currentCode'] || changes['group']) {
      await this.refresh();
    }
  }

  async ngOnInit(): Promise<void> {
    await this.refresh();
  }

  async refresh() : Promise<void> {
    this.rulesets = [];
    this.rulesets = (await this.apiService.getRulesets()).filter(x => !this.group || (x.groupName === this.group));
    this.selected = this.rulesets.find(x => x.code === this.currentCode);
  }

  async rulsetChanged(event: any, value: any) {
    this.rulesetSelected.emit(this.selected?.code || '');
  }
}
