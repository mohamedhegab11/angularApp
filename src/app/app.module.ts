import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppRoutingModule }     from './app-routing.module';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroSearchComponent }  from './hero-search/hero-search.component';
import { MessageService }       from './message.service';
import { MessagesComponent }    from './messages/messages.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersServicesService } from './users-services.service';
import { UserModifyInfoComponent } from './user-modify-info/user-modify-info.component';
import { LogInComponent } from './log-in/log-in.component';
import { LogInService } from './log-in.service';
import { CookieService } from 'ngx-cookie-service';
import { LogInMasterPageComponent } from './log-in-master-page/log-in-master-page.component';
import { DashboardMasterPageComponent } from './dashboard-master-page/dashboard-master-page.component';
import { SessionDataService } from './session-data.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

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
    MessagesComponent,
    HeroSearchComponent,
    UsersListComponent,
    UserModifyInfoComponent,
    LogInComponent,
    LogInMasterPageComponent,
    DashboardMasterPageComponent
  ],
  providers: [MessageService,UsersServicesService, LogInService ,CookieService, SessionDataService],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
