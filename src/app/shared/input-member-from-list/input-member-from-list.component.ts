import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ParticipantsListMember } from '../../models/participants-list-member';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ParticipantsListModel } from '../../models/participants-list-model';

@Component({
  selector: 'app-input-member-from-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input-member-from-list.component.html',
  styleUrl: './input-member-from-list.component.less'
})
export class InputMemberFromListComponent implements OnInit, OnChanges {
  @Input() listId = -1;
  @Input() participantId = -1;
  @Output() selected = new EventEmitter<ParticipantsListMember>();

  public memberList = <ParticipantsListModel>{ id: -1 };
  public memberListMembers: ParticipantsListMember[] = [];
  public currentSelection?: ParticipantsListMember;

  constructor(public apiService: ApiService) {
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    // if (changes['listId'] || changes['participantId']) {
    //   if (this.listId != this.memberList.id) {
    //     await this.refresh();
    //   }
    // }
  }

  async ngOnInit(): Promise<void> {
    if (this.listId > 0) {
      await this.refresh();
    }
  }

  async refresh(): Promise<void> {
    try {
      this.memberList = await this.apiService.getParticipantsList(this.listId) || <ParticipantsListModel>{ id: -1 };
      const memberListMembers = await this.apiService.getParticipantsListMembers(this.listId);
      if (memberListMembers && (!this.currentSelection || this.currentSelection.id !== this.participantId)) {
        this.currentSelection = memberListMembers.find(x => x.id === this.participantId);
        console.log(this.currentSelection);
      }
      this.memberListMembers = memberListMembers;
    } catch (error) {
      this.memberList = <ParticipantsListModel>{ id: -1 };
    }
  }

  participantChanged($event: Event, arg1: string) {
    console.log(this.currentSelection);
    this.selected.emit(this.currentSelection);
  }


}
