import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { UsersListComponent }  from './users-list/users-list.component';
import { UserModifyInfoComponent }  from './user-modify-info/user-modify-info.component';
import { LogInComponent }  from './log-in/log-in.component';

import { LogInMasterPageComponent }  from './log-in-master-page/log-in-master-page.component';
import { DashboardMasterPageComponent }  from './dashboard-master-page/dashboard-master-page.component';

export const LogInMasterPage_Children: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'LogIn', component: LogInComponent }
];

export const DashboardMasterPage_Children: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'userModifyInfoComponent/:UserID', component: UserModifyInfoComponent},
  { path: 'UsersList', component: UsersListComponent }
];

const routes: Routes = [
  { path: '', redirectTo: 'DashboardMasterPage', pathMatch: 'full' },
  { path: 'LogInMasterPage', component: LogInMasterPageComponent ,children:LogInMasterPage_Children},
  { path: 'DashboardMasterPage', component: DashboardMasterPageComponent,children:DashboardMasterPage_Children }
  ,{ path: '**', redirectTo: 'LogInMasterPage' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

//