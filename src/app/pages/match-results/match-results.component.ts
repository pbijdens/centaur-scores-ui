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
import { ControlUpButtonComponent } from "../../shared/control-up-button/control-up-button.component";
import { ResultTableFooterComponent } from './result-table-footer/result-table-footer.component';
import { MatchResultsKnockoutComponent } from "./match-results-knockout/match-results-knockout.component";

@Component({
  selector: 'app-match-results',
  standalone: true,
  imports: [CommonModule, KeysPipe, GetGroupNamePipe, MatchResultsTableComponent, ControlUpButtonComponent, ResultTableFooterComponent, MatchResultsKnockoutComponent],
  templateUrl: './match-results.component.html',
  styleUrl: './match-results.component.less'
})
export class MatchResultsComponent implements OnInit, OnDestroy {
  public id = -1;

  public results?: MatchResultModel;
  public match?: MatchModel;

  public tab = 1;
  public intervalId: any;

  public refreshTimeoutCache = 15000;
  public refreshTimeout = 15000;
  public refreshUpdateInterval = 1000;

  public isH2H = false;
  public shift = 0;

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
    this.refreshTimeoutCache = this.refreshTimeout;
    await this.refresh();

    if (this.isH2H) {
      this.refreshTimeoutCache = this.refreshTimeout = 5000;
      this.refreshUpdateInterval = 1000;
    } 

    const updateTime = this.refreshUpdateInterval;

    this.intervalId = setInterval(() => {
      this.refreshTimeoutCache -= updateTime;
      if (this.refreshTimeoutCache <= 0) {
        this.refresh();
        this.refreshTimeoutCache = this.refreshTimeout;
      }
    }, updateTime);
  }

  public errorMessage?: string;
  async refresh(): Promise<void> {
    try {
      if (this.id == -1) {
        this.match = await this.apiService.getActiveMatch();
      } else {
        this.match = await this.apiService.getMatch(this.id);
      }
      if (this.match) {
        this.isH2H = (this.match.matchFlags & 0x1) == 0x1;
        this.tab = +(await this.apiService.getMatchUiSetting(this.match?.id?? -1, "ActiveResultsTab") ?? "1");
        this.navbarService.setPageTitle(`Uitslag ${this.match.matchName}`, false);
        const result = await this.apiService.getSingleMatchResults(this.match.id);
        if (this.isH2H && result && result.groups && result.groups.length > 0) {
          for (let i = 0; i < this.shift; i++) {
            const elt = result.groups.shift();
            elt && result.groups.push(elt);
          }
          console.log(result.groups);
          this.shift = (this.shift + 1) % result.groups.length;
        }
        this.results = result;
      } else {
        this.isH2H = false;
      }
      delete this.errorMessage;
    } catch (err) {
      this.errorMessage = `Laden mislukt: ${err}`;
    }
  }

  async updateActiveTab(tabId: number) {
    this.tab = tabId;
    await this.apiService.updateMatchUiSetting(this.match?.id ?? -1, "ActiveResultsTab", `${tabId}`);
  }
}
