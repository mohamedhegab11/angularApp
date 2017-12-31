import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { TokenManager } from '../app/Model/TokenManager';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};

@Injectable()
export class LogInService {

  private userAPiURl = 'http://localhost/TestAPITokenProject';  // URL to web api

  constructor(
    private http: HttpClient) { }

  /*getUsersList(): Observable<User[]> {
    return of(Users);
  }*/

  /** GET heroes from the server */

  createToken(sUserName: string, sPassword: string): Observable<string> {
    let sGrant_type: string = "password";
    /*let body = new URLSearchParams();
  body.set('username', sUserName);
  body.set('password', sPassword);
  body.set('grant_type', 'password');*/

    let body = ''; //'username=${sUserName}&password=${sPassword}&grant_type=${sGrant_type}';
    return this.http.post<string>(this.userAPiURl + '/api/GetTime', body, httpOptions).pipe(
      //console.log(user.id)
      //tap((user: User) => this.log(`added user w/ id=${user.id}`)),
      //catchError(this.handleError<User>('addUser'))
    );
  }

  // Test Api
  //headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  createTime(): Observable<string> {
    let body = '';
    return this.http.post<string>(this.userAPiURl + '/api/Data/GetTime', body, httpOptions).pipe(
      //console.log(user.id)
      tap((result: string) => this.log(`added user w/ id=${result}`)),
      catchError(this.handleError<string>('createTime'))
    );
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
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
