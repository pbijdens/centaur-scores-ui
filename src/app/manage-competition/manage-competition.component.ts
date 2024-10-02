import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from '../api.service';
import { NavbarService } from '../navbar.service';
import { CompetitionModel } from '../models/competition-model';
import { MatchMetadataModel } from '../models/match-metadata-model';
import { EditCompetitionMetadataComponent } from "../shared/edit-competition-metadata/edit-competition-metadata.component";

@Component({
  selector: 'app-manage-competition',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, EditCompetitionMetadataComponent],
  templateUrl: './manage-competition.component.html',
  styleUrl: './manage-competition.component.less'
})
export class ManageCompetitionComponent implements OnInit {
  public errorMessage?: string;
  public competition?: CompetitionModel;
  public competitionId: number;
  public editCompetition?: CompetitionModel;

  constructor(public activatedRoute: ActivatedRoute, public apiService: ApiService, public navbarService: NavbarService) {
    this.navbarService.setPageTitle('Competitie beheren');
    this.competitionId = this.activatedRoute.snapshot.params['competitionId'] as number;
  }
  
  async ngOnInit(): Promise<void> {
    this.refresh();
  }

  async refresh() : Promise<void> {
    this.competition = await this.apiService.getCompetition(this.competitionId);
    if (!this.competition) {
      this.errorMessage = `De competitie met ID ${this.competitionId} kan niet geladen worden`;
    }
  }

  async newMatch(): Promise<void> {

  }

   async editMatch(match: MatchMetadataModel): Promise<void> {
    
  }

  async saveMatch(): Promise<void> {
    
  }

  async closeMatch(): Promise<void> {

  }
  
  async editCompetitionOpen(): Promise<void> {
    this.editCompetition = this.competition;
  }

  async editCompetitionClose(): Promise<void> {
    delete this.editCompetition;
    this.refresh();
  }

  async editCompetitionError(message: string): Promise<void> {
    this.errorMessage = message;
  }
}
