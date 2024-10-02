import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditParticipantsListMetadataComponent } from './edit-participants-list-metadata.component';

describe('EditParticipantsListMetadataComponent', () => {
  let component: EditParticipantsListMetadataComponent;
  let fixture: ComponentFixture<EditParticipantsListMetadataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditParticipantsListMetadataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditParticipantsListMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
