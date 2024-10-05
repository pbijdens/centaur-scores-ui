import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionResultsComponent } from './competition-results.component';

describe('CompetitionResultsComponent', () => {
  let component: CompetitionResultsComponent;
  let fixture: ComponentFixture<CompetitionResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompetitionResultsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompetitionResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
