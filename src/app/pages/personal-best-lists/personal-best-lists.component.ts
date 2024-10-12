import { Component, OnInit } from '@angular/core';
import { ControlUpButtonComponent } from "../../shared/control-up-button/control-up-button.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NavbarService } from '../../services/navbar.service';
import { ParticipantsListModel } from '../../models/participants-list-model';
import { EditPersonalBestListMetadataComponent } from "../../shared/edit-personal-best-list-metadata/edit-personal-best-list-metadata.component";
import { PersonalBestListModel } from '../../models/personal-best-list-model';
import { ControlDropdownButtonComponent } from "../../shared/control-dropdown-button/control-dropdown-button.component";

@Component({
  selector: 'app-personal-best-lists',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ControlUpButtonComponent, EditPersonalBestListMetadataComponent, ControlDropdownButtonComponent],
  templateUrl: './personal-best-lists.component.html',
  styleUrl: './personal-best-lists.component.less'
})
export class PersonalBestListsComponent implements OnInit {
  public listId = -1;
  public pbListId = 0;
  public errorMessage = '';

  public participantsList!: ParticipantsListModel;
  public personalBestLists: PersonalBestListModel[] = [];

  constructor(private apiService: ApiService, public activatedRoute: ActivatedRoute, public router: Router, public navbarService: NavbarService) {
    this.listId = this.activatedRoute.snapshot.params['listId'] as number || -1;
  }

  async ngOnInit(): Promise<void> {
    if (this.listId > -1) {
      this.participantsList = await this.apiService.getParticipantsList(this.listId) as ParticipantsListModel;
      this.navbarService.setPageTitle(`PRs voor ${this.participantsList.name}`)

      this.personalBestLists = await this.apiService.getPersonalBestLists(this.listId);
    }
  }

  async editListMetadataError($event: string): Promise<void> {
    this.errorMessage = $event;
  }

  async editListMetadataClose(): Promise<void> {
    this.pbListId = 0;
    await this.ngOnInit();
  }

  async select(part: PersonalBestListModel): Promise<void> {
    if (!part) return;
    this.pbListId = part.id;
  }

  async new(): Promise<void> {
    this.pbListId = -1;
  }

  async scanForRecords(): Promise<void> {
    this.pbListId = 0;
    
  }
}
