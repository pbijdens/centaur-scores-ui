import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MatchModel } from '../../models/match-model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarService } from '../../services/navbar.service';
import { ControlDropdownButtonComponent } from "../../shared/control-dropdown-button/control-dropdown-button.component";
import { ControlUpButtonComponent } from "../../shared/control-up-button/control-up-button.component";
import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'app-matches-list',
  standalone: true,
  imports: [RouterModule, CommonModule, ControlDropdownButtonComponent, ControlUpButtonComponent],
  templateUrl: './matches-list.component.html',
  styleUrl: './matches-list.component.less'
})
export class MatchesListComponent implements OnInit {
  public matches: Array<MatchModel> = [];
  public errorMessage?: string;

  constructor(public apiService: ApiService, public navbarService: NavbarService, public authorizationService: AuthorizationService) {
    this.navbarService.setPageTitle('Alle wedstrijden');
  }

  async refresh(): Promise<void> {
    try {
      this.matches = await this.apiService.getMatches();
    } catch (err) {
      this.errorMessage = `Er is iets niet goed gegaan: ${err}`;
    }
  }

  async ngOnInit(): Promise<void> {
    await this.refresh();
  }
}
