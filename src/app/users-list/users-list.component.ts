import { Component, OnInit, ViewChild } from '@angular/core';

import { User } from '../Model/User';
import { UsersServicesService } from '../users-services.service';
import { UserRoles } from '../Model/UserRoles';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  UserList: User[];

  constructor(private UsersServices: UsersServicesService) { }
  UserRoleList: UserRoles[];

  ngOnInit() {
    this.getUsersList();
    this.getUserRolesList();
  }

  getUserRolesList(): void {
    this.UsersServices.getRolesList()
      .subscribe(UserRoleList => this.UserRoleList = UserRoleList);
    //this.UserList = this.UsersServices.getUsersList();///
  }

  getUsersList(): void {
    this.UsersServices.getUsersList()
      .subscribe(UserList => this.UserList = UserList);
    //this.UserList = this.UsersServices.getUsersList();///
  }

  delete(oUser: User): void {
    if (confirm("Are you sure to delete " + oUser.UserFirstName)) {
      this.UsersServices.deleteUser(oUser).subscribe(nResult => {
        console.log(nResult)
        if (nResult == 1) {
          this.UserList = this.UserList.filter(h => h !== oUser);
          this.showSuccess("Success Delete");
        } else if (nResult == 0) {
          // User Not Found
          this.showError("User Not Found");
        } else if (nResult == -1) {
          // User have blogs or comments ...
          this.showError("User have blogs or comments ...");
        }
        else if (nResult == -2) {
          // exception
          this.showError("exception");
        }
      }); // delete from server
    }
  }

  ErrorMessageTxt: string = "";
  @ViewChild('ErrorMessage') ErrorMessage;

  showError(sMessage: string): void {
    this.ErrorMessageTxt = sMessage;
    this.ErrorMessage.nativeElement.style.display = "block";
    setTimeout(() => {
      this.ErrorMessageTxt = "";
      this.ErrorMessage.nativeElement.style.display = "none";
    }, 3000);
  }

  SuccessMessageTxt: string = "";
  @ViewChild('SuccessMessage') SuccessMessage;

  showSuccess(sMessage: string): void {
    this.SuccessMessageTxt = sMessage;
    this.SuccessMessage.nativeElement.style.display = "block";
    setTimeout(() => {
      this.SuccessMessageTxt = "";
      this.SuccessMessage.nativeElement.style.display = "none";
    }, 3000);
  }
}
