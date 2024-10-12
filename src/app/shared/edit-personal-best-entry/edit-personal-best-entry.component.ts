import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { PersonalBestListModel } from '../../models/personal-best-list-model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PersonalBestListEntryModel } from '../../models/personal-lest-list-entry-model';
import { ParticipantsListMember } from '../../models/participants-list-member';
import { InputMemberFromListComponent } from "../input-member-from-list/input-member-from-list.component";

@Component({
  selector: 'app-edit-personal-best-entry',
  standalone: true,
  imports: [CommonModule, FormsModule, InputMemberFromListComponent],
  templateUrl: './edit-personal-best-entry.component.html',
  styleUrl: './edit-personal-best-entry.component.less'
})
export class EditPersonalBestEntryComponent {
  @Input() listId!: number;
  @Input() pbListId!: number;
  @Input() entryId!: number;
  @Input() memberlist!: ParticipantsListMember[];
  @Output() onError = new EventEmitter<string>();
  @Output() onClose = new EventEmitter<void>();

  public list?: PersonalBestListModel;
  public rulesets: string[] = [];
  public entry?: PersonalBestListEntryModel;
  public disciplines: string[] = [];

  constructor(public apiService: ApiService) { }

  async ngOnInit(): Promise<void> {
    this.rulesets = [];
    this.disciplines = [];
    (await this.apiService.getRulesets()).forEach(r => {
      r.requiredClasses.forEach(cls => {
        if (cls.label && !this.disciplines.find(x => x == cls.label)) {
          this.disciplines.push(cls.label);
        }
      });
      if (!this.rulesets.find(x => x === r.competitionFormat)) {
        this.rulesets.push(r.competitionFormat);
      }
    });
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    try {
      this.list = await this.apiService.getPersonalBestList(this.listId, this.pbListId);
      if (this.entryId >= 0) {
        this.entry = await this.apiService.getPersonalBestListEntry(this.listId, this.pbListId, this.entryId);
        if (this.entry) {
          const entry = this.entry;
          entry.participant = this.memberlist.find(x => entry.participant && x.id === entry.participant.id) as ParticipantsListMember;
        }
      } else {
        this.entry = <PersonalBestListEntryModel>{
          achieved: '',
          discipline: '',
          notes: '',
          participant: {},
          score: 0,
          id: -1
        }
      }
    }
    catch (error) {
      this.onError.emit('Kan gegevens niet laden.');
      this.onClose.emit();
    }
  }

  async deleteModel(): Promise<void> {
    if (this.list && this.entry) {
      if (confirm(`Weet je zeker dat je de lijst ${this.list.name} met id ${this.list.id} wil verwijderen? Dit kan niet ongedaan worden gemaakt.`)) {
        try {
          await this.apiService.deletePersonalBestListEntry(this.listId, this.list, this.entry);
        } catch (err) {
          this.onError.emit(`Kon niet verwijderen.`);
        }
        this.onClose.emit();
      }
    }
  }

  async saveModel(): Promise<void> {
    if (this.list && this.entry) {
      if (this.entry.id <= 0) {
        try {
          await this.apiService.createPersonalBestListEntry(this.listId, this.list, this.entry);
        } catch (err) {
          this.onError.emit(`Kon niet toevoegen.`);
        }
        this.onClose.emit();
      }
      else {
        try {
          await this.apiService.updatePersonalBestListEntry(this.listId, this.list, this.entry);
        } catch (err) {
          this.onError.emit(`Kon niet aanpassen.`);
        }
        this.onClose.emit();
      }
    }
  }

  async close() {
    this.onClose.emit();
  }

  async participantChanged(event: any, value: any) {
  }

  async participantSelected(event: ParticipantsListMember) {
    if (this.entry) {
      if (event) {
      this.entry.participant = event;
      } else {
        //whatever?
      }
    }
  }
}

