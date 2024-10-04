import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from '../api.service';
import { NavbarService } from '../navbar.service';
import { CompetitionModel } from '../models/competition-model';
import { MatchMetadataModel } from '../models/match-metadata-model';
import { EditCompetitionMetadataComponent } from "../shared/edit-competition-metadata/edit-competition-metadata.component";
import { MatchModel } from '../models/match-model';
import { EditMatchMetadataComponent } from "../shared/edit-match-metadata/edit-match-metadata.component";
import { ControlDropdownButtonComponent } from "../shared/control-dropdown-button/control-dropdown-button.component";

@Component({
  selector: 'app-manage-competition',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, EditCompetitionMetadataComponent, EditMatchMetadataComponent, ControlDropdownButtonComponent],
  templateUrl: './manage-competition.component.html',
  styleUrl: './manage-competition.component.less'
})
export class ManageCompetitionComponent implements OnInit {
  public errorMessage?: string;

  public competition?: CompetitionModel;
  public competitionId: number;
  public editCompetition?: CompetitionModel;

  public match?: MatchModel;

  constructor(public activatedRoute: ActivatedRoute, public apiService: ApiService, public navbarService: NavbarService) {
    this.navbarService.setPageTitle('Competitie beheren');
    this.competitionId = this.activatedRoute.snapshot.params['competitionId'] as number;
  }

  async ngOnInit(): Promise<void> {
    this.refresh();
  }

  async refresh(): Promise<void> {
    this.competition = await this.apiService.getCompetition(this.competitionId);
    if (!this.competition) {
      this.errorMessage = `De competitie met ID ${this.competitionId} kan niet geladen worden`;
    }
  }

  async newMatch(): Promise<void> {
    this.match = <MatchModel>{ id: -1 };
  }

  async editMatch(match: MatchMetadataModel): Promise<void> {
    this.match = JSON.parse(JSON.stringify(match));
  }

  async setActiveMatch(match: MatchMetadataModel): Promise<void> {
    await this.apiService.setActive(<MatchModel>{ id: match.id }, true);
    await this.refresh();
  }

  async editMatchClose(): Promise<void> {
    delete this.match;
    await this.refresh();
  }

  async editMatchError(message: string): Promise<void> {
    this.errorMessage = message;
  }

  async editCompetitionOpen(): Promise<void> {
    this.editCompetition = this.competition;
  }

  async editCompetitionClose(): Promise<void> {
    delete this.editCompetition;
    await this.refresh();
  }

  async editCompetitionError(message: string): Promise<void> {
    this.errorMessage = message;
  }
}
