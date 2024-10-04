import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CompetitionModel } from '../../models/competition-model';
import { FormsModule } from '@angular/forms';
import { NavbarService } from '../../services/navbar.service';
import { EditCompetitionMetadataComponent } from '../../shared/edit-competition-metadata/edit-competition-metadata.component';
import { ControlDropdownButtonComponent } from "../../shared/control-dropdown-button/control-dropdown-button.component";

@Component({
  selector: 'app-competitions-list',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, EditCompetitionMetadataComponent, ControlDropdownButtonComponent],
  templateUrl: './competitions.component.html',
  styleUrl: './competitions.component.less'
})
export class CompetitionsComponent implements OnInit {
  public competitions: Array<CompetitionModel> = [];
  public errorMessage?: string;
  public selectedCompetition?: CompetitionModel;

  constructor(public apiService: ApiService, public navbarService: NavbarService) {
    this.navbarService.setPageTitle('Competities');
  }

  async refresh(): Promise<void> {
    this.competitions = await this.apiService.getCompetitions();
  }

  async ngOnInit(): Promise<void> {
    await this.refresh();
  }

  async newCompetition(): Promise<void> {
    this.selectedCompetition = <CompetitionModel>{
      id: -1,
      name: ''
    };
  }

  async openProperties(competition: CompetitionModel): Promise<void> {
    this.selectedCompetition = JSON.parse(JSON.stringify(competition));
  }

  async onError(error: string): Promise<void> {
    this.errorMessage = error;
  }

  async onClose() {
    delete this.selectedCompetition;
    await this.refresh();
  }
}
