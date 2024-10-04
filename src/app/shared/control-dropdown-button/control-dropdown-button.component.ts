import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownMenuDirective } from '../../directives/dropdown-menu.directive';

@Component({
  selector: 'app-control-dropdown-button',
  standalone: true,
  imports: [CommonModule, FormsModule, DropdownMenuDirective],
  templateUrl: './control-dropdown-button.component.html',
  styleUrl: './control-dropdown-button.component.less'
})
export class ControlDropdownButtonComponent implements OnInit {
  @Input() label = 'Opties';

  public visibilityClasses: any = {};
  private isVisible: boolean = false;

  ngOnInit(): void {
    this.setVisibilityClasses();
  }

  toggleVisible(isVisible: boolean): void {
    this.isVisible = isVisible;
    this.setVisibilityClasses();
  }

  private setVisibilityClasses(): void {
    this.visibilityClasses = {
      'opacity-0 collapse': !this.isVisible,
      'opacity-100 visible': this.isVisible
    };
  }
}
