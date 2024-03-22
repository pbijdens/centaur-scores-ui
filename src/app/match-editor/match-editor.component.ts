import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ApiService } from '../api.service';
import { MatchModel } from '../models/match-model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatchTemplates } from '../models/match-templates';
import { KeysPipe } from '../keys.pipe';
import { GroupsEditorComponent } from './groups-editor/groups-editor.component';

@Component({
  selector: 'app-match-editor',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, KeysPipe, GroupsEditorComponent],
  templateUrl: './match-editor.component.html',
  styleUrl: './match-editor.component.less'
})
export class MatchEditorComponent implements OnInit, OnChanges {
  public match?: MatchModel;
  public id: number = -1;
  public error?: String;
  public templates = MatchTemplates;
  public selectedTemplate = MatchTemplates[0];

  constructor(public apiService: ApiService, public activatedRoute: ActivatedRoute, public router: Router) {
    this.id = this.activatedRoute.snapshot.params['id'] as number;
  }

  async ngOnInit(): Promise<void> {
    await this.refresh();
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
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
      this.match = JSON.parse(JSON.stringify(this.selectedTemplate.model));
    }
    this.match!.lijnenAsString = this.match!.lijnen.join('');
  }

  async save() {
    this.match!.lijnen = this.match!.lijnenAsString.split('');
    if (-1 == this.id) {
      const newMatch = await this.apiService.postMatch(this.match!);
      // this.router.navigate(['/', 'edit', `${newMatch?.id ?? -1}`])
      this.router.navigate(['/']);
    } else {
      const newMatch = await this.apiService.putMatch(this.match!);
      this.router.navigate(['/']);
      //await this.refresh();
    }
  }

  async setActive(value: boolean): Promise<void> {
    const newMatch = await this.apiService.setActive(this.match!, value);
    await this.refresh();
  }

  async delete(): Promise<void> {
    await this.refresh(); // TODO: pop up for confirmation, then delete
  }

  async matchTypeChanged(event: any, value: any) { 

    this.match = JSON.parse(JSON.stringify(this.selectedTemplate.model));
    this.match!.lijnenAsString = this.match!.lijnen.join('');
  }
}
