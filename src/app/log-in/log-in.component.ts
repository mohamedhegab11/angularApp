import { Component, OnInit, ViewChild } from '@angular/core';
import { TokenManager } from '../Model/TokenManager';
import { LogInService } from '../log-in.service';
import { Router } from '@angular/router';
//import { LocalStorageManagement } from '../Model/LocalStorageManagement';
//import { CookieService } from 'ngx-cookie-service';
import { SessionDataService } from '../session-data.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  constructor(private oLogInService: LogInService, private router: Router,
    private sessionDataService: SessionDataService) { }
  //cookieValue = 'UNKNOWN';
  rfvUsername: string = "";
  rfvPassword: string = "";

  ErrorMessageTxt: string = "";
  @ViewChild('ErrorMessage') ErrorMessage;

  ngOnInit() {
  }

  TokenData: TokenManager = null;
  
  logIn(sUserName: string, sPassword: string): void {
    this.ErrorMessageTxt = "";
    this.ErrorMessage.nativeElement.style.display = "none";

    if(this.isValideForm(sUserName,sPassword)){
      this.oLogInService.createToken(sUserName, sPassword)
      .subscribe(
      oTokenManager => {
        if (oTokenManager != undefined && oTokenManager != null) {
          if (oTokenManager.error == undefined) {
            console.log("Token is created")
            this.TokenData = oTokenManager;
            console.log(oTokenManager.expires_in);
            this.TokenData.NextExpires_in = (oTokenManager.expires_in * 1000) + Date.now();
            this.sessionDataService.changeMessage("TokenObjectStr",JSON.stringify(this.TokenData));
            this.router.navigateByUrl('/DashboardMasterPage/dashboard');
          } else {
            console.log("oTokenManager.error")
            this.showError(oTokenManager.error);
          }
        } else {
          this.showError("Wrong User Name Or Password");
        }
      });
    }
  }

  isValideForm(sUserName: string, sPassword: string): boolean {
    let isValide = true;
    if (sUserName == "") {
      this.rfvUsername = "Please Insert User Name";
      isValide = false;
    }else{
      this.rfvUsername = "";
    }

    if (sPassword == "") {
      this.rfvPassword = "Please Insert Password";
      isValide = false;
    }else{
      this.rfvPassword = "";
    }
    return isValide;
  }

  showError(sMessage: string): void {
    this.ErrorMessageTxt = sMessage;
    this.ErrorMessage.nativeElement.style.display = "block";
    setTimeout(() => {
      this.ErrorMessageTxt = "";
      this.ErrorMessage.nativeElement.style.display = "none";
    }, 3000);
  }

}
