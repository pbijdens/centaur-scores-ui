import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error.component.html',
  styleUrl: './error.component.less'
})
export class ErrorComponent implements OnChanges {
  @Input() error: string | undefined;
  @Output() onClose = new EventEmitter<boolean>();

  ngOnChanges(changes: SimpleChanges): void {
    if (this.error)  {
      console.error(`Error: ${this.error}`);
    }
  }

  close() {
    this.onClose.emit(true);
  }
}
