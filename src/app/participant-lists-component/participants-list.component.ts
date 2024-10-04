import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ParticipantsListModel } from '../models/participants-list-model';
import { FormsModule } from '@angular/forms';
import { NavbarService } from '../navbar.service';
import { EditParticipantsListMetadataComponent } from "../shared/edit-participants-list-metadata/edit-participants-list-metadata.component";
import { ControlDropdownButtonComponent } from "../shared/control-dropdown-button/control-dropdown-button.component";

@Component({
  selector: 'app-participants-list',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, EditParticipantsListMetadataComponent, ControlDropdownButtonComponent],
  templateUrl: './participants-list.component.html',
  styleUrl: './participants-list.component.less'
})
export class ParticipantsListsComponent implements OnInit {
  public participantsLists: Array<ParticipantsListModel> = [];
  public selectedList?: ParticipantsListModel;
  public errorMessage?: string;

  constructor(public apiService: ApiService, public navbarService: NavbarService) {
    this.navbarService.setPageTitle('Deelnemerslijsten beheren');
  }

  async refresh(): Promise<void> {
    this.participantsLists = await this.apiService.getParticipantsLists();
  }

  async ngOnInit(): Promise<void> {
    await this.refresh();
  }

  async newParticipantsList(): Promise<void> {
    this.selectedList = <ParticipantsListModel>{
      id: -1,
      name: ''
    };
  }

  async editParticipantsList(model: ParticipantsListModel): Promise<void> {
    this.selectedList = JSON.parse(JSON.stringify(model)) as ParticipantsListModel;
  }

  async editListMetadataError($event: string): Promise<void> {
    this.errorMessage = $event;
  }

  async editListMetadataClose(): Promise<void> {
    delete this.selectedList;
    await this.refresh();
  }

}
