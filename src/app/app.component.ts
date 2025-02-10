import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavbarService } from './services/navbar.service';
import { ApiService } from './services/api.service';
import { LoggedinUserComponent } from "./shared/loggedin-user/loggedin-user.component";
import { SelectActiveListComponent } from "./shared/select-active-list/select-active-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, LoggedinUserComponent, SelectActiveListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent implements OnInit {
  title = 'Centaur scores!';

  constructor(public navbarService: NavbarService) {}
  
  ngOnInit(): void {
    this.navbarService.title$.subscribe(x => {
      this.title = x;
    });


  }
}
