import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CompetitionModel } from '../../models/competition-model';
import { MatchModel } from '../../models/match-model';
import { ApiService } from '../../services/api.service';
import { SelectRulesetComponent } from "../select-ruleset/select-ruleset.component";
import { GroupsEditorComponent } from "../groups-editor/groups-editor.component";
import { KeysPipe } from '../../pipes/keys.pipe';
import { DpDatePickerModule } from 'ng2-date-picker';
import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'app-edit-match-metadata',
  standalone: true,
  imports: [CommonModule, FormsModule, SelectRulesetComponent, GroupsEditorComponent, KeysPipe, DpDatePickerModule],
  templateUrl: './edit-match-metadata.component.html',
  styleUrl: './edit-match-metadata.component.less'
})
export class EditMatchMetadataComponent implements OnInit, OnChanges {
  @Input() competitionId!: number;
  @Input() matchId!: number;

  @Output() onError = new EventEmitter<string>();
  @Output() onClose = new EventEmitter<void>();

  public errorMessage?: string;

  public competition?: CompetitionModel;
  public match?: MatchModel;

  public tab = 0;

  // If a competition is specified, the user should choose one of the rulesets allowed for
  // a match within that competition.
  //
  // If the ruleset requires specific values for targets, classes, number of ends, arrows 
  // per end etc. then it's not possible to deviate from these values when creating or 
  // editing a match.

  constructor(public apiService: ApiService, public authorizationService: AuthorizationService) { }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    // if (!this.competition && this.competitionId >= 0) {
    //   this.competition = await this.apiService.getCompetition(this.competitionId);
    // }
    // if (!this.match && this.matchId >= 0) {
    //   this.match = await this.apiService.getMatch(this.matchId);
    // }
  }

  async ngOnInit(): Promise<void> {
    try {
      if (this.competitionId >= 0) {
        this.competition = await this.apiService.getCompetition(this.competitionId);
      }
      if (this.matchId >= 0) {
        this.match = await this.apiService.getMatch(this.matchId);
        this.match!.lijnenAsString = this.match!.lijnen.join('');
      } else {
        const code = `${new Date().getUTCFullYear()}-01-01`;
        this.match = <MatchModel>{ id: -1, lijnenAsString: 'ABCD', lijnen: ['A', 'B', 'C', 'D'], matchCode: code };
        if (this.competition) {
          this.match.competition = this.competition;
        }
      }
    } catch (err) {
      this.errorMessage = `Laden mislukt: ${err}`;
      this.onError.emit(`Kon gegevens niet inladen.`);
    }
  }

  async close(): Promise<void> {
    this.onClose.emit();
  }

  async deleteEntity(): Promise<void> {
    if (this.match) {
      if (confirm(`Weet je zeker dat je de wedstrijd ${this.match.matchCode} - ${this.match.matchName} met id ${this.match.id} wil verwijderen? Dit verwijdert ook alle scores voor deze wedstrijd. Dit kan niet ongedaan worden gemaakt.`)) {
        try {
          await this.apiService.deleteMatch(this.match);
        } catch (err) {
          this.onError.emit(`Kon de wedstrijd niet verwijderen.`);
        }
        this.onClose.emit();
      }
    }
  }

  async saveEntity(): Promise<void> {
    if (this.match) {
      this.match.lijnen = this.match.lijnenAsString.split('');
      if (this.match.id <= 0) {
        try {
          await this.apiService.postMatch(this.match);
        } catch (err) {
          this.onError.emit(`De wedstrijd kon niet worden toegevoegd.`);
        }
        this.onClose.emit();
      }
      else {
        try {
          await this.apiService.putMatch(this.match);
        } catch (err) {
          this.onError.emit(`Aanpassingen aan de wedstrijd konden niet worden opgeslagen.`);
        }
        this.onClose.emit();
      }
    }
  }

  async setMatchRuleset(event: string) {
    if (this.match) {
      this.match.rulesetCode = event;

      const rulesets = await this.apiService.getRulesets();
      const ruleset = rulesets.find(x => x.code == event);
      if (!ruleset) {
        this.errorMessage = `Regels met code ${event} kunnen niet gevonden worden.`;
      } else {
        if (ruleset.requiredArrowsPerEnd) this.match.arrowsPerEnd = ruleset.requiredArrowsPerEnd;
        if (ruleset.requiredClasses) this.match.groups = ruleset.requiredClasses;
        if (ruleset.requiredSubclasses) this.match.subgroups = ruleset.requiredSubclasses;
        if (ruleset.requiredEnds) this.match.numberOfEnds = ruleset.requiredEnds;
        if (ruleset.requiredTargets) this.match.targets = ruleset.requiredTargets;
        if (ruleset.requiredScoreValues) this.match.scoreValues = ruleset.requiredScoreValues;
      }
      this.match!.lijnenAsString = this.match!.lijnen.join('');
    }
  }
}
