import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthorizationService } from '../../services/authorization.service';
import { NavbarService } from '../../services/navbar.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { KeysPipe } from '../../pipes/keys.pipe';
import { ControlDropdownButtonComponent } from '../../shared/control-dropdown-button/control-dropdown-button.component';
import { ControlUpButtonComponent } from '../../shared/control-up-button/control-up-button.component';
import { MatchResultModel } from '../../models/match-result-model';
import { ErrorComponent } from "../../shared/error/error.component";
import { MatchModel } from '../../models/match-model';
import { GetGroupNamePipe } from '../../pipes/getgroupname.pipe';
import { HeadToHeadScore } from '../../models/head-to-head-score';
import { HeadToHeadMatchStatus } from '../../models/head-to-head-match-status';

@Component({
  selector: 'app-match-h2h-manager',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, KeysPipe, GetGroupNamePipe, ControlUpButtonComponent, ErrorComponent],
  templateUrl: './match-h2h-manager.component.html',
  styleUrl: './match-h2h-manager.component.less'
})
export class MatchH2hManagerComponent implements OnInit {
  public error?: string;
  public id = -1;
  public match?: MatchModel;
  public results?: MatchResultModel;
  public titels = ['', 'Achtste finale', 'Kwart finale', 'Halve finale', 'Finale'];


  constructor(public activatedRoute: ActivatedRoute, public router: Router, private apiService: ApiService, public authorizationService: AuthorizationService, public navbarService: NavbarService) {
    this.id = this.activatedRoute.snapshot.params['id'] as number;
  }

  async ngOnInit(): Promise<void> {
    await this.refresh();
  }

  async refresh(): Promise<void> {
    try {
      this.match = await this.apiService.getMatch(this.id);
      if (this.match) {
        this.navbarService.setPageTitle(`${this.match.matchName}`);
        this.results = await this.apiService.getSingleMatchResults(this.match.id);
      }
    } catch (err) {
      this.error = `Laden mislukt: ${err}`;
    }
  }

  async nextRound(): Promise<void> {
    if (confirm('Weet je zeker dat je de volgende ronde wil starten?\n\nDoe dit alleen wanneer alle wedstrijden in deze ronde afgelopen zijn en alle winnaars zijn aangemerkt.\n\nJe kan deze actie niet ongedaan maken.')) {
      try {
        await this.apiService.putH2HNextRound(this.match?.id ?? -1);
        await this.refresh();
      }
      catch (err) {
        this.error = `Kon volgende ronde niet activeren. Wijs handmatig een winaaar aan voor alle wedstrijden, zelfs als de uitslag vanuit de score duidelijk is.`;
      }
    }
  }

  async prevRound(): Promise<void> {
    if (confirm('Doe dit alleen in geval van nood. Dit reset alle tablets en verstoort de huidige finale.\n\nZeker weten?')) {
      try {
        await this.apiService.putH2HPrevRound(this.match?.id ?? -1);
        await this.refresh();
      }
      catch (err) {
        this.error = `Kon vorige ronde niet activeren. Wijs handmatig een winaaar aan voor alle wedstrijden, zelfs als de uitslag vanuit de score duidelijk is.`;
      }
    }
  }

  async setWinner(discipline: string, bracket: HeadToHeadScore, winner: HeadToHeadMatchStatus | null | undefined, loser: HeadToHeadMatchStatus | null | undefined) {
    try {
      await this.apiService.updateH2HWinner(this.match?.id ?? -1, discipline, bracket.bracketNumber, winner?.participant.id ?? -1, loser?.participant.id ?? -1);
      await this.refresh();
    }
    catch (err) {
      this.error = `Aanmerken als winnaar mislukt: ${err}`;
    }
  }

}
