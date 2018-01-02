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
  createToken(sUserName: string, sPassword: string): Observable<TokenManager> {
   let body = 'username='+sUserName+'&password='+sPassword+'&grant_type=password';
    return this.http.post<TokenManager>(this.userAPiURl + '/token', body, httpOptions).pipe(
      //console.log(user.id)
      tap((oTokenManager: TokenManager) => this.log(`Get Token w/ t=${oTokenManager.access_token}`)),
      catchError(this.handleError<TokenManager>('getToken'))
    );
  }

  refreshToken(sRefresh_token: string): Observable<TokenManager> {
    let body = 'grant_type=refresh_token&refresh_token='+sRefresh_token;
     return this.http.post<TokenManager>(this.userAPiURl + '/token', body, httpOptions).pipe(
       //console.log(user.id)
       tap((oTokenManager: TokenManager) => this.log(`Get Token w/ t=${oTokenManager.access_token}`)),
       catchError(this.handleError<TokenManager>('getToken'))
     );
   }

  // Test Api
  //headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  createTime(): Observable<string> {
    return this.http.get<string>(this.userAPiURl + '/api/Data/GetTime').pipe(
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
      //console.error(error); // log to console instead

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
