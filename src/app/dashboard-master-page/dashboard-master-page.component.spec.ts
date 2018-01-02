import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMasterPageComponent } from './dashboard-master-page.component';

describe('DashboardMasterPageComponent', () => {
  let component: DashboardMasterPageComponent;
  let fixture: ComponentFixture<DashboardMasterPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardMasterPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardMasterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
