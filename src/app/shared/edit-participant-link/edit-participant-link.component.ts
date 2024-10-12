import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ParticipantsListModel } from '../../models/participants-list-model';
import { ParticipantsListMember } from '../../models/participants-list-member';
import { ParticipantModel } from '../../models/participant-model';
import { MatchModel } from '../../models/match-model';
import { CompetitionModel } from '../../models/competition-model';
import { InputMemberFromListComponent } from "../input-member-from-list/input-member-from-list.component";

@Component({
  selector: 'app-edit-participant-link',
  standalone: true,
  imports: [CommonModule, FormsModule, InputMemberFromListComponent],
  templateUrl: './edit-participant-link.component.html',
  styleUrl: './edit-participant-link.component.less'
})
export class EditParticipantLinkComponent implements OnInit {
  @Input() matchId!: number;
  @Input() participantId!: number;
  @Output() onError = new EventEmitter<string>();
  @Output() onClose = new EventEmitter<void>();

  public match?: MatchModel;
  public competition?: CompetitionModel;
  public participant?: ParticipantModel;
  public participantsList?: ParticipantsListModel;
  public matches: ParticipantsListMember[] = [];
  public members: ParticipantsListMember[] = []; // not diosplayed directly anymore

  public selectedParticipandId = -1;
  public selectedParticipant?: ParticipantsListMember;

  constructor(public apiService: ApiService) { }

  similar_text(first: string, second: string) {
    // Calculates the similarity between two strings  
    // discuss at: http://phpjs.org/functions/similar_text

    if (first === null || second === null || typeof first === 'undefined' || typeof second === 'undefined') {
      return 0;
    }

    first += '';
    second += '';

    var pos1 = 0,
      pos2 = 0,
      max = 0,
      firstLength = first.length,
      secondLength = second.length,
      p, q, l, sum;

    max = 0;

    for (p = 0; p < firstLength; p++) {
      for (q = 0; q < secondLength; q++) {
        for (l = 0;
          (p + l < firstLength) && (q + l < secondLength) && (first.charAt(p + l) === second.charAt(q + l)); l++);
        if (l > max) {
          max = l;
          pos1 = p;
          pos2 = q;
        }
      }
    }

    sum = max;

    if (sum) {
      if (pos1 && pos2) {
        sum += this.similar_text(first.substr(0, pos2), second.substr(0, pos2));
      }

      if ((pos1 + max < firstLength) && (pos2 + max < secondLength)) {
        sum += this.similar_text(first.substr(pos1 + max, firstLength - pos1 - max), second.substr(pos2 + max, secondLength - pos2 - max));
      }
    }

    return sum;
  }

  max(a: number, b: number) {
    return a > b ? a : b;
  }


  isSimilar(name: string, input: string): number {
    let retval = 0;
    name = name.toLocaleLowerCase().replaceAll('[^\s\p{L}]', '');
    input = input.toLocaleLowerCase().replaceAll('[^\s\p{L}]', '');
    const percent = this.similar_text(name, input) / (this.max(name.length, input.length) / 100.0);
    retval = Math.max(retval, percent);    

    const normalizedName = name.replaceAll(/[^a-z]/gi, '');
    const normalizedInput = input.replaceAll(/[^a-z]/gi, '');
    const percentn = this.similar_text(normalizedName, normalizedInput) / (this.max(normalizedName.length, normalizedInput.length) / 100.0);
    retval = Math.max(retval, percentn);

    const firstnameinput = input.replace(/^(\S*)\s.*$/i, (_, g) => g).toLocaleLowerCase();
    const firstnamename = name.replace(/^(\S*)\s.*$/i, (_, g) => g).toLocaleLowerCase();
    const percentfn = this.similar_text(firstnamename, firstnameinput) / (this.max(firstnamename.length, firstnameinput.length) / 100.0);
    retval = Math.max(retval, percentfn);

    return retval;
  }

  async ngOnInit(): Promise<void> {
    this.participant = await this.apiService.getParticipantForMatch(this.matchId, this.participantId);
    if (this.participant) {
      this.match = await this.apiService.getMatch(this.matchId);
      if (this.match) {
        if (this.match.competition?.id >= 0) {
          this.competition = await this.apiService.getCompetition(this.match.competition.id);
          if (this.competition && this.competition.participantsList && this.competition.participantsList.id >= 0) {
            this.competition.participantsList = await this.apiService.getParticipantsList(this.competition.participantsList.id);
            this.members = await this.apiService.getParticipantsListMembers(this.competition.participantsList!.id);
            if (this.members) {
              const tpname = this.participant?.name || '';
              this.members.forEach(a => a.similarity = this.isSimilar(a.name, tpname));
              console.log(this.members);
              let matches = this.members.sort((a,b) => b.similarity - a.similarity);
              matches = matches.filter(m => m.similarity > 50).slice(0, 5);
              this.matches = matches;              
            }

            this.selectedParticipandId = this.participant.participantListEntryId || -1;
            this.selectedParticipant = this.members.find(x => x.id === this.selectedParticipandId);
          }
        }
      }
    }
  }

  async close() {
    this.onClose.emit();
  }

  async save(): Promise<void> {
    this.onClose.emit();
  }

  async selectMember(member: ParticipantsListMember): Promise<void> {
    if (this.participant) {
      this.participant.participantListEntryId = member ? member.id : undefined;
      this.participant.name = member.name;
      await this.apiService.updateMatchParticipant(this.matchId, this.participant);
    }
    this.onClose.emit();
  }

  // When a participant is selected in the dropdown
  participantSelected($event: ParticipantsListMember) {
    this.selectedParticipant = $event;
  }

}

