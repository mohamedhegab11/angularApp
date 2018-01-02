import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogInMasterPageComponent } from './log-in-master-page.component';

describe('LogInMasterPageComponent', () => {
  let component: LogInMasterPageComponent;
  let fixture: ComponentFixture<LogInMasterPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogInMasterPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogInMasterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
