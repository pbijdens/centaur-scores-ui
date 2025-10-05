import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ParticipantsListModel } from '../../models/participants-list-model';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthorizationService } from '../../services/authorization.service';
import { Router } from '@angular/router';
import { ActiveListService } from '../../services/active-list.service';
import { ControlDropdownButtonComponent } from "../control-dropdown-button/control-dropdown-button.component";
import { DisciplineModel, DivisionModel, TargetModel } from '../../models/participant-list-configuration-model';
import { ScoreButtonDefinition } from '../../models/score-button-definition';

@Component({
  selector: 'app-edit-participants-list-metadata',
  standalone: true,
  imports: [CommonModule, FormsModule, ControlDropdownButtonComponent],
  templateUrl: './edit-participants-list-metadata.component.html',
  styleUrl: './edit-participants-list-metadata.component.less'
})
export class EditParticipantsListMetadataComponent implements OnChanges, OnInit {

  @Input() listId!: number;
  @Output() onError = new EventEmitter<string>();
  @Output() onClose = new EventEmitter<void>();

  tab = 0;
  public list?: ParticipantsListModel;

  constructor(public apiService: ApiService, public authorizationService: AuthorizationService, public router: Router, public activeListService: ActiveListService) { }

  async ngOnInit(): Promise<void> {
    const rulesets = await this.apiService.getAllAvailableRulesets();
    this.allCompetitionsFormats = [...new Set(rulesets.map(x => x.competitionFormat))].sort();
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (this.listId === -1) {
      this.list = <ParticipantsListModel>{
        id: -1,
        name: '',
      };
    }
    else if (this.listId >= 0) {
      try {
        this.list = await this.apiService.getParticipantsList(this.listId);
        if (!this.list) {
          this.onError.emit('Kon de lijst met deelnemers niet laden.');
          this.onClose.emit();
        }
        else {
          if (this.list?.configuration) {
            this.list.configuration.disciplines.sort((x, y) => `${x.code}`.localeCompare(`${y.code}`));
          }
        }
      } catch (err) {
        this.onError.emit('Kon de lijst met deelnemers niet laden.');
      }
    }
  }

  async deleteModel(): Promise<void> {
    if (this.list) {
      if (confirm(`Weet je zeker dat je de lijst ${this.list.name} met id ${this.list.id} wil verwijderen? Dit kan niet ongedaan worden gemaakt.`)) {
        try {
          await this.apiService.deleteParticipantsList(this.list);
        } catch (err) {
          this.onError.emit(`Kon lijst niet verwijderen.`);
        }
        this.onClose.emit();
      }
    }
  }

  async saveModel(): Promise<void> {
    if (this.list) {
      if (this.list.id <= 0) {
        try {
          const model = await this.apiService.addParticipantsList(this.list);
          await this.activeListService.setActiveList(model?.id);
          this.router.navigate(['/'], { info: { reload: true } });
        } catch (err) {
          this.onError.emit(`Kon nieuwe lijst niet toevoegen.`);
        }
        this.onClose.emit();
      }
      else {
        try {
          await this.apiService.updateParticipantsList(this.list);
        } catch (err) {
          this.onError.emit(`Kon de lijst niet aanpassen.`);
        }
        this.onClose.emit();
      }
    }
  }

  async close() {
    this.onClose.emit();
  }

  public allCompetitionsFormats: string[] = [];
  public unusedCompetitionsFormats: string[] = [];
  toggleCompetitionFormat(format: string) {
    console.log(format);
    if (this.list?.configuration) {
      if (this.list.configuration.competitionFormats.indexOf(format) >= 0) {
        console.log('remove', format);
        this.list.configuration.competitionFormats = this.list.configuration.competitionFormats.filter(x => x !== format).sort();
        this.unusedCompetitionsFormats.push(format);
        this.unusedCompetitionsFormats.sort();
      } else {
        console.log('add', format);
        this.list.configuration.competitionFormats.push(format);
        this.list.configuration.competitionFormats.sort();
        this.unusedCompetitionsFormats = this.unusedCompetitionsFormats.filter(x => x !== format).sort();
      }
      console.log(this.list.configuration.competitionFormats);
    }
  }

