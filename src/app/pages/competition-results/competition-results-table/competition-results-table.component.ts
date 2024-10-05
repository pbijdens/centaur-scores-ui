import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { KeysPipe } from '../../../pipes/keys.pipe';
import { CompetitionResultModel } from '../../../models/competition-result-model';
import { CompetitionModel } from '../../../models/competition-model';
import { CompetitionResultEntry } from '../../../models/competition-result-entry';

@Component({
  selector: 'app-competition-results-table',
  standalone: true,
  imports: [CommonModule, KeysPipe],
  templateUrl: './competition-results-table.component.html',
  styleUrl: './competition-results-table.component.less'
})
export class CompetitionResultsTableComponent {
  @Input() results!: CompetitionResultModel;
  @Input() competition!: CompetitionModel;
  @Input() entries!: CompetitionResultEntry[];
}
