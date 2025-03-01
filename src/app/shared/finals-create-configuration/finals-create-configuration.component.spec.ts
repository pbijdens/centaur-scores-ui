import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalsCreateConfigurationComponent } from './finals-create-configuration.component';

describe('FinalsCreateConfigurationComponent', () => {
  let component: FinalsCreateConfigurationComponent;
  let fixture: ComponentFixture<FinalsCreateConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalsCreateConfigurationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalsCreateConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
