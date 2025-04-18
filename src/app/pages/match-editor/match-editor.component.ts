import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MatchModel } from '../../models/match-model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatchTemplates } from '../../models/match-templates';
import { KeysPipe } from '../../pipes/keys.pipe';
import { GroupsEditorComponent } from '../../shared/groups-editor/groups-editor.component';
import { NavbarService } from '../../services/navbar.service';
import { EditMatchMetadataComponent } from "../../shared/edit-match-metadata/edit-match-metadata.component";
import { EditParticipantScoresheetComponent } from "../../shared/edit-participant-scoresheet/edit-participant-scoresheet.component";
import { ParticipantModel } from '../../models/participant-model';
import { ControlDropdownButtonComponent } from "../../shared/control-dropdown-button/control-dropdown-button.component";
import { EditParticipantLinkComponent } from "../../shared/edit-participant-link/edit-participant-link.component";
import { CompetitionModel } from '../../models/competition-model';
import { ControlUpButtonComponent } from "../../shared/control-up-button/control-up-button.component";
import { AuthorizationService } from '../../services/authorization.service';
import { ErrorComponent } from "../../shared/error/error.component";
import { MatchFinalDefinition } from '../../models/match-final-definition';
import { FinalsCreateConfigurationComponent } from "../../shared/finals-create-configuration/finals-create-configuration.component";

@Component({
  selector: 'app-match-editor',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, KeysPipe, GroupsEditorComponent, EditMatchMetadataComponent, EditParticipantScoresheetComponent, ControlDropdownButtonComponent, EditParticipantLinkComponent, ControlUpButtonComponent, ErrorComponent, FinalsCreateConfigurationComponent],
  templateUrl: './match-editor.component.html',
  styleUrl: './match-editor.component.less'
})
export class MatchEditorComponent implements OnInit, OnChanges {
  public match?: MatchModel;
  public matchForProperties?: MatchModel;
  public id: number = -1;
  public error?: string;
  public selectedTemplate = MatchTemplates[0];
  public competitionId = -1;
  public competition: CompetitionModel | undefined;
  public participantForProperties?: ParticipantModel;
  public participantForLinking?: ParticipantModel;
  public specifyFinalSettings: boolean = false;
  public participants: ParticipantModel[] = [];
  public isH2H: boolean = false;

  constructor(public apiService: ApiService, public activatedRoute: ActivatedRoute, public router: Router, public navbarService: NavbarService, public authorizationService: AuthorizationService) {
    this.id = this.activatedRoute.snapshot.params['id'] as number;
    if (this.id == -1)
      this.navbarService.setPageTitle('Nieuwe wedstrijd');
    else
      this.navbarService.setPageTitle('Wedstrijd bewerken');
  }

  async ngOnInit(): Promise<void> {
    await this.refresh();
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (!this.participants || !this.participants.length) {
      await this.refresh();
    }
  }

  async refresh() {
    try {
      if (this.id >= 0) {
        try {
          this.match = await this.apiService.getMatch(this.id);
          this.isH2H = this.match && ((this.match.matchFlags & 0x1) == 0x1);
          this.match!.lijnenAsString = this.match!.lijnen.join('');
          this.match!.isFinale = this.match && ((this.match.matchFlags & 0x1) == 0x1);
          if (this.match.competition) {
            this.competitionId = this.match.competition.id;
            if (this.competitionId >= 0) {
              this.competition = await this.apiService.getCompetition(this.match.competition.id);
            }
          }
          this.navbarService.setPageTitle(`${this.match.matchName} (${this.match.matchCode})` + (this.match.activeRound > 0 ? ` ronde ${this.match.activeRound}` : ``));

          this.participants = await this.apiService.getParticipantsForMatch(this.match.id);
          if (this.match && (this.match.matchFlags & 0x1) == 0x1) {
            this.participants.forEach(p => {
              if (p.headToHeadJSON) {
                const data = JSON.parse(p.headToHeadJSON);
                if (data.length && this.isH2H) {
                  p.position = data[0].InitialPosition;
                }
              } else {
                p.position = 0;
              }
            });
          }
        }
        catch (error) {
          this.error = `Kon wedstrijd met id ${this.id} niet laden: ${error}`;
        }
      } else {
        this.match = undefined;
      }
    } catch (err) {
      this.error = `Er is iets fout gegaan: ${err}`;
    }
  }

  async newMatch(): Promise<void> {
    this.matchForProperties = <MatchModel>{ id: -1 };
  }

  async openProperties(): Promise<void> {
    this.matchForProperties = JSON.parse(JSON.stringify(this.match));
  }

  async editMatchClose(): Promise<void> {
    delete this.matchForProperties;
    await this.refresh();
  }

  async editMatchError(message: string): Promise<void> {
    this.error = message;
  }

  async setActive(value: boolean): Promise<void> {
    await this.apiService.setActive(this.match!, value);
    await this.refresh();
  }

  async editParticipantError(message: string): Promise<void> {
    this.error = message;
  }

  async editParticipantClose(): Promise<void> {
    delete this.participantForProperties;
    await this.refresh();
  }

  async newParticipant(): Promise<void> {
    this.participantForProperties = <ParticipantModel>{ id: -1 };
  }

  async editParticipant(p: ParticipantModel): Promise<void> {
    this.participantForProperties = JSON.parse(JSON.stringify(p));
  }

  async linkParticipant(p: ParticipantModel): Promise<void> {
    this.participantForLinking = JSON.parse(JSON.stringify(p));
  }

  async linkParticipantClose(): Promise<void> {
    delete this.participantForLinking;
    await this.refresh();
  }

  async h2hStart(): Promise<void> {
    this.specifyFinalSettingsOpen();
  }

  async move(participant: ParticipantModel, arg1: number): Promise<void> {
    await this.apiService.matchMoveParticipant(this.match!.id, participant.id, arg1);
    await this.refresh();
  }

  async specifyFinalSettingsOpen(): Promise<void> {
    this.specifyFinalSettings = true;
  }

  async specifyFinalSettingsClose(): Promise<void> {
    this.specifyFinalSettings = false;
    this.refresh();
  }

  async specifyFinalSettingsError(message: string): Promise<void> {
    this.error = message;
  }


}
