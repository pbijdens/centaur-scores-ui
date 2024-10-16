import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../../services/authorization.service';
import { WhoAmIResponse } from '../../models/who-am-i-response';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ControlDropdownLinkComponent } from "../control-dropdown-link/control-dropdown-link.component";
import { RouterModule } from '@angular/router';
import { EditUserPasswordComponent } from "../edit-user-password/edit-user-password.component";
import { UserModel } from '../../models/user-model';

@Component({
  selector: 'app-loggedin-user',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ControlDropdownLinkComponent, EditUserPasswordComponent],
  templateUrl: './loggedin-user.component.html',
  styleUrl: './loggedin-user.component.less'
})
export class LoggedinUserComponent implements OnInit {
  constructor(public apiService: ApiService, public authorizationService: AuthorizationService) { }

  public user: WhoAmIResponse | undefined;
  public showLogin = false;
  public username = '';
  public password = '';
  public changePasswordUser?: UserModel;

  async ngOnInit(): Promise<void> {
    this.authorizationService.user$.subscribe((u: WhoAmIResponse | undefined) => {
      this.user = u;
    });

    try {
      const whoami = await this.apiService.getLoggedInUser();
      await this.authorizationService.registerLoggedInUser(whoami);
    } catch (err) {
      delete this.user;
    }
  }

  async close(): Promise<void> {
    this.username = '';
    this.password = '';
    this.showLogin = false;
  }

  async open(): Promise<void> {
    this.username = '';
    this.password = '';
    this.showLogin = true;
  }

  async login(): Promise<void> {
    try {
      const token = await this.apiService.signin(this.username, this.password);
      if (token) {
        await this.authorizationService.storeOAuthBearerTokenValue(token);
      }

      const whoami = await this.apiService.getLoggedInUser();
      await this.authorizationService.registerLoggedInUser(whoami);

      this.username = '';
      this.password = '';

      this.close();
    } catch (err) {
      this.password = '';
      console.error(err);
    }
  }

  async logoff(): Promise<void> {
    await this.authorizationService.storeOAuthBearerTokenValue(undefined);
    window.location.reload();
  }

  async changePasswordDone(): Promise<void> {
    delete this.changePasswordUser;
  }

  async changePasswordError($event: string): Promise<void> {
    alert(`Password change failed with error: ${$event}`);
    delete this.changePasswordUser;
  }

  async changePasswordOpen(): Promise<void> {
    this.changePasswordUser = <UserModel>{
      id: this.user?.id,
      password: '',
      currentPassword: '',
      repeatPassword: ''
    };
  }
}
