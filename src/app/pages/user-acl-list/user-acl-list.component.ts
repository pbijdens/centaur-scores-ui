import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthorizationService } from '../../services/authorization.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserACLModel } from '../../models/user-acl-model';
import { ControlUpButtonComponent } from "../../shared/control-up-button/control-up-button.component";
import { ControlDropdownButtonComponent } from "../../shared/control-dropdown-button/control-dropdown-button.component";
import { EditUserAclComponent } from "../../shared/edit-user-acl/edit-user-acl.component";
import { NavbarService } from '../../services/navbar.service';
import { ErrorComponent } from "../../shared/error/error.component";

@Component({
  selector: 'app-user-acl-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ControlUpButtonComponent, ControlDropdownButtonComponent, EditUserAclComponent, ErrorComponent],
  templateUrl: './user-acl-list.component.html',
  styleUrl: './user-acl-list.component.less'
})
export class UserAclListComponent implements OnInit {
  selectedACL?: UserACLModel;

  public errorMessage?: string;

  public aclList: UserACLModel[] = [];

  constructor(public apiService: ApiService, public authorizationService: AuthorizationService, public navbarService: NavbarService) { }

  async ngOnInit(): Promise<void> {
    await this.navbarService.setPageTitle(`Toegangslijsten (ACLs)`)
    
    this.authorizationService.user$.subscribe(async (user) => {
      if (user && user.claims['is-administrator']) {
        this.aclList = await this.apiService.getACLs();
      }
    });
  }

  open(acl: UserACLModel) {
    this.selectedACL = JSON.parse(JSON.stringify(acl));
  }

  createAcl() {
    this.selectedACL = <UserACLModel>{
      id: -1,
      name: ''      
    };
  }

  async modelError($event: string): Promise<void> {
    this.errorMessage = $event;
  }

  async modelClose(): Promise<void> {
    delete this.selectedACL;
    await this.ngOnInit();
  }

}
