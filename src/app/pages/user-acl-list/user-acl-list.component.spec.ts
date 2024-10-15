import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAclListComponent } from './user-acl-list.component';

describe('UserAclListComponent', () => {
  let component: UserAclListComponent;
  let fixture: ComponentFixture<UserAclListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAclListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserAclListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
