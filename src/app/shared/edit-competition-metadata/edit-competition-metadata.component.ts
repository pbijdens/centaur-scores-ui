import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CompetitionModel } from '../../models/competition-model';
import { ApiService } from '../../services/api.service';
import { SelectRulesetGroupComponent } from '../select-ruleset-group/select-ruleset-group.component';
import { SelectParticipantsListComponent } from '../select-participants-list/select-participants-list.component';
import { DpDatePickerModule } from 'ng2-date-picker';
import { AuthorizationService } from '../../services/authorization.service';
import { ActiveListService } from '../../services/active-list.service';

@Component({
  selector: 'app-edit-competition-metadata',
  standalone: true,
  imports: [CommonModule, FormsModule, SelectParticipantsListComponent, SelectRulesetGroupComponent, DpDatePickerModule],
  templateUrl: './edit-competition-metadata.component.html',
  styleUrl: './edit-competition-metadata.component.less'
})
export class EditCompetitionMetadataComponent implements OnChanges, OnInit {
  @Input() competitionId!: number;
  @Output() onError = new EventEmitter<string>();
  @Output() onClose = new EventEmitter<void>();

  public selectedCompetition?: CompetitionModel;

  constructor(public apiService: ApiService, public authorizationService: AuthorizationService, public activelistService: ActiveListService) { }

  async ngOnInit(): Promise<void> {
    this.activelistService.activeList$.subscribe((listId) => {
      this.reload(listId);
    });
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    this.reload(this.activelistService.activeList);
  }

  async reload(listId: number) {
    try {
      const list = listId >= 0 ? await this.apiService.getParticipantsList(listId) : undefined;
      if (this.competitionId === -1) {
        const codeStart = `${new Date().getUTCFullYear()}-01-01`;
        const codeEnd = `${new Date().getUTCFullYear()}-12-31`;
        this.selectedCompetition = <CompetitionModel>{
          id: -1,
          name: '',
          startDate: codeStart,
          endDate: codeEnd,
          participantsList: list
        };
        if (!list) {
          this.onError.emit(`Voordat je een competitie aan kan maken moet je eerst een actieve lijst kiezen.`);
          this.onClose.emit();
        }
      }
      else if (this.competitionId >= 0) {
        this.selectedCompetition = await this.apiService.getCompetition(this.competitionId);
        if (!this.selectedCompetition) {
          this.onError.emit('Competition load failed.');
          this.onClose.emit();
        }
      }
    }
    catch (error) {
      this.onError.emit('Competition load failed.');
      this.onClose.emit();
    }
  }

  async deleteCompetition(): Promise<void> {
    if (this.selectedCompetition) {
      if (confirm(`Weet je zeker dat je de competitie ${this.selectedCompetition.name} met id ${this.selectedCompetition.id} wil verwijderen? Dit kan niet ongedaan worden gemaakt.`)) {
        try {
          await this.apiService.deleteCompetition(this.selectedCompetition);
        } catch (err) {
          this.onError.emit(`Kon lijst niet verwijderen.`);
        }
        this.onClose.emit();
      }
    }
  }

  async saveCompetition(): Promise<void> {
    if (this.selectedCompetition) {
      if (this.selectedCompetition.id <= 0) {
        try {
          await this.apiService.addCompetition(this.selectedCompetition);
        } catch (err) {
          this.onError.emit(`Kon nieuwe competitie niet toevoegen.`);
        }
        this.onClose.emit();
      }
      else {
        try {
          await this.apiService.updateCompetition(this.selectedCompetition);
        } catch (err) {
          this.onError.emit(`Kon de competitie niet aanpassen.`);
        }
        this.onClose.emit();
      }
    }
  }

  async setRuleset(value: string): Promise<void> {
    if (this.selectedCompetition) {
      this.selectedCompetition.rulesetGroupName = value;
    }
  }

  async setParticipantsList(value: any): Promise<void> {
    if (this.selectedCompetition) {
      this.selectedCompetition.participantsList = value;
    }
  }

  async close() {
    this.onClose.emit();
  }
}
