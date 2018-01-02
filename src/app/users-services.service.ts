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
    private http: HttpClient, private sessionDataService: SessionDataService) {
    this.sessionDataService.currentMessage.subscribe(message => this.TokenObjectStr = message);
    this.TokenData = JSON.parse(this.TokenObjectStr) as TokenManager;
  }

  /*getUsersList(): Observable<User[]> {
    return of(Users);
  }*/

  /** GET heroes from the server */
  getUsersList(): Observable<User[]> {
    return this.http.get<User[]>(this.userAPiURl + "/GetAllUsers", {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.TokenData.token_type + ' ' + this.TokenData.access_token
      })
    })
      .pipe(
      //tap(heroes => this.log(`fetched GetAllUsers`)),
      //catchError(this.handleError('GetAllUsers', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getUserBy(UserID: number): Observable<User> {
    const url = `${this.userAPiURl}/GetByID?nId=${UserID}`;
    return this.http.get<User>(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.TokenData.token_type + ' ' + this.TokenData.access_token
      })
    }).pipe(
      tap(_ => this.log(`fetched user UserID=${UserID}`)),
      catchError(this.handleError<User>(`getUser UserID=${UserID}`))
      );
  }

  //////// Save methods //////////

  /** POST: add a new user to the server */
  addUser(user: User): Observable<number> {
    this.TokenData = JSON.parse(this.TokenObjectStr) as TokenManager;
    //console.log(this.TokenData.access_token)
    return this.http.post<number>(this.userAPiURl + "/addUser", user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.TokenData.token_type + ' ' + this.TokenData.access_token
      })
    }).pipe(
      //console.log(user.id)
      tap((user: number) => this.log(`added user w/ id=`)),
      catchError(this.handleError<number>('addUser'))
      );
  }

  /** DELETE: delete the hero from the server */
  deleteUser(user: User | number): Observable<number> {
    this.TokenData = JSON.parse(this.TokenObjectStr) as TokenManager;
    const id = typeof user === 'number' ? user : user.UserID;
    const url = `${this.userAPiURl}/Delete?nId=${id}`;
    return this.http.delete<number>(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.TokenData.token_type + ' ' + this.TokenData.access_token
      })
    }).pipe(
      tap(_ => this.log(`deleted user id=${id}`)),
      catchError(this.handleError<number>('deleteUser'))
      );
  }

  /** PUT: update the hero on the server */
  updateUser(user: User): Observable<number> {
    this.TokenData = JSON.parse(this.TokenObjectStr) as TokenManager;
    return this.http.put<number>(this.userAPiURl + "/editUser?nId="+user.UserID, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.TokenData.token_type + ' ' + this.TokenData.access_token
      })
    }).pipe(
      tap(_ => this.log(`updated hero id=`)),
      catchError(this.handleError<number>('updateUser'))
      );
  }

  /** GET All Roles from the server */
  getRolesList(): Observable<UserRoles[]> {
    return this.http.get<UserRoles[]>("http://localhost/TestAPITokenProject/api/UserRoles/GetAllUserRoles", {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.TokenData.token_type + ' ' + this.TokenData.access_token
      })
    })
      .pipe(
      tap(heroes => this.log(`fetched GetAllUserRoles`)),
      catchError(this.handleError('GetAllUserRoles', []))
      );
  }

  /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    //this.messageService.add('HeroService: ' + message);
  }
}
