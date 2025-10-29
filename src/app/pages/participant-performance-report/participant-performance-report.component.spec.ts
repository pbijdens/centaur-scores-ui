import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantPerformanceReportComponent } from './participant-performance-report.component';

describe('ParticipantPerformanceReportComponent', () => {
  let component: ParticipantPerformanceReportComponent;
  let fixture: ComponentFixture<ParticipantPerformanceReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParticipantPerformanceReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticipantPerformanceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
