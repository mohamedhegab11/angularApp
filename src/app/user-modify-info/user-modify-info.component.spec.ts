import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserModifyInfoComponent } from './user-modify-info.component';

describe('UserModifyInfoComponent', () => {
  let component: UserModifyInfoComponent;
  let fixture: ComponentFixture<UserModifyInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserModifyInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserModifyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
