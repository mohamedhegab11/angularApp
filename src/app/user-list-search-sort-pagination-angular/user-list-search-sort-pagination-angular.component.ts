import { Component, OnInit, ViewChild } from '@angular/core';

import { User } from '../Model/User';
import { UsersServicesService } from '../users-services.service';
import { UserRoles } from '../Model/UserRoles';
import { PagerService } from '../pager-service.service';

@Component({
  selector: 'app-user-list-search-sort-pagination-angular',
  templateUrl: './user-list-search-sort-pagination-angular.component.html',
  styleUrls: ['./user-list-search-sort-pagination-angular.component.css']
})
export class UserListSearchSortPaginationAngularComponent implements OnInit {

  UserList: User[];

  constructor(private UsersServices: UsersServicesService) { }


  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];

  UserRoleList: UserRoles[];

  ngOnInit() {
    this.getUsersList();
  }

  getUserRolesList(): void {
   this.UsersServices.getRolesList().
    subscribe(UserRoleList => {
      this.UserRoleList = UserRoleList;
    },
      error => {
        this.UsersServices.handleErrors(error, par=>
          { this.getUserRolesList()});
      });
    }

  getUsersList(): void {
    this.UsersServices.getUsersList().
    subscribe(UserRoleList => {
      this.UserList = UserRoleList;
      this.getUserRolesList();
    },
      error => {
        this.UsersServices.handleErrors(error, par=>
          { this.getUsersList()});
      });
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
      },
      error => {
        this.UsersServices.handleErrors(error, par=>
          { this.delete(oUser)});
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



  //sorting
  key: string = 'UserID';
  reverse: boolean = false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }
  p: number = 1;
}
