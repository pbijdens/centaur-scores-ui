import { Component, Input } from '@angular/core';
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
export class MatchResultsTableComponent {
  @Input() results!: MatchResultModel;
  @Input() match!: MatchModel;
  @Input() entries!: MatchResultEntry[];
}
