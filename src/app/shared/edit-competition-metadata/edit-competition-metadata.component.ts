import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CompetitionModel } from '../../models/competition-model';
import { ApiService } from '../../api.service';
import { SelectRulesetGroupComponent } from '../select-ruleset-group/select-ruleset-group.component';
import { SelectParticipantsListComponent } from '../select-participants-list/select-participants-list.component';

@Component({
  selector: 'app-edit-competition-metadata',
  standalone: true,
  imports: [CommonModule, FormsModule, SelectParticipantsListComponent, SelectRulesetGroupComponent],
  templateUrl: './edit-competition-metadata.component.html',
  styleUrl: './edit-competition-metadata.component.less'
})
export class EditCompetitionMetadataComponent implements OnChanges, OnInit {
  @Input() competitionId!: number;
  @Output() onError = new EventEmitter<string>();
  @Output() onClose = new EventEmitter<void>();

  public selectedCompetition?: CompetitionModel;

  constructor(public apiService: ApiService) {}

  async ngOnInit(): Promise<void> {
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (this.competitionId === -1) {
      this.selectedCompetition = <CompetitionModel>{
        id: -1,
        name: '',
      };
    }
    else if (this.competitionId >= 0) {      
      this.selectedCompetition = await this.apiService.getCompetition(this.competitionId);
      if (!this.selectedCompetition) {
        this.onError.emit('Competition load failed.');
        this.onClose.emit();
      }
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
