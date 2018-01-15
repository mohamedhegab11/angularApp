import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { UsersListComponent }  from './users-list/users-list.component';
import { UserListSearchSortPaginationAngularComponent }  from './user-list-search-sort-pagination-angular/user-list-search-sort-pagination-angular.component';
import { UserModifyInfoComponent }  from './user-modify-info/user-modify-info.component';
import { DatepickerExamplesComponent }  from './datepicker-examples/datepicker-examples.component';
import { LogInComponent }  from './log-in/log-in.component';

import { LogInMasterPageComponent }  from './log-in-master-page/log-in-master-page.component';
import { DashboardMasterPageComponent }  from './dashboard-master-page/dashboard-master-page.component';

export const LogInMasterPage_Children: Routes = [
  { path: 'LogIn', component: LogInComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

export const DashboardMasterPage_Children: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'userModifyInfoComponent/:UserID', component: UserModifyInfoComponent},
  { path: 'UsersList', component: UsersListComponent },
  { path: 'UserListSearchSortPaginationAngular', component: UserListSearchSortPaginationAngularComponent },
  { path: 'DatepickerExamples', component: DatepickerExamplesComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];

const routes: Routes = [
  { path: 'LogInMasterPage', component: LogInMasterPageComponent ,children:LogInMasterPage_Children},
  { path: 'DashboardMasterPage', component: DashboardMasterPageComponent,children:DashboardMasterPage_Children }
  //,{ path: '**', redirectTo: 'LogInMasterPage' }
  ,{ path: '', redirectTo: 'DashboardMasterPage', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

//