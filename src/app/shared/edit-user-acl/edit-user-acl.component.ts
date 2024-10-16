import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthorizationService } from '../../services/authorization.service';
import { ApiService } from '../../services/api.service';
import { UserACLModel } from '../../models/user-acl-model';

@Component({
  selector: 'app-edit-user-acl',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-user-acl.component.html',
  styleUrl: './edit-user-acl.component.less'
})
export class EditUserAclComponent implements OnInit {
  @Input() acl!: UserACLModel;
  @Output() onError = new EventEmitter<string>();
  @Output() onClose = new EventEmitter<void>();

  constructor(public apiService: ApiService, public authorizationService: AuthorizationService) { }

  async ngOnInit(): Promise<void> {
  }

  async deleteModel(): Promise<void> {
    if (this.acl && this.acl.id >= 0) {
      if (confirm(`Weet je zeker dat je de toegangslijst ${this.acl.name} met id ${this.acl.id} wil verwijderen? Dit kan niet ongedaan worden gemaakt.`)) {
        try {
          await this.apiService.deleteACL(this.acl);
        } catch (err) {
          this.onError.emit(`Deze toegangslijst kan niet verwijderd worden.`);
        }
        this.onClose.emit();
      }
    }
  }

  async saveModel(): Promise<void> {
    if (this.acl) {
      if (this.acl.id <= 0) {
        try {
          await this.apiService.createACL(this.acl);
        } catch (err) {
          this.onError.emit(`Kon nieuwe toegangslijst niet toevoegen.`);
        }
        this.onClose.emit();
      }
      else {
        try {
          await this.apiService.updateACL(this.acl);
        } catch (err) {
          this.onError.emit(`Kon de toegangslijst niet aanpassen.`);
        }
        this.onClose.emit();
      }
    }
  }

  async close() {
    this.onClose.emit();
  }
}
