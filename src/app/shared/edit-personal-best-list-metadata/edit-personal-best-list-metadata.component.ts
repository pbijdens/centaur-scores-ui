import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { PersonalBestListModel } from '../../models/personal-best-list-model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { KeysPipe } from "../../pipes/keys.pipe";
import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'app-edit-personal-best-list-metadata',
  standalone: true,
  imports: [CommonModule, FormsModule, KeysPipe],
  templateUrl: './edit-personal-best-list-metadata.component.html',
  styleUrl: './edit-personal-best-list-metadata.component.less'
})
export class EditPersonalBestListMetadataComponent {
  @Input() listId!: number;
  @Input() pbListId!: number;
  @Output() onError = new EventEmitter<string>();
  @Output() onClose = new EventEmitter<void>();

  public list?: PersonalBestListModel;
  public rulesets: string[] = [];

  constructor(public apiService: ApiService, public authorizationService: AuthorizationService) { }

  async ngOnInit(): Promise<void> {
    try {
      this.rulesets = [];
      (await this.apiService.getRulesets()).forEach(r => {
        if (!this.rulesets.find(x => x === r.competitionFormat)) {
          this.rulesets.push(r.competitionFormat);
        }
      });
    }
    catch (error) {
      this.onError.emit('Kan gegevens niet laden.');
      this.onClose.emit();
    }
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (this.pbListId < 0) {
      this.list = <PersonalBestListModel>{
        id: -1,
        name: '',
      };
    }
    else if (this.pbListId > 0) {
      this.list = await this.apiService.getPersonalBestList(this.listId, this.pbListId);
      if (!this.list) {
        this.onError.emit('Kon de lijst niet laden.');
        this.onClose.emit();
      }
    } else {
      this.onError.emit('Bad input.');
      this.onClose.emit();
    }
  }

  async deleteModel(): Promise<void> {
    if (this.list) {
      if (confirm(`Weet je zeker dat je de lijst ${this.list.name} met id ${this.list.id} wil verwijderen? Dit kan niet ongedaan worden gemaakt.`)) {
        try {
          await this.apiService.deletePersonalBestList(this.listId, this.pbListId);
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
          await this.apiService.createPersonalBestList(this.listId, this.list);
        } catch (err) {
          this.onError.emit(`Kon nieuwe lijst niet toevoegen.`);
        }
        this.onClose.emit();
      }
      else {
        try {
          await this.apiService.updatePersonalBestList(this.listId, this.list);
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

  async rulsetChanged($event: any, value: any) {
  }
}

