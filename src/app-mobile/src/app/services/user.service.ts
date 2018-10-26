import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { User } from '../interfaces/user';
import { CONFIGS } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  protected url = `${CONFIGS.BASE_SERVICE}/user/`;

  constructor(private http: HttpClient) { }

  public register(user: User) {
    return this.http.post(`${this.url}new`, user);
  }
}
