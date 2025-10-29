import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ParticipantsListMember } from '../../models/participants-list-member';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { AuthorizationService } from '../../services/authorization.service';
import { ActiveListService } from '../../services/active-list.service';
import { DisciplineModel, DivisionModel } from '../../models/participant-list-configuration-model';
import { GetGroupNamePipe } from '../../pipes/getgroupname.pipe';
import { ParticipantsListModel } from '../../models/participants-list-model';
import { CompetitionModel } from '../../models/competition-model';
import { GetCompetitionNamePipe } from "../../pipes/getcompetitionname.pipe";

@Component({
  selector: 'app-edit-participant-list-entry',
  standalone: true,
  imports: [CommonModule, FormsModule, GetGroupNamePipe, GetCompetitionNamePipe],
  templateUrl: './edit-participant-list-entry.component.html',
  styleUrl: './edit-participant-list-entry.component.less'
})
export class EditParticipantListEntryComponent implements OnInit {
  @Input() participant!: ParticipantsListMember;
  @Input() listId!: number;

  @Output() save = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  tab = 1;
  participantList?: ParticipantsListModel;
  competitions?: CompetitionModel[];

  constructor(public apiService: ApiService, public authorizationService: AuthorizationService, public activeListService: ActiveListService) { }

  async ngOnInit(): Promise<void> {
    this.participantList = await this.apiService.getParticipantsList(this.listId);
    this.competitions = await this.apiService.getCompetitionsForList(this.listId);
  }

  async saveEntry(): Promise<void> {
    this.save.emit();
  }

  async deleteEntry(): Promise<void> {
    this.delete.emit();
  }

  async closeEntry(): Promise<void> {
    this.close.emit();
  }
}
