import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KeysPipe } from '../../keys.pipe';
import { ParticipantModel } from '../../models/participant-model';
import { MatchModel } from '../../models/match-model';
import { SortParticipantsPipePipe } from '../sort-participants-pipe.pipe';
import { ParticipantGroup } from '../../models/participant-group';

@Component({
  selector: 'app-sorted-participants-list',
  standalone: true,
  imports: [CommonModule, FormsModule, KeysPipe, SortParticipantsPipePipe],
  templateUrl: './sorted-participants-list.component.html',
  styleUrl: './sorted-participants-list.component.less'
})
export class SortedParticipantsListComponent {
  @Input('match') match: MatchModel = <MatchModel>{};
  @Input('participants') participants: ParticipantGroup = <ParticipantGroup>{};
  @Input('sortOrder') sortOrder: string = "s";
}