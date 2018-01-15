import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListSearchSortPaginationAngularComponent } from './user-list-search-sort-pagination-angular.component';

describe('UserListSearchSortPaginationAngularComponent', () => {
  let component: UserListSearchSortPaginationAngularComponent;
  let fixture: ComponentFixture<UserListSearchSortPaginationAngularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserListSearchSortPaginationAngularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListSearchSortPaginationAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
