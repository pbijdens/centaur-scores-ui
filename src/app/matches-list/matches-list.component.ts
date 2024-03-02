import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { MatchModel } from '../models/match-model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-matches-list',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './matches-list.component.html',
  styleUrl: './matches-list.component.less'
})
export class MatchesListComponent implements OnInit {
  public matches: Array<MatchModel> = [];

  constructor(public apiService: ApiService) {
  }

  async refresh(): Promise<void> {
    this.matches = await this.apiService.getMatches();
  }

  async ngOnInit(): Promise<void> {
    await this.refresh();   
  }
}
