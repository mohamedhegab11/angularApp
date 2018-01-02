import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { CookieService } from 'ngx-cookie-service';
import { TokenManager } from '../Model/TokenManager';
import { LogInService } from '../log-in.service';
import { SessionDataService } from '../session-data.service';

@Component({
  selector: 'app-dashboard-master-page',
  templateUrl: './dashboard-master-page.component.html',
  styleUrls: ['./dashboard-master-page.component.css']
})
export class DashboardMasterPageComponent implements OnInit {

  TokenData: TokenManager = null;

  constructor(private oLogInService: LogInService, private router: Router,
    private sessionDataService: SessionDataService) { }
  cookieValue = 'UNKNOWN';

  ngOnInit() {
    this.load();
  }

  logOut(): void {
    //this.cookieService.set('TokenObject_cookie','');
    //this.cookieService.delete('TokenObject_cookie1','/','/');
    this.sessionDataService.changeMessage("");
    this.router.navigateByUrl('LogInMasterPage/LogIn');
  }

  load(): void {
    //let TokenObjectStr = this.cookieService.get("TokenObject_cookie1");
    //console.log(Date.now())
    let TokenObjectStr : string = "";
    this.sessionDataService.currentMessage.subscribe(message => TokenObjectStr = message)
    //this.sessionDataService.changeMessage(JSON.stringify(this.TokenData));
    console.log("T " + TokenObjectStr);
    if (TokenObjectStr == "") {
       this.router.navigateByUrl('LogInMasterPage/LogIn');
    } else {
      this.TokenData = JSON.parse(TokenObjectStr) as TokenManager;
      if (this.TokenData == null || this.TokenData.access_token == undefined) {
        this.router.navigateByUrl('LogInMasterPage/LogIn');
      } else if (this.TokenData.NextExpires_in <= Date.now()) {
        this.refreshToken(this.TokenData.refresh_token);
      }
      else {
        this.router.navigateByUrl('DashboardMasterPage/dashboard');
      }
    }
  }

  refreshToken(refresh_token: string): void {
    this.oLogInService.refreshToken(refresh_token)
      .subscribe(
      oTokenManager => {
        if (oTokenManager != undefined && oTokenManager != null) {
          if (oTokenManager.error == undefined) {
            console.log("Token Refresh")
            this.TokenData = oTokenManager;
            this.TokenData.NextExpires_in = (oTokenManager.expires_in * 1000) + Date.now();
            //this.cookieService.set('TokenObject_cookie1', JSON.stringify(this.TokenData));
            this.sessionDataService.changeMessage(JSON.stringify(this.TokenData));
            this.router.navigateByUrl('/DashboardMasterPage/dashboard');
          } else {
            this.router.navigateByUrl('LogInMasterPage/LogIn');
          }
        }
      });
  }

}
