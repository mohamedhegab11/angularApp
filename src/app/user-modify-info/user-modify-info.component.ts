import { Component, OnInit, ElementRef, Input, ViewChild } from '@angular/core';

import { User } from '../Model/User';
import { UsersServicesService } from '../users-services.service';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { fail } from 'assert';
import { UserRoles } from '../Model/UserRoles';
import { parse } from 'url';

@Component({
  selector: 'app-user-modify-info',
  templateUrl: './user-modify-info.component.html',
  styleUrls: ['./user-modify-info.component.css']
})
export class UserModifyInfoComponent implements OnInit {

  @Input() oUser: User;

  @ViewChild('fi_UserPhoto') fileInput: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private usersServicesService: UsersServicesService,
    private location: Location
  ) {
  }

  UserRoleList: UserRoles[];
  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('UserID');
    this.getUserRolesList();
    if (id > 0) {
      this.getUser(id);
    } else {
      this.oUser = { id: 0, UserID: 0, UserIsBlocked: false } as User;
    }
  }
  getUserRolesList(): void {
    this.usersServicesService.getRolesList()
      .subscribe(UserRoleList => {
        this.UserRoleList = UserRoleList;
      });
    //this.UserList = this.UsersServices.getUsersList();///
  }

  getUser(id): void {
    this.usersServicesService.getUserBy(id)
      .subscribe(user => {
        this.oUser = user;
        this.oUser.UserPhoto = this.oUser.UserPhoto ?
          ("http://localhost/TestAPITokenProject/images/" + this.oUser.UserPhoto) : "";
      });
  }

  goBack(): void {
    this.location.back();
  }

  update(): void {
    if (this.isValideForm(this.oUser)) {
      this.oUser.UserPhoto = this.oUser.UserPhoto.replace("http://localhost/TestAPITokenProject/images/", "");
      this.usersServicesService.updateUser(this.oUser)
        .subscribe(nResult => {
          console.log(nResult)
          if (nResult == 1) {
            this.showSuccess("Success Update");
            this.goBack();
          } else if (nResult == 0) {
            // User Not Found
            this.showError("repeated email");
          } else if (nResult == -1) {
            this.showError("We Can't Find User Data");
          } else if (nResult == -2) {
            this.showError("Exception");
          }
        });

    }
  }

  add(): void {
    if (this.isValideForm(this.oUser)== true) {
      this.usersServicesService.addUser(this.oUser)
        .subscribe(
        nResult => {
          console.log(nResult)
          if (nResult == 1) {
            this.showSuccess("Success Insert");
            this.goBack();
          } else if (nResult == 0) {
            this.showError("repeated email");
          } else if (nResult == -1) {
            this.showError("Exception");
          }
        }
        );
    }
  }


  onFileChange(event) {
    let reader = new FileReader();
    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.oUser.UserPhoto = "data:" + file.type + ";base64," + reader.result.split(',')[1];
        console.log(reader.result.split(',')[1]);
      }
    }
  }

  /*UpdateFKRoleID(ctr) {
  this.oUser.FKRoleID =  parseInt(ctr.value);
  console.log(ctr.value);
  }*/

  clearFile() {
    this.oUser.UserPhoto = "";
    //this.fileInput.nativeElement.value = '';
  }

  rfvUserFirstName: string = "";
  rfvUserLastName: string = "";
  rfvPassword: string = "";
  rfvRole: string = "";
  rfvEmail: string = "";

  isValideForm(user:User): boolean {
    let isValide = true;
    if (user.UserFirstName == "" || user.UserFirstName == undefined) {
      this.rfvUserFirstName = "Please Insert User First Name";
      isValide = false;
    } else {
      this.rfvUserFirstName = "";
    }
    if (user.UserLastName == "" || user.UserLastName == undefined) {
      this.rfvUserLastName = "Please Insert User Last Name";
      isValide = false;
    } else {
      this.rfvUserLastName = "";
    }
    if (user.UserEmail == "" || user.UserEmail == undefined) {
      this.rfvEmail = "Please Insert Email";
      isValide = false;
    } else {
      this.rfvEmail = "";
    }

    if (user.UserPassword == ""|| user.UserPassword == undefined) {
      this.rfvPassword = "Please Insert Password";
      isValide = false;
    } else {
      this.rfvPassword = "";
    }
    if (user.FKRoleID == undefined ||  user.FKRoleID < 1) {
      this.rfvRole = "Please Select Role";
      isValide = false;
    } else {
      this.rfvRole = "";
    }

    return isValide;
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
