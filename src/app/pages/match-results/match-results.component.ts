import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarService } from '../../services/navbar.service';
import { MatchResultModel } from '../../models/match-result-model';
import { CommonModule } from '@angular/common';
import { MatchModel } from '../../models/match-model';
import { KeysPipe } from "../../pipes/keys.pipe";
import { GetGroupNamePipe } from '../../pipes/getgroupname.pipe';
import { MatchResultsTableComponent } from "./match-results-table/match-results-table.component";

@Component({
  selector: 'app-match-results',
  standalone: true,
  imports: [CommonModule, KeysPipe, GetGroupNamePipe, MatchResultsTableComponent],
  templateUrl: './match-results.component.html',
  styleUrl: './match-results.component.less'
})
export class MatchResultsComponent implements OnInit, OnDestroy {
  public id = -1;

  public results?: MatchResultModel;
  public match?: MatchModel;

  public tab = 1;
  public intervalId: any;

  public refreshUpdateInterval = 50;
  public refreshTimeoutCache = 15000;
  public refreshTimeout = 15000;

  constructor(public apiService: ApiService, public activatedRoute: ActivatedRoute, public router: Router, public navbarService: NavbarService) {
    this.navbarService.setPageTitle('Uitslagen');

    if (this.activatedRoute.snapshot.params['id']) {
      this.id = this.activatedRoute.snapshot.params['id'] as number;
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
    if (this.id == -1) {
      this.match = await this.apiService.getActiveMatch();
    } else {
      this.match = await this.apiService.getMatch(this.id);
    }
    if (this.match) {
      this.navbarService.setPageTitle(`Uitslag ${this.match.matchName}`);
      this.results = await this.apiService.getSingleMatchResults(this.match.id);
    }
  }
}