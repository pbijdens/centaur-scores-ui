import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthorizationService } from '../../services/authorization.service';
import { ApiService } from '../../services/api.service';
import { UserModel } from '../../models/user-model';
import { UserACLModel } from '../../models/user-acl-model';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.less'
})
export class EditUserComponent implements OnInit {
  @Input() user!: UserModel;
  @Output() onError = new EventEmitter<string>();
  @Output() onClose = new EventEmitter<void>();
  
  public acls : AclListEntry[] = [];
  
  constructor(public apiService: ApiService, public authorizationService: AuthorizationService) { }


  async ngOnInit(): Promise<void> {
    try {
      const acls = await this.apiService.getACLs();
      for (let acl of acls) {
        this.acls.push({
          acl: acl,
          selected: this.user.acls.find(ua => ua.id === acl.id) !== undefined
        });
      }
    } catch (error) {
      this.onError.emit(`Kon ACLs niet laden.`);
    }
  }

  async deleteModel(): Promise<void> {
    if (this.user && this.user.id >= 0) {
      if (confirm(`Weet je zeker dat je de gebruiker ${this.user.username} met id ${this.user.id} wil verwijderen? Dit kan niet ongedaan worden gemaakt.`)) {
        try {
          await this.apiService.deleteUser(this.user);
        } catch (err) {
          this.onError.emit(`Kon gebruiker niet verwijderen.`);
        }
        this.onClose.emit();
      }
    }
  }

  async saveModel(): Promise<void> {
    if (this.user) {
      this.user.acls = this.acls.filter(a => a.selected).map(a => a.acl);
      if (this.user.id <= 0) {
        try {
          await this.apiService.createUser(this.user);
        } catch (err) {
          this.onError.emit(`Kon nieuwe gebruiker niet toevoegen.`);
        }
        this.onClose.emit();
      }
      else {
        try {
          await this.apiService.updateUser(this.user);
        } catch (err) {
          this.onError.emit(`Kon de gebruiker niet aanpassen.`);
        }
        this.onClose.emit();
      }
    }
  }

  async close() {
    this.onClose.emit();
  }
}

export interface AclListEntry {
  selected: boolean;
  acl: UserACLModel;
}
