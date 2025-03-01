import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatchModel } from '../../models/match-model';
import { ParticipantModel } from '../../models/participant-model';
import { ApiService } from '../../services/api.service';
import { MatchFinalDefinition, MatchFinalDefinitionClass } from '../../models/match-final-definition';

@Component({
  selector: 'app-finals-create-configuration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './finals-create-configuration.component.html',
  styleUrl: './finals-create-configuration.component.less'
})
export class FinalsCreateConfigurationComponent implements OnInit {
  @Output() onError = new EventEmitter<string>();
  @Output() onClose = new EventEmitter<void>();

  @Input() match!: MatchModel;
  @Input() participants!: ParticipantModel[];

  public data: MatchFinalDefinitionClass[] = [];

  tab = 0;

  constructor(private apiService: ApiService) { }

  async save(): Promise<void> {
    await this.apiService.matchStartH2H(this.match.id, <MatchFinalDefinition>{
      name: this.match.matchName,
      groups: this.data
    });
    await this.onClose.emit();
  }

  async close() {
    this.onClose.emit();
  }

  async ngOnInit(): Promise<void> {
    this.data = [];
    this.participants.forEach(p => {
      if (!this.data.find(g => g.name === p.groupName)) {
        this.data.push(<MatchFinalDefinitionClass>{
          allParticipants: [],
          isSetScored: true,
          participants: [],
          name: p.groupName
        });
      }
    });
  }

}
