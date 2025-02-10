import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { KeysPipe } from '../../../pipes/keys.pipe';
import { CommonModule } from '@angular/common';
import { MatchResultModel } from '../../../models/match-result-model';
import { MatchModel } from '../../../models/match-model';
import { MatchResultEntry } from '../../../models/match-result-entry';

@Component({
  selector: 'app-match-results-table',
  standalone: true,
  imports: [CommonModule, KeysPipe],
  templateUrl: './match-results-table.component.html',
  styleUrl: './match-results-table.component.less'
})
export class MatchResultsTableComponent implements OnChanges {
  @Input() results!: MatchResultModel;
  @Input() match!: MatchModel;
  @Input() entries!: MatchResultEntry[];

  public numSubscores: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    const entries = (this.entries ?? [0]).map(x => (x.scores ?? []).length).sort((a,b) => b - a);
    this.numSubscores = entries.length > 0 ? entries[0] : 0;
  }

}
