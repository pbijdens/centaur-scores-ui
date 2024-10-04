import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { KeysPipe } from '../../pipes/keys.pipe';
import { ParticipantModel } from '../../models/participant-model';
import { MatchModel } from '../../models/match-model';
import { GroupingDefinition } from '../../models/grouping-definition';
import { SortedParticipantsListComponent } from './sorted-participants-list/sorted-participants-list.component';
import { ParticipantGroup } from '../../models/participant-group';
import { GroupInfo } from '../../models/group-info';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-match-result-view',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, KeysPipe, SortedParticipantsListComponent],
  templateUrl: './match-result-view.component.html',
  styleUrl: './match-result-view.component.less'
})
export class MatchResultViewComponent implements OnInit, OnDestroy {
  public id: number = -1;
  public participants: Array<ParticipantModel> = [];
  public participantsByGroup: any = {};
  public participantsByGroupSubgroup: any = {};
  public participantsUnsorted: any = {};
  public groupByOptions: Array<GroupingDefinition> = [
    <GroupingDefinition>{ code: 'a', grouping: 'd', sortOrder: 's', label: 'Op score, per discipline' },
    <GroupingDefinition>{ code: 'b', grouping: 'k', sortOrder: 's', label: 'Op score, per discipline en klasse' },
    <GroupingDefinition>{ code: 'c', grouping: 'd', sortOrder: 'n', label: 'Op naam, per discipline' },
    <GroupingDefinition>{ code: 'd', grouping: 'g', sortOrder: 'n', label: 'Op naam' },
    <GroupingDefinition>{ code: 'e', grouping: 'g', sortOrder: 's', label: 'Op score' },
  ];
  public selectedGroupByOption = this.groupByOptions[0];
  public intervalId: any;
  public match: MatchModel | undefined = <MatchModel>{};

  constructor(public apiService: ApiService, public activatedRoute: ActivatedRoute, public router: Router, public navbarService: NavbarService) {
    this.navbarService.setPageTitle('Uitslagen');
    if (this.activatedRoute.snapshot.params['id']) {
      this.id = this.activatedRoute.snapshot.params['id'] as number;
    } else {
      this.id = -1;
    }

    if (this.activatedRoute.snapshot.params['sort']) {
      this.selectedGroupByOption = this.groupByOptions.find(o => o.code == this.activatedRoute.snapshot.params['sort']) ?? this.groupByOptions[0];
    } else {
      this.selectedGroupByOption = this.groupByOptions[0];
    }
  }

  async sortOrderChanged(event: any, value: any) {

    this.router.navigate(['result', this.id, this.selectedGroupByOption.code]);
    this.refresh();
  }

  async refresh(): Promise<void> {
    this.match = this.id < 0 ? await this.apiService.getActiveMatch() : await this.apiService.getMatch(this.id);
    if (this.match && this.match.id > 0) {
      this.participants = await this.apiService.getParticipantsForMatch(this.match.id);
      this.participantsUnsorted = new ParticipantGroup('', <GroupInfo>{code: '', label: `Alle deelnemers`, id: -1});
      this.participantsUnsorted.participants = [... this.participants];
      this.participantsByGroup = this.participants.reduce((res: any, curr) => {
        const key = `${curr.group}`;
        const groupInfo = this.match!.groups.find(g => g.code === curr.group) ?? <GroupInfo>{ code: curr.group, label: 'Verwijderd' };
        res[curr.group] ??= new ParticipantGroup(curr.group, groupInfo);
        res[curr.group].participants.push(curr);
        return res;
      }, {});
      this.participantsByGroupSubgroup = this.participants.reduce((res: any, curr) => {
        const key = `${curr.group}:${curr.subgroup}`;
        const groupInfo = this.match!.groups.find(g => g.code === curr.group) ?? <GroupInfo>{ code: curr.group, label: 'Verwijderd' };
        const subGroupInfo = this.match!.subgroups.find(g => g.code === curr.subgroup) ?? <GroupInfo>{ code: curr.subgroup, label: 'Verwijderd' };
        res[key] ??= new ParticipantGroup(key, <GroupInfo>{code: key, label: `${groupInfo.label} ${subGroupInfo.label}`});
        res[key].participants.push(curr);
        return res;
      }, {});
    }
    else {
      this.participants = [];
      this.participantsByGroup = {};
      this.participantsByGroupSubgroup = {};
    }
  }

  async ngOnInit(): Promise<void> {
    await this.refresh();
    this.intervalId = setInterval(() => {
      this.refresh();
    }, 30000); // every 30 seconds we'll refresh
  }

  async ngOnDestroy(): Promise<void> {
    await this.refresh();
    if (this.intervalId) {
      clearInterval(this.intervalId);
      delete this.intervalId;
    }
  }


}
