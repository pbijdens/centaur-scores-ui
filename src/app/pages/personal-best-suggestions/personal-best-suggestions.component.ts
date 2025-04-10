import { Component } from '@angular/core';
import { ControlUpButtonComponent } from "../../shared/control-up-button/control-up-button.component";
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NewPersonalBestModel } from '../../models/new-personal-best-model';
import { ControlDropdownButtonComponent } from "../../shared/control-dropdown-button/control-dropdown-button.component";
import { ApiService } from '../../services/api.service';
import { NavbarService } from '../../services/navbar.service';
import { PersonalBestListModel } from '../../models/personal-best-list-model';
import { ParticipantsListModel } from '../../models/participants-list-model';
import { GetPbListName } from "../../pipes/getpblistname.pipe";
import { PersonalBestListEntryModel } from '../../models/personal-lest-list-entry-model';
import { AuthorizationService } from '../../services/authorization.service';
import { ErrorComponent } from "../../shared/error/error.component";

@Component({
  selector: 'app-personal-best-suggestions',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ControlUpButtonComponent, ControlDropdownButtonComponent, GetPbListName, ErrorComponent],
  templateUrl: './personal-best-suggestions.component.html',
  styleUrl: './personal-best-suggestions.component.less'
})
export class PersonalBestSuggestionsComponent {

  public errorMessage = '';

  public listId = -1;
  public showRecord?: NewPersonalBestModel;
  public suggestions: NewPersonalBestModel[] = [];
  public personalBestLists: PersonalBestListModel[] = [];
  public participantsList: ParticipantsListModel = <ParticipantsListModel>{};

  constructor(private apiService: ApiService, public activatedRoute: ActivatedRoute, public router: Router, public navbarService: NavbarService, public authorizationService: AuthorizationService) {
    this.listId = this.activatedRoute.snapshot.params['listId'] as number || -1;
  }

  async ngOnInit(): Promise<void> {
    try {
      if (this.listId > -1) {
        this.participantsList = await this.apiService.getParticipantsList(this.listId) as ParticipantsListModel;
        this.personalBestLists = await this.apiService.getPersonalBestLists(this.listId) as PersonalBestListModel[];
        this.navbarService.setPageTitle(`Nieuwe PRs voor ${this.participantsList.name}`)
        await this.refresh();
      }
    }
    catch (error) {
      this.errorMessage = `Laden mislukt: ${error}`;
    }
  }

  public loading =  true;
  async refresh(): Promise<void> {
    try {
      this.loading = true;
      this.suggestions = await this.apiService.getPersonalBestSuggestions(this.listId) as NewPersonalBestModel[];
    } catch (err) {
      this.errorMessage = `Laden mislukt: ${err}`;
    }
    this.loading = false;
  }

  async select(pb: NewPersonalBestModel): Promise<void> {
    try {
      const model: PersonalBestListEntryModel = <PersonalBestListEntryModel>{
        achieved: pb.achieved,
        discipline: pb.discipline,
        id: pb.id,
        notes: pb.notes,
        participant: pb.participant,
        score: pb.score
      };
      const index = this.suggestions.indexOf(pb);
      this.suggestions.splice(index, 1);
      const pbl = await this.apiService.getPersonalBestList(this.listId, pb.listId);
      if (!model.id || model.id < 0) {
        await this.apiService.createPersonalBestListEntry(this.listId, pbl, model);
      } else {
        await this.apiService.updatePersonalBestListEntry(this.listId, pbl, model);
      }
      // await this.refresh();
      // let's not refresh but instead remove the item from the list...
    } catch (error) {
      this.errorMessage = `Opslaan mislukt: ${error}`;;
    }
  }
}