  newDisciplineCode = '';
  newDisciplineLabel = '';
  addDisciplineRow() {
    if (this.list?.configuration) {
      if (!this.newDisciplineCode || this.newDisciplineCode.trim().length === 0) return;
      if (this.list.configuration.disciplines.find(d => d.code && (d.code.toLowerCase() === this.newDisciplineCode.toLowerCase()))) return;
      if (!this.newDisciplineLabel || this.newDisciplineLabel.trim().length === 0) return;

      this.list.configuration.disciplines.push(<DisciplineModel>{ id: this.list.configuration.disciplines.length + 1, code: this.newDisciplineCode, label: this.newDisciplineLabel });
      this.newDisciplineCode = '';
      this.newDisciplineLabel = '';
      this.list.configuration.disciplines = this.list.configuration.disciplines.sort((x, y) => `${x.code}`.localeCompare(`${y.code}`));
    }
  }
  deleteDiscipline(discipline: DisciplineModel) {
    if (this.list?.configuration) {
      this.list.configuration.disciplines = this.list.configuration.disciplines.filter(d => d !== discipline).sort((x, y) => `${x.code}`.localeCompare(`${y.code}`));
    }
  }

  newDivisionCode = '';
  newDivisionLabel = '';
  addDivisionRow() {
    if (this.list?.configuration) {
      if (!this.newDivisionCode || this.newDivisionCode.trim().length === 0) return;
      if (this.list.configuration.divisions.find(d => d.code && (d.code.toLowerCase() === this.newDivisionCode.toLowerCase()))) return;
      if (!this.newDivisionLabel || this.newDivisionLabel.trim().length === 0) return;

      this.list.configuration.divisions.push(<DivisionModel>{ id: this.list.configuration.divisions.length + 1, code: this.newDivisionCode, label: this.newDivisionLabel });
      this.newDivisionCode = '';
      this.newDivisionLabel = '';
      this.list.configuration.divisions = this.list.configuration.divisions.sort((x, y) => `${x.code}`.localeCompare(`${y.code}`));
    }
  }
  deleteDivision(division: DivisionModel) {
    if (this.list?.configuration) {
      this.list.configuration.divisions = this.list.configuration.divisions.filter(d => d !== division).sort((x, y) => `${x.code}`.localeCompare(`${y.code}`));
    }
  }

  newTargetCode = '';
  newTargetLabel = '';
  addTargetRow() {
    if (this.list?.configuration) {
      if (!this.newTargetCode || this.newTargetCode.trim().length === 0) return;
      if (this.list.configuration.targets.find(d => d.code && (d.code.toLowerCase() === this.newTargetCode.toLowerCase()))) return;
      if (!this.newTargetLabel || this.newTargetLabel.trim().length === 0) return;

      this.list.configuration.targets.push(<TargetModel>{ id: this.list.configuration.targets.length + 1, code: this.newTargetCode, label: this.newTargetLabel });
      this.newTargetCode = '';
      this.newTargetLabel = '';
      this.list.configuration.targets = this.list.configuration.targets.sort((x, y) => `${x.code}`.localeCompare(`${y.code}`));
    }
  }
  deleteTarget(target: TargetModel) {
    if (this.list?.configuration) {
      this.list.configuration.targets = this.list.configuration.targets.filter(d => d !== target).sort((x, y) => `${x.code}`.localeCompare(`${y.code}`));
    }
  }

  deleteKey(target: TargetModel, key: ScoreButtonDefinition) {
    if (this.list?.configuration) {
      const targetConfig = this.list.configuration.targets.find(t => t === target);
      if (targetConfig) {
        targetConfig.keyboard = targetConfig.keyboard.filter(b => b !== key);
      }
    }
  }

  addKey(target: TargetModel) {
    if (this.list?.configuration) {
      const targetConfig = this.list.configuration.targets.find(t => t === target);
      if (targetConfig) {
        targetConfig.keyboard.push({ id: targetConfig.keyboard.length + 1, label: 'New', value: null });
      }
    }
  }

}
