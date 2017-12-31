import { Component, OnInit } from '@angular/core';

import { User } from '../Model/User';
import { UsersServicesService } from '../users-services.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  UserList: User[];

  constructor(private UsersServices: UsersServicesService) { }

  ngOnInit() {
    this.getUsersList();
  }

  getUsersList(): void {
    this.UsersServices.getUsersList()
      .subscribe(UserList => this.UserList = UserList);
    //this.UserList = this.UsersServices.getUsersList();///
  }

  delete(oUser: User): void {
    this.UserList = this.UserList.filter(h => h !== oUser); // delete from the list in this page
    this.UsersServices.deleteUser(oUser).subscribe(); // delete from server
  }

}
