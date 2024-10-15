import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownMenuDirective } from '../../directives/dropdown-menu.directive';

@Component({
  selector: 'app-control-dropdown-link',
  standalone: true,
  imports: [CommonModule, FormsModule, DropdownMenuDirective],
  templateUrl: './control-dropdown-link.component.html',
  styleUrl: './control-dropdown-link.component.less'
})
export class ControlDropdownLinkComponent implements OnInit {
  @Input() label!: TemplateRef<any>;

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
