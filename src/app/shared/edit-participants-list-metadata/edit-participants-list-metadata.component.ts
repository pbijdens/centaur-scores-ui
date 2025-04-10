import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ParticipantsListModel } from '../../models/participants-list-model';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthorizationService } from '../../services/authorization.service';
import { Router } from '@angular/router';
import { ActiveListService } from '../../services/active-list.service';

@Component({
  selector: 'app-edit-participants-list-metadata',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-participants-list-metadata.component.html',
  styleUrl: './edit-participants-list-metadata.component.less'
})
export class EditParticipantsListMetadataComponent implements OnChanges, OnInit {
  @Input() listId!: number;
  @Output() onError = new EventEmitter<string>();
  @Output() onClose = new EventEmitter<void>();

  public list?: ParticipantsListModel;

  constructor(public apiService: ApiService, public authorizationService: AuthorizationService, public router: Router, public activeListService: ActiveListService) { }

  async ngOnInit(): Promise<void> {
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
          this.router.navigate(['/'], { info: {reload: true}});
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
}
