import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppRoutingModule }     from './app-routing.module';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';
import { HeroSearchComponent }  from './hero-search/hero-search.component';
import { MessageService }       from './message.service';
import { MessagesComponent }    from './messages/messages.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersServicesService } from './users-services.service';
import { UserModifyInfoComponent } from './user-modify-info/user-modify-info.component';
import { LogInComponent } from './log-in/log-in.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false },
    )
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroDetailComponent,
    MessagesComponent,
    HeroSearchComponent,
    UsersListComponent,
    UserModifyInfoComponent,
    LogInComponent
  ],
  providers: [MessageService,UsersServicesService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
