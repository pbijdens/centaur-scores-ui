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
import { MatchFinalDefinition, MatchFinalDefinitionClass, ResultListSelection } from '../../models/match-final-definition';
import { MatchResultEntry } from '../../models/match-result-entry';
import { MatchResultModel } from '../../models/match-result-model';
import { ErrorComponent } from "../../shared/error/error.component";



@Component({
  selector: 'app-match-h2h-builder',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, KeysPipe, ControlDropdownButtonComponent, ControlUpButtonComponent, ErrorComponent],
  templateUrl: './match-h2h-builder.component.html',
  styleUrl: './match-h2h-builder.component.less'
})
export class MatchH2hBuilderComponent implements OnInit {
  error = '';

  finalTresholds = [
    { participants: 0, places: 0 },
    { participants: 1, places: 4 },
    { participants: 4, places: 4 },
    { participants: 10, places: 8 },
    { participants: 20, places: 16 },
  ];

  id = -1;

  definition: MatchFinalDefinition = <MatchFinalDefinition>{
    groups: [
      <MatchFinalDefinitionClass>{
        name: `Finale`,
        isSetScored: true,
        participants: [],
        allParticipants: [],
      }
    ],
    name: `Finaleronde ${new Date().toISOString().substring(0, 10)}`
  };

  matchResult: MatchResultModel = <MatchResultModel>{};
  participants: MatchResultEntry[] = [];
  resultLists: ResultListSelection[] = [];

  constructor(public activatedRoute: ActivatedRoute, public router: Router, private apiService: ApiService, public authorizationService: AuthorizationService, public navbarService: NavbarService) {
    this.id = this.activatedRoute.snapshot.params['id'] as number;
  }

  async ngOnInit(): Promise<void> {
    this.matchResult = await this.apiService.getSingleMatchResults(this.id) ?? <MatchResultModel>{ ungrouped: [], byClass: {}, bySubclass: {}, groups: [], subgroups: [], finalScores: {} };

    // Convert the full result list into a more flat list
    this.resultLists = [];
    this.resultLists.push(<ResultListSelection>{
      name: `Alle deelnemers`, participants: this.matchResult.ungrouped
    });
    for (let discipline of this.matchResult.groups) {
      const lst1 = this.matchResult.byClass[discipline.code ?? ''];
      if (lst1) {
        this.resultLists.push(<ResultListSelection>{
          name: `${discipline.label}`, participants: [...lst1]
        });
        for (let klasse of this.matchResult.subgroups) {
          const lst2 = (this.matchResult.bySubclass[discipline.code ?? ''] ?? [])[klasse.code ?? ''];
          if (lst2) {
            this.resultLists.push(<ResultListSelection>{
              name: `${discipline.label} - ${klasse.label}`, participants: [...lst2]
            });
          }
        }
      }
    }
    await this.autoFinalsPerGroup();

    // convert results into a model that can be used to populate the finals round 1

    // workflow:
    // - provide description of the finals (e.g. Recurve Asprianten 9-12)
    // - provide rules (number of rounds, scoring system set/total,, 3rd or 4th)
    // - assign archers from match results
    //
    // - create final match for this purpose
    //
    // - activate final match
    // - assign archers to tablets on the tablets
    // - start the match
    //
    // - assign winners manually (e.g. because of whatever reason)
    // - start next round
    // - assign archers to tablets on the tablets
    // - start the match
  }

  async addGroup(): Promise<void> {
    this.definition.groups.push(<MatchFinalDefinitionClass>{
      name: `Finale`,
      isSetScored: true,
      participants: [],
      allParticipants: []
    });
  }

  async deleteGroup(group: MatchFinalDefinitionClass): Promise<void> {
    if (this.definition.groups.length > 1) {
      this.definition.groups = this.definition.groups.filter(elt => elt !== group);
    }
  }

  async groupChanged(event: any, group: MatchFinalDefinitionClass): Promise<void> {
    const value = group.selectedList;
    group.allParticipants = [...(value?.participants ?? [])];
    group.participants = [];
  }

  async participantsChanged(event: any, group: MatchFinalDefinitionClass): Promise<void> {
    // const value = group.participants;
  }

  async autoFinalsPerGroup(): Promise<void> {
    const result: MatchFinalDefinitionClass[] = [];

    for (let discipline of this.matchResult.groups) {
      const lst1 = this.matchResult.byClass[discipline.code ?? ''];
      if (lst1) {
        const finGrp = <MatchFinalDefinitionClass>{
          name: `${discipline.label}`,
          isSetScored: true,
          participants: [],
          allParticipants: [...lst1],
        };
        let places = this.finalTresholds.filter(x => finGrp.allParticipants.length >= x.participants).slice(-1)[0].places; // last element
        if (places > 0) {
          finGrp.participants = finGrp.allParticipants.slice(0, places);
        }

        result.push(finGrp);
      }
    }

    this.definition.groups = result;
  }

  async autoFinalsPerSubroup(): Promise<void> {
    const result: MatchFinalDefinitionClass[] = [];

    for (let discipline of this.matchResult.groups) {
      const lst1 = this.matchResult.byClass[discipline.code ?? ''];
      if (lst1) {
        for (let klasse of this.matchResult.subgroups) {
          const lst2 = (this.matchResult.bySubclass[discipline.code ?? ''] ?? [])[klasse.code ?? ''];
          if (lst2) {
            const finGrp = <MatchFinalDefinitionClass>{
              name: `${discipline.label} - ${klasse.label}`,
              isSetScored: true,
              participants: [],
              allParticipants: [...lst2],
            };
            let places = this.finalTresholds.filter(x => finGrp.allParticipants.length >= x.participants).slice(-1)[0].places; // last element
            if (places > 0) {
              finGrp.participants = finGrp.allParticipants.slice(0, places);
            }

            result.push(finGrp);
          }
        }
      }
    }

    this.definition.groups = result;
  }

  async dhz(): Promise<void> {
    const result: MatchFinalDefinitionClass[] = [];
    this.definition.groups = result;
    await this.addGroup();
  }

  async run(): Promise<void> {
    try {
      const finaleId = await this.apiService.createMatchFromFinalsDefinition(this.id, this.definition);
      if (finaleId === undefined) {
        this.error = `Finale kon niet worden aangemaakt. Er is een fout opgetreden in de communicatie met de API.`;
      } else {
        this.error = '';
        await this.router.navigate(['/', 'matches', finaleId]);
      }
    }
    catch (err) {
      this.error = `Finale kon niet worden aangemaakt. Er is een fout opgetreden in de communicatie met de API.`;
    }
  }
}
