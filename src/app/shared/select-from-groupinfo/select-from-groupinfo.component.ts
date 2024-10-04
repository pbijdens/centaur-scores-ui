import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { GroupInfo } from '../../models/group-info';
@Component({
  selector: 'app-select-from-groupinfo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './select-from-groupinfo.component.html',
  styleUrl: './select-from-groupinfo.component.less'
})
export class SelectFromGroupinfoComponent {
  @Input() currentValue?: string;
  @Input() values?: GroupInfo[];
  @Input() label = 'Selecteer een waarde';
  @Output() valueSelected = new EventEmitter<GroupInfo>();  

  selectedEntry: GroupInfo | undefined;

  constructor(public apiService: ApiService) {}

  ngOnChanges(changes: SimpleChanges): void {
      if (changes['currentList']) {
        this.selectedEntry = (this.values || []).find(x => x.code === this.currentValue);
      }
  }

  async ngOnInit(): Promise<void> {
    this.selectedEntry = (this.values || []).find(x => x.code === this.currentValue);
  }

  async selectionChanged(event: any, value: any) {
    this.valueSelected.emit(this.selectedEntry);
  }  
}
