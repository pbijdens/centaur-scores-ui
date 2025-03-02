import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { KeysPipe } from '../../../pipes/keys.pipe';
import { CommonModule } from '@angular/common';
import { MatchResultModel } from '../../../models/match-result-model';
import { MatchModel } from '../../../models/match-model';
import { GetGroupNamePipe } from '../../../pipes/getgroupname.pipe';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-match-results-knockout',
  standalone: true,
  imports: [CommonModule, KeysPipe, GetGroupNamePipe],
  templateUrl: './match-results-knockout.component.html',
  styleUrl: './match-results-knockout.component.less'
})
export class MatchResultsKnockoutComponent implements OnInit, OnChanges {
  tab = 0;

  @Input() match?: MatchModel;
  @Input() results?: MatchResultModel;
  @Input() refreshTimeout: number = 1;
  @Input() refreshTimeoutCache: number = 1;

  titels = ['', 'Achtste finale', 'Kwartfinale', 'Halve finale', 'Finale'];  

  constructor(public apiService: ApiService) {    
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    console.log('changes', changes);
    if (changes['results']) {
      await this.refresh();
    }
  }

  async refresh(): Promise<void> {
    this.tab = +(await this.apiService.getMatchUiSetting(this.match?.id?? -1, "ActiveResultsFinalsTab") ?? "0");
  }

  async ngOnInit(): Promise<void> {
    await this.refresh();
  }

  async updateActiveTab(tabId: number) {
    this.tab = tabId;
    await this.apiService.updateMatchUiSetting(this.match?.id ?? -1, "ActiveResultsFinalsTab", `${tabId}`);
  }
}
