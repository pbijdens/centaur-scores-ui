import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
import { PersonalBestListEntryModel } from '../../models/personal-lest-list-entry-model';
import { KeysPipe } from "../../pipes/keys.pipe";

@Component({
  selector: 'app-personal-best-lists',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ControlUpButtonComponent, EditPersonalBestListMetadataComponent, ControlDropdownButtonComponent, KeysPipe],
  templateUrl: './personal-best-lists.component.html',
  styleUrl: './personal-best-lists.component.less'
})
export class PersonalBestListsComponent implements OnInit {

  public listId = -1;
  public pbListId = 0;
  public errorMessage = '';

  public participantsList!: ParticipantsListModel;
  public personalBestLists: PersonalBestListModel[] = [];

  public print = false;

  constructor(private apiService: ApiService, public activatedRoute: ActivatedRoute, public router: Router, public navbarService: NavbarService) {
    this.listId = this.activatedRoute.snapshot.params['listId'] as number || -1;
    this.print = JSON.parse(this.activatedRoute.snapshot.queryParams['print'] || 'false');
    activatedRoute.queryParams.subscribe(p => {
      const newValue = JSON.parse(p['print'] || 'false');
      if (newValue !== this.print) {
        this.print = newValue;
        this.refresh();
      }
    });
  }

  async ngOnInit(): Promise<void> {
    await this.refresh();
  }

  async refresh(): Promise<void> {
    if (this.listId > -1) {
      this.participantsList = await this.apiService.getParticipantsList(this.listId) as ParticipantsListModel;
      this.navbarService.setPageTitle(`PRs voor ${this.participantsList.name}`)

      this.personalBestLists = await this.apiService.getPersonalBestLists(this.listId);

      // For printing we add a special copy of the entries, grouped by discipline
      // we also load all lists explicitly so the entries get included.
      if (this.print && this.personalBestLists) {
        for(var index = 0; index < this.personalBestLists.length; index++) {
          this.personalBestLists[index] = await this.apiService.getPersonalBestList(this.listId, this.personalBestLists[index].id);          
          if (!this.personalBestLists[index].entriesByDiscipline) this.personalBestLists[index].entriesByDiscipline = {};
          const byDiscipline = this.personalBestLists[index].entriesByDiscipline;
          this.personalBestLists[index].entries.forEach(entry => {
            if (!Object.hasOwn(byDiscipline, entry.discipline)) byDiscipline[entry.discipline] = [];
            byDiscipline[entry.discipline].push(entry);            
          });
        }
      }
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

