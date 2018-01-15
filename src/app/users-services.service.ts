import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from '../app/Model/User';
//import { CookieService } from 'ngx-cookie-service';
import { TokenManager } from './Model/TokenManager';
import { UserRoles } from './Model/UserRoles';
import { SessionDataService } from './session-data.service';
import { LogInService } from './log-in.service';

let httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

/*Test      */

@Injectable()
export class UsersServicesService {

  private userAPiURl = 'http://localhost/TestAPITokenProject/api/Users';  // URL to web api
  cookieValue = 'UNKNOWN';
  TokenData: TokenManager = null;
  TokenObjectStr: string = "";

  constructor(
    private http: HttpClient, private sessionDataService: SessionDataService
    , private oLogInService: LogInService) {
  }

  /*getUsersList(): Observable<User[]> {
    return of(Users);
  }*/
 refreshTokenData():void{
  this.TokenObjectStr = this.sessionDataService.getValue("TokenObjectStr");
  this.TokenData = JSON.parse(this.TokenObjectStr) as TokenManager;
 }
  /** GET heroes from the server */
  getUsersList(): Observable<User[]> {
    this.refreshTokenData();
    let UsersList: User[];
    return this.http.get<User[]>(this.userAPiURl + "/GetAllUsers", {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.TokenData.token_type + ' ' + this.TokenData.access_token
      })
    }).pipe();
  }

  /** GET hero by id. Will 404 if id not found */
  getUserBy(UserID: number): Observable<User> {
    this.refreshTokenData();
    const url = `${this.userAPiURl}/GetByID?nId=${UserID}`;
    return this.http.get<User>(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.TokenData.token_type + ' ' + this.TokenData.access_token
      })
    }).pipe();
  }

  //////// Save methods //////////
  adjustDateForTimeOffset(dateToAdjust) {
    if (dateToAdjust) {
      try {
        var offsetMs = dateToAdjust.getTimezoneOffset() * 60000;
        return new Date(dateToAdjust.getTime() - offsetMs);
      } catch (e) {
        return dateToAdjust;
      }
    }
    return null;
  }

  /** POST: add a new user to the server */
  addUser(user: User): Observable<number> {
    this.refreshTokenData();
    this.TokenData = JSON.parse(this.TokenObjectStr) as TokenManager;
    //console.log(this.TokenData.access_token)
    user.CreateDate = this.adjustDateForTimeOffset(user.CreateDate);
    return this.http.post<number>(this.userAPiURl + "/addUser", user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.TokenData.token_type + ' ' + this.TokenData.access_token
      })
    }).pipe();
  }

  /** DELETE: delete the hero from the server */
  deleteUser(user: User | number): Observable<number> {
    this.refreshTokenData();
    //this.TokenData = JSON.parse(this.TokenObjectStr) as TokenManager;
    const id = typeof user === 'number' ? user : user.UserID;
    const url = `${this.userAPiURl}/Delete?nId=${id}`;
    return this.http.delete<number>(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.TokenData.token_type + ' ' + this.TokenData.access_token
      })
    }).pipe();
  }

  /** PUT: update the hero on the server */
  updateUser(user: User): Observable<number> {
    //this.TokenData = JSON.parse(this.TokenObjectStr) as TokenManager;
    //console.log(user.CreateDate)
    this.refreshTokenData();
    user.CreateDate = this.adjustDateForTimeOffset(user.CreateDate);
    return this.http.put<number>(this.userAPiURl + "/editUser?nId=" + user.UserID, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.TokenData.token_type + ' ' + this.TokenData.access_token
      })
    }).pipe();
  }

  /** GET All Roles from the server */
  getRolesList(): Observable<UserRoles[]> {
    this.refreshTokenData();
    return this.http.get<UserRoles[]>("http://localhost/TestAPITokenProject/api/UserRoles/GetAllUserRoles", {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.TokenData.token_type + ' ' + this.TokenData.access_token
      })
    }).pipe();
    //return _UserRoleList;
  }

  handleErrors(error: any, callback: (parameter?: any) => void, _parameter?: any): void {
    this.refreshTokenData();
    //if got authorization error - try to update access token
    if (error.status = 401) {
      this.oLogInService.refreshToken(this.TokenData)
        .subscribe(
        oTokenManager => {
          try {
            if (oTokenManager != undefined && oTokenManager != null) {
              if (oTokenManager.error == undefined) {
                console.log("Token Refresh")
                this.TokenData = oTokenManager;
                this.TokenData.NextExpires_in = (oTokenManager.expires_in * 1000) + Date.now();

                //this.cookieService.set('TokenObject_cookie1', JSON.stringify(this.TokenData));
                this.sessionDataService.changeMessage("TokenObjectStr", JSON.stringify(this.TokenData));
                //console.log(JSON.stringify(this.TokenData))
                //this.router.navigateByUrl('/DashboardMasterPage/dashboard');
                // $injector.get('Contact')['send'](email);
                // this[methodName]; // call it
                //eval("this."+methodName+"()");
                if (_parameter) {
                  callback(_parameter)
                } else {
                  callback()
                }

              } else {
                console.log("Token Refresh return error")
                //this.router.navigateByUrl('LogInMasterPage/LogIn');
              }
            } else {
              console.log("Token Refresh return undefined object")
              //this.router.navigateByUrl('LogInMasterPage/LogIn');
            }
          } catch (e) {
            console.log("Token Refresh exception")
            //this.router.navigateByUrl('LogInMasterPage/LogIn');
          }
        });
    }
    else {
      Observable.throw(error);
    }
  }
}
