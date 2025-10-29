import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ParticipantReport } from '../../models/participant-report-model';
import { ControlUpButtonComponent } from "../../shared/control-up-button/control-up-button.component";

@Component({
  selector: 'app-participant-performance-report',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, ControlUpButtonComponent],
  templateUrl: './participant-performance-report.component.html',
  styleUrl: './participant-performance-report.component.less'
})
export class ParticipantPerformanceReportComponent implements OnInit{
  listId: number;
  report?: Array<ParticipantReport> = undefined;

  constructor(public apiService: ApiService, public activatedRoute: ActivatedRoute) {
    this.listId = this.activatedRoute.snapshot.params['listId'] as number || -1;
  }
  
  async ngOnInit(): Promise<void> {
    await this.loadReport();
  }

  private async loadReport(): Promise<void> {
    this.report = await this.apiService.getParticipantReportForList(this.listId);
  }
}
