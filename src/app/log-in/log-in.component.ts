import { Component, OnInit } from '@angular/core';
import { TokenManager } from '../Model/TokenManager';
import { LogInService } from '../log-in.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  oTokenManager: TokenManager;
  constructor(private oLogInService: LogInService) { }

  ngOnInit() {

  }

  /*logIn(sUserName:string,sPassword:string): void {
    console.log(sUserName)
    this.oLogInService.createToken(sUserName,sPassword)
     .subscribe(
      oTokenManager => {
       this.oTokenManager = oTokenManager;
       console.log(oTokenManager.access_token)
       //window.location.reload();
       //this.location. //
     });
    }*/
  logIn(sUserName: string, sPassword: string): void {
    console.log(sUserName)
    this.oLogInService.createTime()
      .subscribe(
      sss => {
        console.log(sss)
        //window.location.reload();
        //this.location. //
      });
  }

}
