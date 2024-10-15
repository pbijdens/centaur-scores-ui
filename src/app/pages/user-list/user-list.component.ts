import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthorizationService } from '../../services/authorization.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserModel } from '../../models/user-model';
import { ControlUpButtonComponent } from "../../shared/control-up-button/control-up-button.component";
import { ControlDropdownButtonComponent } from "../../shared/control-dropdown-button/control-dropdown-button.component";
import { EditUserComponent } from "../../shared/edit-user/edit-user.component";

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ControlUpButtonComponent, ControlDropdownButtonComponent, EditUserComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.less'
})
export class UserListComponent implements OnInit {
  selectedUser?: UserModel;

  public errorMessage?: string;

  public userList: UserModel[] = [];

  constructor(public apiService: ApiService, public authorizationService: AuthorizationService) { }

  async ngOnInit(): Promise<void> {
    this.authorizationService.user$.subscribe(async (user) => {
      if (user && user.claims['is-administrator']) {
        this.userList = await this.apiService.getUsers();
      }
    });
  }

  open(user: UserModel) {
    this.selectedUser = JSON.parse(JSON.stringify(user));
  }
  createUser() {
    this.selectedUser = <UserModel>{
      id: -1,
      acls: [],
      password: '',
      username: ''      
    };
  }

  async modelError($event: string): Promise<void> {
    this.errorMessage = $event;
  }

  async modelClose(): Promise<void> {
    delete this.selectedUser;
    await this.ngOnInit();
  }

}
