import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { NavbarService } from './services/navbar.service';
import { ApiService } from './services/api.service';
import { LoggedinUserComponent } from "./shared/loggedin-user/loggedin-user.component";
import { SelectActiveListComponent } from "./shared/select-active-list/select-active-list.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, LoggedinUserComponent, SelectActiveListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent implements OnInit {
  title = 'Centaur scores!';

  constructor(public navbarService: NavbarService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // When navigating, add a reload property to the transient info in navigation extra's to
        // force reloading the page after navigating. This is used when switching list context
        // to prevent stale data from being displayed when switching while on the homepage
        const info = this.router.getCurrentNavigation()?.extras?.info as any;
        if (info?.reload) {
          window.location.reload();
        }
      }
    });

    this.navbarService.title$.subscribe(x => {
      this.title = x;
    });


  }
}
