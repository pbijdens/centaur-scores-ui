import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditParticipantListEntryComponent } from './edit-participant-list-entry.component';

describe('EditParticipantListEntryComponent', () => {
  let component: EditParticipantListEntryComponent;
  let fixture: ComponentFixture<EditParticipantListEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditParticipantListEntryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditParticipantListEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
