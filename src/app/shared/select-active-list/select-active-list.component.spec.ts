import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectActiveListComponent } from './select-active-list.component';

describe('SelectActiveListComponent', () => {
  let component: SelectActiveListComponent;
  let fixture: ComponentFixture<SelectActiveListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectActiveListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectActiveListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
