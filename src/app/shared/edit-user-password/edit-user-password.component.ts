import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthorizationService } from '../../services/authorization.service';
import { ApiService } from '../../services/api.service';
import { UserModel } from '../../models/user-model';
import { UserACLModel } from '../../models/user-acl-model';

@Component({
  selector: 'app-edit-user-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-user-password.component.html',
  styleUrl: './edit-user-password.component.less'
})
export class EditUserPasswordComponent implements OnInit {
  @Input() user!: UserModel;
  @Output() onError = new EventEmitter<string>();
  @Output() onClose = new EventEmitter<void>();

  constructor(public apiService: ApiService, public authorizationService: AuthorizationService) { }

  async ngOnInit(): Promise<void> {
  }

  async saveModel(): Promise<void> {
    if (this.user) {
      try {
        await this.apiService.updatePassword(this.user);
      } catch (err) {
        this.onError.emit(`Kon de gebruiker niet aanpassen.`);
      }
      this.onClose.emit();
    }
  }

  async close() {
    this.onClose.emit();
  }
}
