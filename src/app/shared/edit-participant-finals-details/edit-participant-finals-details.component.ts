import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatchModel } from '../../models/match-model';
import { ParticipantModel } from '../../models/participant-model';

@Component({
  selector: 'app-edit-participant-finals-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-participant-finals-details.component.html',
  styleUrl: './edit-participant-finals-details.component.less'
})
export class EditParticipantFinalsDetailsComponent implements OnInit {
  @Input() match!: MatchModel;
  @Input() participant!: ParticipantModel;  

  info: Head2HeadInfoEntry[] = [];

  constructor() {

  }
  async ngOnInit(): Promise<void> {
    this.info = JSON.parse(this.participant.headToHeadJSON ?? "[]") ?? [];
    this.info.forEach((x,i) => x.IsActive = i == this.match.activeRound - 1);

    console.log(this.info);
  }
}

export interface Head2HeadInfoEntry {
  OpponentId: number;
  InitialPosition: number;
  IsWinner: boolean;
  Bracket: number;
  Position: number; // 0 or 1
  IsSetScored: boolean; // indicates if the match is set-scored
  IsActive: boolean;
}