import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ParticipantsListMember } from '../../models/participants-list-member';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { NgSelectConfig, NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-input-participantname-for-match',
  standalone: true,
  imports: [CommonModule, FormsModule, NgSelectModule],
  templateUrl: './input-participantname-for-match.component.html',
  styleUrl: './input-participantname-for-match.component.less'
})
export class InputParticipantNameForMatch implements OnInit {
  @Input() matchId = -1;
  @Input() participantId = -1;
  @Output() selected = new EventEmitter<ParticipantsListMember>();

  public memberListMembers: ParticipantsListMember[] = [];
  public currentSelection?: ParticipantsListMember;

  constructor(public apiService: ApiService, private config: NgSelectConfig) {
    this.config.notFoundText = 'Niet gevonden';
    this.config.appendTo = 'body';
  }

  async ngOnInit(): Promise<void> {
    if (this.matchId > 0) {
      await this.refresh();
    }
  }

  async refresh(): Promise<void> {
    try {
      const match = this.apiService.getMatch(this.matchId);
      if (!match) { this.memberListMembers = []; return; }
      const competition = await this.apiService.getCompetition((await match).competition.id);
      if (!competition) { this.memberListMembers = []; return; }
      const memberListMembers = await this.apiService.getParticipantsListMembers(competition?.participantsList!.id);
      if (!memberListMembers) { this.memberListMembers = []; return; }
      if (memberListMembers && (!this.currentSelection || this.currentSelection.id !== this.participantId)) {
        this.currentSelection = memberListMembers.find(x => x.id === this.participantId);
      }
      this.memberListMembers = memberListMembers;
    } catch (error) {
      this.memberListMembers = [];
    }
  }

  participantChanged($event: Event) {
    this.selected.emit(this.currentSelection);
  }


}
