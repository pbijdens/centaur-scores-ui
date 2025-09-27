import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActiveListService } from '../../services/active-list.service';
import { ControlDropdownLinkComponent } from '../control-dropdown-link/control-dropdown-link.component';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ParticipantsListModel } from '../../models/participants-list-model';
import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'app-select-active-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ControlDropdownLinkComponent],
  templateUrl: './select-active-list.component.html',
  styleUrl: './select-active-list.component.less'
})
export class SelectActiveListComponent implements OnInit {

  activeListTitle: string = 'Actieve lijst.';
  public allLists: ParticipantsListModel[] = [];
  public activeList: ParticipantsListModel | undefined = undefined as ParticipantsListModel | undefined;

  constructor(public apiService: ApiService, public activeListService: ActiveListService, public authorizationService: AuthorizationService, public router: Router) {
  }

  async ngOnInit(): Promise<void> {
    this.activeListService.activeList$.subscribe(async listId => {
      this.allLists = await this.apiService.getParticipantsLists(false);
      this.activeList = this.allLists.find(l => l.id === listId);
      this.activeListTitle = this.activeList?.name ?? 'Actieve lijst';
    });
  }

  async selectList(list: ParticipantsListModel) {
    this.activeListService.setActiveList(list?.id);
    this.router.navigate(['/'], { info: {reload: true}});
  }

}
