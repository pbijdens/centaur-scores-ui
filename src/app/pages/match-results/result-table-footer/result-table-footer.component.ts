import { Component } from '@angular/core';
import { UiConfigurationService } from '../../../services/ui-configuration.service';
import { SafeHtmlPipe } from '../../../pipes/safe-html.pipe';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-result-table-footer',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, SafeHtmlPipe],
  templateUrl: './result-table-footer.component.html',
  styleUrl: './result-table-footer.component.less'
})
export class ResultTableFooterComponent {
  constructor(public uiConfiguration: UiConfigurationService) {
  }
}
