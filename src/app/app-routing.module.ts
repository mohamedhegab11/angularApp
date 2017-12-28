import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { UsersListComponent }  from './users-list/users-list.component';
import { UserModifyInfoComponent }  from './user-modify-info/user-modify-info.component';
import { LogInComponent }  from './log-in/log-in.component';

const routes: Routes = [
  { path: '', redirectTo: '/LogIn', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'userModifyInfoComponent/:UserID', component: UserModifyInfoComponent },
  { path: 'UsersList', component: UsersListComponent },
  { path: 'LogIn', component: LogInComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
