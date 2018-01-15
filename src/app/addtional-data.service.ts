import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { TokenManager } from './Model/TokenManager';
import { SessionDataService } from './session-data.service';
import { City } from './Model/City';

let httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AddtionalDataService {

  private userAPiURl = 'http://localhost/TestAPITokenProject/api/AddtionalData';  // URL to web api
  TokenData: TokenManager = null;
  TokenObjectStr: string = "";

  constructor(
    private http: HttpClient, private sessionDataService: SessionDataService) {
  }

  /** GET All Roles from the server */
  getCities(CountryID: number): Observable<City[]> {

    this.TokenObjectStr = this.sessionDataService.getValue("TokenObjectStr");
    this.TokenData = JSON.parse(this.TokenObjectStr) as TokenManager;

    const url = `${this.userAPiURl}/GetCities?CountryID=${CountryID}`;
    return this.http.get<City[]>(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.TokenData.token_type + ' ' + this.TokenData.access_token
      })
    })
      .pipe();
  }


}
