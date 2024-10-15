import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ParticipantsListModel } from '../../models/participants-list-model';
import { PersonalBestListModel } from '../../models/personal-best-list-model';
import { ApiService } from '../../services/api.service';
import { NavbarService } from '../../services/navbar.service';
import { ControlUpButtonComponent } from "../../shared/control-up-button/control-up-button.component";
import { ControlDropdownButtonComponent } from "../../shared/control-dropdown-button/control-dropdown-button.component";
import { NewPersonalBestModel } from '../../models/new-personal-best-model';
import { PersonalBestListEntryModel } from '../../models/personal-lest-list-entry-model';
import { GetGroupNamePipe } from "../../pipes/getgroupname.pipe";
import { EditPersonalBestEntryComponent } from "../../shared/edit-personal-best-entry/edit-personal-best-entry.component";
import { ParticipantsListMember } from '../../models/participants-list-member';
import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'app-personal-best-list-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ControlUpButtonComponent, ControlDropdownButtonComponent, GetGroupNamePipe, EditPersonalBestEntryComponent],
  templateUrl: './personal-best-list-editor.component.html',
  styleUrl: './personal-best-list-editor.component.less'
})
export class PersonalBestListEditorComponent {
  public listId = -1;
  public pblId = 0;

  public entryId = 0;

  public participantsList!: ParticipantsListModel;
  public personalBestList!: PersonalBestListModel;

  public errorMessage= '';
  public memberList: ParticipantsListMember[] = [];

  constructor(private apiService: ApiService, public activatedRoute: ActivatedRoute, public router: Router, public navbarService: NavbarService, public authorizationService: AuthorizationService) {
    this.listId = this.activatedRoute.snapshot.params['listId'] as number || -1;
    this.pblId = this.activatedRoute.snapshot.params['pblId'] as number || -1;
  }

  async ngOnInit(): Promise<void> {
    try {
      this.participantsList = await this.apiService.getParticipantsList(this.listId) as ParticipantsListModel;
      this.personalBestList = await this.apiService.getPersonalBestList(this.listId, this.pblId);
      this.memberList = await this.apiService.getParticipantsListMembers(this.listId);
      this.navbarService.setPageTitle(`PRs voor ${this.personalBestList.name}`)
    }
    catch (error) {
      this.errorMessage = 'Data kan niet worden geladen: ' + error;
    }
  }

  async new(): Promise<void> {
    this.entryId = -1;
  }

  async open(entry: PersonalBestListEntryModel): Promise<void> {
    this.entryId = entry.id;
  }

  async editError($event: string): Promise<void> {
    this.errorMessage = $event;
  }

  async editClose(): Promise<void> {
    this.entryId = 0;
    await this.ngOnInit();
  }
}
