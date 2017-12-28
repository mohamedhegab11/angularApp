import { Component, OnInit , Input, ViewChild } from '@angular/core';

import { User } from '../Model/User';
import { UsersServicesService } from '../users-services.service';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { fail } from 'assert';

@Component({
  selector: 'app-user-modify-info',
  templateUrl: './user-modify-info.component.html',
  styleUrls: ['./user-modify-info.component.css']
})
export class UserModifyInfoComponent implements OnInit {

  @Input() oUser: User;

  @ViewChild('myname') input;
  
  constructor(
    private route: ActivatedRoute,
    private usersServicesService: UsersServicesService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('UserID');
    if (id > 0){
      this.getUser(id);
    }else{
      this.oUser={id:0,UserID:0,UserIsBlocked:false} as User;
    }
  }

  getUser(id): void {
    this.usersServicesService.getUserBy(id)
      .subscribe(user => this.oUser = user);
  }

  goBack(): void {
    this.location.back();
  }

  update(): void {
    this.usersServicesService.updateUser(this.oUser)
    .subscribe(() => this.goBack());
  }

  add(): void {
    this.usersServicesService.addUser(this.oUser)
     .subscribe(
      User => {
       this.oUser = User;
       console.log(User.id)
       //window.location.reload();
       //this.location.
     });
    }
  }
