import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ParticipantModel } from '../../models/participant-model';
import { MatchModel } from '../../models/match-model';
import { ApiService } from '../../services/api.service';
import { SelectFromGroupinfoComponent } from "../select-from-groupinfo/select-from-groupinfo.component";
import { GroupInfo } from '../../models/group-info';
import { EditScorecardComponent } from "../edit-scorecard/edit-scorecard.component";
import { ScoreButtonDefinition } from '../../models/score-button-definition';

@Component({
  selector: 'app-edit-participant-scoresheet',
  standalone: true,
  imports: [CommonModule, FormsModule, SelectFromGroupinfoComponent, EditScorecardComponent],
  templateUrl: './edit-participant-scoresheet.component.html',
  styleUrl: './edit-participant-scoresheet.component.less'
})
export class EditParticipantScoresheetComponent {
  @Input() matchId!: number;
  @Input() participantId!: number;

  @Output() onError = new EventEmitter<string>();
  @Output() onClose = new EventEmitter<void>();

  public match?: MatchModel;
  public participant?: ParticipantModel;
  public keyboard: ScoreButtonDefinition[] = [];

  public tab = 0;

  constructor(public apiService: ApiService) { }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
  }

  async ngOnInit(): Promise<void> {
    if (this.matchId >= 0) {
      this.match = await this.apiService.getMatch(this.matchId);
      this.match!.lijnenAsString = this.match!.lijnen.join('');
    }

    if (this.participantId >= 0) {
      this.participant = await this.apiService.getParticipantForMatch(this.matchId, this.participantId);
      if (this.match && this.participant) {
        this.keyboard = this.match.scoreValues[this.participant.target] ?? [];
      }
    } else {
      this.participant = <ParticipantModel>{
        id: -1,
      };
      this.keyboard = [];
    }
  }

  async close(): Promise<void> {
    this.onClose.emit();
  }

  async deleteEntity(): Promise<void> {
    if (this.participant && this.match) {
      if (confirm(`Weet je zeker dat je de deelnemer ${this.participant.name} met id ${this.participant.id} wil verwijderen? Dit verwijdert ook alle scores voor deze deelnemer in deze wedstrijd. Dit kan niet ongedaan worden gemaakt.`)) {
        try {
          await this.apiService.deleteParticipantForMatch(this.match.id, this.participant.id);
        } catch (err) {
          this.onError.emit(`Kon de deelnemer niet verwijderen.`);
        }
        this.onClose.emit();
      }
    }
  }

  async saveEntity(): Promise<void> {
    if (this.participant && this.match) {
      if (this.participant.id <= 0) {
        try {
          await this.apiService.createParticipantForMatch(this.match.id, this.participant);
        } catch (err) {
          this.onError.emit(`De deelnemer kon niet worden toegevoegd.`);
        }
        this.onClose.emit();
      }
      else {
        try {
          await this.apiService.updateMatchParticipant(this.match.id, this.participant);
        } catch (err) {
          this.onError.emit(`Kon de deelnemer niet wijzigen.`);
        }
        this.onClose.emit();
      }
    }
  }

  async setParticipantGroup(group: GroupInfo | undefined): Promise<void> {
    if (this.participant) {
      this.participant.group = group?.code || '';
    }
  }

  async setParticipantSubgroup(group: GroupInfo | undefined): Promise<void> {
    if (this.participant) {
      this.participant.subgroup = group?.code || '';
    }
  }

  async setParticipantTarget(group: GroupInfo | undefined): Promise<void> {
    if (this.participant) {
      this.participant.target = group?.code || '';
    }
  }
}