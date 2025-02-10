import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultTableFooterComponent } from './result-table-footer.component';

describe('ResultTableFooterComponent', () => {
  let component: ResultTableFooterComponent;
  let fixture: ComponentFixture<ResultTableFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultTableFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultTableFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
