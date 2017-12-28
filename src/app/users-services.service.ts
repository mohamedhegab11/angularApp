import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from '../app/Model/User';
import { Users } from '../app/Model/UserList';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class UsersServicesService {

  private userAPiURl = 'api/UserList';  // URL to web api

  constructor(
    private http: HttpClient) { }

  /*getUsersList(): Observable<User[]> {
    return of(Users);
  }*/

/** GET heroes from the server */
getUsersList(): Observable<User[]> {
  return this.http.get<User[]>(this.userAPiURl)
    .pipe(
      //tap(heroes => this.log(`fetched heroes`)),
      //catchError(this.handleError('getHeroes', []))
    );
}

/** GET hero by id. Will 404 if id not found */
getUserBy(UserID: number): Observable<User> {
  const url = `${this.userAPiURl}/${UserID}`;
  return this.http.get<User>(url).pipe(
     tap(_ => this.log(`fetched user UserID=${UserID}`)),
     catchError(this.handleError<User>(`getUser UserID=${UserID}`))
  );
}

//////// Save methods //////////

  /** POST: add a new user to the server */
  addUser (user: User): Observable<User> {
    return this.http.post<User>(this.userAPiURl, user, httpOptions).pipe(
      //console.log(user.id)
      tap((user: User) => this.log(`added user w/ id=${user.id}`)),
      catchError(this.handleError<User>('addUser'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteUser (user: User | number): Observable<User> {
    const id = typeof user === 'number' ? user : user.UserID;
    const url = `${this.userAPiURl}/${id}`;

    return this.http.delete<User>(url, httpOptions).pipe(
       tap(_ => this.log(`deleted user id=${id}`)),
       catchError(this.handleError<User>('deleteUser'))
    );
  }

  /** PUT: update the hero on the server */
  updateUser (user: User): Observable<any> {
    return this.http.put(this.userAPiURl, user, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${user.UserID}`)),
      catchError(this.handleError<any>('updateUser'))
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
