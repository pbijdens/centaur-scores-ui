import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
  standalone: true
})
export class DropdownMenuDirective {
  @Output() isMenuOpen = new EventEmitter<boolean>();
  isOpen: boolean = false;

  constructor(private elementRef: ElementRef) { }

  @HostListener('click') toggleMenu() {
    this.isOpen = !this.isOpen;
    this.isMenuOpen.emit(this.isOpen);
  }

  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event: Event): void {

    if (!this.isOpen) return;

    // Clicked the button again, ignore the event, let the button toggle the menu
    if (this.elementRef.nativeElement.contains(event.target)) {
      return;      
    }

    var targetElement = event.target as (HTMLElement | null);
    while (targetElement) {
      if (`${targetElement.className}`.indexOf('dropdown-menu-visual') >= 0) {
        return;
      }
      targetElement = targetElement.parentElement;
    } 

    this.isOpen = false;
    this.isMenuOpen.emit(this.isOpen);


  }
}
