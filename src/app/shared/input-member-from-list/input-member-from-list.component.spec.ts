import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputMemberFromListComponent } from './input-member-from-list.component';

describe('InputMemberFromListComponent', () => {
  let component: InputMemberFromListComponent;
  let fixture: ComponentFixture<InputMemberFromListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputMemberFromListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputMemberFromListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
