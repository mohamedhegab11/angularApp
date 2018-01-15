import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppRoutingModule }     from './app-routing.module';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersServicesService } from './users-services.service';
import { UserModifyInfoComponent } from './user-modify-info/user-modify-info.component';
import { LogInComponent } from './log-in/log-in.component';
import { LogInService } from './log-in.service';
import { CookieService } from 'ngx-cookie-service';
import { LogInMasterPageComponent } from './log-in-master-page/log-in-master-page.component';
import { DashboardMasterPageComponent } from './dashboard-master-page/dashboard-master-page.component';
import { SessionDataService } from './session-data.service';
import { PagerService } from './pager-service.service';
import { UserListSearchSortPaginationAngularComponent } from './user-list-search-sort-pagination-angular/user-list-search-sort-pagination-angular.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter'; //importing the module
import { Ng2OrderModule } from 'ng2-order-pipe'; //importing the module
import {NgxPaginationModule} from 'ngx-pagination';
import { AddtionalDataService } from './addtional-data.service';
//import { Ng2DatepickerComponent } from './ng2-datepicker/ng2-datepicker.component'; // <-- import the module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DateTimePickerModule } from 'ng-pick-datetime';
import { DatepickerExamplesComponent } from './datepicker-examples/datepicker-examples.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    Ng2SearchPipeModule, //including into imports
    Ng2OrderModule, // importing the sorting package here
    NgxPaginationModule,
    DateTimePickerModule,
    BrowserAnimationsModule
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
   /* HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false },
    )*/
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    UsersListComponent,
    UserModifyInfoComponent,
    LogInComponent,
    LogInMasterPageComponent,
    DashboardMasterPageComponent,
    UserListSearchSortPaginationAngularComponent,
    DatepickerExamplesComponent
  ],
  providers: [UsersServicesService, LogInService ,CookieService, SessionDataService,PagerService, AddtionalDataService],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
