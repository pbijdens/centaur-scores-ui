import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { MatchModel } from '../models/match-model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { map } from 'rxjs';
import { GroupInfo } from '../models/group-info';
import { ScoreButtonDefinition } from '../models/score-button-definition';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-match-editor',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './match-editor.component.html',
  styleUrl: './match-editor.component.less'
})
export class MatchEditorComponent implements OnInit {
  public match?: MatchModel;
  public id: number = -1;
  public error?: String;

  constructor(public apiService: ApiService, public activatedRoute: ActivatedRoute, public router: Router) {
    this.id = this.activatedRoute.snapshot.params['id'] as number;
  }

  async ngOnInit(): Promise<void> {
    await this.refresh();
  }

  async refresh() {
    if (this.id >= 0) {
      try {
        this.match = await this.apiService.getMatch(this.id);
      }
      catch (error) {
        this.error = `Kon wedstrijd met id ${this.id} niet laden: ${error}`;
      }
    } else {
      this.match = <MatchModel>{
        arrowsPerEnd: 3,
        autoProgressAfterEachArrow: true,
        groups: [<GroupInfo>{ code: '-', label: 'Onbekend' }, <GroupInfo>{ code: 'R', label: 'Recurve' }, <GroupInfo>{ code: 'C', label: 'Compound' }, <GroupInfo>{ code: 'H', label: 'Hout, barebow, longbow' }],
        subGroups: [<GroupInfo>{ code: '-', label: '' }, <GroupInfo>{ code: 'J', label: 'Aspiranten (9-12))' }, <GroupInfo>{ code: 'J', label: 'Junioren (12-18))' }, <GroupInfo>{ code: 'S', label: 'Senioren' }, <GroupInfo>{ code: 'M', label: 'Masters (50+)' }],
        id: -1,
        lijnen: ['A', 'B', 'C', 'D'],
        matchCode: '',
        matchName: '',
        numberOfEnds: 10,
        scoreValues: {
          '-,R,H': <Array<ScoreButtonDefinition>>[
            <ScoreButtonDefinition>{ label: '10', value: 10 },
            <ScoreButtonDefinition>{ label: '9', value: 9 },
            <ScoreButtonDefinition>{ label: '8', value: 8 },
            <ScoreButtonDefinition>{ label: '7', value: 7 },
            <ScoreButtonDefinition>{ label: '6', value: 6 },
            <ScoreButtonDefinition>{ label: '5', value: 5 },
            <ScoreButtonDefinition>{ label: '4', value: 4 },
            <ScoreButtonDefinition>{ label: '3', value: 3 },
            <ScoreButtonDefinition>{ label: '2', value: 2 },
            <ScoreButtonDefinition>{ label: '1', value: 1 },
            <ScoreButtonDefinition>{ label: 'Mis', value: 0 },
            <ScoreButtonDefinition>{ label: 'Del', value: null },
          ],
          'C': <Array<ScoreButtonDefinition>>[
            <ScoreButtonDefinition>{ label: '10', value: 10 },
            <ScoreButtonDefinition>{ label: '9', value: 9 },
            <ScoreButtonDefinition>{ label: '8', value: 8 },
            <ScoreButtonDefinition>{ label: '7', value: 7 },
            <ScoreButtonDefinition>{ label: '6', value: 6 },
            <ScoreButtonDefinition>{ label: 'Mis', value: 0 },
            <ScoreButtonDefinition>{ label: 'Del', value: null },
          ]
        }
      };
      console.log(this.match)
    }
    this.match!.lijnenAsString = this.match!.lijnen.join('');
  }

  async save() {
    this.match!.lijnen = this.match!.lijnenAsString.split('');
    if (-1 == this.id) {
      const newMatch = await this.apiService.postMatch(this.match!);
      this.router.navigate(['/', 'edit', `${newMatch?.id ?? -1}`])
    } else {
      const newMatch = await this.apiService.putMatch(this.match!);
      await this.refresh();
    }
  }

  async setActive(value: boolean): Promise<void> {
    const newMatch = await this.apiService.setActive(this.match!, value);
    await this.refresh();
  }

  async delete(): Promise<void> {
    await this.refresh(); // TODO: pop up for confirmation, then delete
  }
}
