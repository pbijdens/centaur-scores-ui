import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ParticipantsListMember } from '../../models/participants-list-member';
import { FormsModule } from '@angular/forms';
import { ParticipantsListModel } from '../../models/participants-list-model';
import { EditParticipantsListMetadataComponent } from "../../shared/edit-participants-list-metadata/edit-participants-list-metadata.component";
import { ControlDropdownButtonComponent } from "../../shared/control-dropdown-button/control-dropdown-button.component";
import { NavbarService } from '../../services/navbar.service';
import { ControlUpButtonComponent } from "../../shared/control-up-button/control-up-button.component";

@Component({
  selector: 'app-participants-list-editor',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, EditParticipantsListMetadataComponent, ControlDropdownButtonComponent, ControlUpButtonComponent],
  templateUrl: './participants-list-editor.component.html',
  styleUrl: './participants-list-editor.component.less'
})
export class ParticipantsListEditorComponent implements OnInit {
  public participant: ParticipantsListMember = { id: -1, name: '', group: '', subgroup: '' };
  public participants: ParticipantsListMember[] = [];
  public metadata?: ParticipantsListModel;
  public listId: number = -1;
  public id: number = -1;
  public errorMessage?: string;

  public selectedClass?: any;
  public selectedSubclass?: any;

  public classes = [{ name: 'Recurve' }, { name: 'Compound' }, { name: 'Hout' }, { name: 'Barebow' }];
  public subclasses = [{ name: 'Aspiranten' }, { name: 'Jeugd' }, { name: 'Junioren' }, { name: 'Senioren' }, { name: 'Masters' }];

  public editorOpen = false;

  public metadataEditorModel?: ParticipantsListModel;

  constructor(public apiService: ApiService, public activatedRoute: ActivatedRoute, public router: Router, public navbarService: NavbarService) {
    this.listId = this.activatedRoute.snapshot.params['listId'] as number || -1;
    this.id = this.activatedRoute.snapshot.params['id'] as number || -1;
  }

  async refresh(): Promise<void> {
    try {
      this.metadata = await this.apiService.getParticipantsList(this.listId);
      if (this.metadata) {
        this.navbarService.setPageTitle(`Lijst: ${this.metadata?.name}`)
      }
      this.participants = await this.apiService.getParticipantsListMembers(this.listId);
      if (this.id > 0) {
        this.participant = await this.apiService.getParticipantsListMember(this.listId, this.id);
        this.selectedClass = this.classes.find(x => x.name === this.participant.group);
        this.selectedSubclass = this.subclasses.find(x => x.name === this.participant.subgroup);
      } else {
        this.participant = <ParticipantsListMember>{
          id: -1,
          name: '',
          group: '',
          subgroup: ''
        }
        delete this.selectedClass;
        delete this.selectedSubclass;
      }
    } catch (err) {
      this.errorMessage = `Laden is mislukt.`;
    }
  }

  async ngOnInit(): Promise<void> {
    await this.refresh();
  }

  async close() {
    this.editorOpen = false;
  }

  async select(participant: ParticipantsListMember) {
    this.id = participant.id;
    await this.refresh();
    this.editorOpen = true;
  }

  async save(): Promise<void> {
    delete this.errorMessage;
    if (this.id > 0) {
      try {
        await this.apiService.updateParticipantsListMember(this.listId, this.id, this.participant);
        this.id = -1;
        await this.refresh();
        this.editorOpen = false;
      } catch (err) {
        this.errorMessage = `Wijzigingen konden niet worden opgeslagen.`;
        await this.refresh();
      }
    } else {
      try {
        this.participant = await this.apiService.addParticipantsListMember(this.listId, this.participant);
        if (this.participant) {
          this.id = this.participant.id;
          this.selectedClass = this.classes.find(x => x.name === this.participant.group);
          this.selectedSubclass = this.subclasses.find(x => x.name === this.participant.subgroup);
          this.participants = await this.apiService.getParticipantsListMembers(this.listId);
          this.editorOpen = false;
        } else {
          this.id = -1;
          await this.refresh();
          this.editorOpen = false;
        }
      } catch (err) {
        this.errorMessage = `Toevoegen is mislukt.`;
        this.refresh();
      }
    }
  }

  async delete(): Promise<void> {
    delete this.errorMessage;
    if (this.id > 0) {
      if (confirm(`Wil je echt ${this.participant.name} met id ${this.participant.id} verwijderen?`)) {
        try {
          await this.apiService.deleteParticipantsListMember(this.listId, this.id);
          this.id = -1;
          await this.refresh();          
          this.editorOpen = false;
        } catch (err) {
          this.errorMessage = `Verwijderen is mislukt.`;
          await this.refresh();
        }
      }
    }
  }

  async new(): Promise<void> {
    this.id = -1;
    this.participant = <ParticipantsListMember>{
      id: -1,
      name: '',
      group: '',
      subgroup: ''
    }
    delete this.selectedClass;
    delete this.selectedSubclass;
    this.editorOpen = true;
  }

  async classChanged(event: any, value: any): Promise<void> {
    this.participant.group = this.selectedClass.name;
  }

  async subclassChanged(event: any, value: any): Promise<void> {
    this.participant.subgroup = this.selectedSubclass.name;
  }

  async editListMetadataOpen(): Promise<void> {
    this.metadataEditorModel = this.metadata;
  }

  async editListMetadataError($event: string): Promise<void> {
    this.errorMessage = $event;
  }

  async editListMetadataClose(): Promise<void> {
    delete this.metadataEditorModel;
    this.refresh();
  }
}
