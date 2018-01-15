import { Component, OnInit, ElementRef, Input, ViewChild } from '@angular/core';

import { User } from '../Model/User';
import { UsersServicesService } from '../users-services.service';
import { AddtionalDataService } from '../addtional-data.service';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { fail } from 'assert';
import { UserRoles } from '../Model/UserRoles';
import { parse } from 'url';
import { City } from '../Model/City';

@Component({
  selector: 'app-user-modify-info',
  templateUrl: './user-modify-info.component.html',
  styleUrls: ['./user-modify-info.component.css']
})
export class UserModifyInfoComponent implements OnInit {
  cityList: City[];

  @Input() oUser: User;

  @ViewChild('fi_UserPhoto') fileInput: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private usersServicesService: UsersServicesService,
    private location: Location,
    private addtionalDataService: AddtionalDataService
  ) {
  }

  UserRoleList: UserRoles[];
  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('UserID');
    if (id > 0) {
      this.getUser(id);
    } else {
      this.oUser = { id: 0, UserID: 0, UserIsBlocked: false,CityId:null,CountryId:null,FKRoleID:0 } as User;
      this.getUserRolesList();
    }
  }
  getUserRolesList(): void {
    this.usersServicesService.getRolesList().
    subscribe(UserRoleList => {
      this.UserRoleList = UserRoleList;
    },
      error => {
        this.usersServicesService.handleErrors(error, par=>
          { this.getUserRolesList()});
      });
    //this.UserList = this.UsersServices.getUsersList();///
  }

  UpdateCityDDl(CountryId:number): void {
    this.addtionalDataService.getCities(CountryId)
    .subscribe(cityList => {
      this.cityList = cityList;
    },
    error => {
      this.usersServicesService.handleErrors(error, par=>
        { this.UpdateCityDDl(CountryId)});
    });
  }

  getUser(id): void {
    this.usersServicesService.getUserBy(id)
      .subscribe(user => {
        this.oUser = user;
        this.oUser.UserPhoto = this.oUser.UserPhoto ?
          ("http://localhost/TestAPITokenProject/images/" + this.oUser.UserPhoto) : "";
           this.UpdateCityDDl(this.oUser.CountryId);
           this.getUserRolesList();
          console.log(user);
          
      },
      error => {
        this.usersServicesService.handleErrors(error, par=>
          { this.getUser(id)});
      });
  }

  goBack(): void {
    this.location.back();
  }

  update(): void {
    console.log(this.oUser.UserID);
    if (this.isValideForm(this.oUser)) {
      this.oUser.UserPhoto = this.oUser.UserPhoto.replace("http://localhost/TestAPITokenProject/images/", "");
      this.usersServicesService.updateUser(this.oUser)
        .subscribe(nResult => {
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
        },error => {
          this.usersServicesService.handleErrors(error, par=>
            { this.update()});
        }
      );

    }
  }

  add(): void {
    if (this.isValideForm(this.oUser)== true) {
console.log(this.oUser.UserID);
      this.usersServicesService.addUser(this.oUser)
        .subscribe(
        nResult => {
          if (nResult == 1) {
            this.showSuccess("Success Insert");
            this.goBack();
          } else if (nResult == 0) {
            this.showError("repeated email");
          } else if (nResult == -1) {
            this.showError("Exception");
          }
        },error => {
          this.usersServicesService.handleErrors(error, par=>
            { this.add()});
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
      }
    }
  }


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
//
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

  
  public input2Moment: any;

}
