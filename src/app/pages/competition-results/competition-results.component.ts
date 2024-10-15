import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KeysPipe } from '../../pipes/keys.pipe';
import { GetGroupNamePipe } from '../../pipes/getgroupname.pipe';
import { CompetitionModel } from '../../models/competition-model';
import { CompetitionResultModel } from '../../models/competition-result-model';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarService } from '../../services/navbar.service';
import { CompetitionResultsTableComponent } from "./competition-results-table/competition-results-table.component";
import { ControlUpButtonComponent } from "../../shared/control-up-button/control-up-button.component";

@Component({
  selector: 'app-competition-results',
  standalone: true,
  imports: [CommonModule, KeysPipe, GetGroupNamePipe, CompetitionResultsTableComponent, ControlUpButtonComponent],
  templateUrl: './competition-results.component.html',
  styleUrl: './competition-results.component.less'
})
export class CompetitionResultsComponent {
  public id = -1;

  public results?: CompetitionResultModel;
  public competition?: CompetitionModel;

  public tab = 1;
  public intervalId: any;

  public refreshUpdateInterval = 50;
  public refreshTimeoutCache = 60000;
  public refreshTimeout = 60000;

  public errorMessage?: string;

  constructor(public apiService: ApiService, public activatedRoute: ActivatedRoute, public router: Router, public navbarService: NavbarService) {
    this.navbarService.setPageTitle('Uitslagen');

    if (this.activatedRoute.snapshot.params['competitionId']) {
      this.id = this.activatedRoute.snapshot.params['competitionId'] as number;
    } else {
      this.id = -1;
    }
  }
  async ngOnDestroy(): Promise<void> {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      delete this.intervalId;
    }
  }

  async ngOnInit(): Promise<void> {
    const updateTime = this.refreshUpdateInterval;
    this.refreshTimeoutCache = this.refreshTimeout;
    await this.refresh();
    this.intervalId = setInterval(() => {
      this.refreshTimeoutCache -= updateTime;
      if (this.refreshTimeoutCache <= 0) {
        this.refresh();
        this.refreshTimeoutCache = this.refreshTimeout;
      }
    }, updateTime);
  }

  async refresh(): Promise<void> {
    try {
      this.competition = await this.apiService.getCompetition(this.id);
      if (this.competition) {
        this.navbarService.setPageTitle(`Uitslag ${this.competition.name}`);
        this.results = await this.apiService.getCompetitionResults(this.competition.id);
      }
      delete this.errorMessage;
    } catch (err) {
      this.errorMessage = `Laden mislukt: ${err}...`;
    }
  }
}
