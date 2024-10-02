import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { ParticipantsListModel } from '../../models/participants-list-model';
import { ParticipantListMetadataModel } from '../../models/participants-list-metadata-model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-select-participants-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './select-participants-list.component.html',
  styleUrl: './select-participants-list.component.less'
})
export class SelectParticipantsListComponent {
  @Input() currentList?: ParticipantListMetadataModel;
  @Output() listSelected = new EventEmitter<ParticipantListMetadataModel>();  

  options: Array<ParticipantListMetadataModel> = [];
  selectedEntry: any;

  constructor(public apiService: ApiService) {}

  ngOnChanges(changes: SimpleChanges): void {
      if (changes['currentList'] && this.options) {
        this.selectedEntry = this.options.find(x => x.id === changes['currentList'].currentValue.id);
      }
  }

  async ngOnInit(): Promise<void> {
    this.options = [];
    this.options = await this.apiService.getParticipantsLists(); 
    this.selectedEntry = this.options.find(x => x.id === this.currentList?.id);
  }

  async selectionChanged(event: any, value: any) {
    this.listSelected.emit(this.selectedEntry);
  }  
}
