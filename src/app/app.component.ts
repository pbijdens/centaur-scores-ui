import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavbarService } from './navbar.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
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
