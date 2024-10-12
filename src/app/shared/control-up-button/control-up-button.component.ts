import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-control-up-button',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './control-up-button.component.html',
  styleUrl: './control-up-button.component.less'
})
export class ControlUpButtonComponent {
  public route: Array<string> = [];
  constructor(public activatedRoute: ActivatedRoute) {  
    const route = this.activatedRoute.snapshot;
    let newRoute = ['/'].concat(route.url.map(s => s.path));
    if (newRoute.length >= 1) {
      newRoute.pop();      
    }
    if (newRoute.length >= 3 && newRoute[1] === 'matches' && newRoute[2].startsWith('-')) {
      newRoute = [];
    }
    this.route = newRoute.length == 1 ? [] : newRoute;
  }
}
