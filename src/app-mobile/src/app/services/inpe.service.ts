import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { CONFIGS } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class InpeService {

  protected url = `${CONFIGS.BASE_SERVICE}/inpe/`;

  constructor(
    private http: HttpClient
  ) { }

  public searchCity(city: string) {
    return this.http.get(`${this.url}listaCidades/${city}`);
  }

}
